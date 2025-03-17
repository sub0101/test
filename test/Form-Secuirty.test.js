const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("chai");
const mocha = require("mocha");
const chrome =  require("selenium-webdriver/chrome")
describe("Security Tests for Multi-Step 'Get Started' Form", function () {
    let driver;
const options = new chrome.Options();
options.windowSize({width:1300 , height:900})
    before(async function () {
        driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
        await driver.get("https://xenonstack.com"); // Update with the actual URL
   
    });

    after(async function () {
        await driver.quit();
    });


    it("Should open the form after clicking 'Get Started'", async function () {
      
        const getStartedButton = await driver.findElement(By.css(".nav-button"));
        await getStartedButton.click();
        await driver.sleep(4000); 
        // Wait for form to appear
        const form = await driver.wait(until.elementLocated(By.id("form-step-one")));
        expect(await form.isDisplayed()).to.be.true;
    });

    async function fillFirstForm() {
        const fields = [
            { id: "Firstname", value: "John" },
            { id: "Lastname", value: "Doe" },
            { id: "emailid", value: "john.doe@example.com" },
            { id: "contactnumber", value: "9876543210" },
            { id: "companyname", value: "XenonStack" }
        ];

        for (const field of fields) {
            const input = await driver.findElement(By.id(field.id));
            await input.clear();
            await input.sendKeys(field.value);
        }

        // Select industry
        const industrySelect = await driver.findElement(By.id("enterpriseIndustry"));
        await industrySelect.sendKeys("Software Development");

        // Click 'Proceed Next'
       
    }

    async function fillSecondForm() {
        const sections = [
            "#agenticaiPlatform",
            "#companySegment",
            "#primaryFocus",
            "#aiUsecase",
            "#primaryChallenge",
            "#companyInfra",
            "#dataPlatform",
            "#aiTransformation",
            "#solution"
        ];

        for (const section of sections) {
            const input = await driver.findElement(By.css(`${section} .answers p`));
            await input.click();
        }

        await driver.sleep(2000);
    }

    /** ✅ 1. Basic Form Submission Test */
    // it("should fill out the form and submit successfully", async function () {
    //     await fillFirstForm();
    //     const proceedButton = await driver.findElement(By.xpath("//div[@class='next-step-button']"));
    //     await proceedButton.click();
    //     await fillSecondForm();
     
    //     const submitButton = await driver.findElement(By.xpath("//p[text()='Submit']"));
    //     await driver.executeScript("arguments[0].scrollIntoView(true);", submitButton);
    //     await submitButton.click();

    //     await driver.sleep(5000);

    //     const confirmationMessage = await driver.wait(
    //         until.elementLocated(By.css(".get-started-form-wrapper .successful-meeting-wrapper")),
    //         10000
    //     );

    //     expect(await confirmationMessage.isDisplayed()).to.be.true;
    // });

    /** ✅ 2. SQL Injection Test */
    it("should prevent SQL Injection", async function () {
        const sqlPayload = "John'; DROP TABLE users; --";
        // const getStartedButton = await driver.findElement(By.css(".nav-button"));
        // await getStartedButton.click();
        // await driver.sleep(4000); 
        // // Wait for form to appear
        // const form = await driver.wait(until.elementLocated(By.id("form-step-one")));
        // expect(await form.isDisplayed()).to.be.true;
        await fillFirstForm();
        const input = await driver.findElement(By.id("Firstname"));
        await input.clear();
        await input.sendKeys(sqlPayload);
        const proceedButton = await driver.findElement(By.xpath("//div[@class='next-step-button']"));
        await proceedButton.click();

        await driver.sleep(2000);
        
        // await driver.findElement(By.xpath("//p[text()='Submit']")).click();
        // await driver.sleep(3000);

        const errorMessage = await driver.findElement(By.id("error-message-one"));
        expect(await errorMessage.isDisplayed()).to.be.true;
    });


});
