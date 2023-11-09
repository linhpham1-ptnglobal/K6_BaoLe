import { check, fail, sleep } from 'k6';
import { handleCheckFormExist, getExecutionInfo } from '../../lib/utils.js';

import { setMetricValue } from '../../lib/utils.js';
import { FormCounterMetric, MetricType } from '../../data/constant.js';
import { FORM_SLEEP } from '../../data/uj.js';

const saveLR = (data, res, caseId) => {
    // THIS BELOW SECTION ONLY FOR LOCALHOST
    // res = res.submitForm({
    //     formSelector: 'form',
    //     fields: {
    //         'method': 'pickEventType',
    //         'event.evtEventCd': 'HEARGREQ',
    //         'event.evtEventTypeId': '19'
    //     }
    // });
    
    if (res.status !== 200) return res;

    const hasListingRequirementForm = handleCheckFormExist(res, '#EventForm', FormCounterMetric.LISTING_REQUIREMENT_FORM_ERROR_COUNTER);
    if (hasListingRequirementForm) {
        // SUBMIT FORM TO CREATE A LISTING REQUIREMENT
        const executionInfo = getExecutionInfo();

        sleep(FORM_SLEEP);

        res = res.submitForm({
            formSelector: '#EventForm',
            fields: {
                'method': 'save',
                'event.eventAttribute.listingEventTypeId': data.Data.LISTING_REQUIREMENT_FIELDS.listingEventTypeId,
                'event.eventAttribute.listingStatus': data.Data.LISTING_REQUIREMENT_FIELDS.listingStatus,
                'event.eventAttribute.hearingDuration': data.Data.LISTING_REQUIREMENT_FIELDS.hearingDuration,
                'event.eventAttribute.autoListingFlag': data.Data.LISTING_REQUIREMENT_FIELDS.autoListingFlag,
                'event.eventAttribute.listAfterDateStr': data.listAfterDate,
                'event.eventAttribute.listBeforeDateStr': data.listBeforeDate,
    
                // Default values
                'event.eventAttribute.sessionsArray': data.Data.LISTING_REQUIREMENT_FIELDS.sessionsArray,
                'event.eventAttribute.portableEquipmentArray': data.Data.LISTING_REQUIREMENT_FIELDS.portableEquipmentArray,
                'event.eventAttribute.otherConsiderationsArray': data.Data.LISTING_REQUIREMENT_FIELDS.otherConsiderationsArray,
                'event.eventAttribute.attributeArray': data.Data.LISTING_REQUIREMENT_FIELDS.attributeArray,
                'event.eventAttribute.empTypesArray': data.Data.LISTING_REQUIREMENT_FIELDS.empTypesArray,
                'event.eventAttribute.hearingMethodsArray': data.Data.LISTING_REQUIREMENT_FIELDS.hearingMethodsArray,
                'event.eventAttribute.johTicketsArray': data.Data.LISTING_REQUIREMENT_FIELDS.johTicketsArray,
                'event.eventAttribute.specialismsArray': data.Data.LISTING_REQUIREMENT_FIELDS.specialismsArray
            }
        });

        const expectedUrl = `${data.Urls.MATTER_HISTORY_URL}?key=${caseId}&XSRF-TOKEN=${data.token}`;
        check(res, {'Save Listing Requirement': res => res.status === 200 && res.url === expectedUrl}) 
        // || fail('Cannot add a new LR: ' + res.url);

        setMetricValue(MetricType.LISTING_REQUIREMENT_CREATED, res.status === 200 && res.url === expectedUrl, res.timings.waiting);

        return {
            success: res.status === 200 && res.url === expectedUrl,
            res
        }
    }

    return {
        success: false,
        res
    };
}

export { saveLR }