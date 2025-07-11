document.addEventListener('DOMContentLoaded', function() {
    // Index page functionality - CSS animation handles the fade-in
    
    // Main page functionality
    const menuToggle = document.getElementById('menu-toggle');
    const slideMenu = document.getElementById('slide-menu');
    
    if (menuToggle && slideMenu) {
        // ハンバーガーメニューをクリックした時（トグル機能）
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            slideMenu.classList.toggle('open');
        });
        
        // メニュー外をクリックした時にメニューを閉じる
        document.addEventListener('click', function(e) {
            if (!slideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                slideMenu.classList.remove('open');
            }
        });
        
        // メニューアイテムをクリックした時にメニューを閉じる
        const menuItems = slideMenu.querySelectorAll('.slide-menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                slideMenu.classList.remove('open');
            });
        });
    }
});