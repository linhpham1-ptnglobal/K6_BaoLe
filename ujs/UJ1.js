/*
Steps:
    1. Load new case page and get caseId.
    2. Save new case and go to Listing Requirement page.
    3. Save Listing Requirement and go to Case History page.
       Load Matter Awaiting Listing page by default. -> Removed (No need this step for automatic listing)
        Load Hearing Schedule by using newest Listing Requirement. -> Removed (This step based on the previous step)
    4. Load Venue Booking page.
    5. Save new Venue Booking with JOH allocation.
*/

import { group } from 'k6';

import { getAvailableCaseId, saveCase } from '../components/common/viewMatterPage.js';
import { saveLR } from '../components/common/listingRequirementPage.js';
import { saveVenueBooking } from '../components/common/venueBookingPage.js';

export function UJ1(data) {
    group('User Journey 1', function () {
        let res = null;

        // Get available case object
        const caseObj = getAvailableCaseId(data, res);
        res = caseObj.res;

        if (caseObj.success) {
            // Save new case and go to Listing Requirement page
            const saveObj = saveCase(data, res, caseObj.caseId);
            res = saveObj.res;

            if (saveObj.success) {
                // Save listing requirement and go to Case History page
                const lrObj = saveLR(data, res, caseObj.caseId);
                res = lrObj.res;

                if (lrObj.success) {
                    // Save new Venue Booking
                    res = saveVenueBooking(data, res, caseObj.caseId);
                }
            }
        }
    });
}