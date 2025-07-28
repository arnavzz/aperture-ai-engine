const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const query = process.argv[2] || 'chatgpt';
  await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`);

  const data = await page.evaluate(() => {
    const elements = [];
    document.querySelectorAll('div.g, div[data-attrid], g-scrolling-carousel').forEach(el => {
      const rect = el.getBoundingClientRect();
      elements.push({
        tag: el.tagName,
        html: el.innerHTML,
        position: { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
      });
    });
    return { elements, aio_present: !!document.querySelector('div[data-attrid]') };
  });

  console.log(JSON.stringify(data));
  await browser.close();
})();
