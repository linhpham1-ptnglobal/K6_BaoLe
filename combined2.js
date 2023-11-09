import http from "k6/http";
import { check, group, sleep } from "k6";
import { Counter, Rate, Trend } from "k6/metrics";
import { randomIntBetween, randomItem } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";
import { UJ1 } from "./ujs/UJ1.js";
import { UJTrial } from "./ujs/UJTrial.js";
import { login } from "./login.js";
import { getUsers } from "./data/users.js";
import exec from 'k6/execution';
import { SharedArray } from 'k6/data';
// import moment from './lib/moment.min.js';


// AVAILABLE TEST CONFIGS
const availTestConfigs = {
    default: {
        vus: 1,
        executor: 'shared_iterations',// or test time
        shortSleepMax: 2, // extend this to control the spread of test over time, longer will take more time to complete the iterations
        UJsToInclude: [
            {
                name: 'UJTrial',
                functionToExecute: 'UJTrial',
                iterations: 1
            },
            // {
            //     name: 'UJ2',
            //     functionToExceute: UJ2,
            //     iterations: 1
            // }
        ],
        targetLengthInMs: null, // i.e. (2 * 60 * 1000),  ONLY use if you want to spread X iterations over a Y time period
        buffer: 10 // seconds before test end for calculating sleep time
    }
}

// DEFINE TEST CONFIG FOR THIS TEST AND ADD USERS TO IT define testConfig and add users data to it
const testConfig = availTestConfigs.default
testConfig.users = getUsers()

// prepare an array with items for each VU to do
const vuItemsToDo = new SharedArray('vuItemsToDo', function () {
    let i, n, j
    let vuItemsToDo = []
    for (n = 0; n < testConfig.vus; n++) {
        vuItemsToDo[n] = []
    }
    for (j = 0; j < testConfig.UJsToInclude.length; j++) {
        for (i = 0; i < testConfig.UJsToInclude[j].iterations; i++) {
            vuItemsToDo[randomIntBetween(0, testConfig.vus - 1)].push(testConfig.UJsToInclude[j])
        }
    }
    // console.log('vuItemsToDo,', vuItemsToDo)
    return vuItemsToDo;
});


// SETUP K6 OPTIONS
export let options = {
    insecureSkipTLSVerify: true,
    scenarios: {
        CombinedTestScenario: {
            // executor: 'shared-iterations',
            executor: 'per-vu-iterations',
            gracefulStop: '1s',
            vus: testConfig.vus,
            exec: 'combinedTestScenarioExec',
            // iterations: testConfig.vus, // @todo check validity of this,
            iterations: 2,
            maxDuration: '10m', // will be 1h
        },
    }
};

// THE MAIN FUNCTION THAT EACH VU WILL RUN
export function combinedTestScenarioExec() {

    // DO WE NEED TO SPREAD ACTIVITY OVER AN HOUR, OR JUST RUN WITH MINIMAL RANDOM WAITS IN-BETWEEN?
    if (testConfig.targetLengthInMs) {
        // sleep for some time, as to spread the work over an hour (or whatever the length is)
        let secondsLeft = parseInt((testConfig.targetLengthInMs - exec.instance.currentTestRunDuration) / 1000 - testConfig.buffer)
        sleep(randomIntBetween(1, secondsLeft))
    } else {
        // a short sleep
        sleep(randomIntBetween(1, testConfig.shortSleepMax))
    }

    let vuId = exec.vu.idInTest - 1
    // console.log('vuItemsToDo[vuId]', vuItemsToDo[vuId])

    // LOGIN AND OPEN HOME PAGE
   let  credentials = testConfig.users[vuId]
   let sessionData = login(credentials)
   let token = sessionData.token
   let jsSessionId = sessionData.jsSessionId
   let result
  
    if (!sessionData) {
        console.log('login failed so I am stopping')
    } else {

        // SET SOME SESSION AND VU INFORMATION IN testConfig.users[vuId] SO IT CAN BE PASSED TO THE FUNCTIONS AND PUT IN DATA VAR
        testConfig.users[vuId].token = token
        testConfig.users[vuId].jsSessionId = jsSessionId    
        // console.log(' testConfig.users[exec.vu.idInInstance].token',  testConfig.users[exec.vu.idInInstance].token)
       
        let data = {
            vuId,
            testConfig,
            token
        }
        
        // RUN EACH ITEM (USER JOURNEY) THIS VU IS ASSIGNED TO
        vuItemsToDo[vuId].forEach(item => {
            console.log('I am executing the function: ', item.functionToExecute)
            //  FOR THE MOMENT IT IS HAR CODED
            if(item.functionToExecute === 'UJTrial'){
                result = UJTrial(data)
            }
          });

       

        // PERFORM THE UJ'S ASSIGNED IN vuItemsToDo
        
        // do each UJ's in your vuItemsTodo
        
        //console.log('${exec.vu.iterationInInstance}', exec.vu.idInTest)
        // console.log('got to do my vuItemsToDo, and i have this many:', vuItemsToDo[vuId].length)
        // console.log(vuItemsToDo[vuId])

    }

}
