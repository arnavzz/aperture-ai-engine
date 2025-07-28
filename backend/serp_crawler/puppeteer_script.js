// puppeteer_script.js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto('https://www.google.com/search?q=example+query');

  const data = await page.evaluate(() => {
    const elements = [];
    document.querySelectorAll('div.g, div[data-attrid], g-scrolling-carousel').forEach(el => {
      const rect = el.getBoundingClientRect();
      elements.push({
        tag: el.tagName,
        html: el.innerHTML,
        position: {
          top: rect.top,
          left: rect.left,
          height: rect.height,
          width: rect.width
        }
      });
    });
    return elements;
  });

  console.log(JSON.stringify(data));
  await browser.close();
})();
