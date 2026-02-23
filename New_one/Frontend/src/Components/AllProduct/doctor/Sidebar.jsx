


// import React, { useMemo, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   FiGrid,
//   FiCalendar,
//   FiUsers,
//   FiShare2,
//   FiRefreshCcw,
//   FiCreditCard,
//   FiSettings,
//   FiUser,
//   FiLogOut,
//   FiX,
//   FiChevronRight,
// } from "react-icons/fi";

// const CYAN = "#00B8DB";
// const YELLOW = "#F0B100";
// const DOCTOR_BASE = "/maindoctor";

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const [collapsed, setCollapsed] = useState(false);

//   const items = useMemo(
//     () => [
//       { path: `${DOCTOR_BASE}/dashboard`, label: "Dashboard", icon: FiGrid },
//       { path: `${DOCTOR_BASE}/appointment`, label: "Appointments", icon: FiCalendar },
//       { path: `${DOCTOR_BASE}/patients`, label: "Patients", icon: FiUsers },
//       { path: `${DOCTOR_BASE}/socialmedia`, label: "Social Media", icon: FiShare2 },
//       { path: `${DOCTOR_BASE}/followups`, label: "Follow-ups", icon: FiRefreshCcw },
//       { path: `${DOCTOR_BASE}/billing`, label: "Billing", icon: FiCreditCard },
//       { path: `${DOCTOR_BASE}/settings`, label: "Settings", icon: FiSettings },
//     ],
//     []
//   );

//   const isActive = (path) => pathname === path || pathname.startsWith(path + "/");

//   const safeNavigate = (to) => {
//     if (to !== pathname) navigate(to);
//   };

//   // ✅ ONE EXACT ROW STYLE FOR COLLAPSED MODE (top/menu/footer all share this)
//   const collapsedRow =
//     "w-full flex justify-center px-3 py-2.5"; // <- SAME for every icon row

//   // ✅ ONE EXACT ICON BOX FOR COLLAPSED MODE (top/menu/footer all share this)
//   const collapsedIconBox =
//     "h-9 w-9 rounded-md border-2 border-black bg-white flex items-center justify-center";

//   return (
//     <aside
//       className={[
//         "h-screen bg-white border-r border-black/10 flex flex-col transition-all duration-300",
//         collapsed ? "w-[80px]" : "w-[260px]",
//       ].join(" ")}
//     >
//       {/* TOP CONTROL */}
//       <div className="border-b border-black/10">
//         {!collapsed ? (
//           <div className="px-3 py-3 flex justify-end">
//             <button
//               onClick={() => setCollapsed(true)}
//               className="h-9 w-9 border-2 border-black rounded-md flex items-center justify-center hover:bg-black/5"
//               title="Collapse sidebar"
//               type="button"
//             >
//               <FiX />
//             </button>
//           </div>
//         ) : (
//           // ✅ COLLAPSED TOP ROW uses same wrapper + same icon box => aligned
//           <button
//             onClick={() => setCollapsed(false)}
//             className={`${collapsedRow} hover:bg-black/5`}
//             title="Expand sidebar"
//             type="button"
//           >
//             <span className={collapsedIconBox}>
//               <FiChevronRight />
//             </span>
//           </button>
//         )}
//       </div>

//       {/* MENU */}
//       <div className={collapsed ? "flex-1 overflow-y-auto" : "flex-1 overflow-y-auto px-3 py-3 space-y-2"}>
//         {items.map(({ path, label, icon: Icon }) => {
//           const active = isActive(path);

//           if (collapsed) {
//             // ✅ COLLAPSED: icons only, perfect straight line alignment
//             return (
//               <button
//                 key={path}
//                 onClick={() => safeNavigate(path)}
//                 type="button"
//                 className={`${collapsedRow} ${
//                   active ? "bg-[#EAFBFF]" : "hover:bg-black/5"
//                 }`}
//                 title={label}
//               >
//                 <span className={collapsedIconBox}>
//                   <Icon
//                     className="text-[18px]"
//                     style={{ color: active ? CYAN : "rgba(0,0,0,0.55)" }}
//                   />
//                 </span>
//               </button>
//             );
//           }

//           // ✅ EXPANDED: original style with labels
//           return (
//             <button
//               key={path}
//               onClick={() => safeNavigate(path)}
//               type="button"
//               className={[
//                 "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm border-2 transition",
//                 active
//                   ? "bg-[#EAFBFF] border-black font-extrabold text-black"
//                   : "bg-white border-transparent text-black/80 hover:bg-black/5 hover:border-black/10",
//               ].join(" ")}
//             >
//               <span className="h-9 w-9 rounded-md border-2 border-black bg-white flex items-center justify-center shrink-0">
//                 <Icon
//                   className="text-[18px]"
//                   style={{ color: active ? CYAN : "rgba(0,0,0,0.55)" }}
//                 />
//               </span>

//               <span className="truncate">{label}</span>
//             </button>
//           );
//         })}
//       </div>

//       {/* FOOTER */}
//       <div className={collapsed ? "pb-3" : "px-3 pb-3 space-y-2"}>
//         {/* PROFILE */}
//         {!collapsed ? (
//           <div className="rounded-lg border-2 border-black/10 bg-white p-3 flex items-center gap-3">
//             <div
//               className="h-10 w-10 rounded-full border-2 border-black flex items-center justify-center text-white shrink-0"
//               style={{ background: `linear-gradient(90deg, ${CYAN}, ${YELLOW})` }}
//             >
//               <FiUser />
//             </div>

//             <div className="leading-tight">
//               <div className="text-sm font-extrabold text-black">Dr. Sarah Chen</div>
//               <div className="text-xs font-semibold text-[#00B8DB]">Cardiologist</div>
//             </div>
//           </div>
//         ) : (
//           // ✅ COLLAPSED PROFILE uses SAME wrapper + SAME icon box => aligned with arrow/menu
//           <button
//             type="button"
//             title="Profile"
//             onClick={() => safeNavigate(`${DOCTOR_BASE}/settings`)}
//             className={`${collapsedRow} hover:bg-black/5`}
//           >
//             <span className={collapsedIconBox}>
//               <span
//                 className="h-7 w-7 rounded-full border-2 border-black flex items-center justify-center text-white"
//                 style={{ background: `linear-gradient(90deg, ${CYAN}, ${YELLOW})` }}
//               >
//                 <FiUser className="text-[16px]" />
//               </span>
//             </span>
//           </button>
//         )}

//         {/* LOGOUT */}
//         {!collapsed ? (
//           <button
//             onClick={() => alert("Logout (demo)")}
//             type="button"
//             className="w-full rounded-md border-2 border-black bg-white px-3 py-2 text-sm font-extrabold text-black flex items-center justify-center gap-2 hover:bg-black/5"
//           >
//             <FiLogOut />
//             Logout
//           </button>
//         ) : (
//           // ✅ COLLAPSED LOGOUT uses SAME wrapper + SAME icon box => aligned too
//           <button
//             onClick={() => alert("Logout (demo)")}
//             type="button"
//             title="Logout"
//             className={`${collapsedRow} hover:bg-black/5`}
//           >
//             <span className={collapsedIconBox}>
//               <FiLogOut />
//             </span>
//           </button>
//         )}
//       </div>
//     </aside>
//   );
// }


import React, { useMemo, useState } from "react";
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
} from "react-icons/fi";

const CYAN = "#00B8DB";
const YELLOW = "#F0B100";
const DOCTOR_BASE = "/maindoctor";

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const items = useMemo(
    () => [
      { path: `${DOCTOR_BASE}/dashboard`, label: "Dashboard", icon: FiGrid },
      { path: `${DOCTOR_BASE}/appointment`, label: "Appointments", icon: FiCalendar },
      { path: `${DOCTOR_BASE}/patients`, label: "Patients", icon: FiUsers },
      { path: `${DOCTOR_BASE}/socialmedia`, label: "Social Media", icon: FiShare2 },
      { path: `${DOCTOR_BASE}/followups`, label: "Follow-ups", icon: FiRefreshCcw },
      { path: `${DOCTOR_BASE}/billing`, label: "Billing", icon: FiCreditCard },
      { path: `${DOCTOR_BASE}/settings`, label: "Settings", icon: FiSettings },
    ],
    []
  );

  const isActive = (path) => pathname === path || pathname.startsWith(path + "/");

  const safeNavigate = (to) => {
    if (to !== pathname) navigate(to);
  };

  // ✅ PERFECTLY CONSISTENT COLLAPSED STYLES
  const collapsedWrapper = "w-full flex justify-center py-2.5";
  const collapsedIconBox = "h-9 w-9 rounded-md border-2 border-black bg-white flex items-center justify-center";

  return (
    <aside
      className={[
        "h-screen bg-white border-r border-black/10 flex flex-col transition-all duration-300",
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
          // ✅ COLLAPSED TOP CONTROL
          <button
            onClick={() => setCollapsed(false)}
            className={`${collapsedWrapper} hover:bg-black/5`}
            title="Expand sidebar"
            type="button"
          >
            <span className={collapsedIconBox}>
              <FiChevronRight className="text-[18px]" />
            </span>
          </button>
        )}
      </div>

      {/* MENU ITEMS */}
      <div className="flex-1 overflow-y-auto">
        {collapsed ? (
          // ✅ COLLAPSED MENU - all icons perfectly aligned
          <div className="py-1">
            {items.map(({ path, label, icon: Icon }) => {
              const active = isActive(path);
              return (
                <button
                  key={path}
                  onClick={() => safeNavigate(path)}
                  type="button"
                  className={`${collapsedWrapper} ${
                    active ? "bg-[#EAFBFF]" : "hover:bg-black/5"
                  }`}
                  title={label}
                >
                  <span className={collapsedIconBox}>
                    <Icon
                      className="text-[18px]"
                      style={{ color: active ? CYAN : "rgba(0,0,0,0.55)" }}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          // ✅ EXPANDED MENU
          <div className="px-3 py-3 space-y-2">
            {items.map(({ path, label, icon: Icon }) => {
              const active = isActive(path);
              return (
                <button
                  key={path}
                  onClick={() => safeNavigate(path)}
                  type="button"
                  className={[
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm border-2 transition",
                    active
                      ? "bg-[#EAFBFF] border-black font-extrabold text-black"
                      : "bg-white border-transparent text-black/80 hover:bg-black/5 hover:border-black/10",
                  ].join(" ")}
                >
                  <span className="h-9 w-9 rounded-md border-2 border-black bg-white flex items-center justify-center shrink-0">
                    <Icon
                      className="text-[18px]"
                      style={{ color: active ? CYAN : "rgba(0,0,0,0.55)" }}
                    />
                  </span>
                  <span className="truncate">{label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* FOOTER SECTION */}
      <div className="border-t border-black/10">
        {collapsed ? (
          // ✅ COLLAPSED FOOTER - FIXED: EXACT SAME STRUCTURE AS OTHER ICONS
          <div className="py-1">
            {/* Profile - NOW PERFECTLY ALIGNED: Same exact structure as other icons */}
            <button
              type="button"
              title="Profile"
              onClick={() => safeNavigate(`${DOCTOR_BASE}/settings`)}
              className={`${collapsedWrapper} hover:bg-black/5`}
            >
              <span 
                className={collapsedIconBox}
                style={{ 
                  borderColor: "black",
                  background: `linear-gradient(90deg, ${CYAN}, ${YELLOW})` 
                }}
              >
                <FiUser className="text-white text-[18px]" />
              </span>
            </button>

            {/* Logout - Same exact structure */}
            <button
              onClick={() => alert("Logout (demo)")}
              type="button"
              title="Logout"
              className={`${collapsedWrapper} hover:bg-black/5`}
            >
              <span className={collapsedIconBox}>
                <FiLogOut className="text-[18px]" />
              </span>
            </button>
          </div>
        ) : (
          // ✅ EXPANDED FOOTER
          <div className="px-3 py-3 space-y-2">
            {/* Profile */}
            <div className="rounded-lg border-2 border-black/10 bg-white p-3 flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full border-2 border-black flex items-center justify-center text-white shrink-0"
                style={{ background: `linear-gradient(90deg, ${CYAN}, ${YELLOW})` }}
              >
                <FiUser />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-extrabold text-black">Dr. Sarah Chen</div>
                <div className="text-xs font-semibold text-[#00B8DB]">Cardiologist</div>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={() => alert("Logout (demo)")}
              type="button"
              className="w-full rounded-md border-2 border-black bg-white px-3 py-2 text-sm font-extrabold text-black flex items-center justify-center gap-2 hover:bg-black/5"
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