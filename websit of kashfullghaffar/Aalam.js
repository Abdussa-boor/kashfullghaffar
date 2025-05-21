document.getElementById('searchBar').addEventListener('input', function () {
  let filter = this.value.toLowerCase(); // تلاش کا متن لوئر کیس میں
  let details = document.querySelectorAll('details'); // تمام details عناصر

  details.forEach(detail => {
    let summary = detail.querySelector('summary'); // summary عنصر
    let paragraph = detail.querySelector('p'); // paragraph عنصر

    // اصل متن محفوظ کریں
    let originalSummaryText = summary.textContent;
    let originalParagraphText = paragraph.textContent;

    // سمری اور پیراگراف کو چیک کریں
    if (originalSummaryText.toLowerCase().includes(filter) || originalParagraphText.toLowerCase().includes(filter)) {
      detail.style.display = ''; // ظاہر کریں
      detail.open = true, false; // اگر تلاش کردہ متن موجود ہو تو پیراگراف کھولیں
      
      // ہائی لائٹ کرنے کا فنکشن
      const highlightText = (text, term) => {
        if (!term) return text; // اگر سرچ ٹرم خالی ہے تو اصل متن لوٹائیں
        let regex = new RegExp(`(${term})`, 'gi'); // سرچ ٹرم کا ریگولر ایکسپریشن
        return text.replace(regex, '<span class="highlight">$1</span>'); // ہائی لائٹ کریں
      };

      // ہائی لائٹ شدہ متن کو اپ ڈیٹ کریں
      summary.innerHTML = highlightText(originalSummaryText, filter);
      paragraph.innerHTML = highlightText(originalParagraphText, filter);
    } else {
      detail.style.display = 'none'; // چھپائیں
      detail.open = false; // غیر متعلقہ عناصر بند رکھیں
    }
  });
});

// CSS کے ذریعے ہائی لائٹ سٹائل شامل کریں
const style = document.createElement('style');
style.textContent = `
  .highlight {
    background-color: red;
    font-weight: bold;
    color: white;
    border-radius:3px
  }
`;
document.head.appendChild(style);
