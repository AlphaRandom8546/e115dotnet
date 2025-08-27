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