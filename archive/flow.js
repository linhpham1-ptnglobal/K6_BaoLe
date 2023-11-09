import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 1,
  duration: '30s',
  insecureSkipTLSVerify: true
};
export default function () {
  http.get('https://hmcts.mcgirrtech.com/');
  sleep(1);
}


/*

11 Nov

A) Configurations:
1.  an array of UJ's like:
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

2. testConfig: {
  vus: 2000,
  executor: 'shared_iterations' // or test time
  iterations: ?,
  shortSleepMax: 10, // extend this to control the spread of test over time, longer will take more time to complete the iterations
  shortSleepMin: 1
  midSleepMax: 20
  midSleepMax: 10
  UJsToInclude: -1 // -1 for all... an array otherwise
  staggerVuRate: 1 //sec
}

B) on setup:
iterate over each UJ that is included in this test, and allocate to each user:
(since we stagger the start of each VU - each can grab the next itemsToDo)
uJToDo [ 
  [1,2,3],
  [1,2]
]

C) scenario:
1. login user
2. perform each assigned UJ

Normal load: high sleep time (longer spread)
Peak load: short sleep time
Soak: very high iterations number, run test over time rather than over num of iterations
Break: add VU's with very short sleep time

==================================


B) on setup():
// OLD: 
stuff an array of item to run, each element is the UjConfig index. This means we have an array representing all repetitions across all UJ's (and its' easy to add new ones!)
itemToRun = [
     UJ1[0], UJ4[0], UJ5[3], etc
]

C) find a way to login each VU only if they are not logged in yet, 
the test would be fixed iterations number (which is the itemsToRun.length())

D) run shared_iteration of this scenario
each VU sleeps for a random short time, logs in if they have to, then pick a random item from itemsToDo, remove it from the itemsToDo array,  and run that UJ

E) figure out what to log...

F) write the UJ's

G) for peak - just double the iterations numbers, for break: set the test to run on time instead of iteration numbers and ramp up Vu's forever (log number of VU's at break point and function)


===================


Simple sample:

8 VU
3 scenario:
  scenario_1: 50 iterations PER HOUR (for development purposes you can make it per 5 minutes or something like that)
  scenario2: 40
  scenario 3: 10

Requirements:
1. iterations to happen randomly throughout the hour
2. a VU will do different scenarios (not be stuck only on one scenario)
3. I'm not too concerned about what the scenario is doing - make it super simple like calling google.com and checking it was received, that all.
4. put is some metrics or console.log so we can see a log as a proof that each VU did different scenarios, and the count of repetitions so we know we covered all repetitions.



ASK:
login 2K users, have X scenarios.
each scenario has X iteration required per hour (across all Vu's at random intervals)
some scenarios can only be performed by admin users
randomly spread the trx throughput over the hour

Peak: double trx throughput
Soak: run for 4 hours
Break: gradually increase num of VU AND num of trx (or trx if we have enough VU's)




how: 
Run 2000 VU, each VU logs in a few of them admins, the rest non-admin users, wait for a random time and performs the UJ with x repetitions.
(what is their ratio of admins to non admins?)
/// maybe: Create a module (or something like that) for each one of the scenarios we described. A module should contain all the steps required to complete a BP (i.e. to create a case before listing it)
write a different test per each UJ, allocate X users to do each test? would be nice if each user could do all of the UJ's, but then how do we control number of trx throughput? Using context variables like:
Scenario info
-------------
Name of the running scenario: ${exec.scenario.name}
Executor type: ${exec.scenario.executor}
Scenario start timestamp: ${exec.scenario.startTime}
Percenatage complete: ${exec.scenario.progress}
Iteration in instance: ${exec.scenario.iterationInInstance}
Iteration in test: ${exec.scenario.iterationInTest}
(https://k6.io/docs/using-k6/execution-context-variables/) 

if we do that then a user will randomly do one of the scenarios (select from an array of scenario names?), considering the time left and wether this scenario was not executed enough times already



UjConfig = {
  UJ1 = {
      ratePerHourPerUser: 2 // how many times one vu should repeat, not needed if all users can do all scenarios!
      peakRatePerHourPerUser: 4
      numberOfVu: 600
      normalUjDuration: 30 (estimation, doesn't have to be too accurate)
      ujIterationPerHour: 1200

    }
}
generalConfig = {
  maxAcceptedTrxDurationThreshold
  etc
}

(see https://k6.io/docs/using-k6/environment-variables/ and  https://k6.io/docs/using-k6/execution-context-variables/)

so:
1. select a random UJ from UJs array (if you are not admin you can't select certain ones)
2. check if ujIterationPerHour has not been achieved yet
3. if not achieved yet - perform the UJ
3. sleep for a random time as follows: 
    calculate a random time between now and the time left for this test (assuming one hour test, and (minus a reasonable time it takes to perform this task),


If user has a dedicated UJ:
endTime = startTime + 1hr
lastTrxBy = endTime - normalUjDuration
sleepFor = a random time between NOW and (lastTrxBy - now()) / peakRatePerHOurPerUser  (this will randomise when they do their process during the oen hour test)



STRUCTURE:
- each UJ is a scenario, ideally it can be stored in a differnt file and imported in
- we only have on executor

WAIT - can we use the scenario conif in k6 to set reps etc?


ALt (if each user has a dedicated UJ)
The VU will sleep for that random time, then perform the UJ, and if needs to perform it again, it will sleep for a random time again and do it.
In the breakTest - we can gradually increase number of vusers, or gradually increase peakRatePerHourPerUser (with loggings it could be quite clear when certain trx fail a threshold)


Setup(){
  get a random user credentials from a users json and log them in:
  const loginData= JSON.parse(open("./users.json"));  // download the data file here: https://test.k6.io/static/examples/users.json
  see https://gist.github.com/Vmihajlovic/8c6014bbf4dddd96eb6d995020139e65
  check if we can define teh constant VARS[] in setup() and have it available in default()

}

default() {

}





*/