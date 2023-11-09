/*
Steps:
    1. Go to Users
    2. Search by username
    3. Go to User Details -> Personal Details is default tab
    4. Enter new Email and Save Personal Details tab
    5. Go to System Details tab and Save
    6. Go to Jurisdictions tab
    7. Edit Jurisdiction Details
        If Thames Valley region exists on Location Preferences table then close Jurisdiction Details
        Else Add Thames Valley Region to Location Preferences table and Save
    8. Go to Weekly Work Pattern tab
    9. Delete all existing Patterns
    10. Add new Pattern
    11. Go to Home Page
*/

import { group } from 'k6';

import {
    loadUserList,
    searchUser,
    loadUserDetailsPage,
    loadUserDetails,
    saveUserDetails,
    setPersonalDetailsEmail,
    checkJurisdictionDetails,
    deleteAllPatterns,
    addNewPattern
} from "../components/common/userManagement.js";
import { loadHomePage } from "../components/common/homepage.js";

export function UJ4(data) {
    group('User Journey 4', function () {
        let res = null;

        // Go to Users
        res = loadUserList(data, res);

        // Search by username
        const searchObj = searchUser(data, res, data.jmeterUserName);
        res = searchObj.res;

        // Go to User Details -> Personal Details is default tab
        res = loadUserDetailsPage(data, res, searchObj.userId);
        const personalDetails = loadUserDetails(data, res, searchObj.userId, 1);
        res = personalDetails.res;

        // Enter new Email and Save Personal Details tab
        res = saveUserDetails(data, res, 1, searchObj.userId, searchObj.userName, setPersonalDetailsEmail(personalDetails.data, data.Data.PERSONAL_DETAILS_EMAIL));

        // Go to System Details tab
        const systemDetails = loadUserDetails(data, res, searchObj.userId, 2);
        res = systemDetails.res;

        // Save System Details tab
        res = saveUserDetails(data, res, 2, searchObj.userId, searchObj.userName, systemDetails.data);

        // Go to Jurisdictions tab
        const jurisdictions = loadUserDetails(data, res, searchObj.userId, 4);
        res = jurisdictions.res;

        // Edit and Save Jurisdiction Detail tab
        res = checkJurisdictionDetails(data, res, searchObj.userId, jurisdictions.data);

        // Go to Weekly Work Pattern tab
        const weeklyWorkPatterns = loadUserDetails(data, res, searchObj.userId, 5);
        res = weeklyWorkPatterns.res;

        // Delete all existing Patterns
        res = deleteAllPatterns(data, res, searchObj.userId, weeklyWorkPatterns.data);

        // Add new Pattern
        res = addNewPattern(data, res, searchObj.userId);

        // Go to Home Page
        res = loadHomePage(data, res);
    });
}