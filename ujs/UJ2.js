/*
Steps:
    1. Load new case page and get caseId.
    2. Save new case.
    3. List the case by going to Hearing Schedule.
    4. Check and delete existing Listings and existing Venue Booking:
        - Check if two time range are overlap then delete existing Listings and existing Venue Booking and go to the next step.
        - If two time range are different then go to the next step.
    5. Load Venue Booking page.
    6. Save new Venue Booking.
        List 3 cases to 3 time slots
    7. Edit Venue Booking and save.
    8. Edit Venue Booking and save.
*/

import { group } from 'k6';

import { getAvailableCaseId, saveCase } from '../components/common/viewMatterPage.js';
import { listCase, checkExistingVenueBooking } from '../components/common/resourceScheduler.js';
import {
    saveVenueBooking_ListCase,
    deleteVenueBooking,
    deleteVenueBookingListings,
    loadVenueBookingEdit_ListCase,
    loadListingPopup_ListCase,
    saveListingPopup_ListCase,
    saveVenueBookingEdit_ListCase,
    saveEditingVenueBooking
} from '../components/common/venueBookingPage.js';

export function UJ2(data) {
    group('User Journey 2', function () {
        let res = null;

        // Get available case object
        const caseObj = getAvailableCaseId(data, res);
        res = caseObj.res;

        if (caseObj.success) {
            // Save new case
            const saveObj = saveCase(data, res, caseObj.caseId);
            res = saveObj.res;

            if (saveObj.success) {
                // List the case by going to Hearing Schedule
                const listCaseObj = listCase(data, res, caseObj.caseId);
                res = listCaseObj.res;

                if (listCaseObj.success) {
                    // Check and delete existing Venue Booking
                    let checkObj = checkExistingVenueBooking(data, res);
                    res = checkObj.res;

                    while (checkObj.hasOverlap) {
                        // If Venue Booking has listings then delete listings first
                        if (checkObj.currentVenueBookingListingIds.length > 0) {
                            res = deleteVenueBookingListings(data, res, checkObj.currentVenueBookingListingIds);
                        }
                        
                        res = deleteVenueBooking(data, res, checkObj.currentVenueBookingId);

                        checkObj = checkExistingVenueBooking(data, res);
                        res = checkObj.res;
                    }

                    // Save new Venue Booking
                    const venueBookingObj = saveVenueBooking_ListCase(data, res, caseObj.caseId);
                    res = venueBookingObj.res
                    
                    // List 3 cases to time slots of created venue booking above
                    if (venueBookingObj.success) {

                        // Edit the Booing, twice
                        const venueBookingEditObj = saveEditingVenueBooking (data, res, venueBookingObj.venueBookingId)
                        res = venueBookingEditObj.res;

                        if (venueBookingEditObj.success) {
                            const venueBookingEdit2Obj = saveEditingVenueBooking (data, res, venueBookingObj.venueBookingId)
                            res = venueBookingEdit2Obj.res;

                            if (venueBookingEdit2Obj.success) {
                                for (let listingIndex = 0; listingIndex < 3; listingIndex++) {
                                    const listCaseListingObj = listCase(data, res, caseObj.caseId);
                                    res = listCaseListingObj.res;
        
                                    if (listCaseListingObj.success) {
                                        const loadVenueBookingEditObj = loadVenueBookingEdit_ListCase(data, res, caseObj.caseId, venueBookingObj.venueBookingId);
                                        res = loadVenueBookingEditObj.res;
        
                                        if (loadVenueBookingEditObj.success) {
                                            const loadListingPopupObj = loadListingPopup_ListCase(data, res);
                                            res = loadListingPopupObj.res;
        
                                            if (loadListingPopupObj.success) {
                                                const saveListingPopupObj = saveListingPopup_ListCase(data, res, caseObj.caseId, venueBookingObj.venueBookingId, listingIndex);
                                                res = saveListingPopupObj.res;
        
                                                if (saveListingPopupObj.success) {
                                                    const saveVenueBookingEditObj = saveVenueBookingEdit_ListCase(data, res, venueBookingObj.venueBookingId);
                                                    res = saveVenueBookingEditObj.res;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
}