import http from "k6/http";
import { check, fail } from 'k6';

export function login2(credentials) {
    const contextPath = 'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE'; // http://localhost:8088/trunk_mcms

    /** LOG OUT */
    http.get(`${contextPath}/LogoutAction.action`)

    /** ATTEMPT LOGIN */
    // console.log(`Username: ${credentials.username} - Password: ${credentials.password}`);
    let res = http.get(contextPath);

    console.log('Login request status: ', res.status);

    // check(res, {'Load login page succeeded': res => res.status == 200}) || fail('Load login page failed' + res.url);
    
    // res = res.submitForm({
    //     formSelector: 'form',
    //     fields: { j_username: credentials.username, j_password: credentials.password },
    // });

    // console.log('Login request status: ', res.status);

    // /** EXTRACT THE XSRF-TOKEN AND JSESSIONID */
    // const token =  res.cookies["XSRF-TOKEN"] && res.cookies["XSRF-TOKEN"][0] ? res.cookies["XSRF-TOKEN"][0].value : '';
    // const jsSessionId = res.cookies["JSESSIONID"] && res.cookies["JSESSIONID"][0] ? res.cookies["JSESSIONID"][0].value : '';

    // console.log(`Username: ${credentials.username} - Token: ${token}`);
    // // console.log(`Username: ${credentials.username} - JsSessionId: ${jsSessionId}`);

    // check(res, {'Login succeeded': res => res.url == `${contextPath}/CMSHomeAction.do` && token}) || fail('Login failed' + res.url);

    // /** RETURN LOGIN VARS */
    // return { token, jsSessionId }
}
