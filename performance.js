import { Builder } from 'selenium-webdriver';
import { expect } from 'chai';
import { exec } from 'child_process';
import path from 'path';

describe("XenonStack Performance Test", function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://www.xenonstack.com");
    });

    after(async function () {
        await driver.quit();
    });

    it("Should load page successfully", async function () {
        this.timeout(10000);
        let title = await driver.getTitle();
        expect(title).to.not.be.empty;
    });

    it("Run K6 Performance Test", function (done) {
        this.timeout(60000);

        // Get absolute path of k6-test.js
        const k6Script = path.resolve("/home/jrvis/Documents/testOps/", "k6.js");

        exec(`k6 run "${k6Script}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`K6 Execution Error: ${error.message}`);
                return done(error);
            }
            console.log(stdout);
            if (stderr) console.error(stderr);
            done();
        });
    });
});
