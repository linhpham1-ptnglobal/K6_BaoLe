import { parseHTML } from 'k6/html';
import http from 'k6/http';
import { check, fail, sleep } from 'k6';
import { getExecutionInfo, handleCheckFormExist, setMetricValue} from '../../lib/utils.js';
import { FormCounterMetric, MetricType } from '../../data/constant.js';
import { FORM_SLEEP, getCurrentUsername } from '../../data/uj.js';

const getAvailableCaseId = (data, res) => {
    // LOAD MATTER VIEW
    const matterViewUrl = `${data.Urls.VIEW_MATTER_URL}?XSRF-TOKEN=${data.token}`;
    res = http.get(matterViewUrl);

    check(res, { 'Load Matter view': res => res.status === 200 && res.url == matterViewUrl }) 
    // || fail('Matter View load failed: ' + res.url);

    // GET KEY VALUE FROM RESPONSE BODY
    const body = parseHTML(res.body);
    const caseId = body.find('#actionform_key').val();

    check(res, { 'New case ID received': res => res.status === 200 && caseId })
    //  || fail('Cannot get the caseId: ' + res.url);

    setMetricValue(MetricType.MATTER_PAGE_LOADED, res.status === 200 && caseId, res.timings.waiting);

    return {
        success: res.status === 200 && caseId,
        res,
        caseId
    };
}

const saveCase = (data, res, caseId) => {
    const executionInfo = getExecutionInfo();
    

    // THE CASE NAME SUFFIX WILL BE LIKE: {prefix}_{username}_{timestamp} => UJ1_jmeterUser1500_1671421261025
    const caseNameSuffix = `${getCurrentUsername()}_${Date.now()}`;

    if (res.status !== 200) return res;

    const hasMatterForm = handleCheckFormExist(res, '#actionform', FormCounterMetric.MATTER_FORM_ERROR_COUNTER);
    if (hasMatterForm) {
        sleep(FORM_SLEEP);

        // SUBMIT FORM TO CREATE A NEW CASE
        res = res.submitForm({
            formSelector: '#actionform',
            fields: {
                'key': caseId,
                'map["forwardToHearingRequirement"]': data.Data.CASE_FIELDS.forwardToHearingRequirement,
                'matter.mtrJsCode': data.Data.CASE_FIELDS.mtrJsCode,
                'matter.singleClassification.mtrCategory': data.Data.CASE_FIELDS.mtrCategory,
                'matter.singleClassification.mtrMatterCd': data.Data.CASE_FIELDS.mtrMatterCd,
                'matter.singleClassification.mtrMatterType': data.Data.CASE_FIELDS.mtrMatterType,
                'matter.areaCode': data.Data.CASE_FIELDS.areaCode,
                'matter.mtrRegCode': data.Data.CASE_FIELDS.mtrRegCode,
                'matter.homeLocation': data.Data.CASE_FIELDS.homeLocation,
                'mtrRecDate': data.receivedDate,
                'mtrNumberAdded': data.Data.CASE_FIELDS.mtrNumberAdded + caseNameSuffix,
                'matter.mtrAltTitle': data.Data.CASE_FIELDS.mtrAltTitle + caseNameSuffix
            }
        });

        const expectedUrl = `${data.Urls.VIEW_MATTER_URL}?key=${caseId}&XSRF-TOKEN=${data.token}`;
        check(res, { 'New case created': res => res.status === 200 && res.url === expectedUrl }) 
        // || fail('Cannot add a new case: ' + res.url);
        console.log(`${executionInfo} - Case created: ${data.Data.CASE_FIELDS.mtrNumberAdded + caseNameSuffix}`);
        setMetricValue(MetricType.MATTER_CREATED, res.status === 200 && res.url === expectedUrl, res.timings.waiting);

        if (data.Data.CASE_FIELDS.forwardToHearingRequirement === 'Y') {
            // LOAD EVENT EDIT
            const eventEditUrl = `${data.Urls.EVENT_EDIT_URL}?method=menuCall&eventCd=HEARGREQ&matterId=&XSRF-TOKEN=${data.token}`;
            res = http.get(eventEditUrl);

            check(res, { 'Load LR screen': res => res.status === 200 }) 
            // || fail('Event Edit load failed: ' + res.url);

            setMetricValue(MetricType.LISTING_REQUIREMENT_PAGE_LOADED, res.status === 200, res.timings.waiting);
            
            return {
                success: res.status === 200,
                res
            };
        }

        return {
            success: res.status === 200 && res.url === expectedUrl,
            res
        };
    }

    return {
        success: false,
        res
    };
}

export { getAvailableCaseId, saveCase };