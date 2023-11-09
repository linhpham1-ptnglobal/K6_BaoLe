import http from 'k6/http';

import { check, fail, sleep } from 'k6';
import { chromium } from 'k6/x/browser';
import { getReportToken } from '../components/reports/utils.js';

export default function () {
    const browser = chromium.launch({ headless: false });
    const page = browser.newPage({
        ignoreHTTPSErrors: true
    });

    page
        .goto('https://hmcts.mcgirrtech.com/HMCTSQA-AZURE', { waitUntil: 'networkidle' })
        .then(() => {
            // Enter login credentials and login
            page.locator('input[name="j_username"]').type('sysadm'); // jmeterUser1000
            page.locator('input[name="j_password"]').type('password');


            // Wait for asynchronous operations to complete
            return Promise.all([
                page.waitForNavigation(),
                page.locator('input[type="submit"]').click(),
            ]).then(() => {
                check(page, { 'Login successfully': page.locator('#logout').textContent().includes('Logout') }) || fail('Login failed');

                // page.locator('#reports').click()

                // sleep(1);

                const offScreen = page.locator('#case_search_lnk_id');
                const url = offScreen.getAttribute("href");
                const token = url.split("=")[1].trim();
                console.log("token: ", token);

                // const offScreen = page.innerHTML('a[title="Internal Hearing List v2.0 (SRSS)"]');

                // console.log("Result: ", offScreen);

                const reportUrl = "https://hmcts.mcgirrtech.com/ReportServer/Pages/ReportViewer.aspx?%2fHMCTSQA-AZURE%2fExternalHearingList_v2&rs:Command=Render&token=";

                // console.log("response: ", page);
                
                // console.log("page url: ", page.url());

                // const newUrl = getReportToken(reportUrl, token);
                // console.log("newUrl: ", newUrl);

                const getReportTokenUrl = 'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/TokenRequest.action?reportUrl=' + reportUrl;

                const getReportTokenRes = http.post(getReportTokenUrl, {
                    insecureSkipTLSVerify: true
                }, {
                    headers: {
                        'X-XSRF-TOKEN': token
                    }
                });

                // console.log(getReportTokenRes);

                if (getReportTokenRes.status === 201 && getReportTokenRes.body) {
                    console.log("new token: ", getReportTokenRes.body);
                }

                // console.log(page.locator('img[title="HM Courts & Tribunals Service"]').type)
                // page.locator('a[title="Internal Hearing List v2.0 (SRSS)"]')[0].click()

                // check(page, { 'Internal Hearing List v2.0 load successfully': page.locator('#logout').textContent().includes('Logout') }) ||
                //     fail('Internal Hearing List v2.0 load failed');
            });
        }).finally(() => {
            page.close();
            browser.close();
        });
}