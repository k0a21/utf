# UTF Website - 共通ヘッダー仕様書

## 概要
UTF Webサイトの全ページで統一されたヘッダー・メニューシステムの仕様書。
**例外：index.html のみヘッダーなし**、それ以外の全ページは以下の仕様を厳守する。

## 共通HTML構造

### 1. 基本ヘッダー構造
```html
<!-- Unified Header -->
<header class="page-header">
    <div class="hamburger-menu" id="menu-toggle">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
    </div>
</header>

<!-- Visually Centered Logo -->
<div class="header-visual-center">
    <a href="main.html">
        <img src="logo.png" alt="utf logo" class="logo-header">
    </a>
</div>

<!-- Unified Slide Menu -->
<div class="slide-menu" id="slide-menu">
    <div class="menu-close" id="menu-close"></div>
    <nav class="slide-menu-nav">
        <a href="main.html" class="slide-menu-item">home</a>
        <a href="about.html" class="slide-menu-item">about</a>
        <a href="store.html" class="slide-menu-item">store</a>
        <a href="archive.html" class="slide-menu-item">archive</a>
    </nav>
</div>
```

### 2. 必須JavaScript
```javascript
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Unified menu functionality
    const menuToggle = document.getElementById('menu-toggle');
    const slideMenu = document.getElementById('slide-menu');
    const menuClose = document.getElementById('menu-close');
    
    function openMenu() {
        menuToggle.classList.add('active');
        slideMenu.classList.add('open');
    }
    
    function closeMenu() {
        menuToggle.classList.remove('active');
        slideMenu.classList.remove('open');
    }
    
    if (menuToggle && slideMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (slideMenu.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        if (menuClose) {
            menuClose.addEventListener('click', closeMenu);
        }
        
        document.addEventListener('click', function(e) {
            if (!slideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });
        
        const menuItems = slideMenu.querySelectorAll('.slide-menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                closeMenu();
            });
        });
    }
});
</script>
```

## CSS仕様

### 必須CSSファイル
- `<link rel="stylesheet" href="style.css">` を必ず含める
- style.cssに統一されたヘッダースタイルが定義済み

### bodyクラス
- 各ページタイプに応じて適切なbodyクラスを設定：
  - `page-background` - 共通背景クラス
  - ページ固有クラス（例：`store-page`, `about-page`, `archive-page`）

## デザイン仕様

### ロゴ
- **サイズ**: 60px（デスクトップ）、50px（タブレット）、45px（モバイル）
- **配置**: 画面中央上部
- **ファイル**: `logo.png`
- **リンク先**: `main.html`

### ハンバーガーメニュー
- **配置**: 右上
- **アニメーション**: 右からスライドイン
- **背景**: 透けたサイバーグレー（`rgba(30, 30, 30, 0.85)`）
- **ブラー効果**: `backdrop-filter: blur(12px)`

### メニュー項目
- **フォント**: Space Grotesk
- **サイズ**: 20px（デスクトップ）、18px（タブレット）、16px（モバイル）
- **項目**: home / about / store / archive
- **リンク**: 小文字表記
- **ホバーエフェクト**: サイバー風白光エフェクト（PC・スマホ両対応）
  - PC: `:hover` 時に白く光るアニメーション
  - スマホ: `:active`, `:focus` で同様のエフェクト
  - 左右に光るライン表示
  - テキストシャドウによる発光効果

### ×ボタン
- **実装**: CSS擬似要素（`::before`, `::after`）
- **サイズ**: 32px（デスクトップ）、28px（タブレット）、26px（モバイル）
- **配置**: メニュー右上

## 新しいページ作成時のチェックリスト

### 必須要素
- [ ] `style.css` の読み込み
- [ ] 統一ヘッダー構造の実装
- [ ] 統一JavaScriptの実装
- [ ] 適切なbodyクラスの設定
- [ ] Space Groteskフォントの読み込み

### デザイン確認
- [ ] ロゴサイズが他ページと一致
- [ ] ハンバーガーメニューの位置・動作が統一
- [ ] メニュー背景・透過度が統一
- [ ] ×ボタンが正常に表示・動作
- [ ] レスポンシブ対応の確認

### 例外ページ
- **index.html**: ヘッダー・メニューなし（Slide to enterのみ）

## サイバー風エフェクト仕様

### ホバー・アクティブエフェクト
```css
.slide-menu-item:hover,
.slide-menu-item:active,
.slide-menu-item:focus {
    color: #ffffff !important;
    transform: translateX(5px) scale(1.02);
    text-shadow: 
        0 0 15px rgba(255, 255, 255, 0.8),
        0 0 25px rgba(200, 220, 255, 0.6),
        0 0 35px rgba(180, 200, 255, 0.4);
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
}
```

### 光るライン効果
- 左右に延びる光るライン（`::before`, `::after`擬似要素）
- グラデーション効果付き
- ホバー時にグロー効果

## トラブルシューティング

### よくある問題
1. **ロゴサイズが違う**: style.cssの`.logo-header`クラスを確認
2. **メニューが開かない**: JavaScript実装とID名を確認
3. **×ボタンが表示されない**: `.menu-close`要素とCSS擬似要素を確認
4. **レスポンシブで崩れる**: メディアクエリの実装を確認
5. **スマホでエフェクトが効かない**: `:active`, `:focus`擬似クラスの実装を確認

### 参考ページ
- **完全実装例**: `main.html`, `about.html`, `store.html`, `archive.html`
- **統一CSS**: `style.css`

---

**重要**: この仕様書に従って実装することで、サイト全体の一貫性とユーザビリティを保証します。