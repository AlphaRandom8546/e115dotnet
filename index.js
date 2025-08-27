// 设置默认模式
let currentMode = 'e926';

// 获取元素
const searchInput = document.getElementById('search-ipt');
const searchButton = document.getElementById('search-btn');
const latestButton = document.getElementById('latest-btn');
const popularButton = document.getElementById('popular-btn');
const modeToggleButton = document.getElementById('mode-toggle-btn');

// 搜索功能
searchButton.addEventListener('click', () => {
    const searchText = searchInput.value.trim();
    if (searchText) {
        const baseUrl = currentMode === 'e926' ? 'https://e926.net' : 'https://e621.net';
        window.open(`${baseUrl}/posts?tags=${encodeURIComponent(searchText)}`, '_blank');
    }
});

// 监听回车键
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});

// Latest 按钮
latestButton.addEventListener('click', () => {
    const baseUrl = currentMode === 'e926' ? 'https://e926.net' : 'https://e621.net';
    window.open(`${baseUrl}/posts`, '_blank');
});

// Popular 按钮
popularButton.addEventListener('click', () => {
    const baseUrl = currentMode === 'e926' ? 'https://e926.net' : 'https://e621.net';
    window.open(`${baseUrl}/posts?tags=order%3Arank`, '_blank');
});

// 模式切换按钮
modeToggleButton.addEventListener('click', () => {
    if (currentMode === 'e926') {
        currentMode = 'e621';
        modeToggleButton.innerHTML = '<i class="fa-solid fa-arrow-right-arrow-left"></i> e621';
        modeToggleButton.title = 'Now: e621';
    } else {
        currentMode = 'e926';
        modeToggleButton.innerHTML = '<i class="fa-solid fa-arrow-right-arrow-left"></i> e926';
        modeToggleButton.title = 'Now: e926';
    }
});