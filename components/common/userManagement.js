import http from 'k6/http';
import { check, fail } from 'k6';
import { setMetricValue, isJsonString } from '../../lib/utils.js';
import { MetricType } from '../../data/constant.js';

const USER_DETAILS_TABS = [
    {
        name: 'UMPersonalTab',
        label: 'Personal Details'
    },
    {
        name: 'UMSystemTab',
        label: 'System Details'
    },
    {
        name: 'UMEmploymentTab',
        label: 'Appointment'
    },
    {
        name: 'UMJurisdictionTab',
        label: 'Jurisdictions'
    },
    {
        name: 'UMWeeklyWorkPatternTab',
        label: 'Weekly Week Pattern'
    }
]

const loadUserList = (data, res) => {
    const userListUrl = `${data.Urls.USER_LIST_URL}?XSRF-TOKEN=${data.token}`;
    res = http.get(userListUrl);

    check(res, { 'User List page load succeeded ': res => res.status === 200 && res.url == userListUrl })
    // || fail('User List page load failed: ' + res.url);
    
    // LOAD USER RECORDS
    const userListLoadUrl = `${data.Urls.USER_LIST_LOAD_URL}?XSRF-TOKEN=${data.token}`;
    res = http.post(userListLoadUrl, JSON.stringify(data.Data.USER_LIST_FILTERS), {
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': data.token
        }
    });

    check(res, { 'User List load succeeded ': res => res.status === 200 })
    // || fail('User List load failed: ' + res.url);

    setMetricValue(MetricType.RESOURCE_MANAGEMENT_USER_LIST_LOADED, res.status === 200, res.timings.waiting);
    
    return res;
}

const searchUser = (data, res, username) => {
    // LOAD USER RECORDS BY USERNAME
    const userListLoadUrl = `${data.Urls.USER_LIST_LOAD_URL}?XSRF-TOKEN=${data.token}`;

    let payload = data.Data.USER_LIST_FILTERS;
    payload.params.searchContent = username;

    res = http.post(userListLoadUrl, JSON.stringify(payload), {
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': data.token
        }
    });

    if (res.status !== 200 || !isJsonString(res.body)) return { res, userId: null };

    const result = JSON.parse(res.body);
    const userId = result.users[0].userId.toString();
    const userName = result.users[0].loginId.toString();

    check(res, { [`User List search random user succeeded `]: res => res.status === 200 }) || fail(`User List seach random user failed: ${res.url}`);

    setMetricValue(MetricType.RESOURCE_MANAGEMENT_USER_LIST_FILTERED, res.status === 200, res.timings.waiting);
    
    return { res, userId, userName }
}

const loadUserDetailsPage = (data, res, userId) => {
    const userDetailsUrl = `${data.Urls.USER_DETAILS_URL}?userId=${userId}&XSRF-TOKEN=${data.token}`;
    res = http.get(userDetailsUrl);

    check(res, { 'User Details - Personal Details tab load succeeded': res => res.status === 200 && res.url == userDetailsUrl })
    // || fail('User Details - Personal Details tab load failed: ' + res.url);

    return res;
}

const loadUserDetails = (data, res, userId, tab = 1) => {
    // LOAD USER DETAILS TAB DATA
    const userDetailsLoadUrl = `${data.Urls.USER_DETAILS_LOAD_URL}?XSRF-TOKEN=${data.token}`;

    let payload = {
        params: {
            userId: userId,
            tab: USER_DETAILS_TABS[tab - 1].name
        }
    };

    res = http.post(userDetailsLoadUrl, JSON.stringify(payload), {
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': data.token
        }
    });

    if (res.status !== 200 || !isJsonString(res.body)) return { res, data: null };

    const result = JSON.parse(res.body);

    check(res, { [`User Details - ${USER_DETAILS_TABS[tab - 1].label} tab data load succeeded`]: res => res.status === 200 })
    // || fail(`User Details - ${USER_DETAILS_TABS[tab - 1].label} tab data load failed: ${res.url}`);

    let metric = MetricType.RESOURCE_MANAGEMENT_PERSONAL_DETAILS_TAB_LOADED;
    if (tab === 2) {
        metric = MetricType.RESOURCE_MANAGEMENT_SYSTEM_DETAILS_TAB_LOADED;
    }
    else if (tab === 3) {
        metric = MetricType.RESOURCE_MANAGEMENT_APPOINTMENT_TAB_LOADED;
    }
    else if (tab === 4) {
        metric = MetricType.RESOURCE_MANAGEMENT_JURISDICTIONS_TAB_LOADED;
    }
    else if (tab === 5) {
        metric = MetricType.RESOURCE_MANAGEMENT_WEEKLY_WORK_PATTERN_TAB_LOADED;
    }

    setMetricValue(metric, res.status === 200, res.timings.waiting);

    return { res, data: result.userDetails };
}

const saveUserDetails = (data, res, tab = 1, userId, userName, userDetails) => {
    // SAVE USER DETAILS TAB DATA
    const userDetailsSaveUrl = `${data.Urls.USER_DETAILS_SAVE_URL}?XSRF-TOKEN=${data.token}`;

    const userDetailsTempalte = data.Data.USER_DETAILS_SUBMIT[tab - 1];

    let userDetailsSubmit = Object.assign({}, userDetailsTempalte);
    if (tab === 1) {
        userDetailsSubmit = Object.assign({}, userDetailsTempalte, {
            email: userName + '@mcgirrtech.com',
            givenNames: data.jmeterGivenName,
            surname: data.jmeterFamilyName
        });
    }
    else if (tab === 2) {
        userDetailsSubmit = Object.assign({}, userDetailsTempalte, {
            userId: userId,
            loginId: userName
        });

        console.log(userId, userName);
    }
    else if (tab === 5) {
        userDetailsSubmit = {
            workPatterns: data.Data.USER_DETAILS_SUBMIT[tab - 1].workPatterns.map(workPatten =>
                (Object.assign({}, workPatten, {
                    userId: userId
                }))
            )
        }
    }

    const payload = {
        params: {
            userId: userId,
            tab: USER_DETAILS_TABS[tab - 1].name,
            userDetails: userDetailsSubmit,//, userDetails),
            refreshPtpIntPartLov: [1, 2].includes(tab) ? true : false
        }
    }

    res = http.post(userDetailsSaveUrl, JSON.stringify(payload), {
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': data.token
        }
    });

    if (res.status !== 200 || !isJsonString(res.body)) return res;

    const result = JSON.parse(res.body);

    check(res, { [`User Details - ${USER_DETAILS_TABS[tab - 1].label} tab data save succeeded`]: res => res.status === 200 && result.SUCCESS })
    // || fail(`User Details - ${USER_DETAILS_TABS[tab - 1].label} tab data save failed: ${res.url}`);

    let metric = MetricType.RESOURCE_MANAGEMENT_PERSONAL_DETAILS_TAB_SAVED;
    if (tab === 2) {
        metric = MetricType.RESOURCE_MANAGEMENT_SYSTEM_DETAILS_TAB_SAVED;
    }
    else if (tab === 3) {
        metric = MetricType.RESOURCE_MANAGEMENT_APPOINTMENT_TAB_SAVED;
    }
    else if (tab === 4) {
        metric = MetricType.RESOURCE_MANAGEMENT_JURISDICTIONS_TAB_SAVED;
    }
    else if (tab === 5) {
        metric = MetricType.RESOURCE_MANAGEMENT_WEEKLY_WORK_PATTERN_TAB_SAVED;
    }

    setMetricValue(metric, res.status === 200 && result.SUCCESS, res.timings.waiting);

    return res;
}

const setPersonalDetailsEmail = (userDetails, email) => {
    const personalDetails = Object.assign({}, userDetails, { email: email });

    check(personalDetails, { [`User Details - Personal Details Email ${email} has been updated`]: personalDetails.email === email })
    // || fail(`User Details - Can not update Personal Details Email: ${email}`);

    return personalDetails;
}

const checkJurisdictionDetails = (data, res, userId, userDetails) => {
    if (!userDetails || !userDetails.userJurisdiction) return res;

    const lpJurisdictions = userDetails.userJurisdiction.filter(jurisdiction => jurisdiction.locationPreferences.length > 0);
    if (lpJurisdictions.length > 0) {
        const thamesValleyLP = lpJurisdictions[0].locationPreferences.filter(lp => (lp.area === "TSR" || lp.registry === "TV") && !lp.inactiveDate);
        if (thamesValleyLP.length > 0) {
             // ADD THAMES VALLEY TO LOCATION PREFERENCES AND SAVE JURISDICTION
            const userDetailsSaveUrl = `${data.Urls.USER_DETAILS_SAVE_URL}?XSRF-TOKEN=${data.token}`;

            const locationPreferences = data.Data.USER_DETAILS_SUBMIT[3].userJurisdiction[0].locationPreferences;

            const payload = {
                params: {
                    userId: userId,
                    tab: USER_DETAILS_TABS[3].name,
                    userDetails: {
                        userJurisdiction: lpJurisdictions.map(jurisdiction =>
                            Object.assign({}, jurisdiction, { locationPreferences: [...jurisdiction.locationPreferences, ...locationPreferences] })
                        )
                    },
                    refreshPtpIntPartLov: false
                }
            }

            res = http.post(userDetailsSaveUrl, JSON.stringify(payload), {
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': data.token
                }
            });

            if (res.status !== 200 || !isJsonString(res.body)) return res;

            const result = JSON.parse(res.body);

            check(res, { [`User Details - Jurisdiction Location Preferences have been updated`]: res => res.status === 200 && result.SUCCESS })
            // || fail(`User Details - Cannot update Jurisdiction Location Preferences: ${res.url}`);

            setMetricValue(MetricType.RESOURCE_MANAGEMENT_JURISDICTIONS_TAB_SAVED, res.status === 200 && result.SUCCESS, res.timings.waiting);
        }
    }

    return res;
}

const deleteAllPatterns = (data, res, userId, userDetails) => {
    if (!userDetails || !userDetails.workPatterns) return res;

    // IF HAVE NO ACTIVE WORK PATTERNS THEN RETURN
    const activeWorkPatterns = userDetails.workPatterns.filter(workPattern => !workPattern.inactiveDate);
    if (activeWorkPatterns.length === 0) {
        return res;
    }

    // DELETE ACTIVE WORK PATTERNS
    const userDetailsSaveUrl = `${data.Urls.USER_DETAILS_SAVE_URL}?XSRF-TOKEN=${data.token}`;

    const payload = {
        params: {
            userId: userId,
            tab: USER_DETAILS_TABS[4].name,
            userDetails: {
                workPatterns: activeWorkPatterns.map(workPatten =>
                    (Object.assign({}, workPatten, {
                        inactiveDate: "2022-12-01 12:00:00.000",
                        endDate: "01-12-2022",
                        userId: userId
                    }))
                )
            },
            refreshPtpIntPartLov: false
        }
    }

    res = http.post(userDetailsSaveUrl, JSON.stringify(payload), {
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': data.token
        }
    });

    if (res.status !== 200 || !isJsonString(res.body)) return res;

    const result = JSON.parse(res.body);

    check(res, { [`User Details - Work patterns have been deleted`]: res => res.status === 200 && result.SUCCESS })
    // || fail(`User Details - Cannot delete work patterns: ${res.url}`);

    setMetricValue(MetricType.RESOURCE_MANAGEMENT_WEEKLY_WORK_PATTERN_TAB_SAVED, res.status === 200 && result.SUCCESS, res.timings.waiting);

    return res;
}

const addNewPattern = (data, res, userId) => {
    // CREATE ACTIVE WORK PATTERNS
    const userDetailsSaveUrl = `${data.Urls.USER_DETAILS_SAVE_URL}?XSRF-TOKEN=${data.token}`;

    const payload = {
        params: {
            userId: userId,
            tab: USER_DETAILS_TABS[4].name,
            userDetails: data.Data.USER_DETAILS_SUBMIT[4],
            refreshPtpIntPartLov: false
        }
    }

    res = http.post(userDetailsSaveUrl, JSON.stringify(payload), {
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': data.token
        }
    });

    if (res.status !== 200 || !isJsonString(res.body)) return res;

    const result = JSON.parse(res.body);

    check(res, { [`User Details - Work pattern has been created`]: res => res.status === 200 && result.SUCCESS })
    // || fail(`User Details - Cannot create work pattern: ${res.url}`);

    setMetricValue(MetricType.RESOURCE_MANAGEMENT_WEEKLY_WORK_PATTERN_TAB_SAVED, res.status === 200 && result.SUCCESS, res.timings.waiting);

    return res;
}

export {
    loadUserList,
    searchUser,
    loadUserDetailsPage,
    loadUserDetails,
    saveUserDetails,
    setPersonalDetailsEmail,
    checkJurisdictionDetails,
    deleteAllPatterns,
    addNewPattern
}