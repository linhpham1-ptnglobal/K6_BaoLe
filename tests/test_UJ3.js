import { getUsers } from "../data/users.js";
import { assignItemsToVus, loginVu } from "../lib/nk6.js"
import { initializeData } from "../data/uj.js";
import { calculateExecutionCount, getExecutionInfo } from "../lib/utils.js";
import { initializeMetricGroup } from "../lib/utils.js";

/** IMPORT USER JOURNEY 1 */
import { UJ3 } from "../ujs/UJ3.js";

/** AVAILABLE TEST CONFIGS  */
// Using an array of possible configs in case you want to a few configs to try during dev
const availTestConfigs = {
    default: {
        vus: 1,
        executor: 'shared_iterations',// or test time
        shortSleepMax: 2, // extend this to control the spread of test over time, longer will take more time to complete the iterations
        UJsToInclude: [
            {
                name: 'UJ3',
                functionToExecute: 'UJ3',
                iterations: 1
            }
        ],
        targetLengthInMs: null, // i.e. (2 * 60 * 1000),  ONLY use if you want to spread X iterations over a Y time period
        buffer: 10, // seconds before test end for calculating sleep time
        metrics: initializeMetricGroup()
    }
}
const testConfig = availTestConfigs.default

/** PREPARE AN ARRAY OF ITEMS FOR EACH VU TO DO */
// @todo: move to nk6
testConfig.users = getUsers()
const vuItemsToDo = assignItemsToVus(testConfig) // using the nk6 utility

/** SETUP K6 OPTIONS */
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
            iterations: 1,
            maxDuration: '10m', // will be 1h
        },
    }
};

// THE MAIN FUNCTION THAT EACH VU WILL RUN
// @todo: move to nk6
export function combinedTestScenarioExec() {
    let data = loginVu(testConfig);

    // Counter for each execution
    const execCount = calculateExecutionCount();
    data = Object.assign({}, data, initializeData(execCount));

    // RUN EACH ITEM (USER JOURNEY) THIS VU IS ASSIGNED TO
    const executionInfo = getExecutionInfo();
    vuItemsToDo[data.vuId].forEach(item => {
        console.log(`${executionInfo} - I am executing the function: ${item.functionToExecute}`);
        //  FOR THE MOMENT IT IS HARD CODED
        if (item.functionToExecute === 'UJ3') {
            let result = UJ3(data)
        }
    });
}
