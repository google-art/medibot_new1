// 04/03/2026  - Create and Work By Abishek 

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { 
  FiCalendar, FiEdit3, FiTrash2, FiClock, 
  FiFileText, FiImage, FiActivity, FiLayers,
  FiCheckCircle, FiX, FiRefreshCw, FiSearch,
  FiChevronLeft, FiChevronRight, FiPlus, FiZap, FiTarget, FiArrowLeft,
  FiInbox, FiHash
} from "react-icons/fi";

const TEXT_API = "http://localhost:3001/api/autopost/text";
const ARTICLE_API = "http://localhost:3001/api/autopost/article";
const IMAGE_API = "http://localhost:3001/api/autopost/image";

export default function ScheduledPostsMinimal() {
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [retryActive, setRetryActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null); // Default to null to show all posts
  
  // Modal & Form State
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    unique_id: "", platform: "", post_type: "", post: "",
    article: "", scheduled_time: "", created_time: "",
    Post_status: "", Post_action: "", clicktimestamp: "", hashtags: ""
  });

  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  /* ================================
      API WORKFLOWS & SYNC LOGIC
  ================================= */
  const mergePosts = (newPosts) => {
    setPosts(prev => {
      const map = new Map();
      // Combine existing and new posts, prioritizing newer data by key
      [...prev, ...newPosts].forEach(p => {
        const key = p["Unique ID"] || p.unique_id;
        if (key) map.set(key, p);
      });
      return Array.from(map.values());
    });
  };

  const fetchPosts = async () => {
    setLoading(true);
    const failedApis = [];
    const apis = [
      { url: TEXT_API, label: "Text" },
      { url: ARTICLE_API, label: "Article" },
      { url: IMAGE_API, label: "Image" }
    ];

    console.log("🚀 Initializing Live Queue Sync...");

    for (const api of apis) {
      try {
        const res = await axios.get(api.url);
        if (res.data?.data) mergePosts(res.data.data);
        await delay(400);
      } catch (err) {
        console.warn(`⚠️ ${api.label} API offline. Scheduled for retry.`);
        failedApis.push(api);
      }
    }

    setLoading(false);

    if (failedApis.length > 0) {
      setRetryActive(true);
      for (const api of failedApis) {
        await delay(20000); 
        try {
          const res = await axios.get(api.url);
          if (res.data?.data) {
            mergePosts(res.data.data);
            console.log(`✅ ${api.label} Sync Restored.`);
          }
        } catch (err) {
          console.error(`❌ Final retry failed for ${api.label}.`);
        }
      }
      setRetryActive(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  /* ================================
      EDIT / DELETE ACTIONS
  ================================= */
  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      unique_id: post["Unique ID"] || post.unique_id || "",
      platform: post.platform || "",
      post_type: post.post_type || post.Post_type || "",
      post: post.post || "",
      article: post.article || "",
      scheduled_time: post.scheduled_time ? post.scheduled_time.slice(0, 16) : "",
      created_time: post.created_time || "",
      Post_status: post.Post_status || "",
      Post_action: post.Post_action || "",
      clicktimestamp: post.clicktimestamp || "",
      hashtags: post["Hashtag's"] || post.hashtags || ""
    });
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        "Unique ID": formData.unique_id,
        platform: formData.platform,
        post_type: formData.post_type,
        post: formData.post,
        ...(formData.post_type === 'article' && { article: formData.article }),
        scheduled_time: formData.scheduled_time,
        created_time: formData.created_time,
        Post_status: formData.Post_status,
        Post_action: formData.Post_action,
        clicktimestamp: formData.clicktimestamp,
        "Hashtag's": formData.hashtags
      };

      const api = formData.post_type === "article" ? ARTICLE_API : 
                  formData.post_type === "image" ? IMAGE_API : TEXT_API;
      
      await axios.post(api, payload);
      setEditingPost(null);
      fetchPosts();
      
      // Show success popup
      alert("Post updated successfully!");
    } catch (err) {
      alert("Failed to update post");
    }
  };

  const handleDelete = async (post) => {
    if (!window.confirm("Delete this post?")) return;
    const uniqueId = post["Unique ID"] || post.unique_id;
    const postType = post.post_type || post.Post_type;

    try {
      const api = postType === "article" ? ARTICLE_API : 
                  postType === "image" ? IMAGE_API : TEXT_API;
      
      // Send delete request as JSON with unique_id and delete action
      const deletePayload = {
        unique_id: uniqueId,
        action: "delete"
      };
      
      await axios.post(api, deletePayload);
      setPosts(prev => prev.filter(p => (p["Unique ID"] || p.unique_id) !== uniqueId));
    } catch (err) {
      alert("Delete failed");
    }
  };

  /* ================================
      UI CALCULATIONS
  ================================= */
  const stats = useMemo(() => {
    const total = posts.length;
    const completed = posts.filter(p => {
        const status = p.Post_status?.toLowerCase();
        return status === 'published' || status === 'done' || status === 'success';
    }).length;
    return { total, completed, scheduled: total - completed };
  }, [posts]);

  const displayPosts = useMemo(() => {
    return posts.filter(p => {
      const type = (p.post_type || p.Post_type || "").toLowerCase();
      const matchesTab = activeTab === "all" || type === activeTab;
      
      // Search filter with highlighting
      let matchesSearch = true;
      if (searchQuery) {
        const content = (p.post || p.article || "").toLowerCase();
        matchesSearch = content.includes(searchQuery.toLowerCase());
      }
      
      // Calendar filter - only filter if a date is selected
      let matchesDate = true;
      if (selectedDate) {
        if (p.scheduled_time) {
          const postDate = new Date(p.scheduled_time);
          const selected = new Date(selectedDate);
          matchesDate = postDate.getDate() === selected.getDate() && 
                       postDate.getMonth() === selected.getMonth() && 
                       postDate.getFullYear() === selected.getFullYear();
        } else {
          // If no scheduled time, only show if today is selected
          const today = new Date();
          const selected = new Date(selectedDate);
          matchesDate = today.getDate() === selected.getDate() && 
                       today.getMonth() === selected.getMonth() && 
                       today.getFullYear() === selected.getFullYear();
        }
      }
      
      return matchesTab && matchesSearch && matchesDate;
    });
  }, [posts, activeTab, searchQuery, selectedDate]);

  if (loading && posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <FiRefreshCw className="text-4xl text-cyan-500 animate-spin mb-4" />
        <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Syncing Social Engine...</p>
      </div>
    );
    
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-cyan-100">
      
      <nav className="h-16 border-b border-slate-200 bg-white sticky top-0 z-30 px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => window.history.back()} className="p-2 text-slate-400 hover:text-cyan-600 transition-colors">
            <FiArrowLeft size={20}/>
          </button>
          <div className="flex items-center gap-2 border-l pl-4 border-slate-100">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
              <FiZap size={16} />
            </div>
            <span className="text-sm font-black text-slate-900 uppercase italic">Social Media <span className="text-cyan-500 not-italic">Posts</span></span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group hidden sm:block">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
              type="text" placeholder="Search queue..." 
              className="w-48 lg:w-64 pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:bg-white focus:border-cyan-500 transition-all"
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button onClick={fetchPosts} className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 hover:text-cyan-500 transition-all">
            <FiRefreshCw className={loading ? "animate-spin" : ""} size={16}/>
          </button>
          <button onClick={() => window.history.back()} className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider hover:bg-slate-800 transition-all shadow-md active:scale-95">
            + Create
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* SIDEBAR */}
        <aside className="w-20 lg:w-48 hidden md:flex flex-col border-r border-slate-100 h-[calc(100vh-64px)] py-8 px-4 gap-10 bg-white">
          <div className="space-y-8">
            <StatBox icon={<FiLayers/>} label="Queue" value={stats.total} color="text-cyan-500" />
            <StatBox icon={<FiCheckCircle/>} label="Done" value={stats.completed} color="text-emerald-500" />
            <StatBox icon={<FiClock/>} label="Wait" value={stats.scheduled} color="text-amber-500" />
          </div>
          {retryActive && (
             <div className="mt-auto p-4 bg-amber-50 rounded-2xl border border-amber-100 animate-pulse">
               <p className="text-[8px] font-black uppercase text-amber-600 leading-tight text-center">Connection Lag - Retrying Sync</p>
             </div>
          )}
        </aside>

        {/* FEED */}
        <main className="flex-1 p-6 md:p-10 h-[calc(100vh-64px)] overflow-y-auto bg-[#F8FAFC]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-slate-900 tracking-tight italic">
                Feed <span className="not-italic text-[10px] font-black text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-sm ml-2">{displayPosts.length}</span>
              </h2>
              <div className="flex gap-2">
                {(searchQuery || activeTab !== "all" || selectedDate) && (
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      setActiveTab("all");
                      setSelectedDate(null);
                    }}
                    className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-[9px] font-black uppercase transition-all hover:bg-amber-600 shadow-sm"
                  >
                    Clear Filters
                  </button>
                )}
                <div className="flex gap-1 bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                  {['all', 'text', 'article', 'image'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${activeTab === tab ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {displayPosts.map((post, i) => (
                <PostCardDetailed 
                  key={post["Unique ID"] || post.unique_id || i} 
                  post={post} 
                  searchQuery={searchQuery}
                  onEdit={() => handleEdit(post)} 
                  onDelete={() => handleDelete(post)} 
                />
              ))}
              {displayPosts.length === 0 && (
                <div className="py-20 text-center bg-white border border-dashed border-slate-200 rounded-[2.5rem]">
                  <FiInbox className="mx-auto text-slate-200 mb-4" size={48} />
                  <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">No matching posts found</p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* CALENDAR */}
        <aside className="w-80 lg:w-[420px] hidden xl:flex flex-col border-l border-slate-100 h-[calc(100vh-64px)] p-8 bg-white overflow-y-auto">
          <div className="bg-slate-50/50 rounded-[2.5rem] p-8 border border-slate-100 shadow-inner">
            <div className="mb-6">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest italic mb-2">Calendar Filter</h3>
              <p className="text-[8px] text-slate-400">Click a date to filter posts</p>
            </div>
            <CalendarComponent 
              currentMonth={currentMonth} 
              setCurrentMonth={setCurrentMonth} 
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate} 
              posts={posts} 
            />
            <div className="mt-6 p-3 bg-white rounded-xl border border-slate-100">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Selected Date</p>
              <p className="text-sm font-black text-slate-900 mt-1">
                {selectedDate ? selectedDate.toLocaleDateString('default', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'All Dates'}
              </p>
              <p className="text-[8px] text-cyan-500 font-black mt-2">
                {displayPosts.length} posts found
              </p>
            </div>
          </div>
          <div className="mt-10 space-y-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Quick Actions</p>
            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={() => setSelectedDate(new Date())}
                className="p-5 bg-white border border-slate-200 rounded-[1.5rem] flex flex-col items-center gap-3 hover:border-cyan-500 transition-all group shadow-sm"
              >
                <FiCalendar className="text-slate-300 group-hover:text-cyan-500" size={20}/>
                <span className="text-[9px] font-black uppercase text-slate-500 group-hover:text-slate-900">Today</span>
              </button>
              <button 
                onClick={() => setSelectedDate(null)}
                className="p-5 bg-white border border-slate-200 rounded-[1.5rem] flex flex-col items-center gap-3 hover:border-cyan-500 transition-all group shadow-sm"
              >
                <FiCalendar className="text-slate-300 group-hover:text-cyan-500" size={20}/>
                <span className="text-[9px] font-black uppercase text-slate-500 group-hover:text-slate-900">All Dates</span>
              </button>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                  setSelectedDate(null);
                }}
                className="p-5 bg-white border border-slate-200 rounded-[1.5rem] flex flex-col items-center gap-3 hover:border-cyan-500 transition-all group shadow-sm"
              >
                <FiRefreshCw className="text-slate-300 group-hover:text-cyan-500" size={20}/>
                <span className="text-[9px] font-black uppercase text-slate-500 group-hover:text-slate-900">Clear All</span>
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* EDIT MODAL */}
      {editingPost && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setEditingPost(null)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors">
              <FiX size={24}/>
            </button>
            <h3 className="text-xl font-black text-slate-800 italic mb-6">Update Post <span className="text-cyan-500 not-italic text-xs ml-2">#{formData.unique_id}</span></h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Platform</label>
                <input name="platform" value={formData.platform} onChange={(e) => setFormData({...formData, platform: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold text-xs outline-none focus:border-cyan-500" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Post Type</label>
                <input 
                  type="text" 
                  value={formData.post_type} 
                  disabled 
                  className="w-full bg-slate-100 border border-slate-200 p-2.5 rounded-xl font-bold text-xs outline-none cursor-not-allowed text-slate-500" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Scheduled Date</label>
                <input type="datetime-local" name="scheduled_time" value={formData.scheduled_time} onChange={(e) => setFormData({...formData, scheduled_time: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold text-xs outline-none focus:border-cyan-500" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Created Time</label>
                <input 
                  type="text" 
                  value={formData.created_time ? new Date(formData.created_time).toLocaleString('en-US', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  }) : ''} 
                  disabled 
                  className="w-full bg-slate-100 border border-slate-200 p-2.5 rounded-xl font-bold text-xs outline-none cursor-not-allowed text-slate-500" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Post Status</label>
                <input 
                  type="text" 
                  name="Post_status" 
                  value={formData.Post_status} 
                  onChange={(e) => setFormData({...formData, Post_status: e.target.value})} 
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold text-xs outline-none focus:border-cyan-500" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Post Action</label>
                <input 
                  type="text" 
                  name="Post_action" 
                  value={formData.Post_action} 
                  onChange={(e) => setFormData({...formData, Post_action: e.target.value})} 
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold text-xs outline-none focus:border-cyan-500" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Click Timestamp</label>
                <input 
                  type="text" 
                  name="clicktimestamp" 
                  value={formData.clicktimestamp} 
                  disabled 
                  className="w-full bg-slate-100 border border-slate-200 p-2.5 rounded-xl font-bold text-xs outline-none cursor-not-allowed text-slate-500" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Unique ID</label>
                <input 
                  type="text" 
                  name="unique_id" 
                  value={formData.unique_id} 
                  disabled 
                  className="w-full bg-slate-100 border border-slate-200 p-2.5 rounded-xl font-bold text-xs outline-none cursor-not-allowed text-slate-500" 
                />
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Caption / Post Body</label>
                <textarea name="post" value={formData.post} onChange={(e) => setFormData({...formData, post: e.target.value})} rows={3} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold text-xs outline-none focus:border-cyan-500" />
              </div>
              {formData.post_type === 'article' && (
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Article Detail</label>
                  <textarea name="article" value={formData.article} onChange={(e) => setFormData({...formData, article: e.target.value})} rows={4} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold text-xs outline-none focus:border-cyan-500" />
                </div>
              )}
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Hashtags</label>
                <input name="hashtags" value={formData.hashtags} onChange={(e) => setFormData({...formData, hashtags: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold text-xs outline-none focus:border-cyan-500" />
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={handleUpdate} className="flex-1 bg-slate-900 text-white font-black py-3 rounded-xl uppercase text-[10px] tracking-widest hover:bg-cyan-500 transition-all">Save Changes</button>
              <button onClick={() => setEditingPost(null)} className="px-6 bg-slate-100 text-slate-500 font-black py-3 rounded-xl uppercase text-[10px] tracking-widest">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- SUB COMPONENTS ---

function StatBox({ icon, label, value, color }) {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-1 group">
      <div className="flex items-center gap-3">
        <div className={`${color} bg-white p-2 rounded-lg shadow-sm border border-slate-50 transition-transform group-hover:scale-110`}>{icon}</div>
        <span className="hidden lg:block text-[10px] font-black text-slate-400 uppercase tracking-tighter">{label}</span>
      </div>
      <p className="text-xl font-black text-slate-900 tracking-tighter">{value}</p>
    </div>
  );
}

function PostCardDetailed({ post, onEdit, onDelete, searchQuery }) {
  const type = post.post_type || post.Post_type || "text";
  
  // Function to highlight search query in text
  const highlightText = (text, query) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <span key={index} className="bg-yellow-200 text-slate-900 font-bold">{part}</span> : 
        part
    );
  };
  
  const content = post.post || post.article || "Untitled Content";
  const highlightedContent = highlightText(content, searchQuery);
  
  return (
    <div className="bg-white border border-slate-200 rounded-[1.5rem] p-5 hover:border-cyan-500 transition-all group flex gap-6 shadow-sm">
      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 border border-slate-100 group-hover:text-cyan-500 transition-colors overflow-hidden">
        {post.image ? <img src={post.image} className="w-full h-full object-cover" alt="media" /> : 
         type === 'image' ? <FiImage size={24}/> : <FiFileText size={24}/>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2">
          <div className="flex gap-2">
            <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-slate-900 text-white rounded tracking-widest">{post.platform}</span>
            <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-slate-100 text-slate-500 rounded">{type}</span>
          </div>
          <div className="flex gap-1">
             <button onClick={onEdit} className="p-1 hover:text-cyan-600"><FiEdit3 size={14}/></button>
             <button onClick={onDelete} className="p-1 hover:text-red-500"><FiTrash2 size={14}/></button>
          </div>
        </div>
        <p className="text-slate-800 font-bold text-sm leading-relaxed mb-3 line-clamp-2">{highlightedContent}</p>
        <div className="flex items-center gap-4 border-t border-slate-50 pt-3">
           <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
             <FiClock className="text-cyan-500"/> {post.scheduled_time ? new Date(post.scheduled_time).toLocaleDateString() : "Draft"}
           </div>
           <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
             <div className={`w-1 h-1 rounded-full ${post.Post_status?.toLowerCase() === 'published' ? 'bg-emerald-500' : 'bg-amber-400'}`}></div>
             <span className="uppercase">{post.Post_status || "Queued"}</span>
           </div>
           {(post["Hashtag's"] || post.hashtags) && (
             <div className="flex items-center gap-1 text-slate-300 text-[9px] truncate max-w-[150px]">
               <FiHash size={10}/> {post["Hashtag's"] || post.hashtags}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}

function CalendarComponent({ currentMonth, setCurrentMonth, selectedDate, setSelectedDate, posts }) {
  const days = ['S','M','T','W','T','F','S'];
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  return (
    <div className="select-none">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => setCurrentMonth(new Date(year, month - 1, 1))} className="p-2 text-slate-400 hover:bg-white rounded-lg transition-colors"><FiChevronLeft/></button>
        <span className="text-xs font-black uppercase tracking-widest text-slate-900 italic">
          {currentMonth.toLocaleString('default', { month: 'long' })} <span className="text-cyan-500 not-italic">{year}</span>
        </span>
        <button onClick={() => setCurrentMonth(new Date(year, month + 1, 1))} className="p-2 text-slate-400 hover:bg-white rounded-lg transition-colors"><FiChevronRight/></button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {/* FIXED: Key using index to prevent duplicate key warning for initials S/T */}
        {days.map((d, idx) => <span key={`${d}-${idx}`} className="text-[9px] font-black text-slate-300 mb-2">{d}</span>)}
        
        {[...Array(firstDay)].map((_, i) => <div key={`empty-${i}`}></div>)}
        
        {[...Array(totalDays)].map((_, i) => {
          const d = i + 1;
          const isToday = today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;
          const isSelected = selectedDate && selectedDate.getDate() === d && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
          
          const hasPost = posts.some(p => {
            if (!p.scheduled_time) return false;
            const pDate = new Date(p.scheduled_time);
            return pDate.getDate() === d && pDate.getMonth() === month && pDate.getFullYear() === year;
          });

          return (
            <button key={`day-${d}`} onClick={() => setSelectedDate(new Date(year, month, d))}
              className={`aspect-square text-[10px] font-bold rounded-xl relative flex items-center justify-center transition-all
              ${isSelected ? 'bg-cyan-500 text-white shadow-lg' : isToday ? 'bg-slate-900 text-white' : 'text-slate-400 hover:bg-white'}`}>
              {d}
              {hasPost && !isSelected && <span className="absolute bottom-1 w-1 h-1 bg-cyan-500 rounded-full"></span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}