// import http from 'k6/http';
// import { sleep } from 'k6';
const http  = require("k6/http")
const {sleep}  = require("k6")
export const options = {
  // Key configurations for Stress in this section
  stages: [
    { duration: '5s', target: 50 }, // traffic ramp-up from 1 to a higher 200 users over 10 minutes.
    { duration: '10s', target: 50 }, // stay at higher 200 users for 30 minutes
    { duration: '10s', target: 0 }, // ramp-down to 0 users
  ],
};

export default () => {
  const urlRes = http.get('https://xenonstack.com');


  sleep(1);
  // MORE STEPS
  // Here you can have more steps or complex script
  // Step1
  // Step2
  // etc.
};