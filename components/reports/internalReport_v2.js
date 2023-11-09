import http from 'k6/http'
import { check, fail } from 'k6';

const loadInternalReportV2 = (data) => {
    console.log('Doing loadInternalReportV2');

    const reportUrl = 'http://sqlreports3/ReportServer/Pages/ReportViewer.aspx?%2FHMCTSQA-AZURE%2FInternalHearingList_v2';

    let res = http.get(reportUrl);

    check(res, {'Internal Report V2 screen load succeeded': res => res.url == reportUrl}) 
    // || fail('Internal Report V2 screen load failed' + res.url);

    console.log(res)

    /** LOAD INTERNAL REPORT V2 RESULT */
    res = res.submitForm({
        formSelector: 'form',
        fields: {
            'ReportViewerControl$ctl03$ctl00': '',
            'ReportViewerControl$ctl03$ctl01': '',
            'ReportViewerControl$ctl10': 'ltr',
            'ReportViewerControl$ctl11': 'standards',
            'ReportViewerControl$AsyncWait$HiddenCancelField': 'False',
            'ReportViewerControl$ctl04$ctl03$txtValue': '10/1/2022',
            'ReportViewerControl$ctl04$ctl05$txtValue': '11/24/2022',
            'ReportViewerControl$ctl04$ctl07$txtValue': 'Milton Keynes County Court and Family Court,Milton Keynes Magistrates and Family Court',
            'ReportViewerControl$ctl04$ctl09$txtValue': 'MKCC Room 1',
            'ReportViewerControl$ctl04$ctl11$txtValue': 'B, Mark',
            'ReportViewerControl$ctl04$ctl13$txtValue': 'Civil',
            'ReportViewerControl$ctl04$ctl15$ddValue': '1',
            'ReportViewerControl$ctl04$ctl07$divDropDown$ctl01$HiddenIndices': '1000,1001',
            'ReportViewerControl$ctl04$ctl09$divDropDown$ctl01$HiddenIndices': '279',
            'ReportViewerControl$ctl04$ctl11$divDropDown$ctl01$HiddenIndices': '2',
            'ReportViewerControl$ctl04$ctl13$divDropDown$ctl01$HiddenIndices': '0',
            'ReportViewerControl$ToggleParam$store': '',
            'ReportViewerControl$ToggleParam$collapse': 'false',
            'ReportViewerControl$ctl05$ctl00$CurrentPage': '',
            'ReportViewerControl$ctl05$ctl03$ctl00': '',
            'ReportViewerControl$ctl08$ClientClickedId': '',
            'ReportViewerControl$ctl07$store': '',
            'ReportViewerControl$ctl07$collapse': 'false',
            'ReportViewerControl$ctl09$VisibilityState$ctl00': 'None',
            'ReportViewerControl$ctl09$ScrollPosition': '',
            'ReportViewerControl$ctl09$ReportControl$ctl02': '',
            'ReportViewerControl$ctl09$ReportControl$ctl03': '',
            'ReportViewerControl$ctl09$ReportControl$ctl04': '100',
            'ReportViewerControl$ctl09$Reserved_AsyncLoadTarget': ''
        }
    });

    check(res, {'Internal Report V2 load succeeded': res => res.url == reportUrl})
    //  || fail('Internal Report V2 load failed' + res.url);
}

export { loadInternalReportV2 }