const { expect, assert }  = require("chai")
const {Builder ,By ,Key , until} = require("selenium-webdriver")
const chrome = require("selenium-webdriver/chrome")
describe("Get Started Form Test", function () {
    this.timeout(60000)
    let driver  =new  Builder();
    const options = new chrome.Options()
    options.setPageLoadStrategy("eager")
    options.windowSize({width:1920 , height:1080})
    before(async function () {
        driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
        await driver.get("https://www.xenonstack.com");  // Open the website
        // await driver.manage().window().setRect({ width: 1920, height: 1080 });

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

    it("Should fill out the form and proceed", async function () {
        const fields = [
            { id: "Firstname", value: "John" },
            { id: "Lastname", value: "Doe" },
            { id: "emailid", value: "john.doe@example.com" },
            { id: "contactnumber", value: "9876543210" },
            { id: "companyname", value: "XenonStack" }
        ];

        // Fill input fields
        for (const field of fields) {
            const input = await driver.findElement(By.id(field.id));
            await input.sendKeys(field.value);
            // await input.clear();
        }

        // Select industry
        const industrySelect = await driver.findElement(By.id("enterpriseIndustry"));
        await industrySelect.sendKeys("Software Development");

        // Click 'Proceed Next'
            const proceedButton = await driver.findElement(By.xpath("//div[@class='next-step-button']"));
            await proceedButton.click();

        // Check if an error appears (optional)
        const errorMessage = await driver.findElement(By.id("error-message-one"));
        expect(await errorMessage.isDisplayed()).to.be.false;
      await   driver.sleep(2000)
      const platformInput = await driver.findElement(By.css('#agenticaiPlatform .answers p'));
      await platformInput.click();
        // await platformInput.click();
    
        // Select one answer from Company Segment section
        const companySegmentInput = await driver.findElement(By.css(' #companySegment .answers p'));
        await companySegmentInput.click();
           // Select one answer from Primary Focus section
        const primaryFocusInput = await driver.findElement(By.css('#primaryFocus .answers p'));
        await primaryFocusInput.click();
    

        // Select one answer from AI Use case section
        const aiUseCaseInput = await driver.findElement(By.css(' #aiUsecase .answers p'));
        await aiUseCaseInput.click();


        // Select one answer from Primary Challenge section
        const primaryChallengeInput = await driver.findElement(By.css(' #primaryChallenge .answers p'));
        await primaryChallengeInput.click();


        // Select one answer from Company Infrastructure section
        const companyInfraInput = await driver.findElement(By.css(' #companyInfra .answers p'));
        await companyInfraInput.click();
     

        // Select one answer from Data Platform section
        const dataPlatformInput = await driver.findElement(By.css(' #dataPlatform .answers p'));
        await dataPlatformInput.click();
      

        // Select one answer from AI Transformation section
        const aiTransformationInput = await driver.findElement(By.css(' #aiTransformation .answers p'));
        await aiTransformationInput.click();
      

        // Select one answer from Solution section
        const solutionInput = await driver.findElement(By.css(' #solution .answers p'));
        await solutionInput.click();
   

      
        await driver.sleep(2000)
     
     
        const submitButton = await driver.findElement(By.xpath("//p[text()='Submit']"));

        console.log(await submitButton.getText() ,"button");
        await driver.executeScript("arguments[0].scrollIntoView(true);", submitButton);

        console.log(await submitButton.getText());
        await submitButton.click();
        await driver.sleep(10000)
        // Wait for a confirmation of successful submission (You can update this based on how your site behaves after form submission)
        const confirmationMessage = await driver.wait(until.elementLocated(By.css(".get-started-form-wrapper .successful-meeting-wrapper"), 10000));
    
        // Assert that the form submission was successful
        const isConfirmationVisible = await confirmationMessage.isDisplayed();
        assert.strictEqual(isConfirmationVisible, true, '❌ Form submission failed or no confirmation message');
    });
    // it("Should show an error for invalid email and phone", async function () {
    //     this.timeout(0);

    //     // Invalid input data
    //     const invalidFields = [
    //         { id: "Firstname", value: "John@" ,errorField :"firstname-error" },
    //         { id: "Lastname", value: "Doe@",errorField:"lastname-error" },
    //         { id: "emailid", value: "invalidemailgmail.com",errorField:"email-error" }, // Invalid email
    //         { id: "contactnumber", value: "12456783" ,errorField:"contact-error"}, // Invalid phone number
    //         { id: "companyname", value: "XenonStack@" , errorField:"company-error" }
    //     ];

    //     for (const field of invalidFields) {
    //         const input = await driver.findElement(By.id(field.id));
    //         await input.clear();
    //         await input.sendKeys(field.value);
    //         await input.sendKeys(Key.TAB);
    //         // Small delay to allow validation to trigger
    //         await driver.sleep(500);
        
    //         const error = await driver.wait(
    //             until.elementLocated(By.id(field.errorField)),
    //             5000 // Timeout of 5 seconds
    //         );
    //         console.log(await error.getAttribute("id"));
    //         expect(await error.isDisplayed()).to.be.true;
    //     }
    //     // Click 'Proceed Next'
    //     // const proceedButton = await driver.findElement(By.xpath("//div[@class='next-step-button']"));
    //     // await proceedButton.click();

    //     // Verify error messages

    //     // expect(await emailError.isDisplayed()).to.be.true;
    //     // expect(await phoneError.isDisplayed()).to.be.true;

    //     const industrySelect = await driver.findElement(By.id("enterpriseIndustry"));
    //     await industrySelect.sendKeys("Software Development");

    //     // Click 'Proceed Next'
    //     const proceedButton = await driver.findElement(By.xpath("//div[@class='next-step-button']"));
    //     await proceedButton.click();

    //     // Check if an error appears (optional)
    //     const errorMessage = await driver.findElement(By.id("error-message-one"));
    //     // expect(await errorMessage.isDisplayed()).to.be.true;
    // });

    // it('should show the form after clicking Proceed button', async () => {
    //     // Navigate to the page with the form
      
    
    //     // Find the "Proceed" button and click it
    //     const proceedButton = await driver.findElement(By.xpath("//div[@class='next-step-button']"));
    //     await proceedButton.click();
    
    //     // Wait until the form is visible (i.e., after the "Proceed" button is clicked)
    //     await driver.wait(until.elementLocated(By.id('form-step-two')), 5000);
    
    //     // Assert the form is visible
    //     const form = await driver.findElement(By.id('form-step-two'));
    //     const isDisplayed = await form.isDisplayed();
    //     assert.strictEqual(isDisplayed, true, "❌ Form is not displayed after clicking Proceed");
    //   });
    
    //   it('should fill in the form and submit it', async () => {
    //     // Assuming the form has already been triggered (by clicking "Proceed")
    
    //     // Fill out the form fields
    //     const platformInput = await driver.findElement(By.id('agenticaiPlatform')).findElement(By.xpath("//p[contains(text(),'Akira AI - Agentic AI Platform Multi Agent System')]"));
    //     await platformInput.click();
    
    //     const companySegmentInput = await driver.findElement(By.id('companySegment')).findElement(By.xpath("//p[contains(text(),'Startup')]"));
    //     await companySegmentInput.click();
    
    //     const primaryFocusInput = await driver.findElement(By.id('primaryFocus')).findElement(By.xpath("//p[contains(text(),'Platform Engineering')]"));
    //     await primaryFocusInput.click();
    
    //     const aiUseCaseInput = await driver.findElement(By.id('aiUsecase')).findElement(By.xpath("//p[contains(text(),'POC Completed')]"));
    //     await aiUseCaseInput.click();
    
    //     const primaryChallengeInput = await driver.findElement(By.id('primaryChallenge')).findElement(By.xpath("//p[contains(text(),'Data Privacy and Compliance')]"));
    //     await primaryChallengeInput.click();
    
    //     const companyInfraInput = await driver.findElement(By.id('companyInfra')).findElement(By.xpath("//p[contains(text(),'AWS')]"));
    //     await companyInfraInput.click();
    
    //     const dataPlatformInput = await driver.findElement(By.id('dataPlatform')).findElement(By.xpath("//p[contains(text(),'Databricks')]"));
    //     await dataPlatformInput.click();
    
    //     const aiTransformationInput = await driver.findElement(By.id('aiTransformation')).findElement(By.xpath("//p[contains(text(),'Assisted Intelligence Agents as Co-Pilot')]"));
    //     await aiTransformationInput.click();
    
    //     const solutionInput = await driver.findElement(By.id('solution')).findElement(By.xpath("//p[contains(text(),'Internal Organization')]"));
    //     await solutionInput.click();
    
    //     // Optional: Fill in "Others" text fields if required
    //     const otherTextBox = await driver.findElement(By.css('.others-textbox'));
    //     await otherTextBox.sendKeys('Custom Input');
    
    //     // Click the "Submit" button
    //     const submitButton = await driver.findElement(By.xpath("//div[@class='next-step-button'][contains(.,'Submit')]"));
    //     await submitButton.click();
    
    //     // Wait for a confirmation of successful submission (You can update this based on how your site behaves after form submission)
    //     const confirmationMessage = await driver.wait(until.elementLocated(By.id('confirmationMessage')), 5000);
    
    //     // Assert that the form submission was successful
    //     const isConfirmationVisible = await confirmationMessage.isDisplayed();
    //     assert.strictEqual(isConfirmationVisible, true, '❌ Form submission failed or no confirmation message');
    //   });
    
    //   it('should validate required fields before submission', async () => {
    //     // Navigate to the form page (assuming you have already clicked the "Proceed" button in the previous tests)
    //     await driver.get('https://your-company-blog-site.com');
    //     const proceedButton = await driver.findElement(By.xpath("//div[@class='next-step-button']"));
    //     await proceedButton.click();
    
    //     // Find and click the submit button without filling the form
    //     const submitButton = await driver.findElement(By.xpath("//div[@class='next-step-button'][contains(.,'Submit')]"));
    //     await submitButton.click();
    
    //     // Assert that an error message is shown for required fields
    //     const errorMessage = await driver.wait(until.elementLocated(By.id('error-message-two')), 5000);
    //     const errorIsVisible = await errorMessage.isDisplayed();
    //     assert.strictEqual(errorIsVisible, true, "❌ Error message for required fields is not displayed");
    //   });
});
