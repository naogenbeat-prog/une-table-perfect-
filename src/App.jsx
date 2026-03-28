<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>オーダーメイド・ケータリング | UNE TABLE</title>
    <style>
        /* 基本設定 */
        body { margin: 0; font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", sans-serif; color: #333; background-color: #fdfdfd; line-height: 1.8; scroll-behavior: smooth; }
        
        /* ヒーローエリア */
        .hero { height: 70vh; background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=80'); background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; color: #fff; text-align: center; }
        .hero-content h1 { font-size: clamp(2rem, 6vw, 3.5rem); letter-spacing: 0.15em; margin-bottom: 20px; }
        .btn-gold { background: linear-gradient(45deg, #d4af37, #f9f295, #d4af37); color: #333; padding: 15px 40px; text-decoration: none; font-weight: bold; border-radius: 50px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); transition: 0.3s; display: inline-block; }

        /* プランセクション */
        .section { max-width: 1100px; margin: 80px auto; padding: 0 20px; text-align: center; }
        h2 { font-size: 2.2rem; color: #b8860b; margin-bottom: 50px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.06); display: flex; flex-direction: column; text-align: left; transition: 0.3s; border: 1px solid #eee; }
        .card:hover { transform: translateY(-5px); }
        .card-img { width: 100%; height: 220px; object-fit: cover; }
        .card-body { padding: 25px; flex-grow: 1; }
        .card h3 { margin: 0 0 10px 0; color: #333; }
        .card p { font-size: 0.9rem; color: #666; margin-bottom: 20px; }

        /* セレクトプランボタン（各カード内） */
        .select-btn { display: block; width: 100%; padding: 12px; background: #333; color: #fff; text-align: center; text-decoration: none; font-size: 0.9rem; font-weight: bold; border: none; cursor: pointer; transition: 0.3s; }
        .select-btn:hover { background: #b8860b; }

        /* お問い合わせフォーム（2カラムレイアウト） */
        #contact { background-color: #f9f6f2; padding: 80px 20px; }
        .form-container { max-width: 900px; margin: 0 auto; background: #fff; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        
        .form-group { display: flex; flex-direction: column; margin-bottom: 20px; }
        .full-width { grid-column: span 2; } /* 名前とメールは横いっぱいに */
        
        label { font-size: 0.85rem; font-weight: bold; margin-bottom: 8px; color: #6a5a4a; }
        input, select, textarea { padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; width: 100%; box-sizing: border-box; }
        textarea { height: 120px; resize: none; }
        
        /* 送信ボタン */
        .submit-btn { grid-column: span 2; background: #b8860b; color: #fff; border: none; padding: 18px; font-size: 1.1rem; font-weight: bold; border-radius: 8px; cursor: pointer; margin-top: 10px; transition: 0.3s; }
        .submit-btn:hover { background: #333; }

        /* スマホ対応 */
        @media (max-width: 768px) {
            .form-grid { grid-template-columns: 1fr; }
            .full-width { grid-column: span 1; }
            .submit-btn { grid-column: span 1; }
        }
    </style>
</head>
<body>

    <section class="hero">
        <div class="hero-content">
            <h1>オーダーメイドのケータリング</h1>
            <p>UNE TABLE — 記憶に残る、特別なひとときを</p>
            <a href="#contact" class="btn-gold">今すぐお見積もり</a>
        </div>
    </section>

    <section class="section">
        <h2>Select Plan</h2>
        <div class="grid">
            
            <!-- スタンダードプラン -->
            <div class="card">
                <img src="https://images.unsplash.com/photo-1530101978247-2c78493045ec?auto=format&fit=crop&w=600&q=80" class="card-img">
                <div class="card-body">
                    <h3>Standard Plan</h3>
                    <p>もっとも選ばれている基本のプラン。冷温バランスの良いお料理を提供いたします。</p>
                </div>
                <button class="select-btn" onclick="selectPlan('スタンダードプラン')">このプランを選択</button>
            </div>

            <!-- プレミアムプラン -->
            <div class="card">
                <img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80" class="card-img">
                <div class="card-body">
                    <h3>Premium Plan</h3>
                    <p>高級食材をふんだんに使用した、特別な記念日やVIP向けのプランです。</p>
                </div>
                <button class="select-btn" onclick="selectPlan('プレミアムプラン')">このプランを選択</button>
            </div>

            <!-- エグゼクティブプラン -->
            <div class="card">
                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80" class="card-img">
                <div class="card-body">
                    <h3>Executive Plan</h3>
                    <p>会場装飾から専任スタッフの配置まで、すべてを網羅した最高峰のプランです。</p>
                </div>
                <button class="select-btn" onclick="selectPlan('エグゼクティブプラン')">このプランを選択</button>
            </div>

        </div>
    </section>

    <!-- お問い合わせセクション -->
    <section id="contact">
        <div class="section" style="margin-top:0;">
            <h2>Reservation & Inquiry</h2>
            <div class="form-container">
                <form id="cateringForm">
                    <div class="form-grid">
                        
                        <!-- お名前（横いっぱい） -->
                        <div class="form-group full-width">
                            <label>お名前（企業名）</label>
                            <input type="text" placeholder="株式会社〇〇 山田太郎" required>
                        </div>

                        <!-- メールアドレス（横いっぱい） -->
                        <div class="form-group full-width">
                            <label>メールアドレス</label>
                            <input type="email" placeholder="example@mail.com" required>
                        </div>

                        <!-- プラン選択（左側） -->
                        <div class="form-group">
                            <label>ご希望のプラン</label>
                            <select id="plan-select">
                                <option value="">プランをお選びください</option>
                                <option value="スタンダードプラン">スタンダードプラン</option>
                                <option value="プレミアムプラン">プレミアムプラン</option>
                                <option value="エグゼクティブプラン">エグゼクティブプラン</option>
                                <option value="その他">その他（ご相談）</option>
                            </select>
                        </div>

                        <!-- ご相談内容（右側） -->
                        <div class="form-group">
                            <label>ご相談内容・メッセージ</label>
                            <textarea id="message" placeholder="予算や人数、アレルギー対応などをご記入ください"></textarea>
                        </div>

                        <!-- 送信ボタン -->
                        <button type="submit" class="submit-btn">この内容で問い合わせる</button>

                    </div>
                </form>
            </div>
        </div>
    </section>

    <!-- JavaScript：プラン選択を自動反映させる仕組み -->
    <script>
        function selectPlan(planName) {
            // お問い合わせ欄の「プラン選択」ドロップダウンを取得
            const planDropdown = document.getElementById('plan-select');
            
            // プラン名を設定
            planDropdown.value = planName;
            
            // お問い合わせセクションまでスムーズにスクロール
            const contactSection = document.getElementById('contact');
            contactSection.scrollIntoView({ behavior: 'smooth' });

            // プラン名を強調するために少し背景色を変える（視覚的なフィードバック）
            planDropdown.style.backgroundColor = "#fff9e6";
            setTimeout(() => {
                planDropdown.style.backgroundColor = "#fff";
            }, 1000);
        }

        // 送信テスト用の簡易メッセージ
        document.getElementById('cateringForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('お問い合わせありがとうございます。この内容はサンプルです。');
        });
    </script>

</body>
</html>
