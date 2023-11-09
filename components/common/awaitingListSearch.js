import http from 'k6/http';
import { check, fail } from 'k6';

import { setMetricValue, isJsonString } from '../../lib/utils.js';
import { MetricType } from '../../data/constant.js';

const getMatterAwatingList = (data, res, caseId) => {
    // GET MATTER AWAITING LISTING LIST
    res = http.get(data.Urls.AWAITING_LIST_URL, {
        headers: {
            'X-XSRF-TOKEN': data.token
        }
    });

    if (res.status !== 200 || !isJsonString(res.body)) return res;

    const result = JSON.parse(res.body);
    const caseIndex = result.list.findIndex(item => item.MTR_MATTER_ID === caseId);
    const isCaseExisted = caseIndex > -1;

    check(res, {'Case found on Awaiting Listing page': res => res.status === 200 && isCaseExisted})
    //  ||fail('Case not found on Awaiting Listing page ' + res.url);

    setMetricValue(MetricType.AWAITING_LISTING_PAGE_LOADED, res.status === 200 && isCaseExisted, res.timings.waiting);

    if (isCaseExisted) {
        // LOAD RESOURCE SCHEDULER
        const key = result.list[caseIndex].MTR_MATTER_ID;
        const eventId = result.list[caseIndex].EVT_EVENT_ID;
        const resourceSchedulerUrl = `${data.Urls.RESOURCE_SCHEDULER_URL}?key=${key}&eventId=${eventId}&XSRF-TOKEN=${data.token}`;
        res = http.get(resourceSchedulerUrl);

        check(res, {'Resource Scheduler load succeeded ': res => res.status === 200 && res.url == resourceSchedulerUrl}) 
        // ||fail('Resource Scheduler load failed: ' + res.url);

        setMetricValue(MetricType.HEARING_SCHEDULE_ROOMS_TAB_LOADED, res.status === 200 && res.url == resourceSchedulerUrl, res.timings.waiting);

        return {
            success: res.status === 200 && res.url == resourceSchedulerUrl,
            res
        };
    }

    return {
        success: false,
        res
    };
}

export { getMatterAwatingList }