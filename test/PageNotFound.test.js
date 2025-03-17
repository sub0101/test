const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const chrome = require("selenium-webdriver/chrome")
let driver;

describe('Verify 404 Error Page for Invalid URL', function () {
    this.timeout(60000); // Set a timeout of 30 seconds
    const options = new chrome.Options();
    options.windowSize({width:1200 , height:800})
    before(async function () {
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options.setPageLoadStrategy("eager")).build();
    });

    after(async function () {
        await driver.quit();
    });

    it('should display a 404 page for an invalid URL', async function () {
        // Visit an invalid URL
        await driver.get('https://www.xenonstack.com/nonexistentpage');
        
        // Wait for the page to load (we can check for a 404 element or just the title)
     

        // Verify that the 404 error page is displayed
        const pageTitle = await driver.getTitle();
        // expect(pageTitle).to.include('404'); // Expect the title to contain '404'
    console.log(pageTitle)

        // Verify that there is a message on the page indicating the page was not found
        const errorMessage = await driver.findElement(By.css('body')).getText();
        expect(errorMessage).to.include('404 - Page Not Found'); // Assuming 'Not Found' text is on the 404 page

        // Optional: Check if there's a "Home" link or any other link for user navigation
        const homeLink = await driver.findElement(By.linkText('GO TO WEBSITE')).isDisplayed();
        expect(homeLink).to.be.true; // Ensure that a "Home" link is displayed for navigation
    });
});
