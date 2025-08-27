document.addEventListener('DOMContentLoaded', function() {
    // 获取所有具有 id="copy-email" 的 .news-a 元素
    const emailLinks = document.querySelectorAll('.news-a#copy-email');
    
    // 为每个邮箱链接添加点击事件
    emailLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认链接行为
            
            // 获取邮箱文本内容
            const email = this.textContent;
            
            // 使用 Clipboard API 复制文本
            navigator.clipboard.writeText(email)
                .then(function() {
                    // 复制成功提示
                    const originalText = link.textContent;
                    link.textContent = 'Copied: ' + originalText;
                    
                    // 500毫秒后恢复原始文本
                    setTimeout(function() {
                        link.textContent = originalText;
                    }, 500);
                })
                .catch(function(err) {
                    // 复制失败处理
                    console.error('Failed:', err);
                });
        });
    });
});