import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight, Star, Quote, Mail, ChevronLeft } from "lucide-react";

// --- 設定エリア（コピー・分類は一切変えていません） ---
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
  gallery:[
    "/business-4.jpg",
    "/business-1.jpeg",
    "/roastbeef.jpeg",
    "/cocktail-3.png",
    "/business-9.jpeg",
    "/private-5.jpeg",
  ],
};

const galleryData = {
  cocktail: {
    title: "Cocktail party",
    desc: <>カジュアルな会合を盛り上げる、彩り豊かな演出。<br />フィンガーフードで会話も弾む特別な空間を演出します。</>,
    photos:["/cocktail-2.png", "/cocktail-3.png", "/business-16.png", "/cocktail-14.jpg", "/business-14.jpg", "/business-13.png"]
  },
  standing: {
    title: "Standing reception",
    desc: <>大切なビジネスシーンに適した効率的ディスプレイ。<br />ブランドイメージを高める洗練された立食スタイルを提供します。</>,
    photos:["/cocktail-7.png", "/business-12.jpg", "/business-4.jpg", "/business-1.jpeg", "/business-11.jpeg", "/business-9.jpeg"]
  },
  private: {
    title: "Private Dining",
    desc: <>オーダーメイドのレストラン。<br />すべてにこだわった特別な空間で、プライベートな贅沢をお楽しみください。</>,
    photos:["/private-4.jpg", "/private-5.jpeg", "/private-3.jpg", "/private-2.jpg", "/private-1.png", "/IMG_3120.JPG"]
  }
};

const Instagram = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Navbar = ({ isScrolled, currentView, onViewChange }) => {
  const handleNavClick = (e, target) => {
    if (currentView !== "home") {
      e.preventDefault();
      onViewChange("home");
      setTimeout(() => { const el = document.getElementById(target); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 100);
    }
  };
  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${isScrolled || currentView !== "home" ? "bg-white/95 backdrop-blur-md py-3 border-b border-stone-100 shadow-sm" : "bg-transparent py-6"}`}>
      <div className="w-full px-4 md:px-12 flex flex-col md:flex-row justify-center md:justify-start items-center gap-2 md:gap-16">
        <div onClick={() => onViewChange("home")} className="text-xl md:text-2xl text-stone-900 tracking-[0.3em] font-light cursor-pointer uppercase">{CONFIG.brandName}</div>
        <div className="flex space-x-4 md:space-x-10 items-center text-[11px] md:text-sm tracking-[0.2em] uppercase">
          {["Concept", "Services", "Menu", "Gallery"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={(e) => handleNavClick(e, item.toLowerCase())} className="text-stone-500 hover:text-amber-600 transition-colors">{item}</a>
          ))}
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="text-amber-600 font-bold">Reservation</a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="relative h-screen overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img src={CONFIG.heroImage} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-white/20"></div>
    </div>
    <div className="relative z-10 flex flex-col h-full px-4 max-w-4xl mx-auto pt-32 text-center">
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="font-serif text-4xl md:text-7xl text-stone-900 font-light leading-tight drop-shadow-sm -translate-y-16">華やかな装いを<br />あなただけの空間へ。</h1>
      </div>
      <div className="pb-32 text-stone-800">
        <p className="text-xl font-light mb-8 max-w-2xl mx-auto leading-loose tracking-wide">
          厳選された旬の食材を使用し、目にも楽しい彩りを添えて。<br className="hidden md:block" />
          特別な日を彩る最高峰のケータリングをお届け致します。
        </p>
      </div>
    </div>
  </section>
);

const Concept = () => (
  <section id="concept" className="py-24 md:py-40 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
    <div className="w-full md:w-1/2 relative">
      <img src={images.concept1} className="w-full h-[600px] object-cover shadow-2xl" />
      <div className="absolute -bottom-6 -right-6 w-full h-full border border-amber-500/20 -z-10"></div>
    </div>
    <div className="w-full md:w-1/2 text-stone-800">
      <h3 className="text-amber-600 tracking-[0.2em] text-xs mb-8 uppercase italic">CONCEPT</h3>
      <h2 className="text-4xl md:text-5xl text-stone-900 font-light mb-10 leading-snug">感動の一瞬を<br />永遠の思い出に</h2>
      <p className="mb-8 font-light text-lg leading-loose text-stone-600">
        {CONFIG.brandName}（ユヌ・ターブル）は、フランス語で「一つのテーブル」を意味します。私たちは、厳選された食材を確かな技術で、目にも美しい一皿へと昇華させます。
      </p>
      <p className="leading-loose font-light text-lg text-stone-600">企業様のレセプションパーティーから、各団体様の大切な懇親会。「一つのテーブル」を囲むかけがえのない時間に、究極のおもてなしをお約束いたします。</p>
    </div>
  </section>
);

const Services = ({ onViewChange }) => (
  <section id="services" className="py-24 bg-stone-50 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      {[
        { id: "cocktail", title: "Cocktail Party", img: images.serviceWedding, desc: "カジュアルな会合を盛り上げる、", highlight: "彩り豊かな演出" },
        { id: "standing", title: "Standing Reception", img: images.serviceCorporate, desc: "大切なビジネスシーンに適した", highlight: "効率的ディスプレイ" },
        { id: "private", title: "Private Dining", img: images.servicePrivate, desc: "オーダーメイドのレストラン", highlight: "贅沢な特別な空間" },
      ].map((s, i) => (
        <div key={i} onClick={() => onViewChange(s.id)} className="group cursor-pointer">
          <div className="aspect-[3/4] overflow-hidden mb-8 shadow-lg transition-transform duration-700 group-hover:shadow-2xl">
            <img src={s.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={s.title} />
          </div>
          <div className="flex items-start">
            <div className="w-[2px] h-12 bg-amber-500 mr-5 mt-1"></div>
            <div>
              <h4 className="text-2xl text-stone-900 font-light tracking-[0.1em] uppercase mb-4">{s.title}</h4>
              {/* 文字サイズを大きく調整 (text-lg) */}
              <p className="text-stone-500 text-lg tracking-widest leading-relaxed">
                {s.desc}<br />
                <span className="text-amber-600 font-bold block mt-1">{s.highlight}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const MenuSection = ({ onSelectPlan }) => (
  <section id="menu" className="py-24 bg-white px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h3 className="text-amber-600 tracking-[0.2em] text-xs uppercase mb-4 italic">Our Menu</h3>
        <h2 className="text-3xl md:text-5xl text-stone-900 font-light mb-6 tracking-wider">スタンダードプラン</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: "立食スタイル", price: "¥4,500~", items:["フィンガーフード４品", "串もの４品", "寿司３品", "デザート", "お飲み物１２種"] },
          { name: "立食・着席", price: "¥6,000~", items:["フィンガーフード６品", "串もの６品", "寿司３品", "デザート２種", "お飲み物１７種"] },
          { name: "着席スタイル", price: "¥8,000~", items:["食材指定可能", "飲料指定可能", "着席配置可能", "演出指定可能","お飲み物２０種"] },
       ].map((plan, i) => (
          <div key={i} className="group p-10 border border-stone-100 bg-stone-50 hover:border-amber-500/50 transition-all shadow-sm hover:shadow-md">
            <h3 className="text-2xl text-stone-900 mb-4 font-light">{plan.name}</h3>
            <p className="text-xl text-amber-600 mb-6 font-sans">{plan.price} / person</p>
            <ul className="space-y-3 mb-10 text-xs text-stone-500 border-t border-stone-200 pt-8">
              {plan.items.map((item) => <li key={item} className="flex items-center"><ChevronRight size={12} className="mr-2 text-amber-500" /> {item}</li>)}
            </ul>
            <button onClick={() => onSelectPlan(plan.name)} className="w-full py-4 border border-stone-300 text-stone-800 text-xs tracking-[0.2em] uppercase hover:bg-stone-900 hover:text-white transition-all">Select Plan</button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 bg-stone-50 px-6 border-y border-stone-100">
    <div className="max-w-5xl mx-auto text-center">
      <Quote className="mx-auto text-amber-500/10 mb-8" size={60} />
      <p className="text-xl md:text-2xl text-stone-700 italic font-light leading-relaxed mb-8">"創業記念のパーティーで利用しました。料理の美しさはもちろん、<br />全員ソムリエの資格をお持ちでサービングの所作も完璧でした。"</p>
      <div className="flex justify-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-amber-500 text-amber-500" />)}
      </div>
      <cite className="text-amber-600 tracking-widest uppercase text-[10px] not-italic">- 東京都 S.K様 (Private Dinner)</cite>
    </div>
  </section>
);

const Gallery = () => (
  <section id="gallery" className="py-24 px-4 max-w-screen-2xl mx-auto bg-white">
    <div className="text-center mb-20">
      <h3 className="text-amber-500 tracking-[0.2em] text-sm uppercase mb-6">Gallery</h3>
      <h2 className="text-3xl md:text-5xl text-stone-900 font-light tracking-wide">「テーブル」の記録</h2>
    </div>
    {/* 均等な3カラムグリッドに変更 */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {images.gallery.map((img, idx) => (
        <div key={idx} className="relative overflow-hidden group aspect-square shadow-sm">
          <img src={img} className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-110" alt={`Gallery ${idx}`} />
        </div>
      ))}
    </div>
  </section>
);

const Contact = ({ selectedPlan, onPlanChange }) => {
  const[formData, setFormData] = useState({ name: "", email: "", message: "" });
  const[status, setStatus] = useState("idle");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_key: "f62692b3-e35a-46dc-8cfb-39afaab1ee76", plan: selectedPlan, ...formData }),
      });
      setStatus("success");
    } catch (e) { setStatus("error"); }
  };
  return (
    <section id="contact" className="py-24 bg-stone-100">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-center text-3xl md:text-5xl text-stone-900 font-light mb-16 italic">Reservation & Inquiry</h2>
        <div className="bg-white p-8 md:p-14 shadow-xl border border-stone-200 rounded-lg">
          {status === "success" ? (
            <div className="text-center text-amber-600 py-12 text-xl font-light">Thank You. 送信完了しました。</div>
          ) : (
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input type="text" name="name" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} required placeholder="お名前" className="bg-stone-50 border-b border-stone-300 text-stone-900 py-3 px-2 focus:outline-none focus:border-amber-500 transition-colors" />
                <input type="email" name="email" value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})} required placeholder="メールアドレス" className="bg-stone-50 border-b border-stone-300 text-stone-900 py-3 px-2 focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
              <select value={selectedPlan} onChange={(e) => onPlanChange(e.target.value)} className="w-full bg-stone-50 border-b border-stone-300 text-stone-600 py-4 px-4 outline-none focus:border-amber-500 appearance-none">
                <option value="">プランを選択してください</option>
                <option value="立食スタイル">立食スタイル</option>
                <option value="立食・着席">立食・着席</option>
                <option value="着席スタイル">着席スタイル</option>
              </select>
              <textarea name="message" value={formData.message} onChange={(e)=>setFormData({...formData, message:e.target.value})} required placeholder="ご相談内容" className="w-full bg-stone-50 border-b border-stone-300 text-stone-900 py-3 px-2 outline-none focus:border-amber-500 h-32 resize-none transition-colors"></textarea>
              <button type="submit" className="w-full py-5 bg-stone-900 hover:bg-amber-600 text-white tracking-[0.3em] uppercase transition-all shadow-lg">送信する</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const DetailGalleryView = ({ viewId, onBack }) => {
  const data = galleryData[viewId];
  useEffect(() => { window.scrollTo(0, 0); }, [viewId]);
  if (!data) return null;
  return (
    <div className="min-h-screen bg-white pt-28 pb-24 px-6 animate-[fadeIn_0.5s_ease-out]">
      <div className="max-w-7xl mx-auto">
        <button onClick={onBack} className="text-amber-600 hover:text-stone-900 mb-12 flex items-center tracking-widest text-xs uppercase"><ChevronLeft size={16} className="mr-2" /> Back to Top</button>
        <div className="mb-16 text-center"><h2 className="font-brand text-4xl text-amber-600 mb-6 italic">{data.title}</h2><p className="text-stone-500 max-w-2xl mx-auto leading-loose">{data.desc}</p></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{data.photos.map((img, i) => (<img key={i} src={img} className="w-full h-80 object-cover shadow-md hover:shadow-xl transition-shadow" />))}</div>
      </div>
    </div>
  );
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
  return (
    <div className="min-h-screen bg-white text-stone-800 font-serif selection:bg-amber-100 selection:text-stone-900">
      <Navbar isScrolled={isScrolled} currentView={currentView} onViewChange={setCurrentView} />
      {currentView === "home" ? (
        <>
          <Hero />
          <Concept />
          <Services onViewChange={setCurrentView} />
          <MenuSection onSelectPlan={handlePlanSelect} />
          <Testimonials />
          <Gallery />
          <Contact selectedPlan={selectedPlan} onPlanChange={setSelectedPlan} />
        </>
      ) : (
        <DetailGalleryView viewId={currentView} onBack={() => setCurrentView("home")} />
      )}
      <footer className="py-20 bg-white text-center border-t border-stone-100">
        <img src={CONFIG.logoImage} className="h-[180px] mx-auto mb-10 object-contain grayscale opacity-80" />
        <div className="flex justify-center space-x-8 mb-10 text-stone-400">
          <Mail size={32} className="hover:text-amber-600 cursor-pointer transition-colors" /><Instagram size={32} className="hover:text-amber-600 cursor-pointer transition-colors" />
        </div>
        <p className="text-stone-400 text-[10px] tracking-widest uppercase">&copy; {new Date().getFullYear()} UNE TABLE Catering.</p>
      </footer>
    </div>
  );
};

export default App;
