import { useState, useEffect } from "react";

const CONFIG = {
  brandName: "UNE TABLE",
  tagline: "華やかな装いを あなただけの空間へ",
};

const services = [
  { 
    key: "cocktail", 
    title: "Cocktail Party", 
    sub: "カクテルパーティー", 
    desc: "カジュアルな会合を盛り上げる、彩り豊かな演出。フィンガーフードで会話も弾む特別な空間。",
    img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    key: "standing", 
    title: "Standing Reception", 
    sub: "スタンディングレセプション", 
    desc: "大切なビジネスシーンに適した洗練されたスタイル。ブランドイメージを高める立食形式を提供。",
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    key: "private", 
    title: "Private", 
    sub: "プライベートダイニング", 
    desc: "オーダーメイドのレストラン。すべてにこだわった特別な空間で、プライベートな贅沢を。",
    img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80" 
  },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [selectedPlan, setSelectedPlan] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const move = e => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const handleSelectPlan = (planName) => {
    setSelectedPlan(planName);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'EB Garamond', 'Noto Serif JP', serif", background: "#0a0a0a", color: "#f8f5f0", minHeight: "100vh", overflowX: "hidden", cursor: "none" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,300;0,400;1,400&family=Noto+Serif+JP:wght@200;300&family=Bebas+Neue&family=Raleway:wght@100;300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        
        /* サービスカードの設定 */
        .service-card { position: relative; height: 600px; overflow: hidden; cursor: none; transition: 0.6s ease; }
        .service-card img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%) brightness(0.6); transition: 0.6s; }
        .service-card:hover img { filter: grayscale(0%) brightness(0.5); transform: scale(1.05); }

        .overlay { 
          position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
          /* 上下を暗くして文字を浮かび上がらせる */
          background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%);
          display: flex; 
          flex-direction: column; 
          justify-content: space-between; /* ★上と下に振り分ける設定 */
          padding: 50px 30px; 
        }

        /* ★タイトルと金色の線（上部） */
        .top-content { display: flex; align-items: flex-start; }
        .gold-line { width: 3px; height: 65px; background: #d4af37; margin-right: 20px; }
        .svc-title { font-size: 2.4rem; font-weight: 400; line-height: 1.1; color: #d4af37; letter-spacing: 0.05em; text-align: left; }

        /* ★説明文（下部） */
        .svc-desc { font-family: 'Noto Serif JP', serif; font-size: 14px; font-weight: 300; line-height: 1.8; color: #ffffff; max-width: 280px; text-align: left; }

        .nav-link { font-family: 'Raleway', sans-serif; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; text-decoration: none; color: #a09080; transition: 0.3s; }
        .nav-link:hover { color: #d4af37; }
      `}</style>

      {/* カスタムカーソル */}
      <div style={{ position: "fixed", zIndex: 9999, pointerEvents: "none", left: cursorPos.x - 12, top: cursorPos.y - 12, width: 24, height: 24, borderRadius: "50%", border: "1px solid #d4af37", transition: "left 0.08s, top 0.08s", mixBlendMode: "screen" }} />

      {/* ナビゲーション */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: scrolled ? "15px 8vw" : "30px 8vw", transition: "all 0.6s", background: scrolled ? "rgba(10,10,10,0.95)" : "transparent", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: "0.5em", color: "#d4af37" }}>{CONFIG.brandName}</div>
        <div style={{ display: "flex", gap: 40 }}>
          {["Services", "Contact"].map(item => <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>)}
        </div>
      </nav>

      {/* Hero エリア */}
      <section style={{ height: "45vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", background: "#0a0a0a" }}>
        <div>
          <h1 style={{ fontSize: "3.5rem", fontStyle: "italic", letterSpacing: "0.2em", color: "#d4af37" }}>{CONFIG.brandName}</h1>
          <p style={{ fontSize: "0.9rem", letterSpacing: "0.4em", fontWeight: "100", opacity: 0.6, marginTop: "10px" }}>{CONFIG.tagline}</p>
        </div>
      </section>

      {/* サービス一覧（ここをご要望通りに修正しました） */}
      <section id="services" style={{ padding: "0 5vw 100px", background: "#0a0a0a" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "25px" }}>
          {services.map((s) => (
            <div key={s.key} className="service-card" onClick={() => handleSelectPlan(s.sub)}>
              <img src={s.img} alt={s.title} />
              <div className="overlay">
                
                {/* 【上側】金色の線とタイトル */}
                <div className="top-content">
                  <div className="gold-line"></div>
                  <h3 className="svc-title">
                    {s.title.split(' ').map((word, i) => <span key={i} style={{ display: "block" }}>{word}</span>)}
                  </h3>
                </div>

                {/* 【下側】白い説明文 */}
                <div>
                  <p className="svc-desc">{s.desc}</p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* お問い合わせ（プラン連動） */}
      <section id="contact" style={{ padding: "120px 8vw", background: "#0f0f0f", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
          <div>
            <h2 style={{ fontSize: "48px", fontStyle: "italic", marginBottom: "30px", color: "#d4af37" }}>Inquiry</h2>
            <p style={{ fontSize: "14px", lineHeight: "2", color: "#a09080" }}>
              特別な一日のための、世界に一つだけのプランをご提案します。
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} style={{ width: "100%", padding: "15px", background: "transparent", border: "none", borderBottom: "1px solid #333", color: "#fff", outline: "none" }}>
              <option value="" style={{color: "#000"}}>希望プランを選択してください</option>
              <option value="カクテルパーティー" style={{color: "#000"}}>Cocktail Party</option>
              <option value="スタンディングレセプション" style={{color: "#000"}}>Standing Reception</option>
              <option value="プライベートダイニング" style={{color: "#000"}}>Private Dining</option>
            </select>
            <textarea placeholder="メッセージを入力してください" style={{ width: "100%", height: "120px", background: "transparent", border: "none", borderBottom: "1px solid #333", color: "#fff", resize: "none", outline: "none" }} />
            <button style={{ padding: "20px", background: "#d4af37", color: "#000", border: "none", fontWeight: "bold", letterSpacing: "0.4em", fontSize: "12px", cursor: "none" }}>SEND MESSAGE</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "60px 8vw", background: "#000", textAlign: "center", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: "0.5em", color: "#d4af37" }}>{CONFIG.brandName}</div>
        <p style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#333", marginTop: "20px" }}>© 2024 UNE TABLE. All rights reserved.</p>
      </footer>
    </div>
  );
}
