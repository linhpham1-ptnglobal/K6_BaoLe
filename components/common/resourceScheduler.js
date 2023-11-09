import http from 'k6/http';
import { check, fail, sleep } from 'k6';
import { getExecutionInfo } from '../../lib/utils.js';
import {  nk6Sleep, nkApiCall } from "../../lib/nk6.js"
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";
import { setMetricValue, isJsonString } from '../../lib/utils.js';
import { MetricType } from '../../data/constant.js';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';


const listCase = (data, res, caseId) => {
    // LOAD LIST CASE
    const resourceSchedulerUrl = `${data.Urls.RESOURCE_SCHEDULER_URL}?key=${caseId}&XSRF-TOKEN=${data.token}`;
    res = http.get(resourceSchedulerUrl);

    check(res, {'Load Hearing schedule screen': res => res.status === 200 && res.url == resourceSchedulerUrl})
    // || fail('List Case load failed: ' + res.url);

    setMetricValue(MetricType.HEARING_SCHEDULE_ROOMS_TAB_LOADED, res.status === 200 && res.url == resourceSchedulerUrl, res.timings.waiting);

    return {
        success: res.status === 200 && res.url == resourceSchedulerUrl,
        res
    };
}

const checkExistingVenueBooking = (data, res) => {
    // GET VENUE BOOKINGS LIST BY USING THE NEW VENUE BOOKING DATE AND ROOM
    const existingSessionBookings = getHearingScheduleVenueBookingData(res, data);

    // CHECK OVERLAPPING VENUE BOOKING
    const executionInfo = getExecutionInfo();

    //console.log(`${executionInfo} - New Venue Booking for creating: ${data.startTime} - ${data.endTime}`);
    const hasOverlap = existingSessionBookings.some(sessionBooking => data.startTime <= sessionBooking.vbEndTime && data.endTime >= sessionBooking.vbStartTime);
    if (hasOverlap) {
        const sessionBooking = existingSessionBookings.find(sessionBooking => data.startTime <= sessionBooking.vbEndTime && data.endTime >= sessionBooking.vbStartTime);
        const sessionBookingListingIds = sessionBooking.session.filter(listing => listing.bookingId).map(listing => listing.bookingId);
        console.log(`${executionInfo} - Existing Venue Booking on that time range: ${sessionBooking.vbStartTime} - ${sessionBooking.vbEndTime}`);
        return { res, hasOverlap, currentVenueBookingId: sessionBooking.venueBookingId, currentVenueBookingListingIds: sessionBookingListingIds }
    }
    else {
        console.log(`${executionInfo} - Can create Venue Booking`);
    }

    return { res, hasOverlap }
}

const getHearingScheduleVenueBookingData = (res, data, startDate = null, endDate = null) => {
    // FETCH HEARING SCHEDULE DATA
    const filterDate = (dateData) => {
        return dateData.filter(date => date.hearingDate.trim() === data.bookingDate);
    }
    
    const payload = Object.assign({}, data.Data.RESOURCE_SCHEDULER_FILTERS, {
        startDate: startDate || data.bookingDate,
        endDate: endDate || data.bookingDate
    });

    res = http.post(`${data.Urls.RESOURCE_SCHEDULE_DATA_URL}?XSRF-TOKEN=${data.token}`, JSON.stringify(payload), {
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': data.token
        }
    });

    if (res.status !== 200 || !isJsonString(res.body)) return [];

    const result = JSON.parse(res.body);

    const venueBookingList = result.list
        .filter(item => {
            const hasRoom = item.dataCode.trim() === data.locationCode;
            const hasDate = filterDate(item.dateData).length > 0;
            return hasRoom && hasDate;
        })
        .map(item => {
            const dateDataList = filterDate(item.dateData);
            delete item.dateData;

            if (dateDataList.length > 0) {
                return Object.assign({}, item, dateDataList[0]);
            }

            return Object.assign({}, item);
        });

    return venueBookingList.length > 0 ? venueBookingList[0].venueBooking : [];
}

const loadHearingSchedule = (data, res, tabs = [1], isComplexFilter = false) => {
    // LOAD HEARING SCHEDULE
    tabs.forEach(item => {
        let url = '';
        let tabName = '';
        let metric = '';

        if (item === 1) {
            url = data.Urls.RESOURCE_SCHEDULER_URL;
            tabName = "Rooms";
            metric = isComplexFilter
                ? MetricType.HEARING_SCHEDULE_COMPLEX_FILTER_ROOMS_TAB_LOADED
                : MetricType.HEARING_SCHEDULE_ROOMS_TAB_LOADED;
        }
        else if (item === 2) {
            url = data.Urls.RESOURCE_SCHEDULER_URL;
            tabName = "Jurdicial office holder";
            metric = isComplexFilter
                ? MetricType.HEARING_SCHEDULE_COMPLEX_FILTER_JOH_TAB_LOADED
                : MetricType.HEARING_SCHEDULE_JOH_TAB_LOADED;
        }
        else if (item === 3) {
            url = data.Urls.JOH_CALENDAR_URL;
            tabName = "JOH calendar";
            metric = isComplexFilter
                ? MetricType.HEARING_SCHEDULE_COMPLEX_FILTER_JOH_CALENDAR_TAB_LOADED
                : MetricType.HEARING_SCHEDULE_JOH_CALENDAR_TAB_LOADED;
        }
        else if (item === 4) {
            url = data.Urls.ROOM_CALENDAR_URL;
            tabName = "Room calendar";
            metric = isComplexFilter
                ? MetricType.HEARING_SCHEDULE_COMPLEX_FILTER_ROOM_CALENDAR_TAB_LOADED
                : MetricType.HEARING_SCHEDULE_ROOM_CALENDAR_TAB_LOADED;
        }
        nk6Sleep(data.testConfig, 0.5)
        res = http.get(url);
        HSLoadAdditionalApiCalls(data);
        nk6Sleep(data.testConfig, 0.5)
        
        const filter = isComplexFilter ? 'complex' : 'default';

        check(res, { [`Load ${tabName} view with ${filter} filter`]: res => res.status === 200 })
        // || fail(`${tabName} with ${filter} load failed: ${res.url}`);

        res = applyFilters(data, res, isComplexFilter);

        setMetricValue(metric, res.status === 200, res.timings.waiting);
    });

    return res;
}

const applySavedSearch = (data, res, savedSearchId) => {
    const payload = Object.assign({}, data.Data.RESOURCE_SCHEDULER_FILTERS, {
        savedSearchId: savedSearchId
    });

    // SUBMIT FORM TO APPLY SAVED SEARCH
    res = http.post(`${data.Urls.SELECT_SAVED_SEARCH_URL}?name=SavedSearch&&XSRF-TOKEN=${data.token}`, JSON.stringify(payload), {
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': data.token
        }
    });

    check(res, { 'Saved Search has been applied': res => res.status === 200 })
    // || fail('Cannot apply Saved Search: ' + res.url);

    return res;
}

const getLatestSavedSearchId = (data, res) => {
    let listSavedSearch = getSavedSearchData(data, res);

    // GET SAVED SEARCH ID IF IT EMPTIES
    while (listSavedSearch.length < 1) {
        saveSearchSearch(data, res);
        listSavedSearch = getSavedSearchData(data, res);
    }

    check(res, { 'Received Saved Search Id': listSavedSearch[0].code })
    // || fail('Cannot get Saved Search Id: ' + res.url);

    return { res, savedSearchId: listSavedSearch[0].code };
}

const getSavedSearchData = function (data, res) {
    res = http.get(`${data.Urls.GET_LOV_DATA_URL}?name=SavedSearch&&XSRF-TOKEN=${data.token}`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': data.token
        }
    });

    const result = JSON.parse(res.body);

    return result.result;
}

const saveSearchSearch = (data, res) => {
    const payload = {
        'key': '',
        'searchType': 'HSROOMVIEW',
        'map["searchDesc"]': 'New Saved Search'
    }

    // SUBMIT FORM TO CREATE NEW SAVE SEARCH
    res = http.post(`${data.Urls.SAVE_SEARCH_URL}?XSRF-TOKEN=${data.token}`, JSON.stringify(payload), {
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': data.token
        }
    });

    check(res, { 'Save Search has been created': res => res.status === 200 })
    // || fail('Cannot create Save Search: ' + res.url);

    return res;
}

const applyFilters = (data, res, isComplexFilter = false) => {
    const payload = isComplexFilter
        ? data.Data.RESOURCE_SCHEDULER_COMPLEX_FILTERS
        : data.Data.RESOURCE_SCHEDULER_FILTERS;

    res = http.post(`${data.Urls.RESOURCE_SCHEDULE_DATA_URL}?XSRF-TOKEN=${data.token}`, JSON.stringify(payload), {
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': data.token
        }
    });

    // const filter = isComplexFilter ? 'Complex filter' : 'Filter';

    // check(res, { [`${filter} has been applied`]: res => res.status === 200 }) || fail(`Cannot apply ${filter}: ${res.url}`);

    return res;
}

const getFirstAvailableVenueBookingId = (data) => {
    const existingSessionBookings = getHearingScheduleVenueBookingData(res, data);
    const venueBookingId = existingSessionBookings.length > 0 ? existingSessionBookings[0].venueBookingId : null;

    return { res, venueBookingId }
}

const HSLoadAdditionalApiCalls = (data, res) => {

    if(data.testConfig.softwareVersion = '4.28.4'){

        nkApiCall(
            {
                name: 'memberIncludeFilter',
                data: data,
                uri: '/vue/PopulateLovAction.action',
                paramsString: "&name=memberIncludeFilter&sessTypes=&employeeWorkTypes=&key=&key2=&key3=&key4=&key5=&key6=&key7=15565,175",
                repeats: 2
            }
        )

        nkApiCall(
            {
                name: 'locationsByRegistry',
                data: data,
                uri: '/vue/PopulateMultiLovAction.action',
                paramsString: "&name=locationsByRegistry&sessTypes=&employeeWorkTypes=&key=&key2=&key3=&key4=&key5=&key6=&key7=",
                repeats: 2
            }
        )
    /*
        nkApiCall(
            {
                name: 'ConfigData',
                data: data,
                uri: '/vue/ConfigData.action',
                paramsString: "",
                repeats: 2
            }
        )

        nkApiCall(
            {
                name: 'PropertyData',
                data: data,
                uri: '/vue/PropertyData.action',
                paramsString: "",
                repeats: 2
            }
        )

        nkApiCall(
            {
                name: 'LoadMainMenu',
                data: data,
                uri: '/vue/LoadMainMenu.action',
                paramsString: "",
                repeats: 1,
                post: true,
                postData: null
            }
        )

        nkApiCall(
            {
                name: 'locality',
                data: data,
                uri: '/vue/PopulateMultiLovAction.action',
                paramsString: "&name=locality&sessTypes=&employeeWorkTypes=&key=&key2=&key3=&key4=&key5=&key6=&key7=",
                repeats: 1
            }
        )

        // nkApiCall(
        //     {
        //         name: 'CmsSecureItem',
        //         data: data,
        //         uri: '/vue/CmsSecureItem.action',
        //         paramsString: "",
        //         repeats: 7,
        //         post: true,
        //         postData: {module:"HSAdvancedFilter",mode:"load",accessLevel:"true"}
        //     }
        // )

        nkApiCall(
            {
                name: 'PtpEmpTypeLov',
                data: data,
                uri: '/vue/LovData.action',
                paramsString: "&name=PtpEmpTypeLov",
                repeats: 1
            }
        )

        nkApiCall(
            {
                name: 'LocationTimeoffCdLov',
                data: data,
                uri: '/vue/LovData.action',
                paramsString: "&name=LocationTimeoffCdLov",
                repeats: 1
            }
        )

        nkApiCall(
            {
                name: 'VenueBookingTypeLov',
                data: data,
                uri: '/vue/LovData.action',
                paramsString: "&name=VenueBookingTypeLov",
                repeats: 1
            }
        )

        nkApiCall(
            {
                name: 'HearingScheduleFilterSearch',
                data: data,
                uri: '/vue/HearingScheduleFilterSearch.action',
                paramsString: "",
                repeats: 1
            }
        )

        nkApiCall(
            {
                name: 'HearingSessionTypeLov',
                data: data,
                uri: '/vue/LovData.action',
                paramsString: "&name=HearingSessionTypeLov",
                repeats: 1
            }
        )
    */

    }

    return 
}

export {
    listCase,
    checkExistingVenueBooking,
    getFirstAvailableVenueBookingId,
    loadHearingSchedule,
    applySavedSearch,
    getLatestSavedSearchId, 
    HSLoadAdditionalApiCalls
}