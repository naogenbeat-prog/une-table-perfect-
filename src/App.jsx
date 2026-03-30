import React, { useState, useEffect } from "react";
import { ChevronRight, Star, Quote, Mail, ChevronLeft } from "lucide-react";

// --- 設定エリア（コピー・画像分類は一切変えていません） ---
const CONFIG = {
  brandName: "UNE TABLE",
  tagline: "華やかな装いを あなただけの空間へ ",
  heroImage:  "/hero-bg.jpg",
  logoImage: "/logo.png",
};

const images = {
  concept1: "/concept-img.jpg",
  serviceWedding: "/cocktail-2.png",
  serviceCorporate: "/cocktail-7.png",
  servicePrivate: "/private-4.jpg",
  gallery: ["/business-4.jpg", "/business-1.jpeg", "/roastbeef.jpeg", "/cocktail-3.png", "/business-9.jpeg", "/private-5.jpeg"],
};

const galleryData = {
  cocktail: { title: "Cocktail party", desc: <>カジュアルな会合を盛り上げる、彩り豊かな演出。<br />フィンガーフードで会話も弾む特別な空間を演出します。</>, photos:["/cocktail-2.png", "/cocktail-3.png", "/business-16.png", "/cocktail-14.jpg", "/business-14.jpg", "/business-13.png"] },
  standing: { title: "Standing reception", desc: <>大切なビジネスシーンに適した効率的ディスプレイ。<br />ブランドイメージを高める洗練された立食スタイルを提供します。</>, photos:["/cocktail-7.png", "/business-12.jpg", "/business-4.jpg", "/business-1.jpeg", "/business-11.jpeg", "/business-9.jpeg"] },
  private: { title: "Private Dining", desc: <>オーダーメイドのレストラン。<br />すべてにこだわった特別な空間で、プライベートな贅沢をお楽しみください。</>, photos:["/private-4.jpg", "/private-5.jpeg", "/private-3.jpg", "/private-2.jpg", "/private-1.png", "/IMG_3120.JPG"] }
};

const App = () => {
  const[isScrolled, setIsScrolled] = useState(false);
  const[currentView, setCurrentView] = useState("home");
  const[selectedPlan, setSelectedPlan] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  },[]);

  const handlePlanSelect = (name) => {
    setSelectedPlan(name);
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (currentView !== "home") {
    const data = galleryData[currentView];
    useEffect(() => { window.scrollTo(0, 0); }, [currentView]);
    return (
      <div className="min-h-screen bg-white text-stone-800 p-12 animate-[fadeIn_0.5s_ease-out]">
        <button onClick={() => setCurrentView("home")} className="text-amber-600 mb-12 flex items-center tracking-widest text-xs border-b border-amber-600 pb-1 italic"><ChevronLeft size={16} className="mr-2" /> Back to Top</button>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl text-amber-600 font-serif italic mb-6 uppercase tracking-widest">{data?.title}</h2>
          <p className="mb-20 text-stone-500 leading-loose max-w-2xl mx-auto">{data?.desc}</p>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {data?.photos.map((img, i) => <img key={i} src={img} className="w-full shadow-lg hover:shadow-2xl transition-shadow duration-500" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-stone-800 font-serif selection:bg-amber-100 selection:text-amber-900">
      {/* Navbar (Elegant White) */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${isScrolled ? "bg-white/95 backdrop-blur-md py-3 shadow-sm" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-12 flex justify-between items-center">
          <div onClick={() => setCurrentView("home")} className="text-2xl tracking-[0.4em] font-light cursor-pointer text-stone-900 uppercase">{CONFIG.brandName}</div>
          <div className="flex space-x-12 text-[10px] tracking-[0.2em] uppercase text-stone-500">
            {["Concept", "Services", "Menu", "Gallery"].map(item => <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-amber-600 transition-colors">{item}</a>)}
            <a href="#contact" className="text-amber-600 font-bold">Reservation</a>
          </div>
        </div>
      </nav>

      {/* Hero (Ariel & Bright) */}
      <section className="h-screen relative overflow-hidden flex items-center justify-center">
        <img src={CONFIG.heroImage} className="absolute inset-0 w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-white/30"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-8xl text-stone-900 font-light leading-tight mb-8 drop-shadow-sm">
            華やかな装いを<br />あなただけの空間へ。
          </h1>
          <div className="w-16 h-[1px] bg-amber-600 mx-auto"></div>
        </div>
      </section>

      {/* Concept (Museum style) */}
      <section id="concept" className="py-40 bg-stone-50">
        <div className="max-w-7xl mx-auto px-12 flex flex-col md:flex-row items-center gap-24">
          <div className="w-full md:w-1/2 shadow-2xl">
            <img src={images.concept1} className="w-full h-[600px] object-cover" />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-amber-600 tracking-[0.3em] text-xs mb-10 uppercase italic">Concept</h3>
            <h2 className="text-5xl text-stone-900 font-light mb-12 leading-snug">感動の一瞬を<br />永遠の思い出に</h2>
            <p className="text-stone-600 mb-8 leading-loose font-light text-lg">
              {CONFIG.brandName}（ユヌ・ターブル）は、フランス語で「一つのテーブル」を意味します。私たちは、厳選された食材を確かな技術で、目にも美しい一皿へと昇華させます。
            </p>
            <p className="text-stone-600 leading-loose font-light text-lg">企業様のレセプションパーティーから、各団体様の大切な懇親会。「一つのテーブル」を囲むかけがえのない時間に、究極のおもてなしをお約束いたします。</p>
          </div>
        </div>
      </section>

      {/* Services (Clean Cards) */}
      <section id="services" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { id: "cocktail", title: "Cocktail party", img: images.serviceWedding, desc: "カジュアルな会合を盛り上げる、", highlight: "彩り豊かな演出" },
            { id: "standing", title: "Standing reception", img: images.serviceCorporate, desc: "大切なビジネスシーンに適した", highlight: "効率的ディスプレイ" },
            { id: "private", title: "Private Dining", img: images.servicePrivate, desc: "オーダーメイドのレストラン", highlight: "贅沢な特別な空間" },
          ].map(s => (
            <div key={s.id} onClick={() => setCurrentView(s.id)} className="group cursor-pointer">
              <div className="overflow-hidden mb-8 shadow-md group-hover:shadow-xl transition-all duration-700">
                <img src={s.img} className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-1000" />
              </div>
              <h4 className="text-2xl text-stone-900 mb-4 font-light tracking-widest border-l border-amber-600 pl-4 uppercase">{s.title}</h4>
              <p className="text-stone-500 text-sm tracking-widest font-light">{s.desc}<br /><span className="text-amber-600 font-normal mt-2 block italic">{s.highlight}</span></p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu (Elegant Typography) */}
      <section id="menu" className="py-40 bg-stone-50">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <h3 className="text-amber-600 tracking-[0.3em] text-[10px] uppercase mb-6 italic">Our Menu</h3>
          <h2 className="text-4xl text-stone-900 font-light mb-24 tracking-widest uppercase">スタンダードプラン</h2>
          <div className="space-y-24">
            {[
              { name: "立食スタイル", price: "¥4,500~", items:["フィンガーフード４品", "串もの４品", "寿司３品", "デザート", "お飲み物１２種"] },
              { name: "立食・着席", price: "¥6,000~", items:["フィンガーフード６品", "串もの６品", "寿司３品", "デザート２種", "お飲み物１７種"] },
              { name: "着席スタイル", price: "¥8,000~", items:["食材指定可能", "飲料指定可能", "着席配置可能", "演出指定可能","お飲み物２０種"] },
            ].map(plan => (
              <div key={plan.name} className="flex flex-col md:flex-row justify-between items-center border-b border-stone-200 pb-12 group">
                <div className="text-left">
                  <h3 className="text-3xl text-stone-900 font-light mb-2 group-hover:text-amber-600 transition-colors">{plan.name}</h3>
                  <p className="text-stone-400 text-xs tracking-widest uppercase">{plan.items.join(" / ")}</p>
                </div>
                <div className="mt-8 md:mt-0 flex flex-col items-end">
                  <p className="text-2xl text-stone-900 font-light mb-4">{plan.price} <span className="text-[10px] text-stone-400">/ person</span></p>
                  <button onClick={() => handlePlanSelect(plan.name)} className="text-[9px] tracking-[0.4em] uppercase border border-stone-300 px-10 py-3 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all">Select</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (Airy) */}
      <section className="py-32 bg-white text-center px-8">
        <Quote className="mx-auto text-amber-600/20 mb-12" size={40} />
        <p className="text-2xl md:text-3xl text-stone-700 font-light italic leading-relaxed max-w-4xl mx-auto mb-12">"創業記念のパーティーで利用しました。料理の美しさはもちろん、全員ソムリエの資格をお持ちでサービングの所作も完璧でした。"</p>
        <cite className="text-amber-600 tracking-[0.3em] uppercase text-[10px] not-italic">— 東京都 S.K様 (Private Dinner)</cite>
      </section>

      {/* Gallery (Grid) */}
      <section id="gallery" className="py-32 bg-stone-50 px-8">
        <h2 className="text-center text-3xl text-stone-900 font-light mb-20 tracking-widest uppercase">「テーブル」の記録</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {images.gallery.map((img, i) => <img key={i} src={img} className="w-full h-80 object-cover grayscale hover:grayscale-0 transition-all duration-1000" />)}
        </div>
      </section>

      {/* Contact (Minimalist Form) */}
      <section id="contact" className="py-40 bg-white">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-center text-4xl text-stone-900 font-light mb-24 tracking-[0.2em] uppercase">Reservation & Inquiry</h2>
          <div className="bg-stone-50 p-12 md:p-20 shadow-sm border border-stone-100">
            <form className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <input type="text" placeholder="NAME" className="bg-transparent border-b border-stone-300 py-4 focus:outline-none focus:border-amber-600 transition-colors text-sm" />
                <input type="email" placeholder="E-MAIL" className="bg-transparent border-b border-stone-300 py-4 focus:outline-none focus:border-amber-600 transition-colors text-sm" />
              </div>
              <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} className="w-full bg-transparent border-b border-stone-300 py-4 outline-none focus:border-amber-600 text-stone-500 text-sm">
                <option value="">SELECT PLAN</option>
                <option value="立食スタイル">立食スタイル</option>
                <option value="立食・着席">立食・着席</option>
                <option value="着席スタイル">着席スタイル</option>
              </select>
              <textarea placeholder="MESSAGE" className="w-full bg-transparent border-b border-stone-300 py-4 outline-none focus:border-amber-600 resize-none text-sm h-32"></textarea>
              <button className="w-full py-6 bg-stone-900 text-white tracking-[0.5em] text-[10px] uppercase hover:bg-amber-700 transition-all">Submit</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer (Minimal) */}
      <footer className="py-20 bg-white text-center border-t border-stone-100">
        <img src={CONFIG.logoImage} className="h-40 mx-auto mb-12 grayscale opacity-80" />
        <p className="text-stone-400 text-[10px] tracking-[0.3em] uppercase">&copy; {new Date().getFullYear()} {CONFIG.brandName} Catering.</p>
      </footer>
    </div>
  );
};

export default App;
