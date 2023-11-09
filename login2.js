import http from "k6/http";
import { check, fail, sleep } from 'k6';

import { Environment, FormCounterMetric } from "./data/constant.js";
import { setMetricValue, getExecutionInfo, handleCheckFormExist } from "./lib/utils.js";
import { MetricType } from "./data/constant.js";
import { addLoggedInUsers, FORM_SLEEP } from "./data/uj.js";

const ENV = Environment.AZURE; // Change to LOCAL to use localhost

export function login2(credentials) {
    
    const contextPath = ENV === Environment.LOCAL ? 'http://localhost:8088/trunk_mcms' : 'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE';

    // Get execution log
    const executionInfo = getExecutionInfo();

    /** ATTEMPT LOGIN */
    let res = http.get(contextPath);

    // console.log(`${executionInfo} - Login page status: ${res.status}`);
    // check(res, {'Login page load succeeded': res => res.status === 200})
    if (res.status !== 200) {
        return false
    }

    if (res.url.includes("XSRF-TOKEN=")) {
        const url = res.url;
        const tokenIndex = url.indexOf("XSRF-TOKEN=");
        const token  = url.slice(tokenIndex).replace("XSRF-TOKEN=", "");
        return { token, jsSessionId: null }
    }
    
    const hasLoginForm = handleCheckFormExist(res, 'form.form-signin', FormCounterMetric.LOGIN_FORM_ERROR_COUNTER);
    if (hasLoginForm) {
        // check(res, {'Login page load succeeded': res => res.status === 200}) 
        // || fail('Login page load failed' + res.url);

        setMetricValue(MetricType.LOGIN_PAGE_LOADED, res.status === 200, res.timings.waiting);

        sleep(FORM_SLEEP);

        res = res.submitForm({
            formSelector: 'form.form-signin',
            fields: { j_username: credentials.username, j_password: credentials.password },
        });

        /** EXTRACT THE XSRF-TOKEN AND JSESSIONID */
        const token = res.cookies["XSRF-TOKEN"] && res.cookies["XSRF-TOKEN"][0] ? res.cookies["XSRF-TOKEN"][0].value : '';
        const jsSessionId = res.cookies["JSESSIONID"] && res.cookies["JSESSIONID"][0] ? res.cookies["JSESSIONID"][0].value : '';

        if (token) {
            // console.log(`${executionInfo} - Token: ${token}`);
        }
        else {
            console.warn(`${executionInfo} - Login failed (could not find token)`);
        }

        // check(token, {'Login succeeded': token => token !== '' }) 
        // || fail('Login failed' + res.url);

        setMetricValue(MetricType.LOGIN_ACTION, token => token !== '', res.timings.waiting);

        if (token) {
            addLoggedInUsers({
                username: credentials.username,
                token: token
            })
        }
        console.log('user ' + credentials.username + ' Logged in successfully with token:' + token)

        /** RETURN LOGIN VARS */
        return { token, jsSessionId }
    }
    else{
        console.warn('user ' + credentials.username + ': Login failed (could not find login form on the page')

        return false;
    } 
}
