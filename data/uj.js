import { DatetimeAction, Environment } from "./constant.js";
import { generateDate, addMinutes, getRandomArrayValue } from  "../lib/utils.js";

const ENV = Environment.AZURE;

const uj1Data = JSON.parse(open(`./UJ1_HMCTS_${ENV}_DATA.json`));
const uj2Data = JSON.parse(open(`./UJ2_HMCTS_${ENV}_DATA.json`));
const uj3Data = JSON.parse(open(`./UJ3_HMCTS_${ENV}_DATA.json`));
const uj4Data = JSON.parse(open(`./UJ4_HMCTS_${ENV}_DATA.json`));


const localitiesLocations = open(`./EVT_LOCATION.csv`);

// const localitiesLocations = open(`./ThamesValleyLocationsLocalities.csv`);
 const users = open(`./PTP_INT_PART.csv`);


const ujDataList = [
    {
        name: 'UJ1',
        data: uj1Data
    },
    {
        name: 'UJ2',
        data: uj2Data
    },
    {
        name: 'UJ3',
        data: uj3Data
    },
    {
        name: 'UJ4',
        data: uj4Data
    }
]

// TOGGLE METRICS
const IS_SHOW_METRICS = true;

// DURATION FOR EACH SESSION
const SESSION_DURATION_MINS = 5;

// SLEEP X SECOND(S) BEFORE SUBMITING THE FORM
const FORM_SLEEP = 1;

// TRY TO GET THE FORM IF NOT FOUND
const FORM_DISCOVERY_REPEAT_TIMES = 5;
const FORM_DISCOVERY_REPEAT_TIME_INTERVAL = 5; // SECONDS

// TRY TO LOGIN IN 10 TIMES
const RE_LOGIN_TIMES = 10; // TRY TO LOGIN 10 TIMES FOR EACH USER
const RE_LOGIN_TIME_INTERVAL = 10; // 1 SECOND DELAY FOR EACH LOGIN

// LOG FILE NAME
const LOG_FILE_NAME = "combined-output.txt";

// TOGGLE NEW HOME PAGE
const IS_NEW_HOME_PAGE = true;

const getCurrentUJTestData = (UJ) => {
    // console.log(`Load test data from ./${UJ}_HMCTS_${ENV}_DATA.json`);
    const testData = ujDataList.find(uj => uj.name === UJ).data;

    const CONTEXT_PATH = testData.contextPath;

    const viewMatterUrl = `${CONTEXT_PATH}/ViewMatter.action`;
    const eventEditUrl = `${CONTEXT_PATH}/EventEdit.do`;
    const matterHistoryUrl = `${CONTEXT_PATH}/LoadMatterHistory.action`;
    const awaitingListUrl = `${CONTEXT_PATH}/vue/MatterAwaitingListSearch.action`;
    const resourceSchedulerUrl = `${CONTEXT_PATH}/vue/Html5ResourceScheduler/init.action`;
    const venueBookingUrl = `${CONTEXT_PATH}/VenueBooking.do`;
    const resourceScheduleDataUrl = `${CONTEXT_PATH}/vue/HearingScheduleData.action`;
    const resourceScheduleDeleteListingsUrl = `${CONTEXT_PATH}/vue/HearingScheduleReschedule.action`;
    const johCalendarUrl = `${CONTEXT_PATH}/vue/ResourceScheduler/init.action`;
    const roomCalendarUrl = `${CONTEXT_PATH}/vue/ResourceScheduler/roomViewInit.action`;
    const saveSearchUrl = `${CONTEXT_PATH}/trunk_mcms/SaveSearch.action`;
    const getLOVDataUrl = `${CONTEXT_PATH}/vue/PopulateLovAction.action`;
    const PopulateMultiLovActionUrl = `${CONTEXT_PATH}/vue/PopulateMultiLovAction.action`;
    const selectSavedSearchUrl = `${CONTEXT_PATH}/vue/HearingScheduleSavedSearch.action`;
    const homePageUrl = `${CONTEXT_PATH}/CMSHomeAction.do`;
    const userListUrl = `${CONTEXT_PATH}/vue/UserListManagement/init.action`;
    const userListLoadUrl = `${CONTEXT_PATH}/vue/UserListManagement/load.action`;
    const userDetailsUrl = `${CONTEXT_PATH}/vue/UserManagement/initFromUserList.action`;
    const userDetailsLoadUrl = `${CONTEXT_PATH}/vue/UserManagement/loadSingleTab.action`;
    const userDetailsSaveUrl = `${CONTEXT_PATH}/vue/UserManagement/saveSingleTab.action`;
    const logoutUrl = `${CONTEXT_PATH}/LogoutAction.action`;
    const testContextPath = CONTEXT_PATH;
    const newHomePageUrl = `${CONTEXT_PATH}/vue/HomePage/init.action`;
    const loadMainMenuUrl = `${CONTEXT_PATH}/vue/menu/LoadMainMenu.action`;
    const homePageLoadUrl = `${CONTEXT_PATH}/vue/HomePage/load.action`;
    const homePageFilterUrl = `${CONTEXT_PATH}/vue/HomePage/homePageFilter.action`;

    const Urls = {
        CONTEXT_PATH: CONTEXT_PATH,
        VIEW_MATTER_URL: viewMatterUrl,
        EVENT_EDIT_URL: eventEditUrl,
        MATTER_HISTORY_URL: matterHistoryUrl,
        AWAITING_LIST_URL: awaitingListUrl,
        RESOURCE_SCHEDULER_URL: resourceSchedulerUrl,
        VENUE_BOOKING_URL: venueBookingUrl,
        RESOURCE_SCHEDULE_DATA_URL: resourceScheduleDataUrl,
        RESOURCE_SCHEDULER_DELETE_LISTINGS_URL: resourceScheduleDeleteListingsUrl,
        JOH_CALENDAR_URL: johCalendarUrl,
        ROOM_CALENDAR_URL: roomCalendarUrl,
        SAVE_SEARCH_URL: saveSearchUrl,
        GET_LOV_DATA_URL: getLOVDataUrl,
        POPULATE_MULTI_LOV_URL: PopulateMultiLovActionUrl,
        SELECT_SAVED_SEARCH_URL: selectSavedSearchUrl,
        HOME_PAGE_URL: IS_NEW_HOME_PAGE ? newHomePageUrl : homePageUrl,
        USER_LIST_URL: userListUrl,
        USER_LIST_LOAD_URL: userListLoadUrl,
        USER_DETAILS_URL: userDetailsUrl,
        USER_DETAILS_LOAD_URL: userDetailsLoadUrl,
        USER_DETAILS_SAVE_URL: userDetailsSaveUrl,
        LOGOUT_URL: logoutUrl,
        LOAD_MAIN_MENU_URL: loadMainMenuUrl,
        HOME_PAGE_LOAD_URL: homePageLoadUrl,
        HOME_PAGE_FILTER_URL: homePageFilterUrl
    }

    const Data = {
        CASE_FIELDS: testData.sampleCase,
        LISTING_REQUIREMENT_FIELDS: testData.sampleListingRequirement,
        VENUE_BOOKING_QUERY_PARAMS: testData.venueBookingQueryParams,
        VENUE_BOOKING_FIELDS: testData.sampleVenueBooking,
        LISTING_FIELDS: testData.sampleListing,
        RESOURCE_SCHEDULER_FILTERS: testData.resourceSchedulerFilters,
        VENUE_BOOKING_EDIT_QUERY_PARAMS: testData.venueBookingEditQueryParams,
        VENUE_BOOKING_EDIT_ID: testData.venueBookingEditId,
        USER_LIST_FILTERS: testData.userListFilters,
        USER_DETAILS_SUBMIT: [
            testData.personalDetailsSubmit,
            testData.systemDetailsSubmit,
            null,
            testData.jurisdictionsSubmit,
            testData.workPatternsSubmit
        ],
        PERSONAL_DETAILS_EMAIL: testData.personalDetailsEmail,
        RESOURCE_SCHEDULER_COMPLEX_FILTERS: testData.resourceSchedulerComplexFilters
    }

    return { Urls, Data }
}

let CURRENT_USERNAME = '';

const getCurrentUsername = () => {
    return CURRENT_USERNAME;
}

const setCurrentUsername = (username) => {
    CURRENT_USERNAME = username;
}

let EXECUTION_INDEX = 0;

const getExecutionIndex = () => {
    return EXECUTION_INDEX;
}

const setExecutionIndex = (index) => {
    EXECUTION_INDEX = index;
}

let LOGGED_IN_USERS = [];

const getLoggedInUsers = () => {
    return LOGGED_IN_USERS;
}

const addLoggedInUsers = (loggedInUser) => {
    LOGGED_IN_USERS.push(loggedInUser);
}

const initializeData = (data) => {
    const bookingDate = data.session.sessionDate;
    const receivedDate = generateDate(); // today
    const bookingDateNew = generateDate(bookingDate, 0, DatetimeAction.ADD, 'DD-MMM-YYYY'); // another format DD-MMM-YYYY: 01-Jan-2022
    const bookingDateEnd = receivedDate; //generateDate(bookingDate, 5); // +7 days from bookingDate
    const listAfterDate = generateDate(bookingDate, 8, DatetimeAction.SUBTRACT); // -8 days from bookingDate
    const listBeforeDate = generateDate(bookingDate, 6, DatetimeAction.SUBTRACT); // -6 days from bookingDate
    const startTime = addMinutes(data.session.start, 0);
    const endTime = addMinutes(data.session.start, data.session.duration);

    // Get random location from locations - localities list (default 40 first items)
    let locationsLocalitiesData = null;
    if (!locationsLocalitiesData) {
        locationsLocalitiesData = getKentLocationsLocalitiesData().flattenData.slice(0, 39);
    }
    const randomLocation = getRandomArrayValue(locationsLocalitiesData);

    // Get random joh from available joh users
    const johUsers = getJmeterUsers(data.testConfig.numOfJOHUser);
    const randomJOH = getRandomArrayValue(johUsers);

    return Object.assign(
        {},
        {
            receivedDate,
            bookingDate,
            startTime,
            endTime,
            bookingDateNew,
            bookingDateEnd,
            listAfterDate,
            listBeforeDate
        },
        randomLocation,
        randomJOH
    )
}

const getKentLocationsLocalitiesData = () => {
    const csvLines = localitiesLocations.split('\n');
    const header = csvLines[0];
    const listHeaders = header.split(',');
    const listRooms = csvLines.splice(1);

    const registryIndex = listHeaders.findIndex(header => header && header.includes('REGISTRY_CODE'));
    const primaryFlagIndex = listHeaders.findIndex(header => header && header.includes('EVT_PRIMARY_FLG'));
    const locationCodeIndex = listHeaders.findIndex(header => header && header.includes('EVT_LOCATION_CODE'));
    const locationDescIndex = listHeaders.findIndex(header => header && header.includes('EVT_LOC_DESC'));

    const kentRooms = listRooms
        .filter(line => {
            const lineItems = line.split(',');
            return lineItems[registryIndex] && lineItems[registryIndex].includes('KNT');
        })

    return kentRooms
        .reduce((result, line, index) => {
            const lineItems = line.split(',');
            if (lineItems[primaryFlagIndex] && lineItems[primaryFlagIndex].toLowerCase().includes('true')) {
                let locality = {
                    code: lineItems[locationCodeIndex].replace(new RegExp('\"', 'g'), ''),
                    desc: lineItems[locationDescIndex].replace(new RegExp('\"', 'g'), ''),
                    rooms: [],
                    registryCode: lineItems[registryIndex].replace(new RegExp('\"', 'g'), '')
                }

                let nextLineItemIndex = index + 1;
                const getNextLineItemData = () => {
                    if (!kentRooms[nextLineItemIndex]) return null;

                    const nextLine = kentRooms[nextLineItemIndex];
                    const nextLineItems = nextLine.split(',');
                    return {
                        nextLineItems: nextLineItems,
                        isNextLineItemNotPrimaryFlag: nextLineItems[primaryFlagIndex] && nextLineItems[primaryFlagIndex].toLowerCase().includes('false')
                    }
                }

                let nextLineItemData = getNextLineItemData();
                if (nextLineItemData) {
                    let isNextLineItemNotPrimaryFlag = nextLineItemData.isNextLineItemNotPrimaryFlag;
                    while (isNextLineItemNotPrimaryFlag) {
                        // The array with original structure
                        let location = {
                            code: nextLineItemData.nextLineItems[locationCodeIndex].replace(new RegExp('\"', 'g'), ''),
                            desc: nextLineItemData.nextLineItems[locationDescIndex].replace(new RegExp('\"', 'g'), '')
                        }

                        locality.rooms.push(location);

                        // Flatten array
                        let flattenLocality = {
                            localityCode: lineItems[locationCodeIndex].replace(new RegExp('\"', 'g'), ''),
                            localityDesc: lineItems[locationDescIndex].replace(new RegExp('\"', 'g'), ''),
                            locationCode: nextLineItemData.nextLineItems[locationCodeIndex].replace(new RegExp('\"', 'g'), ''),
                            locationDesc: nextLineItemData.nextLineItems[locationDescIndex].replace(new RegExp('\"', 'g'), ''),
                            registryCode: nextLineItemData.nextLineItems[registryIndex].replace(new RegExp('\"', 'g'), '')
                        }
                        
                        result.flattenData.push(flattenLocality);
                        
                        nextLineItemIndex = nextLineItemIndex + 1;
                        nextLineItemData = getNextLineItemData();

                        if (!nextLineItemData) break;

                        isNextLineItemNotPrimaryFlag = nextLineItemData.isNextLineItemNotPrimaryFlag;
                    }
                }
                

                result.data.push(locality);
            }
            
            return result;
        }, {
            data: [],
            flattenData: []
        });
}

const getJmeterUsers = (numOfJOHUser) => {
    const csvLines = users.split('\n');
    const header = csvLines[0];
    const listHeaders = header.split(',');
    const listUsers = csvLines.splice(1);

    const userIdIndex = listHeaders.findIndex(header => header && header.includes('ptp_part_id'));
    const userNameIndex = listHeaders.findIndex(header => header && header.includes('PTP_USERID'));
    const givenNameIndex = listHeaders.findIndex(header => header && header.includes('PTP_GVN_NAMES'));
    const familyNameIndex = listHeaders.findIndex(header => header && header.includes('PTP_SURNAME'));

    return listUsers
        .filter(line => {
            const lineItems = line.split(',');
            return lineItems[userNameIndex] && lineItems[userNameIndex].replace('\r', '').includes('jmeterUser');
        })
        .map(line => {
            const lineItems = line.split(',');
            return {
                jmeterUserId: lineItems[userIdIndex] && lineItems[userIdIndex].replace(new RegExp('\"', 'g'), ''),
                jmeterUserName: lineItems[userNameIndex] && lineItems[userNameIndex].replace(new RegExp('\"', 'g'), ''),
                jmeterGivenName: lineItems[givenNameIndex] && lineItems[givenNameIndex].replace(new RegExp('\"', 'g'), ''),
                jmeterFamilyName: lineItems[familyNameIndex] && lineItems[familyNameIndex].replace(new RegExp('\"', 'g'), '')
            }
        })
        .sort((a, b) => a.jmeterUserName > b.jmeterUserName)
        .slice(0, numOfJOHUser - 1);
}

export {
    getCurrentUJTestData,
    getCurrentUsername,
    setCurrentUsername,
    getExecutionIndex,
    setExecutionIndex,
    getLoggedInUsers,
    addLoggedInUsers,
    initializeData,
   // getLocationsLocalitiesData,
   // getJmeterUsers
    IS_SHOW_METRICS,
    SESSION_DURATION_MINS,
    FORM_SLEEP,
    FORM_DISCOVERY_REPEAT_TIMES,
    FORM_DISCOVERY_REPEAT_TIME_INTERVAL,
    RE_LOGIN_TIMES,
    RE_LOGIN_TIME_INTERVAL,
    LOG_FILE_NAME,
    IS_NEW_HOME_PAGE
};