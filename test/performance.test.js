

const { Builder, By, until } = require('selenium-webdriver');
const { exec } = require('child_process');
const assert = require('chai').assert;
const mocha = require('mocha');
const path = require('path');
const { describe, it } = mocha;
const chrome = require("selenium-webdriver/chrome")

describe('K6 Stress Test Integration with Selenium and Mocha', function () {
    this.timeout(0)
    let driver;
const options = new chrome.Options()
    options.setPageLoadStrategy("eager")

before(async function () {
        driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
        await driver.get("https://www.xenonstack.com");
    });

    after(async function () {
        await driver.quit();
    });

  // Function to execute K6 test
  function runK6Test() {
    return new Promise((resolve, reject) => {
        const filePath = '/Users/xs523-sursin/Documents/testing/'    

      const k6Script = path.resolve(filePath, 'k6.js'); 
      exec(`k6 run --out json=results.json ${k6Script}`, (error, stdout, stderr) => {
        if (error) {
          return reject(error);
        }
        if (stderr) {
          return reject(stderr);
        }
        resolve(stdout);
        console.log(stdout)
      });
    });
  }

  // Parse K6 JSON result and make assertions
//   function parseK6Results() {
//     const k6Results = require('./stdout');
//     const metrics = k6Results.metrics;
    
//     // Example: Assert that the average HTTP request duration is less than 2 seconds
//     const avgRequestDuration = metrics.http_req_duration.avg;
//     assert.isBelow(avgRequestDuration, 2000, `Average request duration is too high: ${avgRequestDuration} ms`);

//     // Example: Assert that there were no errors
//     const errorRate = metrics.http_req_failed.rate;
//     assert.isAtMost(errorRate, 0.05, `Error rate is too high: ${errorRate * 100}%`);

//     // Example: Check the number of successful requests
//     const requestsPerSecond = metrics.http_reqs.rate;
//     assert.isAbove(requestsPerSecond, 100, `Requests per second is too low: ${requestsPerSecond}`);
//   }

  it('should load the page and check performance metrics from K6', async function () {
    const url = 'https://xenonstack.com';

    // First, simulate a Selenium interaction (e.g., visit the website)
    await driver.get(url);
    await driver.wait(until.titleIs('Data Foundry for Agentic Systems'), 5000);

    // Run the K6 test to simulate load and gather performance data
    await runK6Test();

    // Parse and assert based on K6 results
    // parseK6Results();

    // Optionally, additional assertions based on Selenium actions (e.g., page load, elements visibility)
    const title = await driver.getTitle();
    assert.strictEqual(title, 'Data Foundry for Agentic Systems', 'Page title does not match');
  });

});

