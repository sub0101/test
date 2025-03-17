const { Builder, By}  =require("selenium-webdriver")

const { describe, it, after, before }   =require("mocha")
const chrome   = require("selenium-webdriver/chrome");
const { assert, expect } = require("chai");
const { default: axios } = require("axios");
// const {chrome}  = pkg
let driver;

describe('Footer Links Test - XenonStack',async function  () {
    this.timeout(0);

let options = new chrome.Options();
let driver;
    before(async function () {

        // driver = chrome.Driver.createSession(options, service);

        driver = await new Builder().forBrowser('chrome').setChromeOptions(options.setPageLoadStrategy("eager")).build();
        await driver.get('https://www.xenonstack.com');
    });

    after(async function () {
        await driver.quit();
    });

    it('should verify all footer links are working', async function () {
        const footer = await driver.findElement(By.css('footer'));
        const links = await footer.findElements(By.css('a'));
       
        let urls = [];
        for (let link of links) {
            let url = await link.getAttribute('href');
            console.log(url)
            // expect(url ,"expect url to not empty").to.not.equal("")
            assert.notEqual(url , "","expect URL to not empty")
            if (url) urls.push(url);
        }

 
        assert(urls.length > 0, 'No links found in the footer');

        for (let url of urls) {
            try {
                if(url.includes("youtube") || url.includes("linkedin")) {
                
                }
                else {
                    await driver.get(url)
                    const title = await driver.getTitle();
                    assert(title.length > 0, `Page failed to load for URL: ${url}`);
                }
               
            } catch (error) {
                assert.fail(`Broken link: ${url} - Error: ${error.message}`);
            }
        }
    });
});
