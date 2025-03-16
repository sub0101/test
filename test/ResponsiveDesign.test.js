import { Builder, By } from "selenium-webdriver";
import { assert } from "chai";


    describe("Responsive Design Test", function () {
        let driver;
      this.timeout(0)
      
        before(async function () {
          driver = await new Builder().forBrowser("chrome").build();
        });
      
        after(async function () {
          await driver.quit();
        });
      
        it("✅ Desktop View - Navigation Bar Should Be Visible", async function () {
          await driver.manage().window().setRect({ width: 1920, height: 1080 });
          await driver.get("https://www.xenonstack.com");
      
          const navBar = await driver.findElement(By.css("nav"));
          const isDisplayed = await navBar.isDisplayed();
      
          assert.isTrue(isDisplayed, "Navigation bar is missing in full-screen mode");
        });
      
        it("✅ Tablet View - Hamburger Menu Should Be Visible", async function () {
          await driver.manage().window().setRect({ width: 768, height: 1024 });
      
          const menuRight = await driver.findElement(By.css(".mobile-right"));
          const isDisplayed = await menuRight.isDisplayed();
      
          assert.isTrue(isDisplayed, "Hamburger menu is missing in tablet mode");
        });
      
        it("✅ Mobile View - Hamburger Menu Should Be Visible", async function () {
          await driver.manage().window().setRect({ width: 375, height: 812 });
      
          const menuRight = await driver.findElement(By.css(".mobile-right"));
          const isDisplayed = await menuRight.isDisplayed();
      
          assert.isTrue(isDisplayed, "Hamburger menu is missing in mobile mode");
        });



        function isOverlapping(box1, box2) {
            return !(
                box1.right <= box2.left ||  // Box1 is completely left of Box2
                box1.left >= box2.right ||  // Box1 is completely right of Box2
                box1.bottom <= box2.top ||  // Box1 is completely above Box2
                box1.top >= box2.bottom     // Box1 is completely below Box2
            );
        }
    
        it("✅ Should verify that no images overlap", async function () {
            const images = await driver.findElements(By.css("img"));
            const imageRects = [];
    
            for (const img of images) {
                const rect = await driver.executeScript(
                    "return arguments[0].getBoundingClientRect();",
                    img
                );
                imageRects.push(rect);
            }
    
            for (let i = 0; i < imageRects.length; i++) {
                for (let j = i + 1; j < imageRects.length; j++) {
                    assert.isFalse(
                        isOverlapping(imageRects[i], imageRects[j]),
                        `Image ${i} is overlapping with Image ${j}`
                    );
                }
            }
        });
    
        it("✅ Should verify that text is not overlapping", async function () {
            const texts = await driver.findElements(By.css("p, h1, h2, h3, h4, h5, h6"));
            const textRects = [];
    
            for (const text of texts) {
                const rect = await driver.executeScript(
                    "return arguments[0].getBoundingClientRect();",
                    text
                );
                textRects.push(rect);
            }
    
            for (let i = 0; i < textRects.length; i++) {
                for (let j = i + 1; j < textRects.length; j++) {
                    assert.isFalse(
                        isOverlapping(textRects[i], textRects[j]),
                        `Text block ${i} is overlapping with Text block ${j}`
                    );
                }
            }
        });
      });
