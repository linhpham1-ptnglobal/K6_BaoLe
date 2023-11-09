// import { SharedArray } from 'k6/data';
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";
import { sleep } from "k6";
import exec from 'k6/execution';
import { login2 } from "../login2.js"
import moment from '../lib/moment.min.js';
import { SESSION_DURATION_MINS, setCurrentUsername } from "../data/uj.js";
import http from 'k6/http';

/**
 * 
 * @param {*} testConfig 
 * affect a sleep for a random period
 * sleep length max is defined in testConfig as shortSleepMax unless targetLengthInMs is used to manage spreading the execution of test over a period of time.
 */
export function nk6Sleep(testConfig, factor = 1) {
    // if (testConfig.targetLengthInMs) {
    //     // sleep for some time, as to spread the work over an hour (or whatever the length is)
    //     let secondsLeft = parseInt((testConfig.targetLengthInMs - exec.instance.currentTestRunDuration) / 1000 - testConfig.buffer)
    //     let sleepTime = randomIntBetween(1, secondsLeft)
    //     // console.log('sleeping for ', sleepTime)
    //     sleep(sleepTime)
    // } else {
        // a short sleep

        let sleepTime = randomIntBetween(testConfig.shortSleepMin, testConfig.shortSleepMax)
       
        if(testConfig.shortenSleepWhenFew && exec.instance.vusActive < testConfig.vus * 0.1){
            // the sleep can be shorter for the last 10% of users
            sleepTime = sleepTime/4
            console.log('exec.instance.vusActive is ', exec.instance.vusActive + ' - so affecting a shorted sleeptime of: ' + sleepTime)
        }
        sleep(parseInt(sleepTime * factor))
    // }
}

export function logoutDelay(testConfig) {
    if (testConfig.logoutAtEndOfTest) {
        let secondsLeft = parseInt((testConfig.targetLengthInMs - exec.instance.currentTestRunDuration) / 1000 - testConfig.buffer)
        console.log('sleeping for ', secondsLeft)
        sleep(secondsLeft)
    } 

    return
}

export function waitForAllUserToLoginDelay(testConfig) {
    let timeToLogEveryOneIn = testConfig.sleepBetweenLogins * testConfig.vus
    let secondsLeft = parseInt(timeToLogEveryOneIn - (exec.instance.currentTestRunDuration / 1000)) // exec.instance.currentTestRunDuration is in ms
    console.log('waiting for every one to login for ', secondsLeft)
    sleep(secondsLeft)
    console.log('Finished waiting for everyone to login at ' + exec.instance.currentTestRunDuration / 1000 + ' seconds into the test')
    return
}

export function nk6Check(){
    // do normal check
    // if failed - console.log some useful information OR do a fail IF debugMode is true 
}

export function assignItemsToVus(testConfig) { 
    let itemsPerVu = Array(testConfig.vus).fill([])
    let sessionStartObject = moment(testConfig.initialSessionStart, 'DD-MM-YYYY HH:mm')
    let itemsTodo = []
    let newItemsPerVu = JSON.parse(JSON.stringify(itemsPerVu))

    for (var UJ of testConfig.UJsToInclude) {
        for (let i = 0; i < UJ.iterations; i++) {
            itemsTodo.push(UJ)
        }
    }

    for (var item of itemsTodo) {
        if (item.requiredSessionsPerJourney === 1) {
            let session = {
                sessionDate: sessionStartObject.format('DD-MM-YYYY'),
                start: sessionStartObject.format('HH:mm'),
                // we use 30 mins sessions - apply only for UJ2
                duration: item.addListingOfEachCase === 1 ? 30 : SESSION_DURATION_MINS // at this stage we only use 5 mins sessions
            }

            // reset the session time
            if (sessionStartObject.hours() > 16 && sessionStartObject.minutes() >= (60 - SESSION_DURATION_MINS)) {
                // this day is full (if we add this session we will be above 18:00), need to move to next working day

                if (sessionStartObject.isoWeekday() < 5) {
                    // it is Monday to Thursday, we can just go to next day.
                    sessionStartObject = sessionStartObject.add(1, 'd').hours(8).minutes(0)
                    // console.log('incrementing the day by 1')
                } else {
                    // it is a Friday and we ran out of time slots, so go to next Monday
                    sessionStartObject = sessionStartObject.add(3, 'd').hours(8).minutes(0)
                    // console.log('incrementing the day by 3 to next monday 8am')
                }
            } else {
                // still have time slots in this day
                sessionStartObject = sessionStartObject.add(SESSION_DURATION_MINS, 'm')
                // console.log('adding 5 mins')
            }

            item.session = session
        }

        let newItem = JSON.parse(JSON.stringify(item))

        if (newItemsPerVu.length < 2) {
            newItemsPerVu[randomIntBetween(0, testConfig.vus - 1)].push(newItem)
        }
        else {
            newItemsPerVu[randomIntBetween(1, testConfig.vus - 1)].push(newItem)
        }
    }
    
    return newItemsPerVu;

}

export function loginVu(setupData) {
    // sleep(randomIntBetween(1, setupData.testConfig.shortSleepMax))

    let vuId = exec.vu.idInTest - 1
    
    // 'Stage' the VU's login
    sleep(vuId * setupData.testConfig.sleepBetweenLogins)

    // let credentials = setupData.testConfig.users[vuId]
    const randomVuId = randomIntBetween(0,(setupData.testConfig.users.length - 1));
    let credentials = setupData.testConfig.users[randomVuId];


    // LOGIN AND OPEN HOME PAGE
    // if (setupData.vuItemsToDo[vuId].length === 0) return

    let requiresAdmin = setupData.vuItemsToDo[vuId].filter(item => item.userType === 'admin');
    if (requiresAdmin.length > 0) {
        credentials.username = "sysadm"
        credentials.password = "password"
    }

    setCurrentUsername(credentials.username);

    let loginData = login2(credentials)
    let token = loginData.token
    let jsSessionId = loginData.jsSessionId

    // SET SOME SESSION AND VU INFORMATION IN testConfig.users[vuId] SO IT CAN BE PASSED TO THE FUNCTIONS AND PUT IN DATA VAR
    setupData.testConfig.users[randomVuId].token = token
    setupData.testConfig.users[randomVuId].jsSessionId = jsSessionId
    // console.log(' setupData.testConfig.users[exec.vu.idInInstance].token',  setupData.testConfig.users[exec.vu.idInInstance].token)
    let testConfig = setupData.testConfig
    return {
        vuId,
        testConfig,
        token,
        credentials
    }
}

export const nkApiCall = (params) => {
    var i = 0
    var result, res
    while(i < params.repeats) {
        if(params.post){
            res = http.post(params.data.Urls.CONTEXT_PATH + params.uri + "?XSRF-TOKEN=" + params.data.token + params.paramsString, 
            {
                params: params.postData
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': params.data.token
                }
            });
        }else{
            res = http.get(params.data.Urls.CONTEXT_PATH + params.uri + "?XSRF-TOKEN=" + params.data.token + params.paramsString, 
            {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': params.data.token
                }
            });
        }
        
        result = (res.body);
        if(res.status !== 200){
            console.error('res.status of '+ params.name + ' with url ' + res.url + ' :',  res.status)
        }

        // if(params.name === 'LoadMainMenu'){
        //     console.log('res.status of '+ params.name + ' with url ' + res.url + ' :',  res.status)
        //     console.error('results of ' + params.name + ' : ' ,  result)
        // }
        //  console.log('res.timings', res.timings)
        
        // console.error('results of ' + params.name + ' : ' ,  result)
        
        sleep(1)

        i++
    }
    return
}

