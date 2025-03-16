import { Builder, By, Key, until } from "selenium-webdriver";
import { expect } from "chai";

describe("Get Started Form Test", function () {
    let driver  =new  Builder();

    before(async function () {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://www.xenonstack.com");  // Open the website
    });

    after(async function () {
        await driver.quit();
    });

    it("Should open the form after clicking 'Get Started'", async function () {
        await driver.manage().window().setRect({ width: 1920, height: 1080 });

        const getStartedButton = await driver.findElement(By.css(".nav-button"));
        await getStartedButton.click();

        // Wait for form to appear
        const form = await driver.wait(until.elementLocated(By.id("form-step-one")));
        expect(await form.isDisplayed()).to.be.true;
    });

    // it("Should fill out the form and proceed", async function () {
    //     const fields = [
    //         { id: "Firstname", value: "John" },
    //         { id: "Lastname", value: "Doe" },
    //         { id: "emailid", value: "john.doe@example.com" },
    //         { id: "contactnumber", value: "9876543210" },
    //         { id: "companyname", value: "XenonStack" }
    //     ];

    //     // Fill input fields
    //     for (const field of fields) {
    //         const input = await driver.findElement(By.id(field.id));
    //         await input.clear();
    //         await input.sendKeys(field.value);
    //     }

    //     // Select industry
    //     const industrySelect = await driver.findElement(By.id("enterpriseIndustry"));
    //     await industrySelect.sendKeys("Software Development");

    //     // Click 'Proceed Next'
    //     const proceedButton = await driver.findElement(By.xpath("//div[@class='next-step-button']"));
    //     await proceedButton.click();

    //     // Check if an error appears (optional)
    //     const errorMessage = await driver.findElement(By.id("error-message-one"));
    //     expect(await errorMessage.isDisplayed()).to.be.false;
    // });
    it("Should show an error for invalid email and phone", async function () {
        this.timeout(0);

        // Invalid input data
        const invalidFields = [
            { id: "Firstname", value: "John@" ,errorField :"firstname-error" },
            { id: "Lastname", value: "Doe@",errorField:"lastname-error" },
            { id: "emailid", value: "invalidemailgmail.com",errorField:"email-error" }, // Invalid email
            { id: "contactnumber", value: "12456783" ,errorField:"contact-error"}, // Invalid phone number
            { id: "companyname", value: "XenonStack@" , errorField:"company-error" }
        ];

        for (const field of invalidFields) {
            const input = await driver.findElement(By.id(field.id));
            await input.clear();
            await input.sendKeys(field.value);
            await input.sendKeys(Key.TAB);
            // Small delay to allow validation to trigger
            await driver.sleep(500);
        
            const error = await driver.wait(
                until.elementLocated(By.id(field.errorField)),
                5000 // Timeout of 5 seconds
            );
            console.log(await error.getAttribute("id"));
            expect(await error.isDisplayed()).to.be.true;
        }
        // Click 'Proceed Next'
        // const proceedButton = await driver.findElement(By.xpath("//div[@class='next-step-button']"));
        // await proceedButton.click();

        // Verify error messages

        // expect(await emailError.isDisplayed()).to.be.true;
        // expect(await phoneError.isDisplayed()).to.be.true;

        const industrySelect = await driver.findElement(By.id("enterpriseIndustry"));
        await industrySelect.sendKeys("Software Development");

        // Click 'Proceed Next'
        const proceedButton = await driver.findElement(By.xpath("//div[@class='next-step-button']"));
        await proceedButton.click();

        // Check if an error appears (optional)
        const errorMessage = await driver.findElement(By.id("error-message-one"));
        // expect(await errorMessage.isDisplayed()).to.be.true;
    });
});
