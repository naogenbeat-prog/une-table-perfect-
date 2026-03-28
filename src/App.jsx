import { useState, useEffect } from "react";

const CONFIG = {
  brandName: "UNE TABLE",
  tagline: "華やかな装いを あなただけの空間へ",
};

const services = [
  { key: "cocktail", title: "Cocktail Party", sub: "カクテルパーティー", desc: "カジュアルな会合を盛り上げる、彩り豊かな演出。フィンガーフードで会話も弾む特別な空間。", img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80" },
  { key: "standing", title: "Standing Reception", sub: "スタンディングレセプション", desc: "大切なビジネスシーンに適した洗練されたスタイル。ブランドイメージを高める立食形式を提供。", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80" },
  { key: "private", title: "Private Dining", sub: "プライベートダイニング", desc: "オーダーメイドのレストラン。すべてにこだわった特別な空間で、プライベートな贅沢を。", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80" },
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
    <div style={{ fontFamily: "'EB Garamond', 'Noto Serif JP', serif", background: "#f8f5f0", color: "#1a1510", minHeight: "100vh", overflowX: "hidden", cursor: "none" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,300;0,400;1,400&family=Noto+Serif+JP:wght@200;300&family=Bebas+Neue&family=Raleway:wght@100;300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        
        /* アニメーション */
        @keyframes rotateSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .rotating { animation: rotateSlow 20s linear infinite; }

        /* サービスカード */
        .service-card { position: relative; height: 600px; overflow: hidden; cursor: none; transition: 0.6s ease; }
        .service-card img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%) brightness(0.8); transition: 0.6s; }
        .service-card:hover img { filter: grayscale(0%) brightness(0.7); transform: scale(1.05); }

        .overlay { 
          position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
          background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.8) 100%);
          display: flex; 
          flex-direction: column; 
          justify-content: space-between; /* ★上と下に分ける */
          padding: 60px 30px; 
        }

        .yellow-line { width: 3px; height: 60px; background: #b8860b; margin-right: 20px; }
        .svc-title { font-size: 2.2rem; font-weight: 400; line-height: 1.1; color: #f8f5f0; }
        .svc-desc { font-family: 'Noto Serif JP', serif; font-size: 13px; font-weight: 200; line-height: 1.9; color: #c4b8a8; max-width: 280px; }

        .nav-link { font-family: 'Raleway', sans-serif; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; text-decoration: none; color: #6a5a4a; transition: 0.3s; }
        .nav-link:hover { color: #1a1510; }
      `}</style>

      {/* カスタムカーソル */}
      <div style={{
        position: "fixed", zIndex: 9999, pointerEvents: "none",
        left: cursorPos.x - 12, top: cursorPos.y - 12,
        width: 24, height: 24, borderRadius: "50%",
        border: "1px solid #1a1510", transition: "left 0.08s, top 0.08s",
        mixBlendMode: "multiply",
      }} />

      {/* ナビゲーション */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "15px 8vw" : "30px 8vw",
        transition: "all 0.6s",
        background: scrolled ? "rgba(248,245,240,0.96)" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: "0.5em" }}>{CONFIG.brandName}</div>
        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {["Services", "Gallery", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
          ))}
        </div>
      </nav>

      {/* ヒーロー */}
      <section style={{ minHeight: "80vh", display: "flex", alignItems: "center", padding: "100px 8vw", position: "relative", overflow: "hidden" }}>
        <div className="rotating" style={{ position: "absolute", top: "10%", right: "5%", width: 300, height: 300, border: "1px solid #e0d8cc", borderRadius: "50%", opacity: 0.3 }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "clamp(60px, 10vw, 120px)", fontWeight: 300, fontStyle: "italic", lineHeight: 0.9 }}>
            Une<br />Table
          </h1>
          <div style={{ width: 100, height: 2, background: "#1a1510", margin: "40px 0" }} />
          <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "16px", letterSpacing: "0.2em", color: "#6a5a4a" }}>{CONFIG.tagline}</p>
        </div>
      </section>

      {/* サービス一覧（ここが今回の修正ポイント） */}
      <section id="services" style={{ padding: "100px 5vw", background: "#f8f5f0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
          {services.map((s) => (
            <div key={s.key} className="service-card" onClick={() => handleSelectPlan(s.sub)}>
              <img src={s.img} alt={s.title} />
              <div className="overlay">
                
                {/* 【上側】タイトルと線 */}
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <div className="yellow-line"></div>
                  <h3 className="svc-title">
                    {s.title.split(' ').map((word, i) => <span key={i} style={{ display: "block" }}>{word}</span>)}
                  </h3>
                </div>

                {/* 【下側】説明文 */}
                <div>
                  <p className="svc-desc">{s.desc}</p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 引用セクション（豪華版のパーツ） */}
      <section style={{ padding: "150px 8vw", background: "#1a1510", color: "#f8f5f0", textAlign: "center" }}>
        <p style={{ fontSize: "clamp(24px, 4vw, 42px)", fontStyle: "italic", fontWeight: 300, maxWidth: 900, margin: "0 auto", lineHeight: 1.6 }}>
          " 食と空間が織りなす、忘れられない体験。 "<br />
          <span style={{ fontSize: "14px", letterSpacing: "0.3em", color: "#8a7a6a", textTransform: "uppercase" }}>UNE TABLE Philosophy</span>
        </p>
      </section>

      {/* お問い合わせ（プラン連動） */}
      <section id="contact" style={{ padding: "120px 8vw", background: "#f8f5f0" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
          <div>
            <h2 style={{ fontSize: "48px", fontStyle: "italic", marginBottom: "30px" }}>Reservation</h2>
            <p style={{ fontSize: "14px", lineHeight: "2", color: "#6a5a4a", marginBottom: "40px" }}>
              特別な空間のご予約・お問い合わせはこちらから。専任スタッフが丁寧にご対応いたします。
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <div>
              <label style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#a09080" }}>PLAN SELECT</label>
              <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} style={{ width: "100%", padding: "15px", background: "transparent", border: "none", borderBottom: "1px solid #ddd", color: "#1a1510", outline: "none" }}>
                <option value="">プランを選択してください</option>
                <option value="カクテルパーティー">Cocktail Party</option>
                <option value="スタンディングレセプション">Standing Reception</option>
                <option value="プライベートダイニング">Private Dining</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#a09080" }}>MESSAGE</label>
              <textarea placeholder="ご要望をご記入ください" style={{ width: "100%", height: "120px", background: "transparent", border: "none", borderBottom: "1px solid #ddd", resize: "none", outline: "none" }} />
            </div>
            <button style={{ padding: "20px", background: "#1a1510", color: "#f8f5f0", border: "none", letterSpacing: "0.4em", fontSize: "10px", cursor: "none" }}>SEND INQUIRY</button>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer style={{ padding: "60px 8vw", background: "#1a1510", color: "#3a2e20", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: "0.5em" }}>{CONFIG.brandName}</div>
        <p style={{ fontSize: "9px", letterSpacing: "0.2em" }}>© 2024 UNE TABLE. All rights reserved.</p>
      </footer>
    </div>
  );
}
