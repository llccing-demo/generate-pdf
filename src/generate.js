const puppeteer = require("puppeteer");

async function printPDF() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const url1 = "https://www.oschina.net/";
    const url2 = "https://www.google.com.hk/";
    const url3 = "http://localhost:1234/";
    const url4 = "http://news.baidu.com/";
    const url5 = "https://dev.to/";

    // Configure the navigation timeout
    // await page.setDefaultNavigationTimeout(0);

    await page.goto(url2, { waitUntil: "networkidle0" });
    // await page.goto(url5, { waitUntil: 'networkidle0', timeout: 300000 });
    const pdf = await page.pdf({ format: "a4" });

    await browser.close();
    return pdf;
}

module.exports = { printPDF };
