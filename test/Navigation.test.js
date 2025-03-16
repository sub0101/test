import { Builder, By } from "selenium-webdriver";
import { assert, expect } from "chai";

describe("Navigation Test", function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://www.xenonstack.com");
    });

    after(async function () {
        await driver.quit();
    });

    it("Should verify <li> contains <a> and navigates correctly", async function () {
        let navItems = await driver.findElements(By.css("nav li")); // Get all <li> inside <nav>

        for (let i = 0; i < navItems.length; i++) {
            try {
                // Re-fetch the <li> after each iteration to avoid stale element reference
                navItems = await driver.findElements(By.css("nav li"));
                const liItem = navItems[i];

                // Find <a> inside <li>
                const aTag = await liItem.findElement(By.css("a"));
                const href = await aTag.getAttribute("href");

                console.log(`🔗 Found link: ${href}`);

                if (!href || href === "#") {
                    console.warn(` <li> at index ${i} has an <a> but no valid href.`);
                    continue;
                }

                // Store current URL
                const initialURL = await driver.getCurrentUrl();

                // Navigate to the link
                await driver.get(href);
                await driver.sleep(2000); // Wait for page load

                // Get new URL after navigating
                const newURL = await driver.getCurrentUrl();
                if (href !== initialURL) {
                    expect(newURL).to.not.equal(initialURL, ` Navigation failed for ${href}`);
                } else {
                    console.log(`ℹ Skipping check for ${href} as it points to the same page.`);
                }
                console.log(` Successfully navigated to: ${newURL}`);

                // Go back to the homepage and re-fetch elements
                await driver.get("https://www.xenonstack.com");
                await driver.sleep(2000);
            } catch (error) {
                console.error(` ${error.message}`);
                assert.fail(error.message)
            }
        }
    });
});
