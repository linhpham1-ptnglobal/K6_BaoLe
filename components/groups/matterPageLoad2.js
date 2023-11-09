import { parseHTML } from 'k6/html';
import http from 'k6/http';
import { check, fail } from 'k6';

export function matterPageLoad2(data) {
    /** LOAD MATTER VIEW */
    console.log('Doing matterPageLoad');
    let res = http.get('https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/ViewMatter.action?XSRF-TOKEN=' + data.token);

    check(res, { 'Matter View load succeeded': res => res.url == 'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/ViewMatter.action?XSRF-TOKEN=' + data.token }) 
    // || fail('Matter View failed' + res.url);

    /** GET KEY VALUE FROM RESPONSE BODY */
    let doc = parseHTML(res.body);
    let key = doc.find('#actionform_key').val();

    /** RETURN KEY */
    return key;
}
