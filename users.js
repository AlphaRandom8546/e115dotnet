const quotations = [
    {
        text: "A little boy is throwing coins in a wishing well. He says, \"I wish my sister wouldn’t have to use her wheelchair anymore.\" Suddenly, he hears a splash from the well and his sister falls in."
    }, {
        text: "A lawyer dies and goes to Heaven. He asks God, \"Is there a lawyer here?\" God replies, \"What do you think?\""
    }, {
        text: "- Why are children with autism the best at hide and seek?\n- Because they’re never found."
    }, {
        text: "- What’s the difference between Auschwitz and McDonald’s?\n- McDonald’s has a kids’ menu."
    }, {
        text: "A kid calls 911 and says, \"My mom is choking!\" The operator replies, \"Calm down, is she breathing?\" The kid says, \"No, that’s why I’m calling!\""
    }
]

function getRandomQuotation() {
    const randomIndex = Math.floor(Math.random() * quotations.length);
    return quotations[randomIndex];
}

function updateQuotation() {
    const quotation = getRandomQuotation();
    const quotationElement = document.getElementById('rand-quo');
    
    // 清空原有内容
    quotationElement.innerHTML = '';
    
    // 处理聚焦文本
    const text = quotation.text;
    const focusText = quotation.focus;
    
    // 将文本中的换行符转换为 <br> 标签
    const formattedText = text.replace(/\n/g, '<br>');
    
    if (focusText && text.includes(focusText)) {
        // 分割文本并创建带样式的部分
        const parts = formattedText.split(focusText);
        // 添加聚焦前的文本
        if (parts[0]) {
            quotationElement.innerHTML = parts[0];
        }
        // 创建聚焦文本（带样式）
        const focusSpan = document.createElement('span');
        focusSpan.className = 'focus-text';
        focusSpan.innerHTML = focusText;
        quotationElement.appendChild(focusSpan);
        // 添加聚焦后的文本
        if (parts[1]) {
            quotationElement.innerHTML += parts[1];
        }
    } else {
        // 如果没有找到聚焦文本，显示全部文本（支持换行）
        quotationElement.innerHTML = formattedText;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // 获取所有具有 id="cant" 的 .cant 元素
    const Tips = document.querySelectorAll('.cant#cant');

    Tips.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认链接行为
            // 获取文本内容
            const textcnt = this.textContent;
            alert(textcnt);
        });
    });
});

// memset
updateQuotation();

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

// 视频缓存功能
const videoElement = document.getElementById('bg-video');
const videoUrl = './background-video.mp4';

// 检查是否支持 localStorage
function isLocalStorageSupported() {
    try {
        const test = 'test';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

// 从 localStorage 加载视频
function loadVideoFromStorage() {
    if (!isLocalStorageSupported()) {
        return false;
    }
    
    const cachedVideoData = localStorage.getItem('cachedBackgroundVideo');
    if (cachedVideoData) {
        try {
            // 解析存储的数据（包含类型和 base64 数据）
            const videoData = JSON.parse(cachedVideoData);
            const byteCharacters = atob(videoData.data.split(',')[1]);
            const byteArrays = [];
            
            for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
                const slice = byteCharacters.slice(offset, offset + 1024);
                const byteNumbers = new Array(slice.length);
                
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                
                byteArrays.push(new Uint8Array(byteNumbers));
            }
            
            const videoBlob = new Blob(byteArrays, { type: videoData.type });
            const videoUrl = URL.createObjectURL(videoBlob);
            
            // 替换视频源
            const sourceElement = videoElement.querySelector('source');
            sourceElement.src = videoUrl;
            videoElement.load();
            
            // 清理之前的 ObjectURL（如果有）
            if (window.cachedVideoObjectUrl) {
                URL.revokeObjectURL(window.cachedVideoObjectUrl);
            }
            window.cachedVideoObjectUrl = videoUrl;
            
            return true;
        } catch (e) {
            console.error('Error loading video from cache:', e);
            localStorage.removeItem('cachedBackgroundVideo');
        }
    }
    return false;
}

// 缓存视频到 localStorage
function cacheVideoToStorage() {
    if (!isLocalStorageSupported()) {
        return;
    }
    
    // 检查是否已经缓存过
    if (localStorage.getItem('cachedBackgroundVideo')) {
        return;
    }
    
    fetch(videoUrl)
        .then(response => response.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.onload = function() {
                try {
                    // 存储类型和 base64 数据
                    const videoData = {
                        type: blob.type,
                        data: reader.result
                    };
                    localStorage.setItem('cachedBackgroundVideo', JSON.stringify(videoData));
                    console.log('Video cached successfully');
                } catch (e) {
                    console.error('Error caching video:', e);
                    // localStorage 可能已满
                    if (e.name === 'QuotaExceededError') {
                        localStorage.removeItem('cachedBackgroundVideo');
                    }
                }
            };
            reader.readAsDataURL(blob);
        })
        .catch(error => {
            console.error('Error fetching video for caching:', error);
        });
}

// 页面加载时尝试从缓存加载视频
document.addEventListener('DOMContentLoaded', () => {
    const isCached = loadVideoFromStorage();
    
    // 如果缓存加载失败或者第一次访问，加载网络视频
    if (!isCached) {
        const sourceElement = videoElement.querySelector('source');
        sourceElement.src = videoUrl;
        videoElement.load();
        
        // 延迟缓存以避免影响主要内容的加载
        setTimeout(cacheVideoToStorage, 3000);
    }
    
    // 确保视频播放
    videoElement.addEventListener('loadeddata', () => {
        videoElement.play().catch(e => {
            console.log('Autoplay prevented, trying with user gesture:', e);
            // 如果自动播放被阻止，等待用户交互后播放
            document.addEventListener('click', function playOnClick() {
                videoElement.play().catch(() => {});
                document.removeEventListener('click', playOnClick);
            }, { once: true });
        });
    });
    
    videoElement.addEventListener('error', (e) => {
        console.error('Video loading error:', e);
        // 如果缓存视频加载失败，回退到网络视频
        if (isCached) {
            localStorage.removeItem('cachedBackgroundVideo');
            const sourceElement = videoElement.querySelector('source');
            sourceElement.src = videoUrl;
            videoElement.load();
        }
    });
});