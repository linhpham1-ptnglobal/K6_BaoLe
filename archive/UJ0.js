import http from "k6/http";
import { check, group, sleep } from "k6";
import { Counter, Rate, Trend } from "k6/metrics";
import { randomIntBetween, randomItem } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";

export function UJ0(params) {
    console.log('params', params)
    group("Front page", function () {
        let res = null;
        
        // As mentioned above, this logic just forces the performance alert for too many urls, use env URL_ALERT to force it
        // It also highlights the ability to programmatically do things right in your script
        if (__ENV.URL_ALERT) {
            res = http.get("http://test.k6.io/?ts=" + Math.round(randomIntBetween(1,2000)));
        } else {
            res = http.get("http://test.k6.io/?ts=" + Math.round(randomIntBetween(1,2000)), { tags: { name: "http://test.k6.io/ Aggregated"}});
        }
        let checkRes = check(res, { 
            "Homepage body size is 11026 bytes": (r) => r.body.length === 11026,
            "Homepage welcome header present": (r) => r.body.indexOf("Welcome to the k6.io demo site!") !== -1
        });

        // Record check failures
        params.checkFailureRate.add(!checkRes);

        // Record time to first byte and tag it with the URL to be able to filter the results in Insights
        params.timeToFirstByte.add(res.timings.waiting, { ttfbURL: res.url });

        // Load static assets
        group("Static assets", function () {
            let res = http.batch([
                ["GET", "http://test.k6.io/static/css/site.css", {}, { tags: { staticAsset: "yes", otherTag: "CSS", name: "CSS" } }],
                ["GET", "http://test.k6.io/static/js/prisms.js", {}, { tags: { staticAsset: "yes", otherTag: "JS", name: "JS" } }],
            ]);
            checkRes = check(res[0], {
                "Is stylesheet 4859 bytes?": (r) => r.body.length === 4859,
            });

            // Record check failures
            params.checkFailureRate.add(!checkRes);

            // Record time to first byte and tag it with the URL to be able to filter the results in Insights
            params.timeToFirstByte.add(res[0].timings.waiting, { ttfbURL: res[0].url, staticAsset: "yes" });
            params.timeToFirstByte.add(res[1].timings.waiting, { ttfbURL: res[1].url, staticAsset: "yes" });
        });


    });


    sleep(10);

    group("Login", function () {

        let res = http.get("http://test.k6.io/my_messages.php");
        let checkRes = check(res, {
            "Users should not be auth'd. Is unauthorized header present?": (r) => r.body.indexOf("Unauthorized") !== -1
        });
        console.log(res.body)
        //extracting the CSRF token from the response

        const vars = {};

        vars["csrftoken"] = res
            .html()
            .find("input[name=csrftoken]")
            .first()
            .attr("value");

        // Record check failures
        params.checkFailureRate.add(!checkRes);

        let position = Math.floor(Math.random() * loginData.users.length);
        let credentials = params.loginData.users[position];

        res = http.post("http://test.k6.io/login.php", { login: credentials.username, password: credentials.password, redir: '1', csrftoken: `${vars["csrftoken"]}` });

        //console.log(credentials.username, credentials.password)
        checkRes = check(res, {
            "is logged in welcome header present": (r) => r.body.indexOf("Welcome, admin!") !== -1
        });

        // Record successful logins
        if (checkRes) {
            params.successfulLogins.add(1);
        }

        // Record check failures
        params.checkFailureRate.add(!checkRes, { page: "login" });

        // Record time to first byte and tag it with the URL to be able to filter the results in Insights
        params.timeToFirstByte.add(res.timings.waiting, { ttfbURL: res.url });

        sleep(10);
    });
}

export function login(params){

    group("Login", function () {

        // let loginUrl = "https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/CMSHomeAction.do"
        let loginUrl = "https://apache-lb4.mcgirrtech.com/HMCTSQA4.28/CMSHomeAction.do"

        // let res = http.get(loginUrl);
      
        const vars = {};

        // vars["csrftoken"] = res
        //     .html()
        //     .find("input[name=csrftoken]")
        //     .first()
        //     .attr("value");

        let position = Math.floor(Math.random() * params.loginData.users.length);
        let credentials = params.loginData.users[position];

        let res = http.post(loginUrl, { j_username: credentials.username, j_password: credentials.password, redir: '1' });

        console.log(credentials.username, credentials.password)
        // console.log('res is', res)
        console.log('looping, response.cookies is', res.cookies)
        // checkRes = check(res, {
        //     "is logged in welcome header present": (r) => r.body.indexOf("Welcome, admin!") !== -1
        // });

        // // Record successful logins
        // if (checkRes) {
        //     params.successfulLogins.add(1);
        // }

        // // Record check failures
        // params.checkFailureRate.add(!checkRes, { page: "login" });

        // Record time to first byte and tag it with the URL to be able to filter the results in Insights
        // params.timeToFirstByte.add(res.timings.waiting, { ttfbURL: res.url });

        sleep(2);
    });

}

 // { "username": "jmeteruser1001", "password": "password" },
        // { "username": "jmeteruser1002", "password": "password"},
        // { "username": "jmeteruser1003", "password": "password" },
        // { "username": "jmeteruser1004", "password": "password" },
        // { "username": "jmeteruser1005", "password": "password" }

