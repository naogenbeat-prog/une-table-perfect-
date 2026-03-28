import { useState } from "react";

// サービスのデータ（ここを書き換えるだけで内容が変わります）
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
    desc: "大切なビジネスシーンに適した洗練されたスタイル。ブランドイメージを高める立食形式をご提供。",
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    key: "private", 
    title: "Private Dining", 
    sub: "プライベートダイニング", 
    desc: "オーダーメイドのレストラン。すべてにこだわった特別な空間で、プライベートな贅沢を。",
    img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80" 
  },
];

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleSelectPlan = (planName) => {
    setSelectedPlan(planName);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "serif", background: "#1a1510", color: "#f8f5f0", minHeight: "100vh" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .service-card { 
          position: relative; 
          height: 600px; 
          overflow: hidden; 
          cursor: pointer; 
          border: 1px solid #333; 
        }

        .overlay { 
          position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
          /* 背景を上下だけ暗くするグラデーション */
          background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.8) 100%);
          display: flex; 
          flex-direction: column; 
          /* ★ここで「上」と「下」に振り分けています */
          justify-content: space-between; 
          padding: 60px 30px; 
          transition: 0.5s;
        }

        .service-card:hover .overlay { background: rgba(0,0,0,0.4); }

        .yellow-line { 
          width: 3px; 
          height: 60px; 
          background: #b8860b; 
          margin-right: 20px; 
        }

        .svc-title { 
          font-size: 2.2rem; 
          font-weight: 400; 
          line-height: 1.1; 
          letter-spacing: 0.05em; 
        }

        .svc-desc { 
          font-size: 13px; 
          font-weight: 200; 
          line-height: 1.8; 
          color: #c4b8a8; 
          max-width: 260px;
        }
      `}</style>

      {/* Hero エリア */}
      <section style={{ height: "30vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", fontStyle: "italic", letterSpacing: "0.2em" }}>UNE TABLE</h1>
      </section>

      {/* サービス一覧セクション */}
      <section style={{ padding: "0 5vw 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
          {services.map((s) => (
            <div key={s.key} className="service-card" onClick={() => handleSelectPlan(s.sub)}>
              {/* 白黒写真 */}
              <img src={s.img} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }} alt={s.title} />
              
              <div className="overlay">
                
                {/* 【上側】タイトルと黄色い線 */}
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <div className="yellow-line"></div>
                  <h3 className="svc-title">
                    {s.title.split(' ').map((word, i) => (
                      <span key={i} style={{ display: "block" }}>{word}</span>
                    ))}
                  </h3>
                </div>

                {/* 【下側】説明文（カジュアルな会合を…） */}
                <div>
                  <p className="svc-desc">{s.desc}</p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* お問い合わせセクション */}
      <section id="contact" style={{ padding: "100px 5vw", background: "#111" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", fontStyle: "italic", marginBottom: "50px", color: "#b8860b" }}>Reservation</h2>
          <select 
            value={selectedPlan} 
            onChange={(e) => setSelectedPlan(e.target.value)} 
            style={{ width: "100%", padding: "15px", background: "transparent", border: "none", borderBottom: "1px solid #333", color: "#fff" }}
          >
            <option value="" style={{color:"#000"}}>ご希望のプランを選択</option>
            <option value="カクテルパーティー" style={{color:"#000"}}>Cocktail Party</option>
            <option value="スタンディングレセプション" style={{color:"#000"}}>Standing Reception</option>
            <option value="プライベートダイニング" style={{color:"#000"}}>Private Dining</option>
          </select>
        </div>
      </section>
    </div>
  );
}
