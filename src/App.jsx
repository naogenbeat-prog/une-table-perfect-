import React, { useState, useEffect } from "react";
import { ChevronRight, Mail, ChevronLeft } from "lucide-react";

const Instagram = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

// --- 画像リストに基づいて正確に設定 ---
const CONFIG = {
  brandName: "UNE TABLE",
  tagline: "華やかな装いを あなただけの空間へ",
  heroImage: "/hero-bg.jpg",
  logoImage: "/logo.png",
};

const images = {
  concept1: "/concept-img.jpg",
  serviceWedding: "/cocktail-2.png",
  serviceCorporate: "/cocktail-7.png",
  servicePrivate: "/private-4.jpg",
  // メインギャラリー用（画像リストから厳選）
  gallery: [
    "/business-4.jpg",
    "/business-1.jpeg",
    "/cocktail-3.png",
    "/business-9.jpeg",
    "/private-5.jpeg",
    "/roastbeef.jpeg"
  ],
};

// --- 詳細ギャラリーデータ（拡張子を一文字ずつ合わせました） ---
const galleryData = {
  cocktail: {
    title: "Cocktail Party",
    desc: "カジュアルな会合を盛り上げる、彩り豊かな演出。",
    photos: ["/cocktail-2.png", "/cocktail-3.png", "/business-16.png", "/cocktail-14.jpg", "/business-14.jpg", "/business-13.png"]
  },
  standing: {
    title: "Standing Reception",
    desc: "洗練された立食スタイルをご提供します。",
    photos: ["/cocktail-7.png", "/business-12.jpg", "/business-4.jpg", "/business-1.jpeg", "/business-11.jpeg", "/business-9.jpeg"]
  },
  private: {
    title: "Private Dining",
    desc: "プライベートな贅沢をお楽しみください。",
    photos: ["/private-4.jpg", "/private-5.jpeg", "/private-3.jpg", "/private-2.jpg", "/private-1.png", "/IMG_3120.JPG"]
  }
};

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentView, setCurrentView] = useState("home");
  const [selectedPlan, setSelectedPlan] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePlanSelect = (planName) => {
    setSelectedPlan(planName);
    setTimeout(() => {
      const el = document.getElementById("contact-section");
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // 詳細ギャラリー表示
  if (currentView !== "home") {
    const data = galleryData[currentView];
    return (
      <div className="min-h-screen bg-zinc-950 text-stone-300 p-12">
        <button onClick={() => setCurrentView("home")} className="text-amber-500 mb-10 flex items-center uppercase tracking-widest text-xs">
          <ChevronLeft className="mr-2" /> Back to Top
        </button>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl text-amber-500 font-light mb-6 font-serif">{data?.title}</h2>
          <p className="mb-16 text-stone-400">{data?.desc}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.photos.map((img, i) => <img key={i} src={img} className="w-full h-80 object-cover" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-stone-300 font-serif">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${isScrolled ? "bg-black/90 py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-12 flex justify-between items-center">
          <div className="text-2xl text-white tracking-[0.3em] font-light">{CONFIG.brandName}</div>
          <div className="hidden md:flex space-x-10 text-[11px] tracking-[0.2em] uppercase">
            <a href="#concept" className="hover:text-amber-500 transition-colors">Concept</a>
            <a href="#services" className="hover:text-amber-500 transition-colors">Services</a>
            <a href="#menu" className="hover:text-amber-500 transition-colors">Menu</a>
            <a href="#contact-section" className="text-amber-500 font-bold">Reservation</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="h-screen relative overflow-hidden flex items-center justify-center">
        <img src={CONFIG.heroImage} className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl text-white font-light leading-tight drop-shadow-2xl">
            華やかな装いを<br />あなただけの空間へ。
          </h1>
        </div>
      </section>

      {/* Concept */}
      <section id="concept" className="py-32 max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-20">
        <img src={images.concept1} className="w-full md:w-1/2 h-[500px] object-cover" />
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl text-white font-light mb-8">感動の一瞬を<br />永遠の思い出に</h2>
          <p className="leading-loose text-stone-400">UNE TABLE（ユヌ・ターブル）は、フランス語で「一つのテーブル」を意味します。大切なビジネスシーン、かけがえのない時間に、最高のおもてなしをお約束いたします。</p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-zinc-900 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { id: "cocktail", title: "Cocktail Party", img: images.serviceWedding },
            { id: "standing", title: "Standing Reception", img: images.serviceCorporate },
            { id: "private", title: "Private Dining", img: images.servicePrivate },
          ].map(s => (
            <div key={s.id} onClick={() => setCurrentView(s.id)} className="cursor-pointer group relative overflow-hidden aspect-[3/4]">
              <img src={s.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute bottom-10 left-10">
                <h4 className="text-2xl text-white font-light tracking-widest border-l-2 border-amber-500 pl-4">{s.title}</h4>
                <p className="text-amber-500 text-[10px] mt-2 opacity-0 group-hover:opacity-100 transition-all">VIEW PHOTOS</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Menu & Plan Select */}
      <section id="menu" className="py-32 bg-zinc-950 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl text-white font-light mb-20 italic">Standard Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {["立食スタイル", "立食・着席", "着席フルコース"].map((plan) => (
              <div key={plan} className="p-10 border border-zinc-800 bg-zinc-900/30">
                <h3 className="text-2xl text-white mb-6 font-light">{plan}</h3>
                <button 
                  onClick={() => handlePlanSelect(plan)}
                  className="w-full py-4 border border-zinc-700 text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all"
                >
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-32 bg-black px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl text-white font-light mb-20 text-center">Reservation</h2>
          <form className="space-y-12 bg-zinc-900/30 p-12 border border-zinc-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <input type="text" placeholder="お名前" className="bg-transparent border-b border-zinc-700 py-3 text-white outline-none focus:border-amber-500" />
              <input type="email" placeholder="メールアドレス" className="bg-transparent border-b border-zinc-700 py-3 text-white outline-none focus:border-amber-500" />
            </div>
            <div className="flex flex-col">
              <label className="text-amber-500 text-[10px] tracking-[0.3em] uppercase mb-4">Selected Plan</label>
              <select 
                value={selectedPlan} 
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="bg-zinc-800 text-stone-300 p-4 border-none outline-none"
              >
                <option value="">プランを選択してください</option>
                <option value="立食スタイル">立食スタイル</option>
                <option value="立食・着席">立食・着席</option>
                <option value="着席フルコース">着席フルコース</option>
              </select>
            </div>
            <textarea placeholder="メッセージ" className="w-full bg-transparent border-b border-zinc-700 py-3 text-white h-32 resize-none"></textarea>
            <button className="w-full py-5 bg-amber-600 text-white text-xs tracking-[0.4em] uppercase hover:bg-amber-500 transition-all">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-zinc-950 text-center border-t border-zinc-900">
        <img src={CONFIG.logoImage} className="h-40 mx-auto mb-10 object-contain" />
        <div className="flex justify-center space-x-8 mb-10 text-stone-600">
          <Instagram size={32} /> <Mail size={32} />
        </div>
        <p className="text-stone-800 text-[9px] tracking-[0.2em] uppercase">© 2024 UNE TABLE. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
