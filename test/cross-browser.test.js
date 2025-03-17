const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const browsers = ['chrome', 'MicrosoftEdge'];



describe('Cross-Browser Compatibility Tests', function () {
    let driver ;
 

    browsers.forEach(function (browser) {
    
     
        it(`should render correctly in ${browser}`, async function () {
       
     let    driver = await new Builder().forBrowser(browser).build();
     await driver.get('https://xenonstack.com');

        
            
            const title = await driver.getTitle();
            console.log(title)
            assert.strictEqual(title, "Data Foundry for Agentic Systems");
            
            
            await driver.quit();
        });
    });
});
