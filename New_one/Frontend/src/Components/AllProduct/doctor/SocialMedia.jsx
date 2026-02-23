
import { useState, useRef, useEffect } from "react";
import { 
  FiUpload, 
  FiCalendar, 
  FiCopy, 
  FiRefreshCw,
  FiChevronDown,
  FiChevronUp,
  FiImage,
  FiVideo,
  FiFileText,
  FiType,
  FiSmile,
  FiTarget,
  FiUsers,
  FiSend,
  FiBarChart2,
  FiZap,
  FiCheck,
  FiTrash2,
  FiPlay,
  FiLink,
  FiGlobe,
  FiShare2,
  FiPaperclip,
  FiExternalLink
} from "react-icons/fi";
import {
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaYoutube,
  FaRegSmile,
  FaRegSmileBeam,
  FaSmileBeam,
  FaRegLaughBeam,
  FaHashtag,
  FaRocket,
  FaMagic,
  FaChartLine,
  FaFileVideo,
  FaLink as FaLinkIcon,
  FaExternalLinkAlt,
  FaShareAlt,
  FaPaperclip as FaPaperclipIcon,
  FaCheck
} from "react-icons/fa";

export default function SocialMedia() {
  const [platform, setPlatform] = useState("LinkedIn");
  const [postType, setPostType] = useState("text");
  const [emojiIntensity, setEmojiIntensity] = useState("Balanced");
  const [audience, setAudience] = useState("General");
  const [contentIdea, setContentIdea] = useState("");
  const [videoDuration, setVideoDuration] = useState(30);
  const [generatedPost, setGeneratedPost] = useState("");
  const [uploadedMedia, setUploadedMedia] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [posting, setPosting] = useState(false);
  const [scheduling, setScheduling] = useState(false);
  const [showOptimization, setShowOptimization] = useState(true);
  const [isUploadOptional, setIsUploadOptional] = useState(true);
  
  // Link Icon States - Simple toggle for each platform
  const [linkedPlatforms, setLinkedPlatforms] = useState({
    LinkedIn: true,
    X: false,
    Instagram: false,
    Facebook: false,
    TikTok: false,
    YouTube: false,
  });

  const [popupOpen, setPopupOpen] = useState(null);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const fileInputRef = useRef(null);
  const contentRef = useRef(null);

  const platforms = [
    { name: "LinkedIn", icon: <FaLinkedinIn className="text-xl" />, color: "from-blue-500 to-blue-700" },
    { name: "X", icon: <FaTwitter className="text-xl" />, color: "from-black to-gray-900" },
    { name: "Instagram", icon: <FaInstagram className="text-xl" />, color: "from-pink-500 to-purple-600" },
    { name: "Facebook", icon: <FaFacebookF className="text-xl" />, color: "from-blue-600 to-blue-800" },
    { name: "TikTok", icon: <FaTiktok className="text-xl" />, color: "from-gray-900 to-black" },
    { name: "YouTube", icon: <FaYoutube className="text-xl" />, color: "from-red-500 to-red-700" },
  ];

  const emojiLevels = [
    { name: "None", icon: <FaRegSmile />, emojis: "", color: "from-gray-100 to-gray-200" },
    { name: "Minimal", icon: <FaRegSmileBeam />, emojis: "✨", color: "from-blue-50 to-cyan-50" },
    { name: "Balanced", icon: <FaSmileBeam />, emojis: "✨🚀", color: "from-cyan-50 to-blue-50" },
    { name: "High", icon: <FaRegLaughBeam />, emojis: "🔥🚀✨", color: "from-orange-50 to-pink-50" },
  ];

  const audiences = [
    { name: "Founders", icon: "👨‍💼", color: "from-pink-400 to-pink-600" },
    { name: "Marketers", icon: "📈", color: "from-rose-400 to-rose-600" },
    { name: "Job Seekers", icon: "💼", color: "from-fuchsia-400 to-fuchsia-600" },
    { name: "General", icon: "👥", color: "from-rose-300 to-pink-500" },
  ];

  const hashtags = [
    "#Entrepreneurship",
    "#StartupLife",
    "#Business",
    "#Leadership",
    "#Growth",
  ];

  // Initialize date/time and default content
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    setScheduleDate(tomorrow.toISOString().split('T')[0]);
    setScheduleTime("09:00");
    
    // Set default content idea
    setContentIdea("How to build an engaged community on social media through authentic content");
    
    // Generate initial post
    setTimeout(() => {
      buildPost();
    }, 100);
  }, []);

  const isReady =
    platform &&
    postType &&
    contentIdea.trim() &&
    audience &&
    emojiIntensity &&
    (postType !== "video" || videoDuration);

  const buildPost = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      let emojis = emojiLevels.find(level => level.name === emojiIntensity)?.emojis || "";

      let post = "";
      
      // Add media information
      if (uploadedMedia.length > 0) {
        const images = uploadedMedia.filter(m => m.type.startsWith('image'));
        const videos = uploadedMedia.filter(m => m.type.startsWith('video'));
        
        if (images.length > 0) {
          post += `📸 Images Attached: ${images.length} image${images.length > 1 ? 's' : ''}\n\n`;
        }
        if (videos.length > 0) {
          post += `🎥 Videos Attached: ${videos.length} video${videos.length > 1 ? 's' : ''}\n\n`;
        }
      }

      // Build post content based on type
      if (postType === "text")
        post += `Here's what I've learned:\n\n→ ${contentIdea}\n→ Focus on solving real problems\n→ Consistency beats perfection\n\nThe secret? Invisible work compounds.\n\n${emojis}`;
      else if (postType === "video")
        post += `🎥 Video Script (${videoDuration}s)\n\nHook: Ever faced this?\n\n${contentIdea}\n\nCTA: Follow for more!\n\n${emojis}`;
      else if (postType === "image")
        post += `🖼 Poster Caption:\n\n${contentIdea}\n\n${emojis}`;
      else if (postType === "article")
        post += `📖 Article Outline\n\n${contentIdea}\n\n1. Problem\n2. Experience\n3. Lessons\n4. Takeaway\n\n${emojis}`;

      // Add media details if any
      if (uploadedMedia.length > 0) {
        post += `\n\n📎 Media included:`;
        uploadedMedia.forEach((media, index) => {
          if (media.type.startsWith('image')) {
            post += `\n   • Image ${index + 1}: ${media.name}`;
          } else if (media.type.startsWith('video')) {
            post += `\n   • Video ${index + 1}: ${media.name}`;
          }
        });
      }
      
      // Add platform context
      post += `\n\n#${platform.replace(/\s+/g, '')} #SocialMedia #ContentCreation`;
      
      setGeneratedPost(post);
      setIsGenerating(false);
    }, 600);
  };

  const copyPost = () => {
    navigator.clipboard.writeText(generatedPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    const mediaFiles = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setUploadedMedia(prev => [...prev, ...mediaFiles]);
  };

  const removeMedia = (index) => {
    URL.revokeObjectURL(uploadedMedia[index].url);
    setUploadedMedia(prev => prev.filter((_, i) => i !== index));
  };

  const applyImprovement = (type) => {
    const upgrades = {
      personal: "\n\nPersonal takeaway: This completely changed how I work.",
      bold: "\n\nThis is the harsh truth nobody talks about.",
      shorten: generatedPost.split("\n").slice(0, 5).join("\n"),
      story: "\n\nQuick story: I failed before getting it right.",
      stats: "\n\n📊 80% quit before results show.",
      emojis: generatedPost + " 🚀🔥✨",
    };
    setGeneratedPost(upgrades[type] || generatedPost);
  };

  const addCTA = (type) => {
    const ctas = {
      question: "\n\nWhat's your experience with this?",
      soft: "\n\nFollow for more insights.",
      strong: "\n\nComment YES if you agree 👇",
    };
    setGeneratedPost(generatedPost + ctas[type]);
  };

  const addHashtag = (tag) => {
    if (!generatedPost.includes(tag))
      setGeneratedPost(generatedPost + "\n" + tag);
  };

  const handlePostNow = () => {
    setPosting(true);
    setTimeout(() => {
      alert(`✅ Post published successfully on ${platform}!`);
      setPopupOpen(null);
      setPosting(false);
    }, 1500);
  };

  const handleSchedule = () => {
    if (!scheduleDate || !scheduleTime) {
      alert("Please select both date and time");
      return;
    }
    setScheduling(true);
    setTimeout(() => {
      const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
      alert(`📅 Post scheduled for ${scheduledDateTime.toLocaleString()} on ${platform}!`);
      setPopupOpen(null);
      setScheduling(false);
    }, 1500);
  };

  const getPostTypeIcon = (type) => {
    switch(type) {
      case "text": return <FiType className="text-xl" />;
      case "video": return <FiVideo className="text-xl" />;
      case "image": return <FiImage className="text-xl" />;
      case "article": return <FiFileText className="text-xl" />;
      default: return "📝";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const toggleLink = (platformName) => {
    setLinkedPlatforms(prev => ({
      ...prev,
      [platformName]: !prev[platformName],
    }));
  };

  // Auto-generate post when relevant fields change
  useEffect(() => {
    if (contentIdea.trim()) {
      const timer = setTimeout(() => {
        buildPost();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [platform, postType, emojiIntensity, audience, contentIdea, linkedPlatforms]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Social Media Post Assistant
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Create engaging social media content in seconds
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* LEFT SIDE - Controls */}
          <div className="space-y-6">
            {/* Platform Selection */}
            <Section title="Select Platform" icon={<FiSend />}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {platforms.map(p => (
                  <div key={p.name} className="relative">
                    {/* Link icon outside the card */}
                    <button
                      onClick={() => toggleLink(p.name)}
                      className="absolute -top-2 -right-2 bg-white border rounded-full p-1 shadow z-10 hover:bg-gray-50 transition-colors"
                      title={linkedPlatforms[p.name] ? "Link enabled" : "Link disabled"}
                    >
                      {linkedPlatforms[p.name] ? (
                        <FaCheck className="text-green-500" size={14} />
                      ) : (
                        <FiLink className="text-gray-500" size={14} />
                      )}
                    </button>

                    <CardSelect 
                      active={platform === p.name} 
                      onClick={() => setPlatform(p.name)}
                      className="flex flex-col items-center p-4"
                    >
                      <div className={`p-3 rounded-full mb-3 ${platform === p.name ? 'bg-white/20' : 'bg-gray-100'}`}>
                        {p.icon}
                      </div>
                      <span className="font-medium text-sm">{p.name}</span>
                    </CardSelect>
                  </div>
                ))}
              </div>
            </Section>

            {/* Post Type */}
            <Section title="Post Type" icon={<FiType />}>
              <div className="grid grid-cols-2 gap-3">
                {["text", "video", "image", "article"].map(t => (
                  <CardSelect 
                    key={t} 
                    active={postType === t} 
                    onClick={() => setPostType(t)}
                    className="flex flex-col items-center p-4"
                  >
                    <div className="text-2xl mb-2">
                      {getPostTypeIcon(t)}
                    </div>
                    <span className="font-medium capitalize text-sm">{t}</span>
                  </CardSelect>
                ))}
              </div>
            </Section>

            {/* Video Duration */}
            {postType === "video" && (
              <Section title="Video Duration (seconds)" icon={<FiVideo />}>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="15"
                    max="300"
                    step="15"
                    value={videoDuration}
                    onChange={(e) => setVideoDuration(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Duration:</span>
                    <span className="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg text-sm">
                      {videoDuration}s
                    </span>
                  </div>
                </div>
              </Section>
            )}

            {/* Upload Images & Videos */}
            <Section title="Upload Images & Videos (Optional)" icon={<FiUpload />}>
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={isUploadOptional}
                      onChange={(e) => setIsUploadOptional(e.target.checked)}
                      className="rounded border-gray-300 text-cyan-500 focus:ring-cyan-400"
                    />
                    Optional Upload
                  </label>
                  <span className="text-xs text-gray-500">
                    {uploadedMedia.length} file{uploadedMedia.length !== 1 ? 's' : ''} uploaded
                  </span>
                </div>
                
                <label 
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl min-h-32 flex flex-col items-center justify-center cursor-pointer transition-all ${
                    uploadedMedia.length > 0 
                      ? "border-green-400 bg-green-50" 
                      : "border-gray-300 hover:border-cyan-400 hover:bg-cyan-50"
                  }`}
                >
                  <FiUpload className={`text-3xl mb-3 ${
                    uploadedMedia.length > 0 ? "text-green-500" : "text-gray-400"
                  }`} />
                  <span className={`font-medium ${
                    uploadedMedia.length > 0 ? "text-green-600" : "text-gray-500"
                  }`}>
                    {uploadedMedia.length > 0 ? "Add more files" : "Click to upload images/videos"}
                  </span>
                  <span className="text-sm mt-1 text-gray-500">
                    PNG, JPG, MP4, MOV up to 50MB
                  </span>
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleMediaUpload}
                  multiple
                  accept="image/*,video/*"
                  className="hidden"
                />
                
                {uploadedMedia.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {uploadedMedia.map((media, index) => (
                      <div key={index} className="relative group border rounded-lg overflow-hidden bg-gray-50">
                        <div className="p-3">
                          <div className="flex items-start gap-2">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              {media.type.startsWith('image') ? (
                                <FiImage className="text-gray-600" />
                              ) : (
                                <FaFileVideo className="text-gray-600" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-700 truncate">
                                {media.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatFileSize(media.size)}
                              </p>
                            </div>
                            <button
                              onClick={() => removeMedia(index)}
                              className="p-1 hover:bg-red-50 rounded transition-colors"
                            >
                              <FiTrash2 className="text-red-500 text-sm" />
                            </button>
                          </div>
                          
                          {media.type.startsWith('image') && (
                            <div className="mt-2">
                              <img
                                src={media.url}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-20 object-cover rounded border"
                              />
                            </div>
                          )}
                          
                          {media.type.startsWith('video') && (
                            <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-100">
                              <div className="flex items-center gap-2 text-blue-600">
                                <FaFileVideo />
                                <span className="text-xs font-medium">Video file ready</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Section>

            {/* Content Idea */}
            <Section title="Your Content Idea" icon={<FiZap />}>
              <textarea
                className="w-full h-32 border-2 border-gray-200 rounded-xl p-4 resize-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all"
                value={contentIdea}
                onChange={(e) => setContentIdea(e.target.value)}
                placeholder="Enter your main content idea here..."
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  {contentIdea.length}/500 characters
                </span>
                <div className="flex gap-1">
                  <span className="text-xs text-gray-500">💡</span>
                  <span className="text-xs text-gray-500">Be specific and clear</span>
                </div>
              </div>
            </Section>

            {/* Target Audience */}
            <Section title="Target Audience" icon={<FiTarget />}>
              <div className="flex flex-wrap gap-3">
                {audiences.map(a => (
                  <button
                    key={a.name}
                    onClick={() => setAudience(a.name)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all shadow-sm hover:shadow-md ${
                      audience === a.name
                        ? `bg-gradient-to-r ${a.color} text-white shadow-md scale-105`
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <span className="text-lg">{a.icon}</span>
                    <span>{a.name}</span>
                  </button>
                ))}
              </div>
            </Section>

            {/* Emoji Intensity */}
            <Section title="Emoji Intensity" icon={<FiSmile />}>
              <div className="grid grid-cols-4 gap-4 text-center">
                {emojiLevels.map(level => (
                  <div 
                    key={level.name} 
                    onClick={() => setEmojiIntensity(level.name)}
                    className="cursor-pointer"
                  >
                    <div className={`w-12 h-12 mx-auto rounded-full border-2 flex items-center justify-center text-xl mb-2 transition-all ${
                      emojiIntensity === level.name 
                        ? "border-cyan-400 bg-gradient-to-r from-cyan-50 to-blue-50 shadow-sm" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}>
                      {level.icon}
                    </div>
                    <p className="text-sm font-medium">{level.name}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Generate Button */}
            <button
              disabled={!isReady || isGenerating}
              onClick={buildPost}
              className={`w-full py-4 rounded-2xl text-white font-semibold text-lg flex items-center justify-center gap-3 transition-all ${
                isReady
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                  : "bg-gradient-to-r from-cyan-200 to-blue-300 opacity-70 cursor-not-allowed"
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  Generating...
                </>
              ) : (
                <>
                  <FaMagic />
                  ✨ Generate Post
                </>
              )}
            </button>
          </div>

          {/* RIGHT SIDE - Preview */}
          <div className="space-y-6 pt-4">
            {/* Generated Content Card */}
            <Card>
              <Header 
                title={
                  <div className="flex items-center gap-2">
                    <FiZap className="text-cyan-500" />
                    <span>Generated Content</span>
                  </div>
                }
                actions={
                  <div className="flex gap-3">
                    <button 
                      onClick={buildPost}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Regenerate"
                    >
                      <FiRefreshCw className={`${isGenerating ? 'animate-spin' : ''}`} />
                    </button>
                    <button 
                      onClick={copyPost}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                      title="Copy to clipboard"
                    >
                      {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
                      {copied && (
                        <div className="absolute -top-8 -right-2 bg-green-500 text-white px-2 py-1 rounded text-xs animate-bounce shadow-sm">
                          Copied!
                        </div>
                      )}
                    </button>
                  </div>
                }
              />
              <div 
                ref={contentRef}
                className="p-6 h-80 overflow-y-auto whitespace-pre-line bg-gray-50 rounded-b-2xl scrollbar-hide"
              >
                {generatedPost ? (
                  <div className="space-y-4">
                    {/* Show uploaded media previews */}
                    {uploadedMedia.length > 0 && (
                      <div className="mb-4 pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-2 mb-3">
                          {uploadedMedia.some(m => m.type.startsWith('image')) && (
                            <FiImage className="text-blue-500" />
                          )}
                          {uploadedMedia.some(m => m.type.startsWith('video')) && (
                            <FiVideo className="text-red-500" />
                          )}
                          <span className="font-medium text-gray-700">
                            Media Preview ({uploadedMedia.length})
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {uploadedMedia.map((media, index) => (
                            <div key={index} className="relative rounded-lg overflow-hidden border border-gray-200 bg-white">
                              {media.type.startsWith('image') ? (
                                <>
                                  <img
                                    src={media.url}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-32 object-cover"
                                  />
                                  <div className="p-2 bg-white border-t">
                                    <p className="text-xs text-gray-600 truncate">{media.name}</p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="relative h-32 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-black/30"></div>
                                    <FiPlay className="text-white text-4xl relative z-10" />
                                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                      Video
                                    </div>
                                  </div>
                                  <div className="p-2 bg-white border-t">
                                    <p className="text-xs text-gray-600 truncate">{media.name}</p>
                                  </div>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Generated text content */}
                    <div className="text-gray-800 leading-relaxed font-sans whitespace-pre-line">
                      {generatedPost}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <div className="text-5xl mb-4">📝</div>
                    <p className="text-lg font-medium text-gray-500">Your generated post will appear here</p>
                    <p className="text-sm mt-2 text-gray-400">
                      Fill in the fields to generate your post
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Post Action Buttons */}
            {generatedPost && (
              <div className="flex gap-4">
                <GradientBtn 
                  green 
                  onClick={() => setPopupOpen("post")}
                  disabled={posting}
                  icon={<FaRocket />}
                >
                  {posting ? "Posting..." : "Post Now"}
                </GradientBtn>
                <GradientBtn 
                  blue 
                  onClick={() => setPopupOpen("schedule")}
                  disabled={scheduling}
                  icon={<FiCalendar />}
                >
                  {scheduling ? "Scheduling..." : "Schedule"}
                </GradientBtn>
              </div>
            )}

            {/* Improvements Section */}
            {generatedPost && (
              <Card>
                <div className="p-6">
                  <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
                    <FiZap className="text-amber-500" />
                    Add Improvements
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Chip onClick={() => applyImprovement("personal")}>More personal</Chip>
                    <Chip onClick={() => applyImprovement("bold")}>More bold</Chip>
                    <Chip onClick={() => applyImprovement("shorten")}>Shorten</Chip>
                    <Chip onClick={() => applyImprovement("story")}>Add story</Chip>
                    <Chip onClick={() => applyImprovement("stats")}>Add stats</Chip>
                    <Chip onClick={() => applyImprovement("emojis")}>More emojis</Chip>
                  </div>

                  <h3 className="font-semibold mb-3 text-lg flex items-center gap-2">
                    <FiTarget className="text-green-500" />
                    Add Call-to-Action
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    <CTA onClick={() => addCTA("question")}>Add question</CTA>
                    <CTA onClick={() => addCTA("soft")}>Add soft CTA</CTA>
                    <CTA onClick={() => addCTA("strong")}>Add strong CTA</CTA>
                  </div>

                  {/* Optimization Insights */}
                  <div className="border-t pt-6">
                    <button
                      onClick={() => setShowOptimization(!showOptimization)}
                      className="w-full flex items-center justify-between text-left mb-4"
                    >
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <FiBarChart2 className="text-purple-500" />
                        Optimization Insights
                      </h3>
                      {showOptimization ? (
                        <FiChevronUp className="text-gray-400" />
                      ) : (
                        <FiChevronDown className="text-gray-400" />
                      )}
                    </button>
                    
                    {showOptimization && (
                      <div className="space-y-6 animate-slideDown">
                        <div className="grid grid-cols-2 gap-4">
                          <Score green title="Readability" value="92/100" />
                          <Score blue title="Engagement" value="87/100" />
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                            <FaHashtag className="text-blue-500" />
                            Suggested Hashtags
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {hashtags.map(tag => (
                              <Chip key={tag} onClick={() => addHashtag(tag)}>
                                {tag}
                              </Chip>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* POPUP MODALS */}
      {popupOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md space-y-6 shadow-2xl animate-scaleIn">
            {popupOpen === "post" && (
              <>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaRocket className="text-2xl text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Post Now</h2>
                  <p className="text-gray-600 mt-2">
                    Your post will be published immediately on {platform}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Platform:</span>
                    <span className="flex items-center gap-2 font-medium">
                      {platforms.find(p => p.name === platform)?.icon}
                      {platform}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Post Type:</span>
                    <span className="capitalize font-medium">{postType}</span>
                  </div>
                  {linkedPlatforms[platform] && (
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-gray-700">Link Status:</span>
                      <span className="font-medium text-blue-600">
                        <FaCheck className="inline mr-1 text-green-500" /> Linked
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handlePostNow}
                  disabled={posting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold hover:from-green-500 hover:to-green-700 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {posting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Posting...
                    </div>
                  ) : (
                    "Confirm Post"
                  )}
                </button>

                <button
                  onClick={() => setPopupOpen(null)}
                  className="w-full py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Cancel
                </button>
              </>
            )}

            {popupOpen === "schedule" && (
              <>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiCalendar className="text-2xl text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Schedule Post</h2>
                  <p className="text-gray-600 mt-2">Pick a time to schedule your post</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Time
                    </label>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSchedule}
                  disabled={scheduling}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold hover:from-cyan-500 hover:to-blue-600 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {scheduling ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Scheduling...
                    </div>
                  ) : (
                    "Schedule Post"
                  )}
                </button>

                <button
                  onClick={() => setPopupOpen(null)}
                  className="w-full py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* UI Components */
const Section = ({ title, icon, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg">
        <div className="text-cyan-600">{icon}</div>
      </div>
      <h2 className="font-semibold text-gray-800">{title}</h2>
    </div>
    {children}
  </div>
);

const Card = ({ children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    {children}
  </div>
);

const Header = ({ title, actions }) => (
  <div className="flex justify-between items-center px-6 py-4 border-b">
    <h2 className="font-semibold text-lg text-gray-800">{title}</h2>
    <div className="flex gap-2">{actions}</div>
  </div>
);

const CardSelect = ({ active, children, className = "", ...props }) => (
  <button
    {...props}
    className={`border-2 rounded-xl p-4 text-center transition-all w-full ${className} ${
      active
        ? "border-cyan-400 bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 shadow-sm"
        : "border-gray-200 hover:border-gray-300"
    }`}
  >
    {children}
  </button>
);

const Chip = ({ children, ...props }) => (
  <button
    {...props}
    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors"
  >
    {children}
  </button>
);

const CTA = ({ children, ...props }) => (
  <button
    {...props}
    className="px-4 py-2 border border-cyan-400 text-cyan-600 hover:bg-cyan-50 rounded-full text-sm font-medium transition-colors"
  >
    {children}
  </button>
);

const GradientBtn = ({ green, blue, children, disabled, icon, ...props }) => (
  <button
    {...props}
    disabled={disabled}
    className={`flex-1 py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-3 transition-all ${
      disabled
        ? "opacity-70 cursor-not-allowed"
        : "hover:shadow-lg transform hover:-translate-y-0.5"
    } ${
      green
        ? "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700"
        : "bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600"
    }`}
  >
    {icon}
    {children}
  </button>
);

const Score = ({ title, value, green, blue }) => (
  <div
    className={`rounded-xl p-4 border ${
      green
        ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800"
        : "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 text-blue-800"
    }`}
  >
    <p className="font-semibold text-sm mb-2">{title}</p>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

// Add custom styles
const style = document.createElement('style');
style.textContent = `
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-scaleIn {
    animation: scaleIn 0.2s ease-out;
  }
  
  .animate-slideDown {
    animation: slideDown 0.3s ease-out;
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(style);