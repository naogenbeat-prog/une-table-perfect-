import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronRight, Star, Quote, Mail, ChevronLeft, Calendar, Clock, CheckCircle2, Trophy, ExternalLink, Check } from "lucide-react";
import { motion, AnimatePresence, useAnimation, useDragControls } from "framer-motion";

// --- 設定エリア ---
const CONFIG = {
  brandName: "UNE TABLE",
  tagline: "華やかな装いを あなただけの空間へ ",
  heroImage:  "/cocktail-1-8-1.png",
  heroSlides: ["/cocktail-1-8-1.png", "/cocktail-15.png", "/cocktail-3.png"],
  logoImage: "/logo.png",
  instagramUrl: "https://www.instagram.com/unetable_caterring",
  contactEmail: "naogenbeat@gmail.com",
  hallUrl: "https://www.smartkaigisitsu.net/properties/view/259",
  hallSlides: [
    "https://www.town7.net/hall/img/rote-pc-01.jpg", 
    "https://www.town7.net/hall/img/rote-pc-02.jpg", 
    "https://www.town7.net/hall/img/rote-pc-03.jpg", 
    "https://www.town7.net/hall/img/rote-pc-04.jpg"
  ]
};

const images = {
  concept1: "/cocktail-33.png",
  conceptSlide: ["/cocktail-27.jpg", "/cocktail-1.png", "/sozai-3.jpeg", "/sozai-1.png", "/sozai-54.jpeg", "/sozai-4.jpeg", "/cocktail-30.png", "/cocktail-1-5.jpg"],
  serviceWedding: "/cocktail-40.png",
  serviceCorporate: "/cocktail-33.png",
  servicePrivate: "/private-4.jpg",
  galleryTable:[
    { url: "/cocktail-37.png", text: "75名様 / Banquet style / free-flow drinks / ￥6500" },
    { url: "/business-12.jpg", text: "55名様 / Banquet style / free-flow drinks / ￥8000" },
    { url: "/sozai-12.jpeg", text: "55名様 / Banquet style / free-flow drinks / ￥8000" },
    { url: "/cocktail-42.png", text: "125名様 / Cocktail party / ￥4000" },
    { url: "/business-16.png", text: "65名様 / Cocktail party / free-flow drinks / ￥7000" },
    { url: "/sozai-37.png", text: "110名様 / Cocktail party / free-flow drinks / ￥5000" },
    { url: "/cocktail-1-2.png", text: "95名様 / Cocktail party / free-flow drinks / ￥5500" },
    { url: "/business-1.jpeg", text: "135名様 / Banquet style / free-flow drinks / ￥8000" },
    { url: "/cocktail-23.jpg", text: "120名様 / Banquet style / free-flow drinks / ￥7000" },
    { url: "/cocktail-7.png", text: "75名様 / Banquet style / free-flow drinks / ￥6500" },
    { url: "/cocktail-1-9.png", text: "50名様 / Banquet style / free-flow drinks / ￥6500" },
    { url: "/cocktail-2.png", text: "45名様 / Cocktail party / free-flow drinks / ￥5500" },
    { url: "/cocktail-31.jpg", text: "125名様 / Cocktail party / ￥4000" },
    { url: "/cocktail-1-10.jpg", text: "65名様 / Cocktail party / free-flow drinks / ￥7000" },
    { url: "/cocktail-3.png", text: "125名様 / Cocktail party / ￥4000" }
  ],
  galleryDish:[
    { url: "/sozai-19.jpeg", text: "" }, { url: "/sozai-16.jpg", text: "" }, { url: "/sozai-13.jpeg", text: "" },
    { url: "/sozai-23.jpeg", text: "" }, { url: "/sozai-30.jpeg", text: "" }, { url: "/sozai-29.png", text: "" },
    { url: "/sozai-25.jpeg", text: "" }, { url: "/sozai-15-2.jpeg", text: "" }, { url: "/business-9.jpeg", text: "" },
    { url: "/cocktail-11.jpg", text: "" }, { url: "/cocktail-12.png", text: "" }, { url: "/cocktail-13.jpeg", text: "" },
    { url: "/sozai-35.jpg", text: "" }, { url: "/sozai-26.jpg", text: "" }, { url: "/sozai-12.png", text: "" }
  ]
};

const galleryData = {
  cocktail: { 
    title: "Cocktail party", 
    desc: "カジュアルな会合を盛り上げる 彩り豊かな演出。フィンガーフードで会話も弾む特別な空間を演出します。", 
    photos: [
      { url: "/cocktail-2.png", text: "45名様 / Cocktail party / free-flow drinks / ￥5500" },
      { url: "/cocktail-3.png", text: "125名様 / Cocktail party / ￥4000" },
      { url: "/business-16.png", text: "65名様 / Cocktail party / free-flow drinks / ￥7000" },
      { url: "/cocktail-14.jpg", text: "125名様 / Cocktail party / ￥4000" },
      { url: "/business-14.jpg", text: "40名様 / Cocktail party / free-flow drinks / ￥4500" },
      { url: "/business-13.png", text: "60名様 / Cocktail party / free-flow drinks / ￥6500" }
    ] 
  },
  standing: { 
    title: "Banquet Style", 
    desc: "ビジネスシーンに適した効率的ディスプレイ。ブランドイメージを高める洗練された立食スタイルを提供します。", 
    photos: [
      { url: "/cocktail-23.jpg", text: "120名様 / Banquet style / free-flow drinks / ￥7000" },
      { url: "/business-12.jpg", text: "55名様 / Banquet style / free-flow drinks / ￥8000" },
      { url: "/cocktail-1.png", text: "50名様 / Banquet style / free-flow drinks / ￥6500" },
      { url: "/business-28.png", text: "100名様 / Banquet style / free-flow drinks / ￥8500" },
      { url: "/business-21.png", text: "50名様 / Banquet style / free-flow drinks / ￥6500" },
      { url: "/business-1.jpeg", text: "135名様 / Banquet style / free-flow drinks / ￥8000" }
    ] 
  },
  private: { 
    title: "Private Dining", 
    desc: "オーダーメイドのレストラン。すべてにこだわった特別な空間で、最高のお料理をお楽しみください。", 
    photos: [
      { url: "/private-4.jpg", text: "12名様 / Private dining / free-flow drinks / ￥15000" },
      { url: "/private-19.png", text: "5名様 / Private dining / special drinks / secret" },
      { url: "/private-3.jpg", text: "12名様 / Private dining / free-flow drinks / ￥10000" },
      { url: "/sozai-17.png", text: "10名様 / Private dining / free-flow drinks / ￥12000" },
      { url: "/sozai-22.png", text: "16名様 / Private dining / free-flow drinks / ￥10000" },
      { url: "/private-2.jpg", text: "6名様 / Private dining / special drinks / secret" }
    ] 
  }
};

const budgetMap = {
  4000: { name: "立食スタイル", img: "/cocktail-3.png", desc: "カジュアルに楽しむフィンガーフード主体のプラン。" },
  5500: { name: "立食スタイル", img: "/sozai-37.png", desc: "彩りとボリュームをプラスしたスタンダードな立食プラン。" },
  7000: { name: "立食・着席スタイル", img: "/cocktail-7.png", desc: "おもてなしと満足感を両立させたスペシャリティ。" },
  8500: { name: "立食・着席スタイル", img: "/sozai-8.png", desc: "高級食材をふんだんに用いたハイグレードなビュッフェ。" },
  10000: { name: "着席スタイル", img: "/private-4.jpg", desc: "特別なゲストのための完全オーダーメイド・フルコース。" },
  11500: { name: "着席スタイル", img: "/sozai-17.png", desc: "至高のサービスで綴る、最高峰の食体験。" },
};

const drinkLabels = ["Standard", "Casual", "Premium", "Luxury", "Executive"];
const foodLabels = ["Normal", "Standard", "Special", "Premium", "Private"];

const formOptions = [
  { key: 'standing', label: '立食スタイル' },
  { key: 'seated', label: '着席スタイル' },
  { key: 'staff', label: 'サービススタッフ' },
  { key: 'cloth', label: 'テーブルクロス' }
];

const serviceList = [
  { id: "cocktail", title: "Cocktail Party", img: images.serviceWedding, desc: "カジュアルな会合を盛り上げる", highlight: "彩り豊かな演出", caption: "125名様 / Cocktail party / ￥4000" },
  { id: "standing", title: "Banquet Style", img: images.serviceCorporate, desc: "大切なビジネスシーンに適した", highlight: "洗練されたディスプレイ", caption: "75名様 / Banquet style / free-flow drinks / ￥6500" },
  { id: "private", title: "Private Dining", img: images.servicePrivate, desc: "オーダーメイドのレストラン", highlight: "贅沢で特別な空間", caption: "12名様 / Private dining / free-flow drinks / ￥15000" }
];

const Instagram = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Navbar = ({ isScrolled }) => (
  <nav className={`fixed w-full z-50 transition-all duration-1000 ${isScrolled ? "bg-black/90 py-2 border-b border-white/5 shadow-2xl" : "bg-transparent py-8"}`}>
    <div className="max-w-7xl mx-auto px-2 md:px-12 flex justify-center items-center text-white text-[11px] uppercase font-light space-x-4 md:space-x-10">
      <a href="#concept">Concept</a><a href="#services">Services</a><a href="#simulation" className="font-bold">Simulation</a><a href="#gallery">Gallery</a>
      <a href="#contact" className="text-amber-500 font-bold border border-amber-500/30 px-2 md:px-5 py-0.5">Reservation</a>
    </div>
  </nav>
);

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日(${days[d.getDay()]})`;
};

const App = () => {
  const[isScrolled, setIsScrolled] = useState(false);
  const[currentView, setCurrentView] = useState("home");
  const[status, setStatus] = useState("idle");
  const[formData, setFormData] = useState({ name: "", email: "", message: "", date: "", startTime: "", endTime: "", options: { standing: false, seated: false, room: false, staff: false, cloth: false } });
  const [slideIndex, setSlideIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [serviceSlideIndex, setServiceSlideIndex] = useState(0); 
  const [galleryTableIndex, setGalleryTableIndex] = useState(0); 
  const [galleryDishIndex, setGalleryDishIndex] = useState(0); 
  const [showAllTable, setShowAllTable] = useState(false);
  const [showAllDish, setShowAllDish] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [guestCount, setGuestCount] = useState(20);
  const [budget, setBudget] = useState(4000);
  const [bevLevel, setBevLevel] = useState(0);
  const [ingLevel, setIngLevel] = useState(0);
  const [showSimInReservation, setShowSimInReservation] = useState(false);
  const [showHallPopup, setShowHallPopup] = useState(false);
  const [hallSlideIndex, setHallSlideIndex] = useState(0); 
  const conceptRef = useRef(null);
  const [isConceptInView, setIsConceptInView] = useState(false);
  const dragControls = useDragControls();
  const controls = useAnimation();

  const guestPoints = Math.floor((guestCount - 20) / 10);
  const budgetPoints = (budget - 4000) / 1500;
  const totalAvailablePoints = guestPoints + budgetPoints;
  const remainingPoints = totalAvailablePoints - (bevLevel + ingLevel);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let currentBev = bevLevel;
    let currentIng = ingLevel;
    while (currentBev + currentIng > totalAvailablePoints) {
      if (currentIng > 0) currentIng -= 1;
      else if (currentBev > 0) currentBev -= 1;
      else break;
    }
    if (currentBev !== bevLevel) setBevLevel(currentBev);
    if (currentIng !== ingLevel) setIngLevel(currentIng);
  }, [totalAvailablePoints, bevLevel, ingLevel]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handlePopState = () => {
      if (showHallPopup) {
        document.body.classList.remove('modal-open');
        setShowHallPopup(false);
      } else {
        setCurrentView("home");
      }
    };
    window.addEventListener("popstate", handlePopState);
    const heroTimer = setInterval(() => { setHeroIndex((p) => (p + 1) % 3); }, 5000);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsConceptInView(true); }, { threshold: 0.2 });
    if (conceptRef.current) observer.observe(conceptRef.current);
    return () => { 
      window.removeEventListener("popstate", handlePopState); 
      window.removeEventListener("scroll", handleScroll); 
      clearInterval(heroTimer); 
      if (conceptRef.current) observer.disconnect(); 
    };
  }, [showHallPopup]);

  useEffect(() => {
    let slideTimer;
    if (isConceptInView && currentView === "home") {
        setSlideIndex(0);
        slideTimer = setInterval(() => { setSlideIndex((p) => (p + 1) % 8); }, 4000);
    }
    return () => clearInterval(slideTimer);
  }, [isConceptInView, currentView]);

  useEffect(() => {
    let serviceTimer, gTableTimer, gDishTimer;
    if (currentView === "home" && isMobile) {
      serviceTimer = setInterval(() => { setServiceSlideIndex((p) => (p + 1) % serviceList.length); }, 4000);
      if (!showAllTable) gTableTimer = setInterval(() => { setGalleryTableIndex((p) => (p + 1) % images.galleryTable.length); }, 3000);
      if (!showAllDish) gDishTimer = setInterval(() => { setGalleryDishIndex((p) => (p + 1) % images.galleryDish.length); }, 3000);
    }
    return () => { clearInterval(serviceTimer); clearInterval(gTableTimer); clearInterval(gDishTimer); };
  }, [currentView, isMobile, showAllTable, showAllDish]);

  useEffect(() => {
    let hallTimer;
    if (showHallPopup) hallTimer = setInterval(() => { setHallSlideIndex((p) => (p + 1) % CONFIG.hallSlides.length); }, 5000);
    return () => clearInterval(hallTimer);
  }, [showHallPopup]);

  const handleServiceDragEnd = (e, { offset }) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) setServiceSlideIndex((prev) => (prev + 1) % serviceList.length);
    else if (offset.x > swipeThreshold) setServiceSlideIndex((prev) => (prev - 1 + serviceList.length) % serviceList.length);
  };

  const currentStep = Math.floor(slideIndex / 2);
  const handleViewChange = (v) => { if (v !== "home") window.history.pushState({}, "", ""); setCurrentView(v); };
  const handlePlanSelect = () => {
    setShowSimInReservation(true);
    setTimeout(() => { document.getElementById("contact")?.scrollIntoView({ behavior: 'smooth' }); }, 100);
  };
  const openHallPopup = () => { window.history.pushState({ popup: "hall" }, "", ""); document.body.classList.add('modal-open'); setShowHallPopup(true); controls.start({ y: 0, opacity: 1 }); };
  const closeHallPopup = () => { document.body.classList.remove('modal-open'); setShowHallPopup(false); };
  const handleDragEnd = (event, info) => { if (info.offset.y > 100) { closeHallPopup(); window.history.back(); } else { controls.start({ y: 0 }); } };
  const simResult = budgetMap[budget] || budgetMap[4000];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    const activeOptions = [...formOptions, { key: 'room', label: 'ホール利用' }].filter(opt => formData.options[opt.key]).map(opt => `[${opt.label}]`).join('');
    const fullMsg = `予約希望日: ${formData.date || "未選択"}\n希望時間: ${formData.startTime} 〜 ${formData.endTime}\nオプション: ${activeOptions}\n${showSimInReservation ? `シミュレーション: ${guestCount}名/¥${budget}/Bev:${drinkLabels[bevLevel]}/Ing:${foodLabels[ingLevel]}` : ""}\n\nメッセージ:\n${formData.message}`;
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_key: "7322504e-6b63-4750-9446-9b2d96325934", name: formData.name, email: formData.email, message: fullMsg }),
      });
      setStatus("success");
    } catch (error) { setStatus("error"); }
  };

  const displays = {
    table: showAllTable ? images.galleryTable : (typeof window !== 'undefined' && window.innerWidth < 768 ? [images.galleryTable[14]] : [images.galleryTable[4], images.galleryTable[5], images.galleryTable[14]]),
    dish: showAllDish ? images.galleryDish : (typeof window !== 'undefined' && window.innerWidth < 768 ? [images.galleryDish[14]] : [images.galleryDish[4], images.galleryDish[5], images.galleryDish[14]])
  };

  if (currentView !== "home") {
    const data = galleryData[currentView];
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-stone-300 pt-16 md:pt-28 pb-24 px-6 animate-[fadeIn_0.5s_ease-out]">
        <div className="max-w-7xl mx-auto text-center">
          <button onClick={() => window.history.back()} className="text-amber-500 mb-8 md:mb-12 flex items-center gap-2 uppercase text-[10px] md:text-xs tracking-widest"><ChevronLeft size={16} className="mr-2" /> Back</button>
          <h2 className="font-brand text-3xl md:text-4xl text-amber-500 mb-6 italic tracking-widest font-elegant">{data?.title}</h2>
          <p className="text-stone-400 max-w-2xl mx-auto leading-loose mb-12 md:mb-16 text-base md:text-xl font-elegant italic">{data?.desc}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {data?.photos.map((item, i) => (
              <div key={i} className="relative shadow-2xl group overflow-hidden">
                <img src={item.url} className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-1000" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-3 right-4 text-right pointer-events-none">
                  <span className="text-white text-[10px] md:text-[11px] font-elegant tracking-widest drop-shadow-md">{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-300 font-serif selection:bg-amber-900 selection:text-white overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=EB+Garamond:ital,wght@0,400;1,400&family=Noto+Serif+JP:wght@200;300;500&display=swap');
        .font-elegant { font-family: 'Cormorant Garamond', serif; }
        html { scroll-behavior: smooth; }
        input[type=range] { -webkit-appearance: none; background: #2a2a2a; height: 1px; width: 100%; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; background: #d4af37; height: 18px; width: 18px; border-radius: 50%; cursor: pointer; border: 1px solid #fff; box-shadow: 0 0 10px rgba(0,0,0,0.5); }
        body.modal-open { overflow: hidden; touch-action: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.3); border-radius: 10px; }
      `}} />
      <Navbar isScrolled={isScrolled} />
      
      {/* ... (残りのセクション構成は維持) ... */}
      <section className="relative h-screen overflow-hidden flex flex-col justify-center items-center text-center px-4 mb-20 md:mb-0">
         <div className="absolute inset-0 z-0"><AnimatePresence><motion.div key={heroIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2.5 }} className="absolute inset-0"><img src={CONFIG.heroSlides[heroIndex]} className="w-full h-full object-cover" alt="" /><div className="absolute inset-0 bg-black/40" /></motion.div></AnimatePresence></div>
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 text-white"><h2 className="tracking-[0.4em] mb-24 uppercase">UNE TABLE</h2><h1 className="font-serif text-[42px] md:text-[70px] italic">華やかな装いを<br/>あなただけの空間へ。</h1></motion.div>
      </section>

      {/* Services, Simulation, Gallery, Contact 等のコンポーネント展開は省略しますが、内容は維持 */}
      
      {/* 予約フォームのTime Select部分のみ反映 */}
      {/* (Time Select) */}
      <div className="flex items-center justify-center md:justify-end border-b border-zinc-800 py-1 transition-colors w-full">
        <div className="flex items-center justify-center gap-1 md:gap-4">
          <select onChange={(e)=>setFormData({...formData, startTime:e.target.value})} required className="bg-transparent text-white outline-none font-elegant text-base text-center w-20">
            <option value="" className="bg-zinc-900">Start</option>
            {Array.from({ length: 25 }, (_, i) => { const h = Math.floor(i / 2) + 10; const m = i % 2 === 0 ? "00" : "30"; const t = `${h}:${m}`; return h <= 21 ? <option key={t} value={t} className="bg-zinc-900">{t}</option> : null; })}
          </select>
          <span className="text-stone-600">-</span>
          <select onChange={(e)=>setFormData({...formData, endTime:e.target.value})} required className="bg-transparent text-white outline-none font-elegant text-base text-center w-20">
            <option value="" className="bg-zinc-900">End</option>
            {Array.from({ length: 25 }, (_, i) => { const h = Math.floor(i / 2) + 10; const m = i % 2 === 0 ? "00" : "30"; const t = `${h}:${m}`; return h <= 22 ? <option key={t} value={t} className="bg-zinc-900">{t}</option> : null; })}
          </select>
        </div>
      </div>

      {/* ... (以下フッターおよびホールモーダルまで維持) ... */}
    </div>
  );
};

export default App;