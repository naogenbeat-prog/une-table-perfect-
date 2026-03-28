import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight, Star, Quote, Mail, ChevronLeft } from "lucide-react";

// ▼ 自作Instagramアイコン ▼
const Instagram = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

// --- 設定エリア ---
const CONFIG = {
  brandName: "UNE TABLE",
  tagline: "華やかな装いを あなただけの空間へ ",
  heroImage:  "/hero-bg.jpg",
  logoImage: "/logo.png",
};

const images = {
  concept1: "/business-12.jpg",
  serviceWedding: "/cocktail-2.png",
  serviceCorporate: "/cocktail-7.png",
  servicePrivate: "/private-4.jpg",
  gallery:[
    "/business-4.jpg",
    "/business-1.jpeg",
    "/concept-img.png",
    "/cocktail-3.png",
    "/business-9.jpeg",
    "/private-5.jpeg",
  ],
};

// ▼ 各詳細ページ専用の画像・テキストデータ ▼
// （※ここに写真を書き足せば、各ページに無限に写真を追加できます！）
const galleryData = {
  cocktail: {
    title: "Cocktail party",
    desc: <>カジュアルな会合を盛り上げる、彩り豊かな演出。<br />フィンガーフードで会話も弾む特別な空間を演出します。</>,
    photos:[
      images.serviceWedding,
      "/cocktail-3.png",
      "/business-16.png",
      "/cocktail-14.jpg",
      "/business-14.jpg",
      "/business-13.png",
    ]
  },
  standing: {
    title: "Standing reception",
    desc: <>大切なビジネスシーンに適した効率的ディスプレイ。<br />ブランドイメージを高める洗練された立食スタイルを提供します。</>,
    photos:[
      images.serviceCorporate,
      "/business-12.jpg",
      "/business-4.jpg",
      "/business-1.jpeg",
      "/business-11.jpeg",
      "/business-11.png",
      "/business-9.jpeg",
    ]
  },
  private: {
    title: "Private",
    desc: <>オーダーメイドのレストラン。<br />すべてにこだわった特別な空間で、プライベートな贅沢をお楽しみください。</>,
    photos:[
      images.servicePrivate,
      "/private-5.jpeg",
      "/private-3.jpg",
      "/private-2.jpg",
    ]
  }
};

const Navbar = ({ isScrolled, currentView, onViewChange }) => {
  const handleNavClick = (e, target) => {
    if (currentView !== "home") {
      e.preventDefault();
      onViewChange("home");
      setTimeout(() => { const el = document.getElementById(target); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 100);
    }
  };
  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${isScrolled || currentView !== "home" ? "bg-zinc-950/95 backdrop-blur-md py-3 md:py-4 border-b border-zinc-800" : "bg-transparent py-4 md:py-6"}`}>
      <div className="w-full px-4 md:px-12 flex flex-col md:flex-row justify-center md:justify-start items-center gap-2 md:gap-16">
        <div onClick={() => onViewChange("home")} className="text-xl md:text-2xl text-white tracking-[0.3em] font-light cursor-pointer uppercase">
          {CONFIG.brandName}
        </div>
        <div className="flex space-x-4 md:space-x-10 items-center text-[11px] md:text-sm tracking-[0.1em] md:tracking-[0.2em] uppercase mt-1 md:mt-0">
          {["Concept", "Services", "Menu", "Gallery"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={(e) => handleNavClick(e, item.toLowerCase())} className="text-stone-300 hover:text-amber-500 transition-colors whitespace-nowrap">
              {item}
            </a>
          ))}
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="text-amber-500 hover:text-white transition-colors whitespace-nowrap font-bold">
            Reservation
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="relative h-screen overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img src={CONFIG.heroImage} alt="Catering Table" className="w-full h-full object-cover scale-105 animate-[subtle-zoom_20s_infinite_alternate]" />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/40 to-zinc-950"></div>
    </div>
    <div className="relative z-10 flex flex-col h-full px-4 max-w-4xl mx-auto pt-32 pb-32 md:pb-24">
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-light leading-tight text-center drop-shadow-lg -translate-y-16 md:-translate-y-12">
          華やかな装いを<br />あなただけの空間へ。
        </h1>
      </div>
      <div className="text-center">
        <p className="text-xl md:text-xl text-stone-300 font-light mb-8 max-w-2xl mx-auto leading-loose tracking-wide">
          厳選された旬の食材を使用し、目にも楽しい彩りを添えて。<br className="hidden md:block" />
          特別な日を彩る最高峰のケータリングをお届け致します。
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a href="#contact" className="bg-amber-600/10 backdrop-blur-sm border border-amber-500/50 text-amber-500 hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-all duration-500 px-10 py-4 tracking-[0.2em] uppercase text-sm">
            ご予約・ご相談
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Concept = () => (
  <section id="concept" className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 mb-26">
      <div className="w-full md:w-1/2 relative group">
        <div className="relative pb-[130%] overflow-hidden">
          <img src={images.concept1} alt="Concept" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
        </div>
        <div className="absolute -bottom-6 -right-6 w-full h-full border border-amber-500/20 -z-10"></div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="flex items-center gap-4 mb-20">
          <div className="h-[1px] w-12 bg-white"></div>
          <h3 className="text-white tracking-[0.2em] text-sm uppercase">CONSEPT</h3>
        </div>
        <h2 className="font-brand text-amber-500 text-5xl md:text-5xl text-amber-500 font-light leading-snug mb-20">感動の一瞬を<br />永遠の思い出に</h2>
        <p className="text-white mb-8 font-light text-base md:text-lg">{CONFIG.brandName}（ユヌ・ターブル）は、フランス語で「一つのテーブル」を意味します。私たちは、厳選された食材を確かな技術で、目にも美しい一皿へと昇華させます。</p>
        <p className="text-white leading-loose font-light text-base md:text-lg">企業様のレセプションパーティーから、各団体様の大切な懇親会。「一つのテーブル」を囲むかけがえのない時間に、究極のおもてなしをお約束いたします。</p>
      </div>
    </div>
  </section>
);

// ▼ すべてのカードがクリック可能になりました！ ▼
const Services = ({ onViewChange }) => (
  <section id="services" className="py-24 bg-zinc-900 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      {[
        { id: "cocktail", title: "Cocktail party", img: images.serviceWedding, desc: "カジュアルな会合を盛り上げる、", highlight: "彩り豊かな演出" },
        { id: "standing", title: "Standing receotion", img: images.serviceCorporate, desc: "大切なビジネスシーンに適した", highlight: "効率的ディスプレイ" },
        { id: "private", title: "Private", img: images.servicePrivate, desc: "オーダーメイドのレストラン", highlight: "すべてにこだわった特別な空間" },
      ].map((s, i) => (
        <div key={i} onClick={() => onViewChange(s.id)} className="group relative overflow-hidden aspect-[3/4] cursor-pointer">
          <img src={s.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" alt={s.title} />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
          <div className="absolute bottom-10 left-10 right-10">
            <h4 className="text-2xl text-white mb-4 font-light tracking-[0.2em] border-l-2 border-amber-500 pl-4">{s.title}</h4>
            <p className="text-stone-100 text-[14px] tracking-widest leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">{s.desc}<br /><span className="text-amber-500 font-bold text-lg md:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] block mt-1">{s.highlight}</span></p>
            {/* ▼ どのカードにも「View Photos」が表示されます ▼ */}
            <div className="absolute right-0 bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-x-4 group-hover:translate-x-0">
               <span className="text-amber-500 text-xs tracking-widest uppercase flex items-center mt-4">
                 <ChevronRight size={14} className="mr-1"/>View Photos
               </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const MenuSection = () => (
  <section id="menu" className="py-24 md:py-32 bg-zinc-950 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h3 className="text-amber-500 tracking-[0.2em] text-sm uppercase mb-4">Our Menu</h3>
        <h2 className="font-brand text-3xl md:text-5xl text-white font-light mb-6 tracking-wider">スタンダードプラン</h2>
        <div className="w-24 h-[1px] bg-amber-500/50 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: "立食スタイル", price: "¥4,500~", desc: "洗練されたスタンダードコース。軽やかに楽しめます。", items:["フィンガーフード４品", "串もの４品", "寿司３品", "デザート", "お飲み物１２種"] },
          { name: "立食・着席", price: "¥6,000~", desc: "当店のスペシャリティ。厳選食材を用いた華やかなセッティング。", items:["フィンガーフード６品", "串もの６品", "寿司３品", "デザート２種", "お飲み物１７種"] },
          { name: "着席スタイル", price: "¥8,000~", desc: "完全オーダーメイド。お客様の想いを形に致します。", items:["食材指定可能", "飲料指定可能", "着席配置可能", "演出指定可能","お飲み物２０種"] },
       ].map((plan, i) => (
          <div key={i} className="group p-10 border border-zinc-800 bg-zinc-900/30 hover:border-amber-500/50 transition-all duration-500">
            {/* ▼ Plan 1~3 の行はまるごと削除しました！ ▼ */}
            
            {/* ▼ プラン名を text-3xl md:text-4xl にして大きく！ ▼ */}
            <h3 className="text-3xl md:text-3xl text-white mb-4 font-light">{plan.name}</h3>
            
            <p className="text-xl text-stone-400 mb-6 font-sans">{plan.price} <span className="text-xs">/ person</span></p>
            <ul className="space-y-3 mb-10 text-xs tracking-widest text-stone-400 border-t border-zinc-800 pt-8">
              {plan.items.map((item) => <li key={item} className="flex items-center"><ChevronRight size={12} className="mr-2 text-amber-500" /> {item}</li>)}
            </ul>
            <button className="w-full py-4 border border-zinc-700 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all">Select Plan</button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 bg-zinc-900/50 border-y border-zinc-800/50 px-6">
    <div className="max-w-5xl mx-auto text-center">
      <Quote className="mx-auto text-amber-500/20 mb-8" size={60} />
      <p className="text-xl md:text-2xl text-stone-300 italic font-light leading-relaxed mb-8">"創業記念のパーティーで利用しました。料理の美しさはもちろん、<br className="hidden md:block" />全員ソムリエの資格をお持ちでサービングの所作も完璧でした。お酒の種類の豊富さにも驚きました。"</p>
      <div className="flex items-center justify-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-amber-500 text-amber-500" />)}
      </div>
      <cite className="text-amber-500 tracking-widest uppercase text-xs not-italic">- 東京都 S.K様 (Private Dinner)</cite>
    </div>
  </section>
);

const Gallery = () => (
  <section id="gallery" className="py-24 md:py-32 px-4 md:px-8 max-w-screen-2xl mx-auto">
    <div className="text-center mb-20">
      <h3 className="text-amber-500 tracking-[0.2em] text-sm uppercase mb-6">Gallery</h3>
      <h2 className="font-brand text-3xl md:text-5xl text-white font-light tracking-wide">「テーブル」の記録</h2>
    </div>
    <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
      {images.gallery.map((img, idx) => (
        <div key={idx} className="relative overflow-hidden group break-inside-avoid bg-zinc-900">
          <img src={img} className="w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 opacity-90 group-hover:opacity-100" alt={`Gallery ${idx}`} />
        </div>
      ))}
    </div>
  </section>
);

const Contact = () => {
  const[formData, setFormData] = useState({ name: "", email: "", message: "" });
  const[status, setStatus] = useState("idle");
  
  const handleChange = (e) => { 
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); 
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "f62692b3-e35a-46dc-8cfb-39afaab1ee76",
          subject: "【une table】Webサイトから新しいお問い合わせがあります",
          name: formData.name, email: formData.email, message: formData.message,
        }),
      });
      if (response.status === 200) { setStatus("success"); setFormData({ name: "", email: "", message: "" }); } 
      else { setStatus("error"); }
    } catch (error) { setStatus("error"); }
  };

  return (
    <section id="contact" className="pt-24 pb-12 md:pt-32 md:pb-16 bg-zinc-950">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h3 className="text-amber-500 tracking-[0.2em] text-sm uppercase mb-6">Contact</h3>
          <h2 className="font-brand text-3xl md:text-5xl text-white font-light mb-8">ご予約・お問い合わせ</h2>
        </div>
        <div className="bg-zinc-900/50 p-8 md:p-14 border border-zinc-800 relative min-h-[400px] flex flex-col justify-center">
          {status === "success" ? (
            <div className="text-center py-12 animate-[fadeIn_0.5s_ease-out]">
              <h3 className="text-2xl text-amber-500 mb-4 tracking-widest font-light">Thank You.</h3>
              <p className="text-stone-300 leading-loose text-sm md:text-base">お問い合わせを受け付けました。<br />担当者より順次ご連絡いたします。</p>
              <button onClick={() => setStatus("idle")} className="mt-10 border border-amber-500/50 text-amber-500 px-8 py-3 hover:bg-amber-600 hover:text-white transition-all text-xs tracking-widest uppercase">別の問い合わせをする</button>
            </div>
          ) : (
            <form className="space-y-8 animate-[fadeIn_0.5s_ease-out]" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="お名前" className="bg-transparent border-b border-zinc-700 text-white py-2 focus:outline-none focus:border-amber-500 transition-colors" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="メールアドレス" className="bg-transparent border-b border-zinc-700 text-white py-2 focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
              <textarea rows="4" name="message" value={formData.message} onChange={handleChange} required placeholder="ご相談内容" className="w-full bg-transparent border-b border-zinc-700 text-white py-2 focus:outline-none focus:border-amber-500 resize-none transition-colors"></textarea>
              <button type="submit" disabled={status === "submitting"} className={`w-full py-4 tracking-widest uppercase transition-all duration-300 ${status === "submitting" ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" : "bg-amber-600 hover:bg-amber-500 text-white"}`}>{status === "submitting" ? "送信中..." : "送信する"}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

// ▼ 【大進化】どのカードを押しても使える「万能ギャラリーページ」 ▼
const DetailGalleryView = ({ viewId, onBack }) => {
  const data = galleryData[viewId]; // クリックされた場所のデータを引き出します
  
  // ページを開いた時に一番上にスクロールする魔法
  useEffect(() => { window.scrollTo(0, 0); }, [viewId]);

  if (!data) return null; // データがない時は何もしない（エラー防止）

  return (
    <div className="min-h-screen bg-zinc-950 pt-28 pb-24 px-6 md:px-12 animate-[fadeIn_0.5s_ease-out]">
      <div className="max-w-7xl mx-auto">
        <button onClick={onBack} className="text-amber-500 hover:text-white transition-colors mb-12 tracking-widest text-sm uppercase flex items-center">
          <ChevronLeft size={16} className="mr-2" /> Back to Top
        </button>
        
        {/* ▼ text-center（文字の中央揃え）を追加！ ▼ */}
        <div className="mb-16 text-center">
          <h2 className="font-brand text-4xl md:text-5xl text-amber-500 font-light mb-6">{data.title}</h2>
          
          {/* ▼ mx-auto（文章の枠自体を中央に配置する）を追加！ ▼ */}
          <p className="text-stone-400 leading-loose max-w-2xl mx-auto">{data.desc}</p>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {data.photos.map((img, idx) => (
            <div key={idx} className="relative overflow-hidden group break-inside-avoid bg-zinc-900">
              <img src={img} className="w-full object-cover transition-transform duration-[2000ms] hover:scale-105" alt={`${data.title} ${idx}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const[isScrolled, setIsScrolled] = useState(false);
  const[currentView, setCurrentView] = useState("home"); // home, cocktail, standing, private

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  },[]);

  return (
    <div className="min-h-screen bg-zinc-950 text-stone-300 font-serif selection:bg-amber-900 selection:text-white">
      <Navbar isScrolled={isScrolled} currentView={currentView} onViewChange={setCurrentView} />
      
      {/* ▼ スイッチによって表示する中身を切り替える ▼ */}
      {currentView === "home" ? (
        <>
          <Hero />
          <Concept />
          {/* クリックされたカードのID（cocktail, standing, private）をスイッチに渡す */}
          <Services onViewChange={setCurrentView} />
          <MenuSection />
          <Testimonials />
          <Gallery />
          <Contact />
        </>
      ) : (
        /* クリックされたカードのIDをギャラリーページに渡して表示！ */
        <DetailGalleryView viewId={currentView} onBack={() => setCurrentView("home")} />
      )}

      <footer className="py-16 bg-zinc-950 text-center border-t border-zinc-900">
        {/* ▼ 文字を画像ロゴに変更し、高さを大きく設定（スマホ:80px, パソコン:128px） ▼ */}
        <img src={CONFIG.logoImage} alt={CONFIG.brandName} className="h-[180px] md:h-[240px] w-auto mx-auto mb-10 object-contain" />
        
        {/* ▼ アイコンのサイズを 18 から 32 に巨大化！間隔も少し広げました ▼ */}
        <div className="flex justify-center items-center space-x-8 mb-10 text-stone-500">
          <a href="#contact" className="hover:text-white transition-colors"><Mail size={48} /></a>
          <a href="https://www.instagram.com/unetable_catering" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram size={48} /></a>
        </div>
        
        <p className="text-stone-700 text-[10px] tracking-widest uppercase">&copy; {new Date().getFullYear()} {CONFIG.brandName} Catering.</p>
      </footer>
      <style dangerouslySetInnerHTML={{ __html: `@keyframes subtle-zoom { from { transform: scale(1); } to { transform: scale(1.1); } } @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } html { scroll-behavior: smooth; }`}} />
    </div>
  );
};

export default App;
