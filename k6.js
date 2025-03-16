import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 10, // Simulating 10 users
    duration: '30s', // Run test for 30 seconds
};

export default function () {
    let res = http.get('https://www.xenonstack.com');
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response time < 2s': (r) => r.timings.duration < 2000,
    });
    sleep(1);
}
