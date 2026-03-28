<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>オーダーメイド・ケータリング | UNE TABLE</title>
    <style>
        /* 全体の設定 */
        body { 
            margin: 0; 
            font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", sans-serif; 
            color: #333; 
            background-color: #fdfdfd; 
            line-height: 1.8;
        }

        /* ヒーロー画像（一番上の大きな部分） */
        .hero {
            height: 80vh;
            background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), 
                        url('https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=80');
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            text-align: center;
        }

        .hero-content h1 {
            font-size: clamp(2.5rem, 8vw, 4rem);
            font-weight: bold;
            letter-spacing: 0.15em;
            margin-bottom: 20px;
            text-shadow: 2px 2px 10px rgba(0,0,0,0.5);
        }

        .hero-content p {
            font-size: clamp(1rem, 3vw, 1.5rem);
            margin-bottom: 40px;
        }

        /* ゴールドのボタン */
        .btn {
            background: linear-gradient(45deg, #d4af37, #f9f295, #d4af37);
            color: #333;
            padding: 18px 50px;
            text-decoration: none;
            font-weight: bold;
            border-radius: 50px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            transition: 0.3s;
            display: inline-block;
        }
        .btn:hover { transform: scale(1.05); }

        /* サービス紹介セクション */
        .section {
            max-width: 1200px;
            margin: 100px auto;
            padding: 0 40px;
            text-align: center;
        }

        h2 {
            font-size: 2.5rem;
            color: #b8860b;
            margin-bottom: 60px;
            position: relative;
            display: inline-block;
        }
        h2::after {
            content: "";
            display: block;
            width: 50%;
            height: 2px;
            background: #b8860b;
            margin: 15px auto 0;
        }

        /* グリッドレイアウト（ここで高さを揃える） */
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 40px;
            align-items: stretch; /* カードの高さを強制的に揃える */
        }

        /* 各カードの設定 */
        .card {
            background: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            display: flex;
            flex-direction: column; /* 中身を縦に並べる */
            text-align: left;
            transition: 0.3s;
        }
        .card:hover { transform: translateY(-10px); }

        /* 画像サイズを完全に統一する設定 */
        .card-img-wrapper {
            width: 100%;
            height: 280px; /* ここで高さを固定 */
            overflow: hidden;
        }
        .card img {
            width: 100%;
            height: 100%;
            object-fit: cover; /* 画像を枠いっぱいに綺麗に収める（重要！） */
        }

        .card-body {
            padding: 30px;
            flex-grow: 1; /* テキストが短くてもカードの下まで色を塗る */
        }

        .card h3 {
            font-size: 1.4rem;
            margin: 0 0 15px 0;
            color: #333;
        }

        .card p {
            font-size: 0.95rem;
            color: #666;
            margin: 0;
            line-height: 1.7;
        }
    </style>
</head>
<body>

    <!-- メインビジュアル -->
    <section class="hero">
        <div class="hero-content">
            <h1>オーダーメイドのケータリング</h1>
            <p>華やかな装いを、あなただけの空間へ</p>
            <a href="#" class="btn">お問い合わせ・お見積もり</a>
        </div>
    </section>

    <!-- サービス紹介 -->
    <section class="section">
        <h2>Our Services</h2>
        <div class="grid">
            
            <!-- カード 1 -->
            <div class="card">
                <div class="card-img-wrapper">
                    <img src="https://images.unsplash.com/photo-1530101978247-2c78493045ec?auto=format&fit=crop&w=800&q=80" alt="周年記念">
                </div>
                <div class="card-body">
                    <h3>周年記念パーティー</h3>
                    <p>企業の歩みを祝う、格式高い空間演出。ゲストの記憶に残る、圧倒的に華やかなビュッフェスタイルをご提案します。</p>
                </div>
            </div>

            <!-- カード 2 -->
            <div class="card">
                <div class="card-img-wrapper">
                    <img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80" alt="料理">
                </div>
                <div class="card-body">
                    <h3>オリジナルメニュー</h3>
                    <p>専任のシェフが、ご要望に合わせてメニューをフルカスタマイズ。企業のロゴをあしらったデザートなども可能です。</p>
                </div>
            </div>

            <!-- カード 3 -->
            <div class="card">
                <div class="card-img-wrapper">
                    <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80" alt="会場">
                </div>
                <div class="card-body">
                    <h3>トータルデザイン</h3>
                    <p>料理だけでなく、テーブルクロスや装飾、ライティングまで、会場全体をコンセプトに合わせて美しくプロデュースします。</p>
                </div>
            </div>

        </div>
    </section>

</body>
</html>
