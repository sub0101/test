
// import { Builder , By , until } from 'selenium-webdriver';
// import assert from 'assert';
const {Builder , By ,until}  =require("selenium-webdriver")
const {assert}  = require("chai")
describe('XenonStack Page Load Speed Test', function () {
  

    let driver;
this.timeout(60000)
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
       
    });

    after(async function () {
        await driver.quit();
    });

    it('should load the homepage within 4 seconds', async function () {
        const startTime = Date.now();
        await driver.get('https://www.xenonstack.com');
        await driver.wait(until.elementLocated(By.css('body')), 10000);
        const endTime = Date.now();

        const loadTime = (endTime - startTime) / 1000; // Convert to seconds
        console.log(`⏳ Page Load Time: ${loadTime} seconds`);

        assert(loadTime < 4, `⚠️ Page took too long to load: ${loadTime} seconds`);
    });
});
