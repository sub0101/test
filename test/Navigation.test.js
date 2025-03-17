const { Builder, By } = require("selenium-webdriver");
const { assert, expect } = require("chai");
const chrome = require("selenium-webdriver/chrome");

describe("Navigation Menu Interaction Test", function () {
    this.timeout(60000);
    let driver;
    const options = new chrome.Options();

    before(async function () {
        driver = await new Builder()
            .forBrowser("chrome")
            .setChromeOptions(options.setPageLoadStrategy("eager"))
            .build();
        await driver.get("https://www.xenonstack.com");
        await driver.manage().window().maximize();
    });

    after(async function () {
        await driver.quit();
    });

    it("should chnage the URL when clicking navigation items", async function () {
        const navItems = await driver.findElements(By.css(".nav-pointers li")); 

        const initialUrl = await driver.getCurrentUrl();
        console.log(`Total Navigation Items: ${navItems.length}`);

        for (let navItem of navItems) {
            await navItem.click();
            await driver.sleep(2000); 
            
            const newUrl = await driver.getCurrentUrl();
            console.log(`Navigated to: ${newUrl}`);

            expect(newUrl).to.not.equal(initialUrl, "Expected URL to change after clicking navigation item");

            await driver.navigate().back();
        }
    });
});
