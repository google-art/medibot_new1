// 04/03/2026 - Worked By Abishek -  Changes  Sheduled Up Page Drop Down

import React, { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiCalendar,
  FiUsers,
  FiShare2,
  FiRefreshCcw,
  FiCreditCard,
  FiSettings,
  FiUser,
  FiLogOut,
  FiX,
  FiChevronRight,
  FiChevronDown,
} from "react-icons/fi";

const CYAN = "#00B8DB";
const YELLOW = "#F0B100";
const DOCTOR_BASE = "/maindoctor";

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [photo, setPhoto] = useState("");
  
  // Initialize state based on the current URL
  const [socialExpanded, setSocialExpanded] = useState(pathname.includes(`${DOCTOR_BASE}/socialmedia`));

  useEffect(() => {
    const loadProfile = () => {
      const savedDoctor = localStorage.getItem("doctorSettings");
      const savedPhoto = localStorage.getItem("profilePhoto");
      if (savedDoctor) setDoctor(JSON.parse(savedDoctor));
      if (savedPhoto) setPhoto(savedPhoto);
    };
    loadProfile();
    window.addEventListener("profileUpdated", loadProfile);
    return () => window.removeEventListener("profileUpdated", loadProfile);
  }, []);

  // UPDATED: Sync expansion state with pathname. 
  // If we move to a different main section, the dropdown closes.
  useEffect(() => {
    if (pathname.includes(`${DOCTOR_BASE}/socialmedia`)) {
      setSocialExpanded(true);
    } else {
      setSocialExpanded(false);
    }
  }, [pathname]);

  const items = useMemo(
    () => [
      { path: `${DOCTOR_BASE}/dashboard`, label: "Dashboard", icon: FiGrid },
      { path: `${DOCTOR_BASE}/appointment`, label: "Appointments", icon: FiCalendar },
      { path: `${DOCTOR_BASE}/patients`, label: "Patients", icon: FiUsers },
      { 
        path: `${DOCTOR_BASE}/socialmedia`, 
        label: "Social Media", 
        icon: FiShare2,
        children: [
          { path: `${DOCTOR_BASE}/socialmedia/scheduled`, label: "Scheduled Up" }
        ]
      },
      { path: `${DOCTOR_BASE}/followups`, label: "Follow-ups", icon: FiRefreshCcw },
      { path: `${DOCTOR_BASE}/billing`, label: "Billing", icon: FiCreditCard },
      { path: `${DOCTOR_BASE}/settings`, label: "Settings", icon: FiSettings },
    ],
    []
  );

  const isActive = (path) => {
    if (path === `${DOCTOR_BASE}/dashboard`) {
      return pathname === `${DOCTOR_BASE}` || pathname === `${DOCTOR_BASE}/dashboard`;
    }
    return pathname === path || pathname.startsWith(path + "/");
  };

  const safeNavigate = (to) => {
    if (to !== pathname) navigate(to);
  };

  const collapsedWrapper = "w-full flex justify-center py-2.5";
  const collapsedIconBox = "h-9 w-9 rounded-md border-2 border-black bg-white flex items-center justify-center shrink-0";

  return (
    <aside
      className={[
        // "h-screen bg-white border-r border-black/10 flex flex-col transition-all duration-300",
        " h-screen sticky top-0 bg-white border-r border-black/10 flex flex-col transition-all duration-300",
        collapsed ? "w-[80px]" : "w-[260px]",
      ].join(" ")}
    >
      {/* TOP CONTROL */}
      <div className="border-b border-black/10">
        {!collapsed ? (
          <div className="px-3 py-3 flex justify-end">
            <button
              onClick={() => setCollapsed(true)}
              className="h-9 w-9 border-2 border-black rounded-md flex items-center justify-center hover:bg-black/5"
              title="Collapse sidebar"
              type="button"
            >
              <FiX />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setCollapsed(false)}
            className={`${collapsedWrapper} hover:bg-black/5`}
            type="button"
          >
            <span className={collapsedIconBox}>
              <FiChevronRight className="text-[18px]" />
            </span>
          </button>
        )}
      </div>

      {/* MENU ITEMS */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className={collapsed ? "py-1" : "px-3 py-3 space-y-2"}>
          {items.map((item) => {
            const active = isActive(item.path);
            const hasChildren = item.children && item.children.length > 0;
            
            const isDropdownOpen = hasChildren && socialExpanded;

            if (collapsed) {
              return (
                <button
                  key={item.path}
                  onClick={() => safeNavigate(item.path)}
                  className={`${collapsedWrapper} ${active ? "bg-[#EAFBFF]" : "hover:bg-black/5"}`}
                  title={item.label}
                >
                  <span className={collapsedIconBox}>
                    <item.icon
                      className="text-[18px]"
                      style={{ color: active ? CYAN : "rgba(0,0,0,0.55)" }}
                    />
                  </span>
                </button>
              );
            }

            return (
              <div key={item.path} className="flex flex-col gap-1">
                <button
                  onClick={() => {
                    if (hasChildren) {
                      setSocialExpanded(!socialExpanded);
                      safeNavigate(item.path);
                    } else {
                      safeNavigate(item.path);
                    }
                  }}
                  className={[
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm border-2 transition",
                    active
                      ? "bg-[#EAFBFF] border-black font-extrabold text-black"
                      : "bg-white border-transparent text-black/80 hover:bg-black/5 hover:border-black/10",
                  ].join(" ")}
                >
                  <span className="h-9 w-9 rounded-md border-2 border-black bg-white flex items-center justify-center shrink-0">
                    <item.icon
                      className="text-[18px]"
                      style={{ color: active ? CYAN : "rgba(0,0,0,0.55)" }}
                    />
                  </span>
                  <span className="flex-1 text-left truncate">{item.label}</span>
                  {hasChildren && (
                    <span className="text-black/40">
                      {isDropdownOpen ? <FiChevronDown /> : <FiChevronRight />}
                    </span>
                  )}
                </button>

                {/* CHILD ITEMS */}
                {hasChildren && isDropdownOpen && (
                  <div className="ml-12 flex flex-col gap-1 border-l-2 border-black/10 pl-2 mt-1">
                    {item.children.map((child) => {
                      const childActive = pathname === child.path;
                      return (
                        <button
                          key={child.path}
                          onClick={() => safeNavigate(child.path)}
                          className={[
                            "text-left px-3 py-2 rounded-md text-xs transition-all",
                            childActive
                              ? "bg-[#EAFBFF] text-black font-extrabold border-l-4 border-[#00B8DB]"
                              : "text-black/60 hover:bg-black/5 hover:text-black",
                          ].join(" ")}
                        >
                          {child.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER SECTION */}
      <div className="border-t border-black/10">
        {collapsed ? (
          <div className="py-1">
            <button
              onClick={() => safeNavigate(`${DOCTOR_BASE}/settings`)}
              className={`${collapsedWrapper} hover:bg-black/5`}
              title="Profile"
            >
              <span
                className={collapsedIconBox}
                style={{ background: `linear-gradient(90deg, ${CYAN}, ${YELLOW})` }}
              >
                <FiUser className="text-white text-[18px]" />
              </span>
            </button>
            <button
              onClick={() => alert("Logout (demo)")}
              className={`${collapsedWrapper} hover:bg-black/5`}
              title="Logout"
            >
              <span className={collapsedIconBox}>
                <FiLogOut className="text-[18px]" />
              </span>
            </button>
          </div>
        ) : (
          <div className="m-3 p-3 rounded-lg border-2 border-black/10 bg-white space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full border-2 border-black overflow-hidden shrink-0">
                {photo ? (
                  <img src={photo} alt="Doc" className="h-full w-full object-cover" />
                ) : (
                  <div
                    className="h-full w-full flex items-center justify-center text-white"
                    style={{ background: `linear-gradient(90deg, ${CYAN}, ${YELLOW})` }}
                  >
                    <FiUser />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-extrabold text-black truncate">
                  {doctor?.fullName || "Doctor Name"}
                </div>
                <div className="text-[10px] font-semibold text-[#00B8DB] truncate uppercase tracking-wider">
                  {doctor?.specialization || "Specialization"}
                </div>
              </div>
            </div>
            <button
              onClick={() => alert("Logout (demo)")}
              className="w-full h-9 rounded-md border-2 border-black bg-white text-sm font-extrabold text-black flex items-center justify-center gap-2 hover:bg-black/5 transition"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}