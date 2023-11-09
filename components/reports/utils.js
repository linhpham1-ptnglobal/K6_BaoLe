import http from 'k6/http'

const getReportToken = (url, token) => {
    const getReportTokenUrl = 'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/TokenRequest.action?reportUrl=' + url;

    const getReportTokenRes = http.post(getReportTokenUrl, {}, {
        headers: {
            'X-XSRF-TOKEN': token
        }
    });

    // console.log(getReportTokenRes);

    if (getReportTokenRes.status === 201 && getReportTokenRes.body) {
        return getReportTokenRes.body.replace(/(\r\n|\n|\r)/gm, "");
    }

    return "";
}

export { getReportToken }