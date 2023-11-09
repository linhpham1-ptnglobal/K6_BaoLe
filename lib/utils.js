import moment from './moment.min.js';
import exec from 'k6/execution';
import { parseHTML } from 'k6/html';
import { Counter, Rate, Trend } from "k6/metrics";
import { DatetimeAction, MetricType, FormCounterMetric } from '../data/constant.js';
import { metrics, formCounterMetrics } from '../tests/combined.js';
import {
    IS_SHOW_METRICS,
    getCurrentUsername,
    FORM_DISCOVERY_REPEAT_TIMES,
    FORM_DISCOVERY_REPEAT_TIME_INTERVAL,
    RE_LOGIN_TIMES,
    RE_LOGIN_TIME_INTERVAL,
    getExecutionIndex,
    getLoggedInUsers,
    LOG_FILE_NAME
} from '../data/uj.js';
import { sleep } from "k6";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";
// import file from 'k6/x/file';

const generateDate = (value, days = 1, action = DatetimeAction.ADD, format = 'DD-MM-YYYY') => {
    const processDate = (action, value) => {
        if (action === DatetimeAction.SUBTRACT) {
            return value.subtract(days, 'days');
        }
        return value.add(days, 'days');
    }

    if (!value) {
        const defaultNewDate = processDate(action, moment());
        return defaultNewDate.format(format);
    }
    
    const newDate = processDate(action, moment(value, format));
    return newDate.format(format);
}

const addMinutes = (value, duration) => {
    return moment(value, 'HH:mm').add(duration, 'minutes').format('HH:mm');
}

const calculateExecutionCount = () => {
    return exec.vu.idInTest + exec.scenario.iterationInInstance * exec.instance.vusInitialized;
}

const getExecutionInfo = () => {
    const vus = exec.instance.vusInitialized;
    const vuId = exec.vu.idInTest;
    const iter = exec.scenario.iterationInInstance + 1;

    const renderNumberLessThan10 = (num) => {
        return num < 10 ? `0${num}` : num;
    }

    return `User: ${getCurrentUsername()} (user ${renderNumberLessThan10(vuId)}/${renderNumberLessThan10(vus)}) - Iter: ${renderNumberLessThan10(iter)}`;
}

const getErrorInfo = (message) => {
    return `User: ${getCurrentUsername()} - Execution: ${getExecutionIndex()} - ${message}`;
}

// CREATE METRIC VALUES (COUNTER, TREND, ERROR_RATE) AND GROUP BY METRIC TYPE
const initializeMetricGroup = () => {
    if (!IS_SHOW_METRICS) return {};

    return Object.keys(MetricType).reduce((result, key) => {
        const counter = new Counter(`CUSTOM - ${key}_COUNTER`);
        const trend = new Trend(`CUSTOM - ${key}_TREND`);
        const errorRate = new Rate(`CUSTOM - ${key}_ERROR_RATE`);

        const metric = { counter, trend, errorRate };

        return Object.assign({}, result, { [MetricType[key]]: metric } );
    }, {});
}

// SET METRIC VALUE
const setMetricValue = (metricType, isSucceeded, trend) => {
    if (IS_SHOW_METRICS) {
        metrics[metricType].counter.add(isSucceeded ? 1 : 0);
        metrics[metricType].trend.add(trend);
        metrics[metricType].errorRate.add(!isSucceeded);
    }
}

const initializeFormCounterMetric = () => {
    if (!IS_SHOW_METRICS) return {};

    return Object.keys(FormCounterMetric).reduce((result, key) => {
        const counter = new Counter(`FORM - ${key}`);

        return Object.assign({}, result, { [FormCounterMetric[key]]: counter } );
    }, {});
}

const setFormCounterMetricValue = (metricType, value) => {
    if (IS_SHOW_METRICS) {
        formCounterMetrics[metricType].add(value);
    }
}

const handleCheckFormExist = (res, formSelector, metric) => {
    let count = 1;

    let hasForm = checkFormExists(res, formSelector);
    while (!hasForm && count <= FORM_DISCOVERY_REPEAT_TIMES) {
        sleep(FORM_DISCOVERY_REPEAT_TIME_INTERVAL);

        hasForm = checkFormExists(res, formSelector);
        if (hasForm) break;
        
        count++;
    }

    if (!hasForm) {
        handleFormErrorLog(metric);
    }

    return hasForm;
}

// LOGIN CHECKING, IF FAIL THEN LOGIN THE NEXT USER. OTHERWISE, CONTINUE TO RUN THE UJ'S STEPS
const handleCheckLoginFail = (loginFunc) => {
    let count = 1;

    let loginData = loginFunc();
    while ((!loginData || !loginData.token) && count < RE_LOGIN_TIMES) {
        sleep(RE_LOGIN_TIME_INTERVAL);

        loginData = loginFunc();
        if (loginData && loginData.token) break;
        
        count++;
    }

    return loginData;
}

const checkFormExists = (res, formSelector) => {
    const body = parseHTML(res.body);
    const formName = body.find(formSelector).attr('name');
    const formAction = body.find(formSelector).attr('action');

    return formName || formAction;
}

const handleFormErrorLog = (metric) => {
    let formName = 'Login form';

    if (metric === FormCounterMetric.MATTER_FORM_ERROR_COUNTER) {
        formName = 'Matter form'; 
    }
    else if (metric === FormCounterMetric.LISTING_REQUIREMENT_FORM_ERROR_COUNTER) {
        formName = 'Listing requirement form';
    }
    else if (metric === FormCounterMetric.VENUE_BOOKING_CREATE_FORM_ERROR_COUNTER) {
        formName = 'Venue booking create form';
    }
    else if (metric === FormCounterMetric.VENUE_BOOKING_DELETE_FORM_ERROR_COUNTER) {
        formName = 'Venue booking delete form';
    }
    else if (metric === FormCounterMetric.VENUE_BOOKING_UPDATE_FORM_ERROR_COUNTER) {
        formName = 'Venue booking update form';
    }

    const message = getErrorInfo(`${formName} not found.`);
    console.log(message);

    setFormCounterMetricValue(metric, 1);
}

const isJsonString = (value) => {
    try {
        JSON.parse(value);
    } catch (e) {
        return false;
    }
    return true;
}

const writeLog = (data, fileName = LOG_FILE_NAME) => {
    const now = moment();

    const date = moment(now).format('DD-MM-YYYY');
    const time = moment(now).format('HH:mm:ss');

    const info = [
        moment(now).valueOf(),
        date,
        time,
        data.message
    ];

    console.log(info.join(", "))
    // file.appendString(fileName, info.join(",") + '\n');
}

const getRandomArrayValue = (array) => {
    return array[randomIntBetween(0, (array.length - 1))];
}

export {
    generateDate, 
    addMinutes,
    calculateExecutionCount,
    getExecutionInfo,
    initializeMetricGroup,
    setMetricValue,
    initializeFormCounterMetric,
    setFormCounterMetricValue,
    handleCheckFormExist,
    isJsonString,
    handleCheckLoginFail,
    writeLog,
    getRandomArrayValue
}