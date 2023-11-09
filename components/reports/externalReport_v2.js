import http from 'k6/http';
import { parseHTML } from 'k6/html';
import { getReportToken } from './utils.js';
import { check, fail } from 'k6';

const loadExternalReportV2 = (data) => {
    console.log('Doing loadExternalReportV2');

    let reportUrl = 'https://hmcts.mcgirrtech.com/ReportServer/Pages/ReportViewer.aspx?/HMCTSQA-AZURE/ExternalHearingList_v2&rs:Command=Render&token=';

    const reportToken = getReportToken(reportUrl, data.token);

    reportUrl = reportUrl + reportToken.replace('\n', ''.replace('\t', ''));

    let res = http.get(reportUrl);

    check(res, {'External Report V2 screen load succeeded': res => res.url == reportUrl}) 
    // || fail('External Report V2 screen load failed' + res.url);

    // let doc = parseHTML(res.body);

    // let NavigationCorrector_NewViewState = doc.find('#NavigationCorrector_NewViewState').val(); // Null or undefined
    // let __VIEWSTATE = doc.find('#__VIEWSTATE').val();
    // let __VIEWSTATEGENERATOR = doc.find('#__VIEWSTATEGENERATOR').val();

    // console.log('Values: ', NavigationCorrector_NewViewState);

    // console.log('Body: ', res.body);

    /** LOAD EXTERNAL REPORT V2 RESULT */
    res = res.submitForm({
        formSelector: 'form',
        fields: {
            // 'AjaxScriptManager': 'AjaxScriptManager|ReportViewerControl$ctl09$Reserved_AsyncLoadTarget',
            // 'NavigationCorrector$ScrollPosition': '',
            // 'NavigationCorrector$ViewState': '',
            // 'NavigationCorrector$PageState': '',
            // 'NavigationCorrector$NewViewState': NavigationCorrector_NewViewState,
            // 'ReportViewerControl$ctl03$ctl00': '',
            // 'ReportViewerControl$ctl03$ctl01': '',
            // 'ReportViewerControl$ctl10': 'ltr',
            // 'ReportViewerControl$ctl11': 'standards', 
            // 'ReportViewerControl$AsyncWait$HiddenCancelField': 'False',
            'ReportViewerControl$ctl04$ctl03$txtValue': '11/1/2022',
            'ReportViewerControl$ctl04$ctl05$txtValue': '11/30/2022',
            'ReportViewerControl$ctl04$ctl07$txtValue': 'Milton Keynes County Court and Family Court',
            'ReportViewerControl$ctl04$ctl09$txtValue': 'MKCC Room 2',
            'ReportViewerControl$ctl04$ctl11$txtValue': 'B, Mark',
            'ReportViewerControl$ctl04$ctl13$txtValue': 'Civil',
            // 'ReportViewerControl$ctl04$ctl15$ddValue': 1,
            // 'ReportViewerControl$ctl04$ctl07$divDropDown$ctl01$HiddenIndices': '1000',
            // 'ReportViewerControl$ctl04$ctl09$divDropDown$ctl01$HiddenIndices': '171',
            // 'ReportViewerControl$ctl04$ctl11$divDropDown$ctl01$HiddenIndices': '2',
            // 'ReportViewerControl$ctl04$ctl13$divDropDown$ctl01$HiddenIndices': '0',
            // 'ReportViewerControl$ToggleParam$store': '',
            // 'ReportViewerControl$ToggleParam$collapse': false,
            // 'ReportViewerControl$ctl05$ctl00$CurrentPage': '',
            // 'null': 100,
            // 'ReportViewerControl$ctl05$ctl03$ctl00': '',
            // 'ReportViewerControl$ctl08$ClientClickedId': '',
            // 'ReportViewerControl$ctl07$store': '',
            // 'ReportViewerControl$ctl07$collapse': false,
            // 'ReportViewerControl$ctl09$VisibilityState$ctl00': 'None',
            // 'ReportViewerControl$ctl09$ScrollPosition': '',
            // 'ReportViewerControl$ctl09$ReportControl$ctl02': '',
            // 'ReportViewerControl$ctl09$ReportControl$ctl03': '',
            // 'ReportViewerControl$ctl09$ReportControl$ctl04': 100,
            // 'ReportViewerControl$ctl09$Reserved_AsyncLoadTarget': '',
            // '__EVENTTARGET': 'ReportViewerControl$ctl09$Reserved_AsyncLoadTarget',
            // '__EVENTARGUMENT': '',
            // '__LASTFOCUS': '',
            // '__VIEWSTATE': __VIEWSTATE,
            // '__VIEWSTATEGENERATOR': __VIEWSTATEGENERATOR,
            // '_ASYNCPOST': true
        }
    });

    res = res.submitForm({
        formSelector: 'form',
    });

    console.log('Status 2: ', res.status);

    console.log('Body 2: ', res.body);

    // check(res, {'External Report V2 load succeeded': res => res.url == reportUrl}) ||
    //     fail('External Report V2 load failed' + res.url);
}

export { loadExternalReportV2 }