import React, { useState, useEffect } from "react";
import { ChevronRight, Mail, ChevronLeft } from "lucide-react";

// Instagramアイコン
const Instagram = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const CONFIG = {
  brandName: "UNE TABLE",
  tagline: "華やかな装いを あなただけの空間へ",
  heroImage: "/hero-bg.jpg",
  logoImage: "/logo.png",
};

const images = {
  concept1: "/business-12.jpg",
  serviceWedding: "/cocktail-2.png",
  serviceCorporate: "/cocktail-7.png",
  servicePrivate: "/private-4.jpg",
  gallery: ["/business-4.jpg", "/business-1.jpeg", "/concept-img.png", "/cocktail-3.png", "/business-9.jpeg", "/private-5.jpeg"]
};

// サービス詳細データ
const galleryData = {
  cocktail: { title: "Cocktail party", desc: "カジュアルな会合を盛り上げる、彩り豊かな演出。", photos: [images.serviceWedding, "/cocktail-3.png"] },
  standing: { title: "Standing reception", desc: "洗練された立食スタイルを提供します。", photos: [images.serviceCorporate, "/business-12.jpg"] },
  private: { title: "Private", desc: "プライベートな贅沢をお楽しみください。", photos: [images.servicePrivate, "/private-5.jpeg"] }
};

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentView, setCurrentView] = useState("home");
  const [selectedPlan, setSelectedPlan] = useState(""); // 選択プラン用State

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ★重要：プランを選択してお問い合わせへ飛ばす関数
  const handlePlanSelect = (planName) => {
    console.log("Selected Plan:", planName); // 動作確認用
    setSelectedPlan(planName); // Stateを更新
    
    // 画面移動（少し遅らせて確実に実行）
    setTimeout(() => {
      const contactEl = document.getElementById("contact-section");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  if (currentView !== "home") {
    const data = galleryData[currentView];
    return (
      <div className="min-h-screen bg-zinc-950 text-stone-300 p-8">
        <button onClick={() => setCurrentView("home")} className="text-amber-500 mb-8 flex items-center">
          <ChevronLeft className="mr-2" /> Back to Top
        </button>
        <h2 className="text-4xl text-amber-500 mb-4">{data?.title}</h2>
        <p className="mb-12">{data?.desc}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.photos.map((p, i) => <img key={i} src={p} className="w-full h-auto" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-stone-300 font-serif">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all ${isScrolled ? "bg-black/90 py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-12 flex justify-between items-center">
          <div className="text-2xl text-white tracking-widest">{CONFIG.brandName}</div>
          <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest">
            <a href="#concept" className="hover:text-amber-500">Concept</a>
            <a href="#services" className="hover:text-amber-500">Services</a>
            <a href="#menu" className="hover:text-amber-500">Menu</a>
            <a href="#contact-section" className="text-amber-500 font-bold">Reservation</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="h-screen relative flex items-center justify-center">
        <img src={CONFIG.heroImage} className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <h1 className="relative text-5xl md:text-7xl text-white text-center leading-tight">華やかな装いを<br />あなただけの空間へ。</h1>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-zinc-900 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: "cocktail", title: "Cocktail party", img: images.serviceWedding },
            { id: "standing", title: "Standing reception", img: images.serviceCorporate },
            { id: "private", title: "Private", img: images.servicePrivate },
          ].map(s => (
            <div key={s.id} onClick={() => setCurrentView(s.id)} className="cursor-pointer group relative overflow-hidden">
              <img src={s.img} className="w-full h-96 object-cover grayscale group-hover:grayscale-0 transition-all" />
              <div className="absolute bottom-4 left-4 text-xl text-white border-l-2 border-amber-500 pl-4">{s.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Section (ボタン連動) */}
      <section id="menu" className="py-24 bg-zinc-950 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl text-white mb-16">Standard Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "立食スタイル", price: "¥4,500~" },
              { name: "立食・着席", price: "¥6,000~" },
              { name: "着席スタイル", price: "¥8,000~" },
            ].map(plan => (
              <div key={plan.name} className="p-10 border border-zinc-800 bg-zinc-900/50">
                <h3 className="text-2xl text-white mb-4">{plan.name}</h3>
                <p className="text-amber-500 text-xl mb-8">{plan.price}</p>
                <button 
                  onClick={() => handlePlanSelect(plan.name)}
                  className="w-full py-3 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black transition-all"
                >
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section (IDを contact-section に固定) */}
      <section id="contact-section" className="py-32 bg-black px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl text-white text-center mb-16">Reservation</h2>
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input type="text" placeholder="お名前" className="bg-transparent border-b border-zinc-700 p-2 text-white outline-none focus:border-amber-500" />
              <input type="email" placeholder="メールアドレス" className="bg-transparent border-b border-zinc-700 p-2 text-white outline-none focus:border-amber-500" />
            </div>
            
            {/* プラン選択ボックス (selectedPlanと連動) */}
            <div className="flex flex-col">
              <label className="text-amber-500 text-xs mb-2">Selected Plan</label>
              <select 
                value={selectedPlan} 
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="bg-zinc-900 text-white p-4 border border-zinc-700 outline-none"
              >
                <option value="">プランを選択してください</option>
                <option value="立食スタイル">立食スタイル</option>
                <option value="立食・着席">立食・着席</option>
                <option value="着席スタイル">着席スタイル</option>
              </select>
            </div>
            
            <textarea placeholder="メッセージ" className="w-full bg-transparent border-b border-zinc-700 p-2 text-white outline-none focus:border-amber-500 h-32"></textarea>
            <button className="w-full py-4 bg-amber-600 text-white hover:bg-amber-500 transition-all uppercase tracking-widest">Send Message</button>
          </form>
        </div>
      </section>

      <footer className="py-12 bg-zinc-950 text-center">
        <img src={CONFIG.logoImage} className="h-32 mx-auto mb-8" />
        <div className="flex justify-center space-x-6 text-zinc-600">
          <Instagram size={24} /> <Mail size={24} />
        </div>
      </footer>
    </div>
  );
};

export default App;
