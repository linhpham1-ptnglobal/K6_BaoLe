import http from "k6/http";
import { check, group, sleep } from "k6";
import { Counter, Rate, Trend } from "k6/metrics";
import { randomIntBetween, randomItem } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";
import { UJ0 } from "./UJ0.js";

const loginData = JSON.parse(open("./users.json"));  // download the data file here: https://test.k6.io/static/examples/users.json

/* Options
Global options for your script
stages - Ramping pattern
thresholds - pass/fail criteria for the test
ext - Options used by Load Impact cloud service test name and distribution
*/
export let options = {
    stages: [
        { target: 2, duration: "10s" },
    ],
    thresholds: {
        "http_req_duration": ["p(95)<1000"],
        "http_req_duration{staticAsset:yes}": ["p(95)<1000"],
        "check_failure_rate": ["rate<0.3"]
    },
    ext: {
        loadimpact: {
            projectID: 3607944, //3481255
            name: "Insights Demo with Cloud Execution",
            distribution: {
                scenarioLabel1: { loadZone: "amazon:ie:dublin", percent: 50 },
                scenarioLabel2: { loadZone: "amazon:us:ashburn", percent: 50 }
            }
        }
    }
};


// Custom metrics
// We instantiate them before our main function
let successfulLogins = new Counter("successful_logins");
let checkFailureRate = new Rate("check_failure_rate");
let timeToFirstByte = new Trend("time_to_first_byte", true);

let UjConfig = [
    {
        name: 'UJ0',
        iterationsPerHour: 1200,
        functionToRun: UJ0
    },
    {
        name: 'UJ1',
        iterationsPerHour: 1200,
        functionToRun: UJ0
    }
]

/* Main function
The main function is what the virtual users will loop over during test execution.
*/
export default function () {
    let params = {
        successfulLogins,
        checkFailureRate,
        timeToFirstByte,
        options,
        loginData
    }
    UjConfig[0].functionToRun(params)
}