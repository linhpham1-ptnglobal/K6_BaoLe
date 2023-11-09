import { parseHTML } from 'k6/html';
import { group } from 'k6'
import http from 'k6/http'

export function matterPageLoad(data) {
    console.log('Doing matterPageLoad')
    let response, actionform_key, doc, selectionObj
    //console.log('${exec.vu.iterationInInstance}', exec.vu.idInTest)
    /*
    console.log('response', response.body)
                doc = parseHTML(response.body);
                console.log('doc', doc)
                console.log('doc.find(#actionform_key)', doc.find('#actionform_key'))
                actionform_key = doc.find('#actionform_key')[0].value
                console.log('actionform_key', actionform_key)*/

    group(
        'Load Matter Page - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/ViewMatter.action?XSRF-TOKEN=' + data.token,

        function () {


            response = http.post('https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/ViewMatter.action?XSRF-TOKEN=' + data.token,
                // response = http.get('https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/Html5ResourceScheduler/init.action?XSRF-TOKEN=' + data.token,
                // response = http.get('https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/CMSHomeAction.do?XSRF-TOKEN=' + data.token,
                {
                    headers: {
                        host: 'hmcts.mcgirrtech.com',
                        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*',
                        'accept-language': 'en-US,en;q=0.5',
                        'accept-encoding': 'gzip, deflate, br',
                        'x-xsrf-token': '' + data.token,
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'document',
                        'sec-fetch-mode': 'navigate',
                        'sec-fetch-site': 'same-origin',
                        'sec-fetch-user': '1',
                        'Cookie': 'XSRF-TOKEN=' + data.token + '; LAST-ACCESS=1668565440678; MAX-ACTIVE=14400; JSESSIONID=' + data.jsSessionId + '; ROUTEID=.node2'
                    }
                }
            )
            
            /** FIND THE KEY */
            // looking for <input type="hidden" name="key" value="460655340" id="actionform_key"/>
            
            // console.log(doc.find('#actionform_key').val());
            // const footerText = doc.find('footer').text();

             doc = parseHTML(response.body); // equivalent to res.html()
            const pageTitle = doc.find('head title').text();
            const langAttr = doc.find('html').attr('lang');
            const footerText = doc.find('body').text(); // works!!!
            const actionForm = doc.find("#actionform")
            console.log('pageTitle', pageTitle)
            console.log('langAttr', langAttr)
            console.log('footerText', footerText)
            console.log('action form', actionForm)
            console.log(' Key is', doc.find('#actionform_key').val());


        },
        function () {
            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/menu/LoadMainMenu.action',
                null,
                {
                    headers: {
                        host: 'hmcts.mcgirrtech.com',
                        accept: 'application/json, text/plain, */*',
                        'accept-language': 'en-US,en;q=0.5',
                        'accept-encoding': 'gzip, deflate, br',
                        'x-xsrf-token': '' + data.token,
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                    },
                }
            )
        }
    )
}
