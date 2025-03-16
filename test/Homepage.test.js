
import { Builder , By , until } from 'selenium-webdriver';
import assert from 'assert';
describe('XenonStack Page Load Speed Test', function () {
    this.timeout(10000); // Maximum time for test execution (10 sec)

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    it('should load the homepage within 4 seconds', async function () {
        const startTime = Date.now();
        await driver.get('https://www.xenonstack.com');
        await driver.wait(until.elementLocated(By.tagName('body')), 10000);
        const endTime = Date.now();

        const loadTime = (endTime - startTime) / 1000; // Convert to seconds
        console.log(`⏳ Page Load Time: ${loadTime} seconds`);

        assert(loadTime < 4, `⚠️ Page took too long to load: ${loadTime} seconds`);
    });
});
