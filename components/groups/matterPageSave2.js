import { parseHTML } from 'k6/html';
import http from 'k6/http'
import { check, fail } from 'k6';

export function matterPageSave2(data) {
    console.log('Doing matterPageSave');

    let res = http.get('https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/ViewMatter.action?XSRF-TOKEN=' + data.token);

    check(res, { 'Matter View load succeeded': res => res.url == 'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/ViewMatter.action?XSRF-TOKEN=' + data.token })
    //  || fail('Matter View failed' + res.url);

    /** GET KEY VALUE FROM RESPONSE BODY */
    let doc = parseHTML(res.body);
    let key = doc.find('#actionform_key').val();

    console.log('Received key: ', key);

    /** CREATE NEW CASE */
    const caseName = 'NEWCRT' + Date.now();
    res = res.submitForm({
        formSelector: 'form',
        fields: {
            'map["documentTrayId"]': '',
            'method': '',
            'type': '',
            'index': '',
            'key': key,
            'map["addRelatedEntity"]': 'no',
            'map["forwardToHearingRequirement"]': 'no',
            'mtrXrefType': 'JOIN',
            'mtrActionMatterId': '',
            'mtrChargeMatterId': '',
            'map["courtCd"]': '1',
            'matter.mtrJsCode': 'CIV',
            'matter.singleClassification.mtrCategory': '15',
            'matter.singleClassification.mtrMatterCd': '23',
            'matter.singleClassification.mtrMatterType': '5',
            'matter.listingEventTypeId': '',
            'matter.lodgMethodCd': 'MANUAL',
            'matter.areaCode': 'TSR',
            'matter.mtrRegCode': 'TV',
            'matter.homeLocation': '327',
            'mtrRecDate': '23-11-2022',
            'matter.mtrComment': '',
            'mtrNumberAdded': caseName,
            'matter.mtrRoleCd': 0,
            'allocatedTo': 3207,
            'matter.fieldConfigModel.data["CaseNameSuppression"]': '',
            'map.fieldId15': 0,
            'map.fieldId16': 0,
            'map.fieldId17': 0,
            'matter.mtrCitedNameFlag': 3,
            'matter.mtrAltTitle': caseName,
            'matter.partiesModified': false,
            'method': '',
            'matter.reinstatementMatterId': '',
            'value(validateCaveatRule)': ''
        }
    });

    check(res, { 'New case has been added': res => res.url == 'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/ViewMatter.action?key=' + key + '&XSRF-TOKEN=' + data.token }) 
    // ||  fail('Cannot add a new case' + res.url);
}
