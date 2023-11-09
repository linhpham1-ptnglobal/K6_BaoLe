import { getUsers, getAdminUsers } from "../data/users.js";
import { assignItemsToVus, loginVu, nk6Sleep, logoutDelay, waitForAllUserToLoginDelay } from "../lib/nk6.js"
import { getExecutionInfo, handleCheckLoginFail, initializeFormCounterMetric, writeLog } from "../lib/utils.js";
import { initializeData, getCurrentUJTestData, setExecutionIndex } from "../data/uj.js";
import { initializeMetricGroup } from "../lib/utils.js";
import { Counter } from 'k6/metrics';
import { logout } from "../components/common/logout.js";
import { check, fail, sleep } from 'k6';
// import http from "k6/http";
// import { check, fail } from 'k6';

/** IMPORT USER JOURNEY CODE */
import { UJ1 } from "../ujs/UJ1.js";
import { UJ2 } from "../ujs/UJ2.js";
import { UJ3 } from "../ujs/UJ3.js";
import { UJ4 } from "../ujs/UJ4.js";

const uj1Counter = new Counter('uj1Counter');
const uj2Counter = new Counter('uj2Counter');
const uj3Counter = new Counter('uj3Counter');
const uj4Counter = new Counter('uj4Counter');

export let metrics = initializeMetricGroup();
export let formCounterMetrics = initializeFormCounterMetric();

/*
const trxRepeatsA = 1200 // uj1, uj2, uj3
const trxRepeatsB = 100 // uj4
const trxRepeatsFactor = 1 // change this to create less or more load
const numOfVus = 800 // change this to create less or more load
const sleepBetweenLogins = 2
const shortSleepMin = 10 // used as sleep between trx
const shortSleepMax = 20
const logoutAtEndOfTest = false
const buffer = 5*60 // seconds before test end for calculating sleep time
*/

// common settings
const UJ1Repeats = 175
const UJ2Repeats = 175
const UJ3Repeats = 9600/8
const UJ4Repeats = 50
const trxRepeatsFactor = 2
const numOfVus = 800*2
const sleepBetweenLogins = 2
const shortSleepMin = 4
const shortSleepMax = 20
const initialSessionStart = '20-05-2023 09:00'
const testLength = '1h'
const numOfJOHUser = 400;
const shortenSleepWhenFew = true


// less used settings
const waitForAllUserToLogin = false
const logoutAtEndOfTest = false
const buffer = 5*60

export function setup() {

    let setupData = {}

    setupData.availTestConfigs = {
        default: {
            vus: numOfVus,
            // executor: 'shared_iterations',// or test time
            logoutAtEndOfTest: logoutAtEndOfTest,
            shortSleepMin: shortSleepMin, 
            shortSleepMax: shortSleepMax, // extend this to control the spread of test over time, longer will take more time to complete the iterations
            sleepBetweenLogins: sleepBetweenLogins,
            waitForAllUserToLogin: waitForAllUserToLogin,
            UJsToInclude: [
                {
                    name: 'UJ1',
                    functionToExecute: 'UJ1',
                    iterations: UJ1Repeats * trxRepeatsFactor, // repeats
                    requiredSessionsPerJourney: 1
                },
                {
                    name: 'UJ2',
                    functionToExecute: 'UJ2',
                    iterations: UJ2Repeats * trxRepeatsFactor,
                    requiredSessionsPerJourney: 1,
                    addListingOfEachCase: 1
                },
                {
                    name: 'UJ3',
                    functionToExecute: 'UJ3',
                    iterations: UJ3Repeats * trxRepeatsFactor,
                    requiredSessionsPerJourney: 0
                },
                {
                    name: 'UJ4',
                    functionToExecute: 'UJ4',
                    iterations: UJ4Repeats * trxRepeatsFactor,
                    requiredSessionsPerJourney: 0,
                    userType: 'admin'
                }
            ],
            initialSessionStart: initialSessionStart, // hard coded start date, so if we run a few tests in the same day they don't conflict, we can set a later start date. we can fit 600 sessions in one week (5 days)
            targetLengthInMs: 60000*60 , // i.e. (2 * 60 * 1000) 1 min = 60000 ms
            buffer: buffer,
            numOfJOHUser: numOfJOHUser,
            shortenSleepWhenFew: shortenSleepWhenFew
        }
    }
    setupData.testConfig = setupData.availTestConfigs.default

    /** PREPARE AN ARRAY OF ITEMS FOR EACH VU TO DO */
    setupData.testConfig.users = getUsers()
    setupData.vuItemsToDo = assignItemsToVus(setupData.testConfig) // using the nk6 utility
    // console.log('vuItemsToDo', setupData.vuItemsToDo)

    return setupData;
}

/** SETUP K6 OPTIONS */
export let options = {
    insecureSkipTLSVerify: true,

    scenarios: {
        CombinedTestScenario: {
            // executor: 'shared-iterations',
            executor: 'per-vu-iterations',
            gracefulStop: '1s',
            vus: numOfVus,
            exec: 'combinedTestScenarioExec',
            iterations: 1, // how many iteration per VU when using per-vu-iterations
            // iterations: numOfVus,
            maxDuration: testLength, 
        },
    },
};

// THE MAIN FUNCTION THAT EACH VU WILL RUN
// @todo: move to nk6
export function combinedTestScenarioExec(setupData) {
    const testConfig = setupData.testConfig

    // LOGIN CHECKING, IF FAIL THEN LOGIN THE NEXT USER. OTHERWISE, CONTINUE TO RUN THE UJ'S STEPS
    let data = handleCheckLoginFail(
        () => {
            return loginVu(setupData);
        }
    );

    const executionInfo = getExecutionInfo();

    if (!data || !data.token) {
        console.warn(`${executionInfo} - Login failed (could not find token)`);
        return;
    }
    else {
        check(data, {'Login succeeded': data => data && data.token });
    }

    if(testConfig.waitForAllUserToLogin){
        waitForAllUserToLoginDelay(testConfig)
    }
   
    let shuffledItems = setupData.vuItemsToDo[data.vuId].map(a => ({ sort: Math.random(), value: a })).sort((a, b) => a.sort - b.sort).map(a => a.value);

    shuffledItems.forEach((item, index) => {
        setExecutionIndex(index);

        console.log(`${executionInfo} - I am executing the function: ${item.functionToExecute}`);
       
        nk6Sleep(testConfig);
        data.session = (item.session ? item.session : []);
        data = Object.assign({}, data, initializeData(data), getCurrentUJTestData(item.functionToExecute));

        //  FOR THE MOMENT IT IS HARD CODED
        let result
        if (item.functionToExecute === 'UJ1') {
            uj1Counter.add(1)
            result = UJ1(data)
        } else if (item.functionToExecute === 'UJ2') {
            uj2Counter.add(1)
            result = UJ2(data)
        } else if (item.functionToExecute === 'UJ3') {
            uj3Counter.add(1)
            result = UJ3(data)
        } else if (item.functionToExecute === 'UJ4') {
            uj4Counter.add(1)
            result = UJ4(data)
        }
    });

    // Add a sleep till the end of the test
    if(testConfig.logoutAtEndOfTest){
        logoutDelay(testConfig)
        logout(data);
    }
   
}
