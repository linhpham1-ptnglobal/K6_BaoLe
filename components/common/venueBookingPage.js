import http from 'k6/http';
import { check, fail, sleep } from 'k6';
import { handleCheckFormExist, getExecutionInfo, addMinutes } from '../../lib/utils.js';

import { setMetricValue } from '../../lib/utils.js';
import { FormCounterMetric, MetricType } from '../../data/constant.js';
import { FORM_SLEEP } from '../../data/uj.js';

const saveVenueBooking = (data, res, caseId) => {
    // LOAD VENUE BOOKING
    const params = Object.assign({}, data.Data.VENUE_BOOKING_QUERY_PARAMS, {
        bookingDateNew: data.bookingDateNew,
        locality: data.localityCode,
        location: data.locationCode
    });

    const urlParams = Object.keys(params).reduce((result, key) => [...result, `${key}=${params[key]}`], []);
    const venueBookingUrl = `${data.Urls.VENUE_BOOKING_URL}?method=initaliseBooking&venueBookingId=0&${urlParams.join('&')}&XSRF-TOKEN=${data.token}`;
    
    res = http.get(venueBookingUrl);

    if (res.status !== 200) return res;

    const hasVenueBookingCreateForm = handleCheckFormExist(res, '#vbForm', FormCounterMetric.VENUE_BOOKING_CREATE_FORM_ERROR_COUNTER);
    if (hasVenueBookingCreateForm) {
        check(res, {'Load new Venue Booking screen': res => res.status === 200}) 
        // || //  && res.url == venueBookingUrl fail('Venue Booking load failed: ' + res.url);

        setMetricValue(MetricType.VENUE_BOOKING_PAGE_LOADED, res.status === 200, res.timings.waiting);

        // SUBMIT FORM TO CREATE A VENUE BOOKING
        const executionInfo = getExecutionInfo();

        console.log(`${executionInfo} - Session created in Locality - Location: ${data.localityDesc} - ${data.locationDesc} on ${data.bookingDate} at ${data.startTime} - ${data.endTime}`);
        console.log(`${executionInfo} - Session is allocated to ${data.jmeterUserName} (${data.jmeterGivenName} ${data.jmeterFamilyName})`);

        sleep(FORM_SLEEP);

        // DELETE BREAK TIME BEFORE SUBMITTING THE FORM
        const deleteBreakRes = http.post(`${data.Urls.VENUE_BOOKING_URL}?method=deleteBreak&index=0&XSRF-TOKEN=${data.token}`);

        res = res.submitForm({
            formSelector: '#vbForm',
            fields: {
                'venueBooking.editableStartTime': data.bookingDate,
                'value(pattern)': data.Data.VENUE_BOOKING_FIELDS.pattern,
                'venueBooking.editableEndTime': data.bookingDateEnd,
                'venueBooking.recurringDay2': data.Data.VENUE_BOOKING_FIELDS.recurringDay2,
                'venueBooking.recurringDay3': data.Data.VENUE_BOOKING_FIELDS.recurringDay3,
                'venueBooking.recWeeks': data.Data.VENUE_BOOKING_FIELDS.recWeeks,
                'venueBooking.startHour': data.startTime,
                'venueBooking.convertedEndTime': data.endTime,
                'location': data.localityCode,
                'venueBooking.location.evtLocationCode': data.locationCode,
                'venueBooking.jsCode': data.Data.VENUE_BOOKING_FIELDS.jsCode,
                'venueBooking.empTypesArray': data.Data.VENUE_BOOKING_FIELDS.empTypesArray,
                'venueBooking.venueBookingTypeCode': data.Data.VENUE_BOOKING_FIELDS.venueBookingTypeCode,
                'venueBooking.defListingDuration': data.Data.VENUE_BOOKING_FIELDS.defListingDuration,
                'startTime': data.bookingDate,
                'startHour': data.startTime,
                'venueBooking.members[0].ptpDbPosId': data.jmeterUserId
            }
        });
    
        const expectedUrl = `${data.Urls.RESOURCE_SCHEDULER_URL}?XSRF-TOKEN=${data.token}`;
    
        setMetricValue(MetricType.VENUE_BOOKING_CREATED, res.status === 200 && res.url === expectedUrl, res.timings.waiting);
        check(res, {'Create Venue Booking': res => res.status === 200 && res.url === expectedUrl}) 
        // || fail('Cannot add a new Venue Booking: ' + res.url);
    }

    return res;
}

const saveVenueBooking_ListCase = (data, res, caseId) => {
    // LOAD VENUE BOOKING
    const loadParams = {
        method: 'initaliseBooking',
        venueBookingId: 0,
        droppedMtrId: caseId,
        newListing: data.Data.VENUE_BOOKING_FIELDS.newListing,
        sessionTime: 'LOC',
        bookingDateNew: data.bookingDateNew,
        locality: data.localityCode,
        location: data.locationCode
    }

    const urlLoadParams = Object.keys(loadParams).reduce((result, key) => [...result, `${key}=${loadParams[key]}`], []);
    const loadVenueBookingListCaseUrl = `${data.Urls.VENUE_BOOKING_URL}?${urlLoadParams.join('&')}&XSRF-TOKEN=${data.token}`;

    res = http.get(loadVenueBookingListCaseUrl);

    if (res.status !== 200) return { success: false, res };

    const hasVenueBookingCreateForm = handleCheckFormExist(res, '#vbForm', FormCounterMetric.VENUE_BOOKING_CREATE_FORM_ERROR_COUNTER);
    if (hasVenueBookingCreateForm) {
        check(res, {'Load new Venue Booking screen': res => res.status === 200});

        setMetricValue(MetricType.VENUE_BOOKING_PAGE_LOADED, res.status === 200, res.timings.waiting);

        // SUBMIT FORM TO CREATE A VENUE BOOKING
        const executionInfo = getExecutionInfo();

        console.log(`${executionInfo} - Session created in Locality - Location: ${data.localityDesc} - ${data.locationDesc} on ${data.bookingDate} at ${data.startTime} - ${data.endTime}`);

        sleep(FORM_SLEEP);

        // DELETE BREAK TIME BEFORE SUBMITTING THE FORM
        const deleteBreakRes = http.post(`${data.Urls.VENUE_BOOKING_URL}?method=deleteBreak&index=0&XSRF-TOKEN=${data.token}`);

        const saveParams = {
            diaryId: 1,
            startTime: data.bookingDate,
            startHour: data.startTime,
            location: data.localityCode,
            room: data.locationCode,
            relatedMatterIds: '',
            endDateTime: '',
            'venueBooking.recWeeks': '',
            defDurChanged: false,
            fromMemberView: null
        }
    
        const urlSaveParams = Object.keys(saveParams).reduce((result, key) => [...result, `${key}=${saveParams[key]}`], []);
        const saveVenueBookingListCaseUrl = `${data.Urls.VENUE_BOOKING_URL}?${urlSaveParams.join('&')}&XSRF-TOKEN=${data.token}`;
    
        const savePayload = {
            'venueBooking.venueBookingId': '',
            'venueBooking.venueBookingParentId': ' ',
            newListing: data.Data.VENUE_BOOKING_FIELDS.newListing,
            'value(numActiveBookings)': 0,
            'value(clashConfirmAnswer)': '',
            'value(newVBListingStopMessage)': '',
            'venueBooking.editableStartTime': data.bookingDate,
            'value(pattern)': '',
            'venueBooking.editableEndTime': '',
            'venueBooking.recWeeks': '',
            'venueBooking.startHour': data.startTime,
            'venueBooking.convertedEndTime': data.endTime,
            location: data.localityCode,
            'venueBooking.location.evtLocationCode': data.locationCode,
            'venueBooking.jsCode': data.Data.VENUE_BOOKING_FIELDS.jsCode,
            'venueBooking.venueBookingTypeCode': data.Data.VENUE_BOOKING_FIELDS.venueBookingTypeCode,
            'venueBooking.sessionType': '',
            'venueBooking.overbooking': data.Data.VENUE_BOOKING_FIELDS.overbooking,
            'venueBooking.bulkBooking': data.Data.VENUE_BOOKING_FIELDS.bulkBooking,
            'venueBooking.defListingDuration': data.Data.VENUE_BOOKING_FIELDS.defListingDuration,
            'venueBooking.autoList': data.Data.VENUE_BOOKING_FIELDS.autoList,
            'venueBooking.youthFlag': data.Data.VENUE_BOOKING_FIELDS.youthFlag,
            'venueBooking.mobileResourceCode': '',
            'venueBooking.feeIncurredCode': '',
            'venueBooking.venueBookingDesc': '',
            'venueBooking.externalComments': '',
            'venueBooking.empTypesArray': data.Data.VENUE_BOOKING_FIELDS.empTypesArray,
            '__multiselect_venueBooking.empTypesArray': true,
            'value(rubbish)': '',
            'value(cancellationCode)': '',
            'venueBooking.templateId': '',
            changeHistoryTableId_length: 10,
            listIndex: 0,
            method: 'saveBooking',
            'XSRF-TOKEN': data.token
        }
    
        res = http.post(saveVenueBookingListCaseUrl, savePayload);

        if (res.status !== 200) return { success: false, res };

        const bodyTex = res.body;

        // GET CREATED VENUE BOOKING ID FROM RESPONSE BODY TEXT
        const venueBookingNamePattern = 'name=\"venueBooking.venueBookingId\"';
        const venueBookingIdPattern = 'id=\"venueBookingId\"';
        const hasVenueBooking = bodyTex.includes(venueBookingNamePattern) && bodyTex.includes(venueBookingIdPattern);

        if (!hasVenueBooking) return { success: false, res };

        setMetricValue(MetricType.VENUE_BOOKING_CREATED, res.status === 200 && hasVenueBooking, res.timings.waiting);
        check(res, {'Create Venue Booking': res => res.status === 200 && hasVenueBooking});

        const venueBookingNamePatternIndex = bodyTex.indexOf(venueBookingNamePattern);
        const venueBookingIdPatternIndex = bodyTex.indexOf(venueBookingIdPattern);
        const venueBookingText = bodyTex.substring(venueBookingNamePatternIndex, venueBookingIdPatternIndex + venueBookingIdPattern.length);
        const venueBookingIdText = venueBookingText.split(' ')[1];
        const venueBookingId = venueBookingIdText.split('=')[1].replace(new RegExp('"', 'g'), '');
    
        return {
            success: res.status === 200 && hasVenueBooking,
            res,
            venueBookingId
        };
    }

    return {
        success: false,
        res
    };
}

const loadVenueBookingEdit_ListCase = (data, res, caseId, venueBookingId) => {
    const params = {
        method: 'initaliseBooking',
        venueBookingId: venueBookingId,
        location: data.locationCode,
        sessionTime: 'LOC',
        droppedMtrId: caseId,
        newListing: data.Data.VENUE_BOOKING_FIELDS.newListing,
        locality: data.localityCode,
    }

    const urlParams = Object.keys(params).reduce((result, key) => [...result, `${key}=${params[key]}`], []);
    const loadVenueBookingEditUrl = `${data.Urls.VENUE_BOOKING_URL}?${urlParams.join('&')}&XSRF-TOKEN=${data.token}`;

    res = http.get(loadVenueBookingEditUrl);

    check(res, {'Load Venue Booking for editing screen': res => res.status === 200});

    // DELETE BREAK TIME BEFORE SUBMITTING
    const deleteBreakRes = http.post(`${data.Urls.VENUE_BOOKING_URL}?method=deleteBreak&index=0&XSRF-TOKEN=${data.token}`);

    sleep(FORM_SLEEP);

    return {
        success: res.status === 200,
        res
    };
}

const loadListingPopup_ListCase = (data, res) => {
    sleep(FORM_SLEEP);

    const loadListingPopupUrl = `${data.Urls.VENUE_BOOKING_URL}?method=loadListingPopup&XSRF-TOKEN=${data.token}`;

    res = http.get(loadListingPopupUrl);

    check(res, {'Load listing detail popup': res => res.status === 200});

    sleep(FORM_SLEEP);

    return {
        success: res.status === 200,
        res
    };
}

const saveListingPopup_ListCase = (data, res, caseId, venueBookingId, listingIndex, listingDuration = 10) => {
    // DELETE BREAK TIME BEFORE SUBMITTING
    const deleteBreakRes = http.post(`${data.Urls.VENUE_BOOKING_URL}?method=deleteBreak&index=0&XSRF-TOKEN=${data.token}`);

    sleep(FORM_SLEEP);

    const params = {
        method: 'saveListingPopup',
        venueBookingId: venueBookingId,
        location: data.locationCode,
        sessionTime: 'LOC',
        droppedMtrId: caseId,
        newListing: data.Data.VENUE_BOOKING_FIELDS.newListing,
        locality: data.localityCode
    }

    const urlParams = Object.keys(params).reduce((result, key) => [...result, `${key}=${params[key]}`], []);
    const saveListingPopupUrl = `${data.Urls.VENUE_BOOKING_URL}?${urlParams.join('&')}&XSRF-TOKEN=${data.token}`;

    const listingStartTime = addMinutes(data.startTime, listingDuration * listingIndex);
    const listingEndTime = addMinutes(data.startTime, listingDuration * (listingIndex + 1));

    const payload = {
        'value(startHour)': '',
        'value(checkListFail)': '',
        'value(rescheduledBookingId)': '',
        'value(reserveSlotOverlapAnswer)': '',
        'venueBooking.recurringOnListingPopup': true,
        'value(listingIndex)': listingIndex,
        'venueBooking.convertedEndTime': data.endTime,
        'value(bookVideoHearing)': '',
        'listing.locationComment': '',
        'value(newListinghearingNotes)': '',
        'listing.evtEventTypeId': data.Data.LISTING_FIELDS.evtEventTypeId,
        'listing.comments': data.Data.LISTING_FIELDS.comments,
        'listing.startHour': listingStartTime,
        'listing.endHour': listingEndTime,
        'listing.evtListingStatus': data.Data.LISTING_FIELDS.evtListingStatus,
        'listing.riskFlag': data.Data.LISTING_FIELDS.riskFlag,
        applyToAllDays: false,
        'listing.purposeOfListing': '',
        'value(memberType)': '',
        'listing.memberId': '',
        'listing.presidingMember': data.Data.LISTING_FIELDS.presidingMember,
        'listing.externalComments': '',
        '__multiselect_listing.hearingMethodArray': true,
        method: 'saveListingPopup',
        'XSRF-TOKEN': data.token
    }

    res = http.post(saveListingPopupUrl, payload);
    const executionInfo = getExecutionInfo();
    console.log(`${executionInfo} - Listing ${listingIndex + 1} created under VenueBookingId=${venueBookingId} at: ${listingStartTime} - ${listingEndTime}`);

    check(res, {'Save listing detail popup': res => res.status === 200});

    return {
        success: res.status === 200,
        res
    };
}

const saveVenueBookingEdit_ListCase = (data, res, venueBookingId) => {
    // DELETE BREAK TIME BEFORE SUBMITTING
    const deleteBreakRes = http.post(`${data.Urls.VENUE_BOOKING_URL}?method=deleteBreak&index=0&XSRF-TOKEN=${data.token}`);

    sleep(FORM_SLEEP);

    const params = {
        diaryId: 1,
        startTime: data.bookingDate,
        startHour: data.startTime,
        location: data.localityCode,
        room: data.locationCode,
        relatedMatterIds: '',
        endDateTime: '',
        'venueBooking.recWeeks': '',
        defDurChanged: false,
        fromMemberView: null
    }

    const urlParams = Object.keys(params).reduce((result, key) => [...result, `${key}=${params[key]}`], []);
    const saveVenueBookingEditUrl = `${data.Urls.VENUE_BOOKING_URL}?${urlParams.join('&')}&XSRF-TOKEN=${data.token}`;

    const payload = {
        'venueBooking.venueBookingId': venueBookingId,
        'venueBooking.venueBookingParentId': '',
        newListing: data.Data.VENUE_BOOKING_FIELDS.newListing,
        'value(numActiveBookings)': 0,
        'value(clashConfirmAnswer)': '',
        'value(newVBListingStopMessage)': '',
        // 'venueBookingResSessions[0].reserved': false,
        // 'venueBookingResSessions[0].reserveReason': '',
        // 'venueBookingResSessions[1].reserved': false,
        // 'venueBookingResSessions[1].reserveReason': '',
        // 'venueBookingResSessions[2].reserved': false,
        // 'venueBookingResSessions[2].reserveReason': '',
        // 'venueBookingResSessions[3].reserved': false,
        // 'venueBookingResSessions[3].reserveReason': '',
        // 'venueBookingResSessions[4].reserved': false,
        // 'venueBookingResSessions[4].reserveReason': '',
        // 'venueBookingResSessions[5].reserved': false,
        // 'venueBookingResSessions[5].reserveReason': '',
        // 'venueBookingResSessions[6].reserved': false,
        // 'venueBookingResSessions[6].reserveReason': '',
        // 'venueBookingResSessions[7].reserved': false,
        // 'venueBookingResSessions[7].reserveReason': '',
        'venueBooking.editableStartTime': data.bookingDate,
        'value(pattern)': '',
        'venueBooking.editableEndTime': '',
        'venueBooking.recWeeks': '',
        'venueBooking.startHour': data.startTime,
        'venueBooking.convertedEndTime': data.endTime,
        location: data.localityCode,
        'venueBooking.location.evtLocationCode': data.locationCode,
        'venueBooking.jsCode': data.Data.VENUE_BOOKING_FIELDS.jsCode,
        'venueBooking.venueBookingTypeCode': data.Data.VENUE_BOOKING_FIELDS.venueBookingTypeCode,
        'venueBooking.sessionType': '',
        'venueBooking.overbooking': data.Data.VENUE_BOOKING_FIELDS.overbooking,
        'venueBooking.matterLimit': '',
        'venueBooking.overbookingPercentage': '',
        'venueBooking.bulkBooking': data.Data.VENUE_BOOKING_FIELDS.bulkBooking,
        'venueBooking.autoList': data.Data.VENUE_BOOKING_FIELDS.autoList,
        'venueBooking.youthFlag': data.Data.VENUE_BOOKING_FIELDS.youthFlag,
        'venueBooking.mobileResourceCode': '',
        'venueBooking.feeIncurredCode': '',
        'venueBooking.venueBookingDesc': '',
        'venueBooking.externalComments': '',
        'venueBooking.empTypesArray': data.Data.VENUE_BOOKING_FIELDS.empTypesArray,
        '__multiselect_venueBooking.empTypesArray': true,
        'value(rubbish)': '',
        'value(cancellationCode)': '',
        'venueBooking.templateId': '',
        changeHistoryTableId_length: 10,
        listIndex: 0,
        method: 'saveBooking',
        'XSRF-TOKEN': data.token,
    }

    res = http.post(saveVenueBookingEditUrl, payload);

    setMetricValue(MetricType.VENUE_BOOKING_LISTING_CREATED, res.status === 200, res.timings.waiting);
    check(res, {'Create listing': res => res.status === 200});

    return {
        success: res.status === 200,
        res
    };
}

const saveEditingVenueBooking = (data, res, venueBookingId) => {
    // LOAD VENUE BOOKING
    const params = Object.assign({}, data.Data.VENUE_BOOKING_EDIT_QUERY_PARAMS, {
        startTime: data.bookingDate
    });

    const urlParams = Object.keys(params).reduce((result, key) => [...result, `${key}=${params[key]}`], []);
    const venueBookingEditUrl = `${data.Urls.VENUE_BOOKING_URL}?method=initaliseBooking&venueBookingId=${venueBookingId}&${urlParams.join('&')}&XSRF-TOKEN=${data.token}`;
    res = http.get(venueBookingEditUrl);

    if (res.status !== 200) return { success: false, res };

    const hasVenueBookingUpdateForm = handleCheckFormExist(res, '#vbForm', FormCounterMetric.VENUE_BOOKING_UPDATE_FORM_ERROR_COUNTER);
    if (hasVenueBookingUpdateForm) {
        check(res, {'Load Venue Booking for editing screen': res => res.status === 200}) 
        // || fail('Venue Booking Edit load failed: ' + res.url);

        setMetricValue(MetricType.VENUE_BOOKING_PAGE_LOADED, res.status === 200, res.timings.waiting);

        sleep(FORM_SLEEP);
    
        res = res.submitForm({
            formSelector: '#vbForm',
            fields: {
                'venueBooking.venueBookingId': venueBookingId,
                'venueBooking.venueBookingDesc': data.Data.VENUE_BOOKING_FIELDS.venueBookingDesc,
                'venueBooking.empTypesArray': data.Data.VENUE_BOOKING_FIELDS.empTypesArray,
                'method': 'saveBooking',
                "startTime": data.bookingDate,
                "startHour": data.startTime
            }
        });
    
        const expectedUrl = `${data.Urls.RESOURCE_SCHEDULER_URL}?XSRF-TOKEN=${data.token}`;
        check(res, {'Update Venue Booking': res => res.status === 200 && res.url === expectedUrl}) 
        // || fail('Cannot updated Venue Booking: ' + res.url);
    
        setMetricValue(MetricType.VENUE_BOOKING_UPDATED, res.status === 200 && res.url === expectedUrl, res.timings.waiting);

        return {
            success: res.status === 200 && res.url === expectedUrl,
            res
        };
    }

    return { success: false, res };
}

const loadEditingVenueBooking = (data, res, venueBookingId) => {
    // LOAD VENUE BOOKING FOR EDITTING
    const venueBookingEditUrl = `${data.Urls.VENUE_BOOKING_URL}?method=initaliseBooking&venueBookingId=${venueBookingId}&XSRF-TOKEN=${data.token}`;
    res = http.get(venueBookingEditUrl);

    check(res, {'Load Venue Booking for editing screen': res => res.status === 200 && res.url === venueBookingEditUrl}) 
    // || fail('Venue Booking Edit load failed: ' + res.url);

    setMetricValue(MetricType.VENUE_BOOKING_PAGE_LOADED, res.status === 200 && res.url === venueBookingEditUrl, res.timings.waiting);

    return res;
}

const deleteVenueBooking = (data, res, venueBookingId) => {
    const venueBookingEditUrl = `${data.Urls.VENUE_BOOKING_URL}?method=initaliseBooking&venueBookingId=${venueBookingId}&XSRF-TOKEN=${data.token}`;
    res = http.get(venueBookingEditUrl);

    if (res.status !== 200) return res;

    const hasVenueBookingDeleteForm = handleCheckFormExist(res, '#vbForm', FormCounterMetric.VENUE_BOOKING_DELETE_FORM_ERROR_COUNTER);
    if (hasVenueBookingDeleteForm) {
        check(res, {'Load Venue Booking for editing screen': res => res.status === 200 && res.url === venueBookingEditUrl}) 
        // ||  fail('Venue Booking Edit load failed: ' + res.url);

        setMetricValue(MetricType.VENUE_BOOKING_PAGE_LOADED, res.status === 200 && res.url === venueBookingEditUrl, res.timings.waiting);

        sleep(FORM_SLEEP);
    
        // SUBMIT FORM TO DELETE CURRENT VENUE BOOKING
        res = res.submitForm({
            formSelector: '#vbForm',
            fields: {
                'venueBooking.venueBookingId': venueBookingId,
                'venueBooking.empTypesArray': data.Data.VENUE_BOOKING_FIELDS.empTypesArray,
                'method': 'cancelBooking'
            }
        });

        const expectedUrl = `${data.Urls.RESOURCE_SCHEDULER_URL}?XSRF-TOKEN=${data.token}`;
        check(res, {'Delete Venue Booking': res => res.status === 200 && res.url === expectedUrl}) 
        // || fail('Cannot delete a new Venue Booking: ' + res.url);
    }

    return res;
}

const deleteVenueBookingListings = (data, res, listings) => {
    const payload = {
        "params": {
            "filter": {
                "selectedListings": listings,
                "addMtrToCart": "N",
                "statusCode": ""
            }
        }
    }

    // SUBMIT FORM TO DELETE ALL LISTINGS FROM VENUE BOOKING
    res = http.post(`$data.Urls.RESOURCE_SCHEDULER_DELETE_LISTINGS_URL}?XSRF-TOKEN=${data.token}`, JSON.stringify(payload), {
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': data.token
        }
    });

    check(res, {'Delete listings': res => res.status === 200})
    //  || fail('Cannot delete Venue Booking Listings: ' + res.url);

    return res;
}

export {
    saveVenueBooking,
    loadEditingVenueBooking,
    saveVenueBooking_ListCase,
    deleteVenueBooking,
    deleteVenueBookingListings,
    saveEditingVenueBooking,
    loadVenueBookingEdit_ListCase,
    loadListingPopup_ListCase,
    saveListingPopup_ListCase,
    saveVenueBookingEdit_ListCase
}