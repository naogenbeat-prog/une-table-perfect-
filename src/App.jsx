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
  
  // Gallery (テーブルの記録)
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
  
  // Gallery (一皿の記録) - ※テキスト未指定のため空文字にしておきます（必要に応じて追加可能）
  galleryDish:[
    { url: "/sozai-19.jpeg", text: "" },
    { url: "/sozai-16.jpg", text: "" },
    { url: "/sozai-13.jpeg", text: "" },
    { url: "/sozai-23.jpeg", text: "" },
    { url: "/sozai-30.jpeg", text: "" },
    { url: "/sozai-29.png", text: "" },
    { url: "/sozai-25.jpeg", text: "" },
    { url: "/sozai-15-2.jpeg", text: "" },
    { url: "/business-9.jpeg", text: "" },
    { url: "/cocktail-11.jpg", text: "" },
    { url: "/cocktail-12.png", text: "" },
    { url: "/cocktail-13.jpeg", text: "" },
    { url: "/sozai-35.jpg", text: "" },
    { url: "/sozai-26.jpg", text: "" },
    { url: "/sozai-12.png", text: "" }
  ]
};

// サービス詳細画面の画像リストとキャプション
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
      { url: "/private-2.jpg", text: "6名様 / Banquet style / free-flow drinks / secret" }
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

const Navbar = ({ isScrolled, currentView, onViewChange }) => {
  return (
    <nav className={`fixed w-full z-50 transition-all duration-1000 ${isScrolled ? "bg-black/90 py-2 border-b border-white/5 shadow-2xl" : "bg-transparent py-8"}`}>
      <div className="max-w-7xl mx-auto px-2 md:px-12 flex justify-center items-center text-white text-[11px] md:text-[11px] uppercase font-light space-x-4 md:space-x-10">
        <a href="#concept">Concept</a><a href="#services">Services</a><a href="#simulation" className="font-bold">Simulation</a><a href="#gallery">Gallery</a>
        <a href="#contact" className="text-amber-500 font-bold border border-amber-500/30 px-2 md:px-5 py-0.5 whitespace-nowrap">Reservation</a>
      </div>
    </nav>
  );
};

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
  const[formData, setFormData] = useState({ 
    name: "", email: "", message: "", date: "", startTime: "", endTime: "", 
    options: { standing: false, seated: false, room: false, staff: false, cloth: false } 
  });
  
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
    const handlePopState = (e) => {
      if (showHallPopup) {
        document.body.classList.remove('modal-open');
        setShowHallPopup(false);
        window.history.pushState({}, "", ""); 
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
  }, [currentView, showHallPopup]);

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
      
      if (!showAllTable) {
        gTableTimer = setInterval(() => { setGalleryTableIndex((p) => (p + 1) % images.galleryTable.length); }, 3000);
      }
      if (!showAllDish) {
        gDishTimer = setInterval(() => { setGalleryDishIndex((p) => (p + 1) % images.galleryDish.length); }, 3000);
      }
    }
    return () => {
      clearInterval(serviceTimer);
      clearInterval(gTableTimer);
      clearInterval(gDishTimer);
    };
  }, [currentView, isMobile, showAllTable, showAllDish]);

  useEffect(() => {
    let hallTimer;
    if (showHallPopup) {
      hallTimer = setInterval(() => { setHallSlideIndex((p) => (p + 1) % CONFIG.hallSlides.length); }, 5000);
    }
    return () => clearInterval(hallTimer);
  }, [showHallPopup]);

  const handleServiceDragEnd = (e, { offset }) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) {
      setServiceSlideIndex((prev) => (prev + 1) % serviceList.length);
    } else if (offset.x > swipeThreshold) {
      setServiceSlideIndex((prev) => (prev - 1 + serviceList.length) % serviceList.length);
    }
  };

  const currentStep = Math.floor(slideIndex / 2);
  const handleViewChange = (v) => { if (v !== "home") window.history.pushState({}, "", ""); setCurrentView(v); };
  const handlePlanSelect = () => {
    setShowSimInReservation(true);
    setTimeout(() => { document.getElementById("contact")?.scrollIntoView({ behavior: 'smooth' }); }, 100);
  };
  
  const openHallPopup = () => {
    window.history.pushState({ popup: "hall" }, "", "");
    document.body.classList.add('modal-open');
    setShowHallPopup(true);
    controls.start({ y: 0, opacity: 1 });
  };

  const closeHallPopup = () => {
    document.body.classList.remove('modal-open');
    setShowHallPopup(false);
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.y > 100) {
      closeHallPopup();
      window.history.back();
    } else {
      controls.start({ y: 0 });
    }
  };

  const simResult = budgetMap[budget] || budgetMap[4000];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    
    const activeOptions = [
      ...formOptions,
      { key: 'room', label: 'ホール利用' }
    ].filter(opt => formData.options[opt.key]).map(opt => `[${opt.label}]`).join('');
    
    const optText = `オプション: ${activeOptions || 'なし'}`;
    const simText = showSimInReservation ? `【シミュレーション内容】\n人数: ${guestCount}名 / 単価: ¥${budget.toLocaleString()} / 飲料: ${drinkLabels[bevLevel]} / 食材: ${foodLabels[ingLevel]}` : "直接入力・未反映";
    const timeText = formData.startTime && formData.endTime ? `${formData.startTime} 〜 ${formData.endTime}` : "未選択";
    
    const fullMsg = `予約希望日: ${formData.date || "未選択"}\n希望時間: ${timeText}\n${optText}\n\n${simText}\n\nメッセージ:\n${formData.message}`;
    
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
    table: showAllTable ? images.galleryTable : (
        typeof window !== 'undefined' && window.innerWidth < 768 
        ? [images.galleryTable[14]] 
        : [images.galleryTable[4], images.galleryTable[5], images.galleryTable[14]]
    ),
    dish: showAllDish ? images.galleryDish : (
        typeof window !== 'undefined' && window.innerWidth < 768
        ? [images.galleryDish[14]] 
        : [images.galleryDish[4], images.galleryDish[5], images.galleryDish[14]]
    )
  };

  // --- サービス詳細ページ (Cocktail / Banquet / Private) ---
  if (currentView !== "home") {
    const data = galleryData[currentView];
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-stone-300 pt-16 md:pt-28 pb-24 px-6 animate-[fadeIn_0.5s_ease-out]">
        <div className="max-w-7xl mx-auto text-center">
          <button onClick={() => window.history.back()} className="text-amber-500 mb-8 md:mb-12 flex items-center gap-2 uppercase text-[10px] md:text-xs tracking-widest"><ChevronLeft size={16} className="mr-2" /> Back</button>
          <h2 className="font-brand text-3xl md:text-4xl text-amber-500 mb-6 italic tracking-widest font-elegant">{data?.title}</h2>
          <p className="text-stone-400 max-w-2xl mx-auto leading-loose mb-12 md:mb-16 text-base md:text-xl font-elegant italic">{data?.desc}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {data?.photos.map((item, i) => {
              const imgUrl = typeof item === 'string' ? item : item.url;
              const caption = typeof item === 'string' ? "" : item.text;
              return (
                <div key={i} className="relative shadow-2xl group overflow-hidden">
                  <img loading="lazy" decoding="async" src={imgUrl} className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-1000" alt="" />
                  {caption && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-3 right-4 text-right pointer-events-none">
                        <span className="text-white text-[10px] md:text-[11px] font-elegant tracking-widest drop-shadow-md">{caption}</span>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // --- メイン（トップ）ページ ---
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-300 font-serif selection:bg-amber-900 selection:text-white overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=EB+Garamond:ital,wght@0,400;1,400&family=Noto+Serif+JP:wght@200;300;500&display=swap');
        .font-elegant { font-family: 'Cormorant Garamond', serif; }
        html { scroll-behavior: smooth; }
        input[type=range] { -webkit-appearance: none; background: #2a2a2a; height: 1px; width: 100%; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; background: #d4af37; height: 18px; width: 18px; border-radius: 50%; cursor: pointer; border: 1px solid #fff; box-shadow: 0 0 10px rgba(0,0,0,0.5); }
        
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 1000px #000000 inset !important;
            -webkit-text-fill-color: #ffffff !important;
            transition: background-color 5000s ease-in-out 0s !important;
        }
        
        textarea::placeholder { color: rgba(255, 255, 255, 0.7); }
        body.modal-open { overflow: hidden; touch-action: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(212, 175, 55, 0.6); }
      `}} />
      
      <Navbar isScrolled={isScrolled} currentView={currentView} onViewChange={handleViewChange} />
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden flex flex-col justify-center items-center text-center px-4 mb-20 md:mb-0">
        <div className="absolute inset-0 z-0">
          <AnimatePresence>
            <motion.div 
              key={heroIndex} 
              initial={{ opacity: 0, scale: 1.3, filter: "brightness(1.1) blur(6px)" }} 
              animate={{ opacity: 1, scale: 1.05, filter: (isMobile && heroIndex === 0) ? "brightness(0.65) blur(0px)" : "brightness(0.45) blur(0px)" }} 
              exit={{ opacity: 0 }} 
              transition={{ scale: { duration: 8, ease: "linear" }, opacity: { duration: 2.5 }, filter: { duration: 2.5 } }} 
              className="absolute inset-0"
            >
              <img src={CONFIG.heroSlides[heroIndex]} fetchpriority={heroIndex === 0 ? "high" : "auto"} decoding="async" className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-black/20 md:bg-black/40 backdrop-blur-[1px] md:backdrop-blur-[2px]" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 md:from-black/20 to-[#0a0a0a]"></div>
        </div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2, delay: 1 }} className="relative z-10 w-full h-full flex flex-col items-center text-white">
          <div className="hidden md:flex w-full h-full flex-col justify-center items-center">
            <h2 className="text-2xl tracking-[0.4em] font-light mb-24 opacity-90 uppercase">UNE TABLE</h2>
            <h1 className="font-serif text-[70px] font-light leading-tight drop-shadow-2xl italic whitespace-nowrap">華やかな装いを<br/>あなただけの空間へ。</h1>
            <p className="mt-20 text-xl font-light text-white/90 leading-relaxed">
              厳選された旬の食材を目にも楽しい彩りを添えて。<br />
              特別な日に最高峰のケータリングをお届け致します。
            </p>
          </div>

          <div className="md:hidden w-full h-full relative">
            <div className="absolute w-full top-[10%] left-0 text-center">
              <h2 className="text-xl tracking-[0.4em] font-light opacity-90 uppercase text-shadow-md">UNE TABLE</h2>
            </div>
            <div className="absolute w-full top-[30%] left-0 text-center px-0">
              <h1 className="font-serif text-[38px] xs:text-[42px] leading-tight font-light drop-shadow-2xl italic tracking-tighter">
                華やかな装いを<br/>あなただけの空間へ。
              </h1>
            </div>
            <div className="absolute w-full bottom-[26%] left-0 text-center px-0">
              <p className="text-[17px] xs:text-[18px] leading-relaxed font-light text-white/90 tracking-[-0.095em] text-shadow-md">
                厳選された旬の食材を目にも楽しい彩りを添えて。<br />
                特別な日に最高峰のケータリングをお届け致します。
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Concept Section */}
      <section id="concept" ref={conceptRef} className="pt-10 pb-16 md:pt-20 md:pb-32 px-4 md:px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:gap-24 items-start">
        
        <div className="md:hidden w-full flex flex-col items-center relative z-10 mt-12 mb-4">
          <div className="relative text-white text-lg leading-relaxed min-h-[90px] w-full">
            <AnimatePresence mode="wait">
              {[
                { text: "私たちは厳選された旬の食材を、確かな技術で目にも美しい一皿へと昇華させます。", align: "text-center", space: "" }, 
                { text: "産地や市場から直接届く「最盛の旬」を逃さず、その魅力を最大限に引き出し、おもてなしの場に彩りを添えます。", align: "text-center", space: "" }, 
                { text: "多種多様な銘柄に精通した有資格者が最適なお飲み物を厳選。酒販店も営む私たちが流通価格にてご提案させていただきます。", align: "text-center", space: "" }, 
                { text: <>大切なひとところに、確かな安心と深い感動を<br/>添えさせていただきます。</>, align: "text-center", space: "" }
              ].map((item, idx) => (
                idx === currentStep && (
                  <motion.p key={idx} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.8 }} className={`absolute inset-x-0 top-0 ${item.align} ${item.space}`}>
                    {item.text}
                  </motion.p>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="w-full md:w-1/2 relative h-[300px] md:h-[500px] overflow-hidden shadow-2xl rounded-sm mt-[-10px] md:mt-0">
          {images.conceptSlide.map((img, i) => (<motion.img key={i} loading="lazy" decoding="async" src={img} initial={{ opacity: 0 }} animate={{ opacity: i === slideIndex ? 1 : 0 }} transition={{ duration: 2 }} className="absolute inset-0 w-full h-full object-cover scale-105" alt="" />))}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col mt-4 md:mt-24">
          <div className="hidden md:block">
            <h2 className="text-2xl md:text-3xl text-amber-500 font-light font-elegant italic tracking-widest leading-none mb-6 md:mb-8 mt-0 text-center">感動の一瞬を 永遠の思い出に</h2>
            <div className="relative text-white text-lg md:text-xl leading-relaxed mt-6 md:mt-10 min-h-[140px] md:min-h-[160px]">
              <AnimatePresence mode="wait">
                {[
                  { text: "私たちは厳選された旬の食材を、確かな技術で目にも美しい一皿へと昇華させます。", align: "text-center", space: "pt-4" }, 
                  { text: "産地や市場から直接届く「最盛の旬」を逃さず、その魅力を最大限に引き出し、おもてなしの場に彩りを添えます。", align: "text-center", space: "pt-4" }, 
                  { text: "多種多様な銘柄に精通した有資格者が、最適なお飲み物を厳選致します。酒販店も営む私たちが、流通価格にてご提案させていただきます。", align: "text-left", space: "" }, 
                  { text: <>大切なひとところに、確かな安心と深い感動を<br/>添えさせていただきます。</>, align: "text-center", space: "pt-4" }
                ].map((item, idx) => (
                  idx === currentStep && (
                    <motion.p key={idx} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.8 }} className={`absolute inset-x-0 top-0 ${item.align} ${item.space}`}>
                      {item.text}
                    </motion.p>
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="md:hidden w-full text-center my-6">
            <h2 className="text-2xl text-amber-500 font-light font-elegant italic tracking-widest leading-none">感動の一瞬を 永遠の思い出に</h2>
          </div>

          <p className="mt-0 md:mt-4 pt-4 md:pt-4 border-t border-white/10 text-white text-[16px] md:text-xl font-elegant italic tracking-tight uppercase opacity-90 leading-relaxed md:leading-snug text-center">
            <span className="block">UNE TABLE（ユヌ・ターブル）は、フランス語で</span>
            <span className="block"><span className="text-amber-500 not-italic">「一つのテーブル」</span><span>を意味します。</span></span>
            <span className="block hidden md:block">大切なビジネスシーンから、かけがえのない瞬間に,</span>
            <span className="block md:hidden">大切なビジネスシーン、かけがえのない瞬間に,</span>
            <span className="block">究極のおもてなしをお約束いたします。</span>
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-16 md:-mt-12 bg-zinc-900 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center">
        
        <div className="hidden md:grid grid-cols-3 gap-12">
          {serviceList.map((s, i) => (
            <div key={i} onClick={() => handleViewChange(s.id)} className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden mb-8 shadow-xl relative">
                <img src={s.img} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-3 right-4 text-right pointer-events-none">
                  <span className="text-white text-[10px] md:text-[11px] font-elegant tracking-widest drop-shadow-md">{s.caption}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-[2px] h-12 bg-amber-500 mt-1"></div>
                <div><h4 className="text-2xl text-white font-light uppercase tracking-widest font-elegant">{s.title}</h4><p className="text-stone-300 text-lg leading-relaxed font-elegant italic">{s.desc}<br /><span className="text-amber-500 font-bold not-italic">{s.highlight}</span></p></div>
              </div>
            </div>
          ))}
        </div>

        {/* スマホ版：スワイプ可能なスライダー */}
        <div className="md:hidden relative min-h-[650px] w-full flex flex-col overflow-hidden px-2">
          <div className="relative flex-grow w-full h-[460px]">
            <AnimatePresence initial={false} custom={serviceSlideIndex}>
              <motion.div 
                key={serviceSlideIndex} 
                custom={serviceSlideIndex}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleServiceDragEnd}
                initial={{ opacity: 0, x: 100 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -100 }} 
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col cursor-grab active:cursor-grabbing w-full h-full"
              >
                {/* 変更: タップ領域を画像全体に拡大 */}
                <div 
                  className="w-full h-[460px] overflow-hidden mb-6 shadow-xl relative"
                  onClick={() => handleViewChange(serviceList[serviceSlideIndex].id)}
                >
                  <img src={serviceList[serviceSlideIndex].img} loading="lazy" decoding="async" className="w-full h-full object-cover pointer-events-none" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                  
                  {/* キャプション */}
                  <div className="absolute bottom-4 right-4 text-right pointer-events-none z-10">
                    <span className="text-white text-[10px] font-elegant tracking-widest drop-shadow-md">{serviceList[serviceSlideIndex].caption}</span>
                  </div>
                  
                  {/* Tap to View ボタン */}
                  <div className="absolute top-4 right-4 bg-black/60 px-5 py-2 rounded-full border border-white/20 pointer-events-none z-10">
                    <span className="text-white text-[14px] uppercase tracking-widest font-elegant flex items-center gap-1">Tap to View <ChevronRight size={16} className="text-amber-500"/></span>
                  </div>
                </div>
                
                <div className="flex gap-4 w-full px-2 pointer-events-none">
                  <div className="w-[3px] h-16 bg-amber-500 mt-1"></div>
                  <div className="text-left w-full">
                    <h4 className="text-3xl text-white font-light uppercase tracking-widest font-elegant">{serviceList[serviceSlideIndex].title}</h4>
                    <p className="text-stone-300 text-lg leading-relaxed font-elegant italic mt-2">{serviceList[serviceSlideIndex].desc}<br /><span className="text-amber-500 font-bold not-italic text-xl block mt-1">{serviceList[serviceSlideIndex].highlight}</span></p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="w-full flex justify-center gap-3 pb-4 shrink-0 z-10 mt-10">
            {serviceList.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-all duration-500 ${i === serviceSlideIndex ? 'bg-amber-500 scale-125' : 'bg-zinc-700'}`}></div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulation Section */}
      <section id="simulation" className="pt-10 pb-12 md:pt-16 md:pb-32 bg-[#080808] px-3 md:px-6 border-y border-white/5 relative">
        <div className="mb-6 md:mb-12 text-center">
          <h2 className="text-3xl md:text-5xl text-white font-light tracking-wide italic font-elegant">Simulation</h2>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-20 items-stretch">
          <div className="space-y-3 md:space-y-6 bg-[#0d0d0d] p-5 md:p-10 border border-white/5 shadow-2xl relative rounded-lg flex flex-col justify-between">
            <div className="space-y-1.5 md:space-y-4">
              <div className="flex justify-between text-sm md:text-base text-stone-300 uppercase tracking-widest font-elegant font-light"><span>Guests</span><span className="text-amber-500 font-bold">{guestCount} 名様 (+{guestPoints}pt)</span></div>
              <input type="range" min="20" max="120" step="1" value={guestCount} onChange={(e) => setGuestCount(Number(e.target.value))} />
            </div>
            <div className="space-y-1.5 md:space-y-4">
              <div className="flex justify-between text-sm md:text-base text-stone-300 uppercase tracking-widest font-elegant font-light"><span>Budget</span><span className="text-amber-500 font-bold">{budget === 11500 ? '∞' : `¥ ${budget.toLocaleString()}`} (+{budgetPoints}pt)</span></div>
              <input type="range" min="4000" max="11500" step="1500" value={budget} onChange={(e) => setBudget(Number(e.target.value))} />
            </div>

            <div className="flex items-center justify-between py-1.5 md:py-3 bg-amber-500/5 px-4 border border-amber-500/20 my-1 md:my-2">
              <div className="flex items-center gap-3 text-amber-500"><span className="text-[10px] md:text-xs uppercase tracking-widest font-bold">Remaining Points</span></div>
              <div className="text-xl md:text-2xl text-white font-elegant">{remainingPoints} <span className="text-[10px] text-stone-500 uppercase">pts</span></div>
            </div>

            <div className="space-y-1.5 md:space-y-4">
              <div className="flex justify-between text-sm md:text-base text-stone-300 uppercase tracking-widest font-elegant font-light"><span>Beverage Selection</span><span className="text-white font-bold">{drinkLabels[bevLevel]}</span></div>
              <input type="range" min="0" max="4" step="1" value={bevLevel} onChange={(e) => { const val = Number(e.target.value); if(val + ingLevel <= totalAvailablePoints) setBevLevel(val); }} />
            </div>
            <div className="space-y-1.5 md:space-y-4">
              <div className="flex justify-between text-sm md:text-base text-stone-300 uppercase tracking-widest font-elegant font-light"><span>Ingredient Grade</span><span className="text-white font-bold">{foodLabels[ingLevel]}</span></div>
              <input type="range" min="0" max="4" step="1" value={ingLevel} onChange={(e) => { const val = Number(e.target.value); if(val + bevLevel <= totalAvailablePoints) setIngLevel(val); }} />
            </div>

            <div className="pt-3 md:pt-6 border-t border-white/5 flex gap-2 md:gap-8 mt-1 items-stretch justify-center">
              <div className="flex flex-col gap-1.5 w-5/12 items-center md:items-start justify-center">
                <div className="flex flex-col gap-1.5 w-[110px] md:w-auto">
                  {formOptions.map(opt => (
                    <label key={opt.key} className="flex items-center gap-2 cursor-pointer group w-fit">
                      <div 
                        onClick={() => setFormData({ ...formData, options: { ...formData.options, [opt.key]: !formData.options[opt.key] } })} 
                        className={`w-3.5 h-3.5 md:w-4 md:h-4 border flex items-center justify-center transition-all shrink-0 ${formData.options[opt.key] ? 'bg-amber-500 border-amber-500' : 'border-stone-700 group-hover:border-stone-500'}`}
                      >
                        {formData.options[opt.key] && <CheckCircle2 size={12} className="text-black" />}
                      </div>
                      <span className="text-[10px] md:text-xs text-stone-400 uppercase tracking-tighter md:tracking-widest font-elegant whitespace-nowrap">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="w-7/12 flex flex-col justify-center pl-0">
                <button 
                  type="button"
                  onClick={openHallPopup}
                  className="w-full h-full min-h-[50px] md:min-h-[60px] flex flex-col items-center justify-center p-2 md:p-4 border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 text-amber-500 transition-all rounded-sm group"
                >
                  <div className="flex items-center gap-1.5">
                    <ExternalLink size={16} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] md:text-xs uppercase tracking-widest font-elegant whitespace-nowrap font-bold">ホール利用</span>
                  </div>
                  <span className="text-[8px] md:text-[9px] text-stone-400 font-elegant tracking-widest mt-1 whitespace-nowrap">会場の空き状況を確認</span>
                </button>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-[#111] border border-white/5 flex flex-col shadow-2xl rounded-lg h-full mt-0 md:mt-0">
            <AnimatePresence mode="wait">
              <motion.div key={simResult.img} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="h-full flex flex-col">
                
                <div className="relative overflow-hidden h-36 md:h-64 lg:h-[360px] shrink-0">
                  <img src={simResult.img} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-70" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent"></div>
                </div>

                <div className="px-4 py-3 md:px-8 md:py-6 flex flex-col flex-grow bg-[#111] justify-center items-center text-center border-t border-white/5">
                  <span className="text-amber-500 text-[8px] md:text-[9px] tracking-[0.4em] uppercase font-elegant mb-1 md:mb-2">Plan Proposal</span>
                  <h3 className="text-2xl md:text-3xl text-white font-elegant italic mb-2 md:mb-4 leading-tight">{simResult.name}</h3>
                  <p className="text-stone-300 text-[12px] md:text-sm leading-relaxed font-elegant italic mb-4">{simResult.desc}</p>
                  
                  <div className="mt-auto w-full max-w-xs pt-2">
                    <button onClick={() => handlePlanSelect()} className="w-full py-3 md:py-4 bg-amber-600 hover:bg-amber-500 text-black font-bold text-[11px] md:text-[12px] tracking-[0.4em] uppercase transition-all shadow-xl leading-none">RESERVATION</button>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="mt-10 pt-16 md:mt-[-64px] md:pt-16 pb-24 md:pb-40 px-4 max-w-screen-2xl mx-auto relative">
        <div className="mb-24 text-center">
          <h2 className="text-3xl md:text-5xl text-white font-light tracking-wide italic mb-10 md:mb-16 font-elegant">「テーブル」の記録</h2>
          
          <div className="hidden md:grid grid-cols-3 gap-6">
            <AnimatePresence>
              {displays.table.map((img) => {
                const imgUrl = typeof img === 'string' ? img : img.url;
                const caption = typeof img === 'string' ? "" : img.text;
                return (
                  <motion.div key={imgUrl} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative aspect-square bg-zinc-900 shadow-2xl overflow-hidden group">
                    <img src={imgUrl} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-110 opacity-90 hover:opacity-100" alt="" />
                    {caption && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-3 right-4 text-right pointer-events-none">
                          <span className="text-white text-[10px] md:text-[11px] font-elegant tracking-widest drop-shadow-md">{caption}</span>
                        </div>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="md:hidden relative w-full overflow-hidden">
            {/* 変更: View Moreを押す前（スライドショーモード）と押した後（全展開）で共通のデータ構造を参照 */}
            {!showAllTable ? (
              <div className="relative aspect-square bg-zinc-900 shadow-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={galleryTableIndex} 
                    initial={{ opacity: 0, scale: 1.1 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0 }} 
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <img src={typeof images.galleryTable[galleryTableIndex] === 'string' ? images.galleryTable[galleryTableIndex] : images.galleryTable[galleryTableIndex].url} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-90" alt="" />
                    
                    {/* キャプション */}
                    {typeof images.galleryTable[galleryTableIndex] !== 'string' && images.galleryTable[galleryTableIndex].text && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-4 right-4 w-full flex justify-end pointer-events-none z-10">
                          <span className="text-white text-[10px] font-elegant tracking-widest text-right drop-shadow-md">
                            {images.galleryTable[galleryTableIndex].text}
                          </span>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {images.galleryTable.map((img, i) => {
                  const imgUrl = typeof img === 'string' ? img : img.url;
                  const caption = typeof img === 'string' ? "" : img.text;
                  return (
                    <div key={i} className="relative aspect-square bg-zinc-900 shadow-xl overflow-hidden">
                      <img src={imgUrl} loading="lazy" decoding="async" className="w-full h-full object-cover" alt="" />
                      {caption && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                          <div className="absolute bottom-4 right-4 w-full flex justify-end pointer-events-none z-10">
                            <span className="text-white text-[10px] font-elegant tracking-widest text-right drop-shadow-md">
                              {caption}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {!showAllTable && (
            <button onClick={() => setShowAllTable(true)} className="mt-8 px-16 py-3 border border-zinc-700 bg-white/5 text-amber-500 text-xs tracking-[0.5em] uppercase hover:text-white hover:border-white transition-all font-elegant italic font-light shadow-lg">View More</button>
          )}
        </div>
        
        <div className="text-center mt-40 md:mt-56">
          <h2 className="text-3xl md:text-5xl text-white font-light tracking-wide italic mb-10 md:mb-16 font-elegant">「一皿」の記録</h2>
          
          <div className="hidden md:grid grid-cols-3 gap-6">
            <AnimatePresence>
              {displays.dish.map((img) => {
                const imgUrl = typeof img === 'string' ? img : img.url;
                const caption = typeof img === 'string' ? "" : img.text;
                return (
                  <motion.div key={imgUrl} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative aspect-square bg-zinc-900 shadow-2xl overflow-hidden group">
                    <img src={imgUrl} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-110 opacity-90 hover:opacity-100" alt="" />
                    {caption && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-3 right-4 text-right pointer-events-none">
                          <span className="text-white text-[10px] md:text-[11px] font-elegant tracking-widest drop-shadow-md">{caption}</span>
                        </div>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="md:hidden relative w-full overflow-hidden">
            {!showAllDish ? (
              <div className="relative aspect-square bg-zinc-900 shadow-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={galleryDishIndex} 
                    initial={{ opacity: 0, scale: 1.1 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0 }} 
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <img src={typeof images.galleryDish[galleryDishIndex] === 'string' ? images.galleryDish[galleryDishIndex] : images.galleryDish[galleryDishIndex].url} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-90" alt="" />
                    {typeof images.galleryDish[galleryDishIndex] !== 'string' && images.galleryDish[galleryDishIndex].text && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-4 right-4 w-full flex justify-end pointer-events-none z-10">
                          <span className="text-white text-[10px] font-elegant tracking-widest text-right drop-shadow-md">
                            {images.galleryDish[galleryDishIndex].text}
                          </span>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {images.galleryDish.map((img, i) => {
                  const imgUrl = typeof img === 'string' ? img : img.url;
                  const caption = typeof img === 'string' ? "" : img.text;
                  return (
                    <div key={i} className="relative aspect-square bg-zinc-900 shadow-xl overflow-hidden">
                      <img src={imgUrl} loading="lazy" decoding="async" className="w-full h-full object-cover" alt="" />
                      {caption && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                          <div className="absolute bottom-4 right-4 w-full flex justify-end pointer-events-none z-10">
                            <span className="text-white text-[10px] font-elegant tracking-widest text-right drop-shadow-md">
                              {caption}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {!showAllDish && (
            <button onClick={() => setShowAllDish(true)} className="mt-8 px-16 py-3 border border-zinc-700 bg-white/5 text-amber-500 text-xs tracking-[0.5em] uppercase hover:text-white hover:border-white transition-all font-elegant italic font-light shadow-lg">View More</button>
          )}
        </div>
      </section>

      {/* Reservation Section */}
      <section id="contact" className="py-16 md:py-20 -mt-16 md:-mt-40 bg-black px-4 md:px-6 text-center border-t border-white/5 relative">
        <h2 className="text-2xl text-white font-elegant italic mb-2 tracking-[0.3em]">Reservation</h2>
        <p className="text-[12px] md:text-base text-amber-500 mb-6 italic font-medium tracking-widest font-elegant leading-relaxed flex flex-col items-center justify-center">
          <span className="block md:inline">※ご紹介・以前ご利用された方限定の</span>
          <span className="block md:inline">ご案内とさせて頂きます。</span>
        </p>

        <div className="max-w-4xl mx-auto bg-zinc-900/20 p-5 md:p-8 border border-zinc-800/40 shadow-2xl text-left">
          {status === "success" ? (
            <div className="text-center text-amber-500 py-6 text-lg font-light font-elegant tracking-widest">お問合せありがとうございます。<br/>詳細ご連絡させて頂きます。</div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                
                <div className="space-y-4">
                  <div>
                    <label className="text-amber-500 text-[10px] uppercase tracking-widest mb-1 block font-elegant">Name</label>
                    <input onChange={(e)=>setFormData({...formData, name:e.target.value})} required className="bg-transparent border-b border-zinc-800 text-white w-full py-1 outline-none focus:border-amber-500 text-sm md:text-base font-elegant transition-colors" />
                  </div>
                  <div>
                    <label className="text-amber-500 text-[10px] uppercase tracking-widest mb-1 block font-elegant">Email</label>
                    <input type="email" onChange={(e)=>setFormData({...formData, email:e.target.value})} required className="bg-transparent border-b border-zinc-800 text-white w-full py-1 outline-none focus:border-amber-500 text-sm md:text-base font-elegant transition-colors" style={{ WebkitBoxShadow: "0 0 0 1000px #0a0a0a inset", WebkitTextFillColor: "#ffffff" }} />
                  </div>
                  
                  {/* Reservation側のオプション (1列に横並び・中央寄せ) */}
                  <div className="pt-1">
                    <div className="flex flex-nowrap items-center justify-center w-full overflow-hidden px-1 gap-2 md:gap-4">
                      {formOptions.map(opt => (
                        <label key={opt.key} className="flex items-center gap-1.5 cursor-pointer group whitespace-nowrap shrink-0">
                          <div onClick={()=>setFormData({...formData, options: {...formData.options, [opt.key]: !formData.options[opt.key]}})} className={`w-3.5 h-3.5 border flex items-center justify-center transition-all shrink-0 ${formData.options[opt.key] ? 'bg-amber-500 border-amber-500' : 'border-stone-800 group-hover:border-stone-600'}`}>
                            {formData.options[opt.key] && <CheckCircle2 size={10} className="text-black" />}
                          </div>
                          <span className="text-[8px] md:text-[10px] text-stone-500 font-elegant whitespace-nowrap tracking-tighter">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 mt-2 md:mt-0 flex flex-col justify-between">
                  <div>
                    <label className="text-amber-500 text-[10px] uppercase tracking-widest mb-1 block font-elegant">Date</label>
                    <div className="relative flex items-center justify-end gap-3 border-b border-zinc-800 py-1 transition-colors group">
                      {formData.date ? (<span className="text-white text-sm md:text-base font-elegant">{formatDate(formData.date)}</span>) : (<span className="text-stone-600 text-sm md:text-base font-elegant italic">Select Date</span>)}
                      <Calendar size={16} className="text-white cursor-pointer group-hover:scale-110 transition-transform" />
                      <input type="date" onChange={(e)=>setFormData({...formData, date:e.target.value})} required className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
                    </div>
                  </div>
                  <div>
                    <label className="text-amber-500 text-[10px] uppercase tracking-widest mb-1 block font-elegant">Time Select</label>
                    {/* スマホ・PCともに完全に中央寄せ */}
                    <div className="flex items-center justify-center md:justify-end border-b border-zinc-800 py-1 transition-colors w-full">
                      <div className="flex items-center justify-center w-full md:w-auto gap-2 md:gap-4">
                        <select onChange={(e)=>setFormData({...formData, startTime:e.target.value})} required className="bg-transparent text-white outline-none font-elegant text-base md:text-lg appearance-none cursor-pointer focus:text-amber-500 text-center md:text-right px-2 w-20 md:w-24">
                          <option value="" className="bg-zinc-900 text-stone-500">Start</option>
                          {Array.from({ length: 25 }, (_, i) => {
                            const h = Math.floor(i / 2) + 10;
                            const m = i % 2 === 0 ? "00" : "30";
                            const t = `${h}:${m}`;
                            return h <= 21 ? <option key={t} value={t} className="bg-zinc-900 text-white">{t}</option> : null;
                          })}
                        </select>
                        <span className="text-stone-600 font-elegant text-base md:text-lg mx-1">-</span>
                        <select onChange={(e)=>setFormData({...formData, endTime:e.target.value})} required className="bg-transparent text-white outline-none font-elegant text-base md:text-lg appearance-none cursor-pointer focus:text-amber-500 text-center md:text-left px-2 w-20 md:w-24">
                          <option value="" className="bg-zinc-900 text-stone-500">End</option>
                          {Array.from({ length: 25 }, (_, i) => {
                            const h = Math.floor(i / 2) + 10;
                            const m = i % 2 === 0 ? "00" : "30";
                            const t = `${h}:${m}`;
                            return h <= 22 ? <option key={t} value={t} className="bg-zinc-900 text-white">{t}</option> : null;
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 relative">
                <label className="text-amber-500 text-[10px] uppercase tracking-widest mb-1 block font-elegant">Message / Request</label>
                <textarea 
                  onChange={(e)=>setFormData({...formData, message:e.target.value})} 
                  required 
                  placeholder={`サービススタッフ（コンパニオン）の人数、テーブルクロスの枚数（2400×1200）、ワゴンサービス。\nアレルギーに関しても、お気軽にお問い合わせください。`}
                  className="bg-transparent border border-zinc-800 text-white w-full p-2 md:p-3 outline-none focus:border-amber-500 text-xs md:text-sm font-elegant transition-colors h-16 md:h-24 resize-none" 
                />
              </div>

              <div className="text-center pt-2">
                {showSimInReservation && (
                  <p className="text-[10px] text-amber-500 mb-2 font-elegant tracking-widest">
                    {guestCount}名様 / ¥{budget === 11500 ? 'Custom' : budget.toLocaleString()} / Bev: {drinkLabels[bevLevel]} / Ing: {foodLabels[ingLevel]}
                  </p>
                )}
                <button type="submit" disabled={status === "submitting"} className="w-full md:w-auto md:px-24 py-3 md:py-4 bg-amber-600 hover:bg-amber-500 text-black font-bold text-[10px] tracking-[0.4em] uppercase transition-all shadow-xl disabled:opacity-50">
                  {status === "submitting" ? "Sending..." : "Submit Reservation"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* --- Footer Area --- */}
        <div className="mt-16 md:mt-24 border-t border-zinc-900 pt-12 pb-8 flex flex-col items-center">
          <img src={CONFIG.logoImage} loading="lazy" decoding="async" className="h-20 md:h-24 opacity-60 mb-2" alt="logo" />
          <div className="text-white text-[10px] tracking-[1em] uppercase font-elegant mb-10 opacity-80 pl-2">since 2019</div>
          
          <div className="flex justify-center gap-12 mb-10 items-center">
            <a href={CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
              <Instagram size={20} className="text-stone-400" />
            </a>
            <a href={`mailto:${CONFIG.contactEmail}`} className="hover:opacity-50 transition-opacity">
              <Mail size={20} className="text-stone-400" />
            </a>
          </div>
          <div className="text-center opacity-30 text-[9px] tracking-[0.5em] uppercase font-elegant">
            <p className="mb-2">&copy; {new Date().getFullYear()} {CONFIG.brandName}</p>
            <p className="lowercase tracking-widest italic">powered by tune table</p>
          </div>
        </div>
      </section>

      {/* --- ホール利用 ポップアップ (モーダル) --- */}
      <AnimatePresence>
        {showHallPopup && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-0"
          >
            {/* 背景の暗闇 (PCではタップで閉じる用) */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
              onClick={closeHallPopup}
            ></div>

            {/* モーダル本体: スマホは縦長スワイプ、PCはフルスクリーンで横長 */}
            <motion.div 
              drag={isMobile ? "y" : false}
              dragControls={dragControls}
              dragListener={isMobile}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              animate={controls}
              initial={isMobile ? { y: "100%", opacity: 0 } : { scale: 0.95, opacity: 0 }} 
              animate={isMobile ? { y: 0, opacity: 1 } : { scale: 1, opacity: 1 }} 
              exit={isMobile ? { y: "100%", opacity: 0 } : { scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full h-full bg-zinc-950 md:bg-transparent shadow-2xl overflow-hidden flex flex-col md:flex-row mt-auto md:mt-0 z-10"
            >
              {/* --- 全画面背景のスライドショー (PC・スマホ共通) --- */}
              <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={hallSlideIndex}
                    src={CONFIG.hallSlides[hallSlideIndex]} 
                    initial={{ opacity: 0, scale: 1.05 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0 }} 
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 md:opacity-40" 
                    alt="" 
                  />
                </AnimatePresence>
                {/* グラスモーフィズム風の半透明黒フィルター */}
                <div className="absolute inset-0 bg-black/70 md:bg-black/80 backdrop-blur-sm"></div>
              </div>

              {/* スマホ版のみ：上部のスワイプ用バー（ハンドル） */}
              <div className="md:hidden w-full flex justify-center pt-3 pb-2 shrink-0 z-20" onPointerDown={(e) => dragControls.start(e)}>
                <div className="w-12 h-1.5 bg-zinc-500/50 rounded-full"></div>
              </div>

              {/* 戻るボタン (共通) */}
              <button 
                onClick={closeHallPopup}
                className="absolute top-4 left-4 z-30 flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-sm text-stone-300 hover:text-amber-500 transition-colors backdrop-blur-md text-xs uppercase tracking-widest font-elegant border border-white/10"
              >
                <ChevronLeft size={14} /> Back
              </button>

              {/* --- PC版：左側レイアウト --- */}
              <div className="hidden md:flex relative w-1/2 shrink-0 flex-col justify-between p-20 z-10">
                
                {/* 左上：タイトル */}
                <div className="mt-8">
                  <span className="text-amber-500 text-[13px] tracking-[0.4em] uppercase font-elegant block mb-2 drop-shadow-md">Partner Facility</span>
                  {/* PC版は改行させない */}
                  <h3 className="text-[42px] whitespace-nowrap text-white font-elegant tracking-widest drop-shadow-xl leading-tight">タウンセブンホール</h3>
                </div>

                {/* 左下：Exclusive Offers */}
                <div className="bg-black/40 border border-white/10 p-8 rounded-sm backdrop-blur-sm mt-auto max-w-lg">
                  <h4 className="text-amber-500 text-sm uppercase tracking-[0.3em] font-elegant mb-6 text-center">Exclusive Offers</h4>
                  <div className="w-full flex justify-center">
                    <div className="inline-block text-left px-2">
                      <ul className="space-y-5">
                        {[
                          "ケータリング指定店としてタウンセブンと提携",
                          "御紹介の内容により、会場使用料の特別割引に対応",
                          "設営・復帰・清掃は、会場使用時間から除外（無料）"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-stone-300 text-base">
                            <Check size={18} className="text-amber-500 shrink-0 mt-0.5" />
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- スマホ版のみ：上部タイトル表示 --- */}
              <div className="md:hidden relative z-10 mt-10 mb-2 px-6 pb-0">
                <span className="text-amber-500 text-[11px] tracking-[0.4em] uppercase font-elegant block mb-2 drop-shadow-md">Partner Facility</span>
                <h3 className="text-3xl text-white font-elegant tracking-widest drop-shadow-xl leading-tight">タウンセブンホール</h3>
              </div>

              {/* --- コンテンツエリア (PCは右側全体。要素の余白を削って1画面に収納) --- */}
              <div className="flex flex-col w-full md:w-1/2 overflow-y-auto custom-scrollbar z-10 bg-black/40 backdrop-blur-md md:bg-transparent md:backdrop-blur-none justify-center">
                <div className="p-6 pb-4 md:p-20 md:pt-32 flex-grow flex flex-col justify-start md:justify-center">
                  
                  {/* 説明文 (スマホ版は1行に収まるように改行) */}
                  <p className="text-stone-300 text-[14px] md:text-lg leading-relaxed font-elegant italic mb-6 md:mb-10 drop-shadow-md text-left md:text-center">
                    荻窪駅直結の好アクセス。洗練された広々とした空間で、<br className="md:hidden"/>
                    上質なケータリングとともに、大切なレセプションや<br className="md:hidden"/>
                    特別なパーティーを演出いたします。
                  </p>

                  <div className="space-y-3 md:space-y-6 mb-6 md:mb-8 w-full max-w-sm mx-auto">
                    <div className="border-l-2 border-amber-500 pl-4 md:pl-6 py-0.5 md:py-1">
                      <h4 className="text-white text-[14px] md:text-lg tracking-widest font-elegant uppercase mb-1.5 md:mb-2">Location</h4>
                      <p className="text-stone-400 text-[13px] md:text-base drop-shadow-md whitespace-nowrap">東京都杉並区上荻1-9-1 タウンセブンビル 8F</p>
                    </div>
                    <div className="border-l-2 border-amber-500 pl-4 md:pl-6 py-0.5 md:py-1">
                      <h4 className="text-white text-[14px] md:text-lg tracking-widest font-elegant uppercase mb-1.5 md:mb-2">Capacity</h4>
                      <p className="text-stone-400 text-[13px] md:text-base drop-shadow-md whitespace-nowrap">立食: 〜約120名 / 着席: 〜約80名様</p>
                    </div>
                  </div>

                  {/* スマホ版のみ：Exclusive Offers をここに表示 */}
                  <div className="md:hidden bg-black/50 border border-white/10 p-5 rounded-sm mb-4 backdrop-blur-sm">
                    <h4 className="text-amber-500 text-[11px] uppercase tracking-[0.3em] font-elegant mb-4 text-center">Exclusive Offers</h4>
                    <div className="w-full flex justify-center">
                      <ul className="space-y-3 inline-block text-left px-2">
                        {[
                          "ケータリング指定店としてタウンセブンと提携",
                          "御紹介の内容により、会場使用料の特別割引に対応",
                          "設営・復帰・清掃は、会場使用時間から除外（無料）"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-stone-300 text-[12px]">
                            <Check size={16} className="text-amber-500 shrink-0 mt-0.5" />
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* PC/スマホ版共通：テキストを大きめに、改行指定 */}
                  <div className="text-center mb-0 md:mb-6 mt-auto md:mt-2">
                    <p className="text-stone-300 text-[12px] md:text-xl font-bold tracking-widest leading-relaxed whitespace-nowrap drop-shadow-md">
                      予約ページ移行後、【プラン選択】および【空き情報】<br/>よりご予約下さい。
                    </p>
                  </div>

                  {/* 予約ボタン */}
                  <div className="shrink-0 w-full max-w-sm mx-auto mt-4 md:mt-0">
                    <a 
                      href={CONFIG.hallUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-4 md:py-6 bg-amber-600 hover:bg-amber-500 text-black font-bold text-[12px] md:text-sm tracking-[0.3em] uppercase transition-all shadow-2xl rounded-sm"
                    >
                      <ExternalLink size={18} />
                      <span>空き状況・ご予約はこちら</span>
                    </a>
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;