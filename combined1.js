import http from "k6/http";
import { check, group, sleep } from "k6";
import { Counter, Rate, Trend } from "k6/metrics";
import { randomIntBetween, randomItem } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";
import { UJ0, login } from "./UJ0.js";


const loginData = JSON.parse(open("./users.json"));  
/* Options
Global options for your script
stages - Ramping pattern
thresholds - pass/fail criteria for the test
ext - Options used by Load Impact cloud service test name and distribution
*/
export let options = {
    insecureSkipTLSVerify: true,
    // stages: [
    //     { target: 2, duration: "10s" },
    // ],
    thresholds: {
        "http_req_duration": ["p(95)<1000"],
        "http_req_duration{staticAsset:yes}": ["p(95)<1000"],
        "check_failure_rate": ["rate<0.3"]
    },
    ext: {
        loadimpact: {
            projectID: 3607944, //3481255
            name: "Combined1 test trials",
            distribution: {
                scenarioLabel1: { loadZone: "amazon:ie:dublin", percent: 50 },
                scenarioLabel2: { loadZone: "amazon:us:ashburn", percent: 50 }
            }
        }
    },
    scenarios: {
        CombinedTestScenario: {
            executor: 'shared-iterations',
            gracefulStop: '1s',
            vus: 2,
            exec: 'combinedTestScenarioExec',
            iterations: 3,
            maxDuration: '10m',
          },
    }
   
    // scenarios: {
    //     scenario1: {
    //       // name of the executor to use
    //       executor: 'shared-iterations',
    
    //       // common scenario configuration
    //       startTime: '1s',
    //       gracefulStop: '5s',
    
    //       // executor-specific configuration
    //       vus: 2,

    //     },
    //   },
};


// Custom metrics
// We instantiate them before our main function
let successfulLogins = new Counter("successful_logins");
let checkFailureRate = new Rate("check_failure_rate");
let timeToFirstByte = new Trend("time_to_first_byte", true);

let UjConfig = [
    {
        name: 'login',
        iterationsPerHour: 1200,
        functionToRun: login
    },
    {
        name: 'UJ1',
        iterationsPerHour: 1200,
        functionToRun: UJ0
    }
]

let counter = 0

/* Main function
The main function is what the virtual users will loop over during test execution.
*/
export function combinedTestScenarioExec() {
    let params = {
        successfulLogins,
        checkFailureRate,
        timeToFirstByte,
        options,
        loginData
    }
    counter = (counter +1)
    console.log('counter', counter)
    console.log('UjConfig[0].iterationsPerHour BEFORE', UjConfig[0].iterationsPerHour)
    UjConfig[0].iterationsPerHour = 1
    console.log('UjConfig[0].iterationsPerHour BEFORE', UjConfig[0].iterationsPerHour)

    // UjConfig[0].functionToRun(params)

}
// export default function () {
//     let params = {
//         successfulLogins,
//         checkFailureRate,
//         timeToFirstByte,
//         options,
//         loginData
//     }
//     UjConfig[0].functionToRun(params)
// }