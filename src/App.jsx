import { useState, useEffect } from "react";

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleSelectPlan = (planName) => {
    setSelectedPlan(planName);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "serif", background: "#fdfcf9", color: "#1a1510", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital@0;1&family=Noto+Serif+JP:wght@200;300&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .card:hover { transform: translateY(-10px); transition: 0.3s; }
      `}</style>

      {/* Hero */}
      <section style={{ height: "60vh", background: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=80') center/cover", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
        <h1 style={{ fontSize: "3rem", fontStyle: "italic", letterSpacing: "0.2em" }}>UNE TABLE</h1>
      </section>

      {/* Plans */}
      <section style={{ padding: "80px 8vw" }}>
        <h2 style={{ textAlign: "center", color: "#b8860b", marginBottom: "50px", fontSize: "2rem" }}>Select Plan</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>
          {["スタンダードプラン", "プレミアムプラン", "エグゼクティブプラン"].map((plan) => (
            <div key={plan} className="card" style={{ background: "#fff", borderRadius: "15px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
              <div style={{ height: "200px", background: "#eee" }}></div>
              <div style={{ padding: "30px" }}>
                <h3 style={{ marginBottom: "15px" }}>{plan}</h3>
                <p style={{ fontSize: "14px", color: "#666", marginBottom: "25px" }}>最高のクオリティをお約束します。</p>
                <button 
                  onClick={() => handleSelectPlan(plan)}
                  style={{ width: "100%", padding: "12px", background: "#1a1510", color: "#fff", border: "none", cursor: "pointer", fontSize: "12px", letterSpacing: "0.1em" }}
                >
                  SELECT PLAN
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" style={{ padding: "100px 8vw", background: "#f4f1ec" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", background: "#fff", padding: "60px", borderRadius: "20px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "50px" }}>Contact</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
            
            {/* Left Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{ fontSize: "12px", color: "#8a7a6a" }}>PLAN</label>
                <select 
                  value={selectedPlan} 
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  style={{ width: "100%", padding: "15px", border: "none", borderBottom: "1px solid #ddd", background: "#fdfcf9" }}
                >
                  <option value="">プランを選択してください</option>
                  <option value="スタンダードプラン">スタンダードプラン</option>
                  <option value="プレミアムプラン">プレミアムプラン</option>
                  <option value="エグゼクティブプラン">エグゼクティブプラン</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "#8a7a6a" }}>NAME</label>
                <input type="text" style={{ width: "100%", padding: "15px", border: "none", borderBottom: "1px solid #ddd" }} />
              </div>
            </div>

            {/* Right Column */}
            <div>
              <label style={{ fontSize: "12px", color: "#8a7a6a" }}>MESSAGE</label>
              <textarea style={{ width: "100%", height: "150px", padding: "15px", border: "none", borderBottom: "1px solid #ddd", background: "#fdfcf9", resize: "none" }} />
            </div>

            <button style={{ gridColumn: "span 2", padding: "20px", background: "#1a1510", color: "#fff", border: "none", cursor: "pointer", letterSpacing: "0.2em" }}>
              SEND INQUIRY
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
