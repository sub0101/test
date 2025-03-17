const { Builder, By } = require("selenium-webdriver");
const {assert} = require("chai")
const chrome  =require("selenium-webdriver/chrome");

describe("SEO Test for xenonstack" ,  ()=>{
let driver 
const options = new chrome.Options()
options.setPageLoadStrategy("eager")
     before (async()=> {
        driver = await new Builder().forBrowser("chrome").setChromeOptions(options).
        build();
        await driver.get("https://www.xenonstack.com");

    })
 after(async()=> {
        await driver.quit()
    })
    it("test" , async()=> {
    
    try {
        // Open the website
        // Replace with your target URL

        // Function to check if a meta tag exists
        async function checkMetaTag(name) {
            let metaTag = await driver.findElements(By.css(`meta[name='${name}'], meta[property='${name}']`));
            return metaTag.length > 0;
        }

        let titleTag = await driver.findElements(By.css("title"));
        assert.isTrue(titleTag.length > 0, " Missing <title> tag");

        // Check meta description
        assert.isTrue(await checkMetaTag("description"), " Missing <meta name='description'>");

        // Check Open Graph tags
        assert.isTrue(await checkMetaTag("og:title"), "Missing Open Graph title");
        assert.isTrue(await checkMetaTag("og:description"), "Missing Open Graph description");
        assert.isTrue(await checkMetaTag("og:image"), "Missing Open Graph image");

        // Check Twitter Card tags
        assert.isTrue(await checkMetaTag("twitter:card"), "Missing Twitter card");
        assert.isTrue(await checkMetaTag("twitter:title"), "Missing Twitter title");
        assert.isTrue(await checkMetaTag("twitter:description"), "Missing Twitter description");

        // Check if Schema.org JSON-LD is present
        let jsonLd = await driver.findElements(By.css("script[type='application/ld+json']"));
        assert.isTrue(jsonLd.length > 0, "Missing Schema.org JSON-LD");

        let canonicalTag = await driver.findElement(By.css("link[rel='canonical']")).getAttribute("href");
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(canonicalTag, currentUrl, " Canonical URL does not match page URL");
        console.log(" SEO Optimization Test Passed!");


    } catch (error) {
        console.error(" SEO Test Failed: ", error.message);
    } 
});
});
