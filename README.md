

# NK6 Framework (built on K6)

## Running a test
1. navigate to the tests directory 
2. ``` k6 run tesFileName.js ```
## Creating a test
- create a test file in tets folder (copy existing)
- import relevant UJ's
- set config an dK6 option as required
## Execution hierarchy
The test file follows this flow (see test1.js)
- imports relevant User Journey (UJ's)
- testConfig (which executor type, which user journeys are included etc.)
- get a list of users
- assign itemsToDo for each VU (Virtual User)
- set K6 options: define scenario parameters (we only use one scenario at this stage)
- Run the main scenario function
  - Login the user
  - run each item that was assigned for this user

