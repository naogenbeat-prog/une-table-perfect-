import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronRight, Star, Quote, Mail, ChevronLeft, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- 設定エリア ---
const CONFIG = {
  brandName: "UNE TABLE",
  tagline: "華やかな装いを あなただけの空間へ ",
  heroImage:  "/cocktail-1-8-1.png",
  heroSlides: ["/cocktail-1-8-1.png", "/cocktail-15.png", "/cocktail-3.png"],
  logoImage: "/logo.png",
  // Instagramのリンク先を変更
  instagramUrl: "https://www.instagram.com/unetable_caterring",
  // メールの送信先を変更
  contactEmail: "naogenbeat@gmail.com"
};

const images = {
  concept1: "/cocktail-33.png",
  conceptSlide: ["/cocktail-27.jpg", "/cocktail-1.png", "/sozai-3.jpeg", "/sozai-1.png", "/sozai-54.jpeg", "/sozai-4.jpeg", "/cocktail-30.png", "/cocktail-1-5.jpg"],
  serviceWedding: "/cocktail-40.png",
  serviceCorporate: "/cocktail-33.png",
  servicePrivate: "/private-4.jpg",
  galleryTable:[
    "/cocktail-37.png", "/business-12.jpg", "/sozai-12.jpeg", "/cocktail-42.png",
    "/business-16.png", "/sozai-37.png", "/cocktail-1-2.png", "/business-1.jpeg",
    "/cocktail-23.jpg", "/cocktail-7.png", "/cocktail-1-9.png", "/cocktail-2.png",
    "/cocktail-31.jpg", "/cocktail-1-10.jpg", "/cocktail-3.png"
  ],
  galleryDish:[
    "/sozai-19.jpeg", "/sozai-16.jpg", "/sozai-13.jpeg", "/sozai-23.jpeg",
    "/sozai-30.jpeg", "/sozai-29.png", "/sozai-25.jpeg", "/sozai-15-2.jpeg", 
    "/business-9.jpeg", "/cocktail-11.jpg", "/cocktail-12.png", "/cocktail-13.jpeg",
    "/sozai-35.jpg", "/sozai-26.jpg", "/sozai-12.png"
  ],
};

const galleryData = {
  cocktail: { title: "Cocktail party", desc: "カジュアルな会合を盛り上げる 彩り豊かな演出。フィンガーフードで会話も弾む特別な空間を演出します。", photos:["/cocktail-2.png", "/cocktail-3.png", "/business-16.png", "/cocktail-14.jpg", "/business-14.jpg", "/business-13.png"] },
  standing: { title: "Banquet Style", desc: "ビジネスシーンに適した効率的ディスプレイ。ブランドイメージを高める洗練された立食スタイルを提供します。", photos:["/cocktail-23.jpg", "/business-12.jpg", "/cocktail-1.png", "/business-28.png", "/business-21.png", "/business-1.jpeg"] },
  private: { title: "Private Dining", desc: "オーダーメイドのレストラン。すべてにこだわった特別な空間で、最高のお料理をお楽しみください。", photos:["/private-4.jpg", "/private-19.png", "/private-3.jpg", "/sozai-17.png", "/sozai-22.png", "/private-2.jpg"] }
};

const budgetMap = {
  4000: { name: "立食スタイル", img: "/cocktail-3.png", desc: "カジュアルに楽しむフィンガーフード主体のプラン。" },
  5500: { name: "立食スタイル", img: "/cocktail-3.png", desc: "彩りとボリュームをプラスしたスタンダードな立食プラン。" },
  7000: { name: "立食・着席スタイル", img: "/cocktail-7.png", desc: "おもてなしと満足感を両立させたスペシャリティ。" },
  8500: { name: "立食・着席スタイル", img: "/cocktail-7.png", desc: "高級食材をふんだんに用いたハイグレードなビュッフェ。" },
  10000: { name: "着席スタイル", img: "/private-4.jpg", desc: "特別なゲストのための完全オーダーメイド・フルコース。" },
  11500: { name: "着席スタイル", img: "/private-4.jpg", desc: "至高のサービスで綴る、最高峰の食体験。" },
};

const drinkLabels = ["Standard", "Casual", "Premium", "Luxury", "Executive"];
const foodLabels = ["Normal", "Standard", "Special", "Premium", "Private"];

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
  const[selectedPlan, setSelectedPlan] = useState("");
  const[status, setStatus] = useState("idle");
  const[formData, setFormData] = useState({ name: "", email: "", message: "", date: "", startTime: "", endTime: "", options: { room: false, layout: false, cleaning: false } });
  
  const [slideIndex, setSlideIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [showAllTable, setShowAllTable] = useState(false);
  const [showAllDish, setShowAllDish] = useState(false);
  
  const [guestCount, setGuestCount] = useState(20);
  const [budget, setBudget] = useState(4000);
  const [bevLevel, setBevLevel] = useState(0);
  const [ingLevel, setIngLevel] = useState(0);
  const [showSimInReservation, setShowSimInReservation] = useState(false);

  const conceptRef = useRef(null);
  const [isConceptInView, setIsConceptInView] = useState(false);

  const guestPoints = Math.floor((guestCount - 20) / 10);
  const budgetPoints = (budget - 4000) / 1500;
  const totalAvailablePoints = guestPoints + budgetPoints;
  const remainingPoints = totalAvailablePoints - (bevLevel + ingLevel);

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
    const handlePopState = () => setCurrentView("home");
    window.addEventListener("popstate", handlePopState);
    const heroTimer = setInterval(() => { setHeroIndex((p) => (p + 1) % 3); }, 5000);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsConceptInView(true); }, { threshold: 0.2 });
    if (conceptRef.current) observer.observe(conceptRef.current);
    return () => { window.removeEventListener("popstate", handlePopState); window.removeEventListener("scroll", handleScroll); clearInterval(heroTimer); if (conceptRef.current) observer.disconnect(); };
  }, [currentView]);

  useEffect(() => {
    let slideTimer;
    if (isConceptInView && currentView === "home") {
        setSlideIndex(0);
        slideTimer = setInterval(() => { setSlideIndex((p) => (p + 1) % 8); }, 4000);
    }
    return () => clearInterval(slideTimer);
  }, [isConceptInView, currentView]);

  const currentStep = Math.floor(slideIndex / 2);
  const handleViewChange = (v) => { if (v !== "home") window.history.pushState({}, "", ""); setCurrentView(v); };
  const handlePlanSelect = (name, isFromSim = false) => {
    setSelectedPlan(name);
    setShowSimInReservation(isFromSim);
    setTimeout(() => { document.getElementById("contact")?.scrollIntoView({ behavior: 'smooth' }); }, 100);
  };

  const simResult = budgetMap[budget] || budgetMap[4000];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    const optText = `オプション: ${formData.options.room ? '[ホール]' : ''}${formData.options.layout ? '[レイアウト]' : ''}${formData.options.cleaning ? '[清掃]' : ''}`;
    const simText = `【シミュレーション内容】\n人数: ${guestCount}名 / 単価: ¥${budget.toLocaleString()} / 飲料: ${drinkLabels[bevLevel]} / 食材: ${foodLabels[ingLevel]}`;
    const fullMsg = `予約希望日: ${formData.date}\n希望時間: ${formData.startTime} 〜 ${formData.endTime}\n選択スタイル: ${selectedPlan}\n${optText}\n\n${simText}\n\nメッセージ:\n${formData.message}`;
    
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

  if (currentView !== "home") {
    const data = galleryData[currentView];
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-stone-300 pt-28 pb-24 px-6 animate-[fadeIn_0.5s_ease-out]">
        <div className="max-w-7xl mx-auto text-center">
          <button onClick={() => window.history.back()} className="text-amber-500 mb-12 flex items-center gap-2 uppercase text-xs tracking-widest"><ChevronLeft size={16} className="mr-2" /> Back</button>
          <h2 className="font-brand text-4xl text-amber-500 mb-6 italic tracking-widest font-elegant">{data?.title}</h2>
          <p className="text-stone-400 max-w-2xl mx-auto leading-loose mb-16 text-xl font-elegant italic">{data?.desc}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{data?.photos.map((img, i) => (<img key={i} src={img} className="w-full h-80 object-cover shadow-2xl" alt="" />))}</div>
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
      `}} />
      
      <Navbar isScrolled={isScrolled} currentView={currentView} onViewChange={handleViewChange} />
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden flex flex-col justify-center items-center text-center px-4 mb-20 md:mb-0">
        <div className="absolute inset-0 z-0">
          <AnimatePresence>
            <motion.div key={heroIndex} initial={{ opacity: 0, scale: 1.3, filter: "brightness(1.1) blur(6px)" }} animate={{ opacity: 1, scale: 1.05, filter: "brightness(0.45) blur(0px)" }} exit={{ opacity: 0 }} transition={{ scale: { duration: 8, ease: "linear" }, opacity: { duration: 2.5 }, filter: { duration: 2.5 } }} className="absolute inset-0"><img src={CONFIG.heroSlides[heroIndex]} className="w-full h-full object-cover" alt="" /><div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" /></motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-[#0a0a0a]"></div>
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
              <h2 className="text-xl tracking-[0.4em] font-light opacity-90 uppercase">UNE TABLE</h2>
            </div>
            <div className="absolute w-full top-[30%] left-0 text-center px-0">
              <h1 className="font-serif text-[38px] xs:text-[42px] leading-tight font-light drop-shadow-2xl italic tracking-tighter">
                華やかな装いを<br/>あなただけの空間へ。
              </h1>
            </div>
            <div className="absolute w-full bottom-[26%] left-0 text-center px-0">
              <p className="text-[17px] xs:text-[18px] leading-relaxed font-light text-white/90 tracking-[-0.095em]">
                厳選された旬の食材を目にも楽しい彩りを添えて。<br />
                特別な日に最高峰のケータリングをお届け致します。
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Concept Section */}
      <section id="concept" ref={conceptRef} className="pt-20 pb-20 md:py-32 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-start">
        <div className="w-full md:w-1/2 relative h-[350px] md:h-[500px] overflow-hidden shadow-2xl rounded-sm">
          {images.conceptSlide.map((img, i) => (<motion.img key={i} src={img} initial={{ opacity: 0 }} animate={{ opacity: i === slideIndex ? 1 : 0 }} transition={{ duration: 2 }} className="absolute inset-0 w-full h-full object-cover scale-105" alt="" />))}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col mt-12 md:mt-24">
          <h2 className="text-2xl md:text-3xl text-amber-500 font-light font-elegant italic tracking-widest leading-none mb-6 md:mb-8 mt-0 text-center">感動の一瞬を 永遠の思い出に</h2>
          <div className="relative text-white text-lg md:text-xl leading-relaxed mt-6 md:mt-10 min-h-[140px] md:min-h-[160px]">
            <AnimatePresence mode="wait">
              {[
                { text: "私たちは厳選された旬の食材を、確かな技術で目にも美しい一皿へと昇華させます。", align: "text-center", space: "pt-4" }, 
                { text: "産地や市場から直接届く「最盛の旬」を逃さず、その魅力を最大限に引き出し、おもてなしの場に彩りを添えます。", align: "text-center", space: "pt-4" }, 
                { text: "多種多様な銘柄に精通した有資格者が、最適なお飲み物を厳選致します。酒販店も営む私たちが、流通価格にてご提案させて頂きます。", align: "text-left", space: "" }, 
                { text: "大切なひとところに、確かな安心と　深い感動を添えさせていただきます。", align: "text-center", space: "pt-4" }
              ].map((item, idx) => (
                idx === currentStep && (
                  <motion.p 
                    key={idx} 
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -5 }} 
                    transition={{ duration: 0.8 }} 
                    className={`absolute inset-x-0 top-0 ${item.align} ${item.space}`}
                  >
                    {item.text}
                  </motion.p>
                )
              ))}
            </AnimatePresence>
          </div>
          
          <p className="mt-0 md:mt-4 pt-4 md:pt-4 border-t border-white/10 text-white text-[17px] md:text-xl font-elegant italic tracking-tight uppercase opacity-90 leading-relaxed md:leading-snug text-center">
            <span className="block">UNE TABLE（ユヌ・ターブル）は、フランス語で</span>
            <span className="block"><span className="text-amber-500 not-italic">「一つのテーブル」</span><span>を意味します。</span></span>
            <span className="block hidden md:block">大切なビジネスシーンから、かけがえのない瞬間に,</span>
            <span className="block md:hidden">大切なビジネスシーン、かけがえのない瞬間に,</span>
            <span className="block">究極のおもてなしをお約束いたします。</span>
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-16 md:-mt-12 bg-zinc-900 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { id: "cocktail", title: "Cocktail Party", img: images.serviceWedding, desc: "カジュアルな会合を盛り上げる", highlight: "彩り豊かな演出" },
          { id: "standing", title: "Banquet Style", img: images.serviceCorporate, desc: "大切なビジネスシーンに適した", highlight: "厳粛で洗練されたディスプレイ" },
          { id: "private", title: "Private Dining", img: images.servicePrivate, desc: "オーダーメイド host レストラン", highlight: "贅沢な特別な空間" }
        ].map((s, i) => (
          <div key={i} onClick={() => handleViewChange(s.id)} className="group cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden mb-8 shadow-xl"><img src={s.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" /></div>
            <div className="flex gap-4">
              <div className="w-[2px] h-12 bg-amber-500 mt-1"></div>
              <div><h4 className="text-2xl text-white font-light uppercase tracking-widest font-elegant">{s.title}</h4><p className="text-stone-300 text-lg leading-relaxed font-elegant italic">{s.desc}<br /><span className="text-amber-500 font-bold not-italic">{s.highlight}</span></p></div>
            </div>
          </div>
        ))}
      </section>

      {/* Simulation Section */}
      <section id="simulation" className="pt-16 pb-20 md:py-32 bg-[#080808] px-6 border-y border-white/5 relative">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-5xl text-white font-light tracking-wide italic font-elegant">Simulation</h2>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-20 items-stretch md:py-6">
          <div className="space-y-3 md:space-y-4 bg-[#0d0d0d] p-6 md:p-10 border border-white/5 shadow-2xl relative rounded-lg">
            <div className="space-y-3">
              <div className="flex justify-between text-sm md:text-base text-stone-300 uppercase tracking-widest font-elegant font-light"><span>Guests</span><span className="text-amber-500 font-bold">{guestCount} 名様 (+{guestPoints}pt)</span></div>
              <input type="range" min="20" max="120" step="1" value={guestCount} onChange={(e) => setGuestCount(Number(e.target.value))} />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm md:text-base text-stone-300 uppercase tracking-widest font-elegant font-light"><span>Budget</span><span className="text-amber-500 font-bold">{budget === 11500 ? '∞' : `¥ ${budget.toLocaleString()}`} (+{budgetPoints}pt)</span></div>
              <input type="range" min="4000" max="11500" step="1500" value={budget} onChange={(e) => setBudget(Number(e.target.value))} />
            </div>

            <div className="flex items-center justify-between py-1.5 bg-amber-500/5 px-4 border border-amber-500/20">
              <div className="flex items-center gap-3 text-amber-500"><span className="text-[10px] uppercase tracking-widest font-bold">Remaining Points</span></div>
              <div className="text-xl text-white font-elegant">{remainingPoints} <span className="text-[10px] text-stone-500 uppercase">pts</span></div>
            </div>

            <div className="space-y-5">
              <div className="space-y-3">
                <div className="flex justify-between text-sm md:text-base text-stone-300 uppercase tracking-widest font-elegant font-light"><span>Beverage Selection</span><span className="text-white font-bold">{drinkLabels[bevLevel]}</span></div>
                <input type="range" min="0" max="4" step="1" value={bevLevel} onChange={(e) => { const val = Number(e.target.value); if(val + ingLevel <= totalAvailablePoints) setBevLevel(val); }} />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm md:text-base text-stone-300 uppercase tracking-widest font-elegant font-light"><span>Ingredient Grade</span><span className="text-white font-bold">{foodLabels[ingLevel]}</span></div>
                <input type="range" min="0" max="4" step="1" value={ingLevel} onChange={(e) => { const val = Number(e.target.value); if(val + bevLevel <= totalAvailablePoints) setIngLevel(val); }} />
              </div>

              <div className="pt-3 border-t border-white/5 flex flex-row items-center justify-between gap-1 overflow-x-hidden">
                {[ { key: 'room', label: 'ホール利用' }, { key: 'layout', label: 'テーブルレイアウト' }, { key: 'cleaning', label: 'クリーニング' } ].map(opt => (
                  <label key={opt.key} className="flex items-center gap-1.5 cursor-pointer group">
                    <div onClick={() => setFormData({ ...formData, options: { ...formData.options, [opt.key]: !formData.options[opt.key] } })} className={`w-4 h-4 border flex items-center justify-center transition-all ${formData.options[opt.key] ? 'bg-amber-500 border-amber-500' : 'border-stone-700'}`}>{formData.options[opt.key] && <CheckCircle2 size={12} className="text-black" />}</div>
                    <span className="text-[9px] md:text-[10px] text-stone-400 uppercase tracking-tighter md:tracking-widest font-elegant whitespace-nowrap">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-[#111] border border-white/5 flex flex-col shadow-2xl rounded-lg h-full">
            <AnimatePresence mode="wait">
              <motion.div key={simResult.img} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="h-full flex flex-col">
                <div className="relative overflow-hidden h-36 md:h-[336px] shrink-0">
                  <img src={simResult.img} className="w-full h-full object-cover opacity-70" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/40 to-transparent"></div>
                  <div className="absolute bottom-3 left-6 md:bottom-4 md:left-8">
                    <span className="text-amber-500 text-[8px] md:text-[9px] tracking-[0.4em] uppercase font-elegant">Plan Proposal</span>
                    <h3 className="text-xl md:text-3xl text-white font-elegant italic mt-0.5 leading-tight">{simResult.name}</h3>
                  </div>
                </div>

                <div className="px-6 py-3 md:px-8 md:py-4 flex flex-col flex-grow bg-[#111]">
                  <p className="text-stone-400 text-[10px] md:text-sm leading-relaxed font-elegant italic border-b border-white/5 pb-3 md:pb-4 mb-3 md:mb-4">{simResult.desc}</p>
                  <div className="mt-auto">
                    <button onClick={() => handlePlanSelect(simResult.name, true)} className="w-full py-2 md:py-3 bg-amber-600 hover:bg-amber-500 text-black font-bold text-[8px] md:text-[9px] tracking-[0.4em] uppercase transition-all shadow-xl leading-none">REQUEST A QUOTE</button>
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
          <h2 className="text-3xl md:text-5xl text-white font-light tracking-wide italic mb-16 font-elegant">「テーブル」の記録</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence>
              {displays.table.map((img) => (
                <motion.div key={img} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative aspect-square bg-zinc-900 shadow-2xl overflow-hidden group">
                  <img src={img} className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-110 opacity-90 hover:opacity-100" alt="" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {!showAllTable && (
            <button onClick={() => setShowAllTable(true)} className="mt-8 px-16 py-3 border border-zinc-700 bg-white/5 text-amber-500 text-xs tracking-[0.5em] uppercase hover:text-white hover:border-white transition-all font-elegant italic font-light shadow-lg">View More</button>
          )}
        </div>
        
        <div className="text-center mt-40 md:mt-56">
          <h2 className="text-3xl md:text-5xl text-white font-light tracking-wide italic mb-16 font-elegant">「一皿」の記録</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence>
              {displays.dish.map((img) => (
                <motion.div key={img} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative aspect-square bg-zinc-900 shadow-2xl overflow-hidden group">
                  <img src={img} className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-110 opacity-90 hover:opacity-100" alt="" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {!showAllDish && (
            <button onClick={() => setShowAllDish(true)} className="mt-8 px-16 py-3 border border-zinc-700 bg-white/5 text-amber-500 text-xs tracking-[0.5em] uppercase hover:text-white hover:border-white transition-all font-elegant italic font-light shadow-lg">View More</button>
          )}
        </div>
      </section>

      {/* Reservation Section */}
      <section id="contact" className="py-16 md:py-20 -mt-16 md:-mt-40 bg-black px-6 text-center border-t border-white/5 relative">
        <h2 className="text-2xl text-white font-elegant italic mb-2 tracking-[0.3em]">Reservation</h2>
        <p className="text-[14px] md:text-lg text-amber-500 mb-10 italic font-medium tracking-widest font-elegant leading-relaxed flex flex-col items-center justify-center">
          <span className="block md:inline">※ご紹介・以前ご利用された方限定の</span>
          <span className="block md:inline">ご案内とさせて頂きます。</span>
        </p>

        <div className="max-w-4xl mx-auto bg-zinc-900/20 p-6 md:p-10 border border-zinc-800/40 shadow-2xl text-left">
          {status === "success" ? (
            <div className="text-center text-amber-500 py-6 text-lg font-light font-elegant tracking-widest">Thank You. 送信完了しました。</div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-6">
                  <div>
                    <label className="text-amber-500 text-[10px] uppercase tracking-widest mb-1 block font-elegant">Name</label>
                    <input onChange={(e)=>setFormData({...formData, name:e.target.value})} required className="bg-transparent border-b border-zinc-800 text-white w-full py-1 outline-none focus:border-amber-500 text-base font-elegant transition-colors" />
                  </div>
                  <div>
                    <label className="text-amber-500 text-[10px] uppercase tracking-widest mb-1 block font-elegant">Email</label>
                    <input type="email" onChange={(e)=>setFormData({...formData, email:e.target.value})} required className="bg-transparent border-b border-zinc-800 text-white w-full py-1 outline-none focus:border-amber-500 text-base font-elegant transition-colors" />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    {[ { key: 'room', label: 'ホール利用' }, { key: 'layout', label: 'テーブルレイアウト' }, { key: 'cleaning', label: 'クリーニング' }].map(opt => (
                      <label key={opt.key} className="flex items-center gap-2 cursor-pointer group">
                        <div onClick={()=>setFormData({...formData, options: {...formData.options, [opt.key]: !formData.options[opt.key]}})} className={`w-3.5 h-3.5 border flex items-center justify-center transition-all ${formData.options[opt.key] ? 'bg-amber-500 border-amber-500' : 'border-stone-800'}`}>{formData.options[opt.key] && <CheckCircle2 size={10} className="text-black" />}</div>
                        <span className="text-[10px] text-stone-500 font-elegant whitespace-nowrap tracking-tighter">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-amber-500 text-[10px] uppercase tracking-widest mb-1 block font-elegant">Date</label>
                    <div className="relative flex items-center justify-end gap-3 border-b border-zinc-800 py-1 transition-colors group">
                      {formData.date ? (<span className="text-white text-lg font-elegant">{formatDate(formData.date)}</span>) : (<span className="text-stone-600 text-lg font-elegant italic">Select Date</span>)}
                      <Calendar size={18} className="text-white cursor-pointer group-hover:scale-110 transition-transform" />
                      <input type="date" onChange={(e)=>setFormData({...formData, date:e.target.value})} required className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
                    </div>
                  </div>
                  <div>
                    <label className="text-amber-500 text-[10px] uppercase tracking-widest mb-1 block font-elegant">Time Select</label>
                    <div className="flex items-center justify-end gap-3 border-b border-zinc-800 py-1 transition-colors">
                      <select onChange={(e)=>setFormData({...formData, startTime:e.target.value})} required className="bg-transparent text-white outline-none font-elegant text-lg appearance-none cursor-pointer focus:text-amber-500 text-right">
                        <option value="" className="bg-zinc-900 text-stone-500">Start</option>
                        {Array.from({ length: 25 }, (_, i) => {
                          const h = Math.floor(i / 2) + 10;
                          const m = i % 2 === 0 ? "00" : "30";
                          const t = `${h}:${m}`;
                          return h <= 21 ? <option key={t} value={t} className="bg-zinc-900 text-white">{t}</option> : null;
                        })}
                      </select>
                      <span className="text-stone-600 font-elegant text-lg">~</span>
                      <select onChange={(e)=>setFormData({...formData, endTime:e.target.value})} required className="bg-transparent text-white outline-none font-elegant text-lg appearance-none cursor-pointer focus:text-amber-500 text-right">
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
              <div className="pt-4 relative">
                <label className="text-amber-500 text-[10px] uppercase tracking-widest mb-1 block font-elegant">Message / Request</label>
                <textarea onChange={(e)=>setFormData({...formData, message:e.target.value})} className="bg-transparent border border-zinc-800 text-white w-full p-4 outline-none focus:border-amber-500 text-base font-elegant transition-colors h-32 resize-none" />
              </div>
              <div className="text-center pt-6">
                <button type="submit" disabled={status === "submitting"} className="px-20 py-4 bg-amber-600 hover:bg-amber-500 text-black font-bold text-[10px] tracking-[0.4em] uppercase transition-all shadow-xl disabled:opacity-50">
                  {status === "submitting" ? "Sending..." : "Submit Reservation"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* --- Footer Area --- */}
        <div className="mt-32 border-t border-zinc-900 pt-20 pb-10 flex flex-col items-center">
          <img src={CONFIG.logoImage} className="h-28 opacity-60 mb-8" alt="logo" />
          <div className="flex justify-center gap-12 mb-16 items-center">
            {/* Instagram: unetable_caterring */}
            <a href={CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
              <Instagram size={20} className="text-stone-400" />
            </a>
            {/* Email: naogenbeat@gmail.com */}
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
    </div>
  );
};

export default App;