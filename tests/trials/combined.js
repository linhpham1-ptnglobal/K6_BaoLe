

import { getUsers } from "../../data/users.js";
import { assignItemsToVus, loginVu, nk6Sleep } from "../../lib/nk6.js"
import { Counter, Rate, Trend } from "k6/metrics";
import exec from 'k6/execution';

import { testUJ1 } from "../../ujs/testUJ1.js";
import { testUJ2 } from "../../ujs/testUJ2.js";
import { testUJ3 } from "../../ujs/testUJ3.js";
/** IMPORT USER JOURNEY 1 */


const testConfig = availTestConfigs.default


/** PREPARE AN ARRAY OF ITEMS FOR EACH VU TO DO */
// @todo: move to nk6
testConfig.users = getUsers()
const vuItemsToDo = assignItemsToVus(testConfig) // using the nk6 utility
//console.log('vuItemsToDo for 1', vuItemsToDo[1].length);
// console.log('vuItemsToDo for 1', vuItemsToDo);

/** SETUP K6 OPTIONS */
export let options = {
    insecureSkipTLSVerify: true,
    scenarios: {
        CombinedTestScenario: {
            executor: 'shared-iterations',
            //executor: 'per-vu-iterations',
            gracefulStop: '1s',
            vus: testConfig.vus,
            exec: 'combinedTestScenarioExec',
            // iterations: testConfig.vus, // @todo check validity of this,
            iterations: testConfig.vus,
            maxDuration: '10m', // will be 1h
        },
    }
};
export function setup() {

    /** AVAILABLE TEST CONFIGS  */
    // Using an array of possible configs in case you want to a few configs to try during dev
    // foe example we can gave combined setup, soak setup, break setup etc...
    const availTestConfigs = {
        default: {
            vus: 4,
            // executor: 'shared_iterations',// or test time

            shortSleepMax: 2, // extend this to control the spread of test over time, longer will take more time to complete the iterations
            UJsToInclude: [
                {
                    name: 'testUJ1',
                    functionToExecute: 'testUJ1',
                    iterations: 12,
                    requiredSessionsPerJourney: 1
                },
                {
                    name: 'testUJ2',
                    functionToExecute: 'testUJ2',
                    iterations: 12
                },
                {
                    name: 'testUJ3',
                    functionToExecute: 'testUJ3',
                    iterations: 24
                }
            ],
            initialSessionStart: '22-12-2022 08:00',
            targetLengthInMs: null, //180000, // i.e. (2 * 60 * 1000),  ONLY use if you want to spread X iterations over a Y time period. 1 min = 60000ms
            buffer: 30, // seconds before test end for calculating sleep time
            metrics: {
                uj1Counter: new Counter("uj1Counter"),
                uj2Counter: new Counter("uj2Counter"),
                uj3Counter: new Counter("uj3Counter")
            }
        }
    }



    return {
        setupData: {
            availTestConfigs: availTestConfigs
        }
    };
}
console.log('I am testConst from setup IN BODY ', setup())


// THE MAIN FUNCTION THAT EACH VU WILL RUN
// @todo: move to nk6
export function combinedTestScenarioExec(setupData) {
    console.log('I am testConst from setup ', setupData)
   
    // Login the user once, so they can perform different journeys on one login session
    let data = loginVu(testConfig)

    // affect a sleep 
    //(short sleep will create randomness, 
    //or a sleep that is calculated to spread the execution of the test over a period of time )
    nk6Sleep(testConfig);

    // console.log('vuItemsToDo: ', vuItemsToDo);
    // console.log('vuId: ', data.vuId);

    // RUN EACH ITEM (USER JOURNEY) THIS VU IS ASSIGNED TO
    vuItemsToDo[data.vuId].forEach(item => {
        // if(data.vuId === 1){
        //     console.log('I am ' + data.vuId + ' and executing the function: ', item.functionToExecute)
        //     vu0Counter.add(1)
        // }

        //  FOR THE MOMENT IT IS HARD CODED
        let result
        if (item.functionToExecute === 'testUJ1') {
            result = testUJ1(data)
        } else if (item.functionToExecute === 'testUJ2') {
            result = testUJ2(data)
        } else if (item.functionToExecute === 'testUJ3') {
            result = testUJ3(data)
        }
    });
}
