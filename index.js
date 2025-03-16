// const { Builder, By, until } = require("selenium-webdriver");
// const assert = require("assert");

// describe("XenonStack Static Page Tests", function () {
//     let driver;
//     this.timeout(0)

//     before(async function () {
//         driver = await new Builder().forBrowser("chrome").build();
//         await driver.get("https://www.xenonstack.com");
//     });

//     after(async function () {
//         await driver.quit();
//     });

//     it("1. Verify Page Load", async function () {
//         const title = await driver.getTitle();
//         assert.ok(title.length > 0, "Page title is empty");
//     });

//     it("2. Verify ‘Get Started’ Form Functionality", async function () {
//         const form = await driver.findElement(By.css("form"));
//         assert.ok(form, "Get Started form is not present");

//         // Submit without filling fields
//         const submitButton = await form.findElement(By.css("button[type='submit']"));
//         await submitButton.click();
//         const errorMessage = await driver.findElement(By.css(".error-message"));
//         assert.ok(errorMessage, "Validation message not displayed for empty form");

//         // Submit with valid data
//         await driver.findElement(By.name("name")).sendKeys("John Doe");
//         await driver.findElement(By.name("email")).sendKeys("john.doe@example.com");
//         await submitButton.click();
//         const successMessage = await driver.wait(until.elementLocated(By.css(".success-message")), 5000);
//         assert.ok(successMessage, "Form submission failed with valid data");
//     });

//     it("3. Verify All Link Navigation", async function () {
//         const links = await driver.findElements(By.css("a"));
//         for (let link of links) {
//             const href = await link.getAttribute("href");
//             assert.ok(href && href.startsWith("http"), `Invalid link: ${href}`);
//         }
//     });

//     it("4. Verify Page Responsiveness", async function () {
//         await driver.manage().window().setRect({ width: 375, height: 812 });
//         let mobileView = await driver.manage().window().getRect();
//         assert.strictEqual(mobileView.width, 375, "Mobile view failed");
        
//         await driver.manage().window().setRect({ width: 1366, height: 768 });
//         let desktopView = await driver.manage().window().getRect();
//         assert.strictEqual(desktopView.width, 1366, "Desktop view failed");
//     });

//     it("5. Verify Browser Compatibility (Chrome)", async function () {
//         const userAgent = await driver.executeScript("return navigator.userAgent;");
//         assert.ok(userAgent.includes("Chrome"), "Not running in Chrome");
//     });

//     // it("6. Verify Page Performance with K6", async function () {
//     //     this.timeout(60000);
//     //     const { execSync } = require("child_process");
//     //     execSync("k6 run performanceTest.js", { stdio: "inherit" });
//     // });

//     it("7. Verify Image Loading and Broken Links", async function () {
//         const images = await driver.findElements(By.css("img"));
//         for (let img of images) {
//             let src = await img.getAttribute("src");
//             assert.ok(src, `Broken image found: ${src}`);
//         }
//     });

//     // it("8. Verify Lazy Loading of Images", async function () {
//     //     await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
//     //     const images = await driver.findElements(By.tagName("img"));

//     //     for (let img of images) {
//     //         const loadingAttr = await img.getAttribute("loading");
//     //         assert.ok(loadingAttr === "lazy", `Image does not have lazy loading: ${await img.getAttribute("src")}`);
//     //     }
//     // });

//     it("9. Verify Meta Tags for SEO", async function () {
//         const titleTag = await driver.executeScript("return document.querySelector('title')?.innerText;");
//         const descriptionTag = await driver.executeScript("return document.querySelector('meta[name=\"description\"]')?.content;");
//         const canonicalTag = await driver.executeScript("return document.querySelector('link[rel=\"canonical\"]')?.href;");

//         assert.ok(titleTag.length > 0, "Title tag is missing or empty");
//         assert.ok(descriptionTag.length > 0, "Meta description is missing");
//         assert.ok(canonicalTag, "Canonical link is missing");
//     });

//     // it("10. Verify JavaScript Execution & Functionality", async function () {
//     //     const jsStatus = await driver.executeScript("return typeof document.querySelector === 'function';");
//     //     assert.ok(jsStatus, "JavaScript execution is not working properly");

//     //     // Example: Check if a dynamically loaded element exists
//     //     const dynamicElement = await driver.wait(until.elementLocated(By.css(".animated-element")), 5000);
//     //     assert.ok(dynamicElement, "Dynamic JavaScript-based content is missing");
//     // });
// });
