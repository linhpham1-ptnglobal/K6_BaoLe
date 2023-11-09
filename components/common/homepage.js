import http from 'k6/http';
import { check, fail } from 'k6';
import { IS_NEW_HOME_PAGE } from "../../data/uj.js";

const loadHomePage = (data, res) => {
    const homePageUrl = `${data.Urls.HOME_PAGE_URL}?XSRF-TOKEN=${data.token}`;
    res = http.get(homePageUrl);
    check(res, { 'Homepage load succeeded ': res => res.status === 200 });

    if (IS_NEW_HOME_PAGE) {
        // LOAD MAIN MENU
        const mainMenuLoadUrl = `${data.Urls.LOAD_MAIN_MENU_URL}?XSRF-TOKEN=${data.token}`;
        res = http.post(mainMenuLoadUrl, {
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': data.token
            }
        });
        const mainMenuLoadResult = JSON.parse(res.body);
        const isMainMenuLoaded = mainMenuLoadResult.hasOwnProperty("menu");
        check(res, { 'Load main menu succeeded ': res => res.status === 200 && isMainMenuLoaded });

        // HOME PAGE LOAD
        const homePageLoadUrl = `${data.Urls.HOME_PAGE_LOAD_URL}?XSRF-TOKEN=${data.token}`;
        res = http.post(homePageLoadUrl, {
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': data.token
            }
        });
        const homePageLoadResult = JSON.parse(res.body);
        const isHomePageDataLoaded = homePageLoadResult.hasOwnProperty("loginUserId");
        check(res, { 'Homepage data load succeeded ': res => res.status === 200 && isHomePageDataLoaded });

        // HOME PAGE FILTER
        const homePageFilterUrl = `${data.Urls.HOME_PAGE_FILTER_URL}?XSRF-TOKEN=${data.token}`;
        res = http.post(homePageFilterUrl, {
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': data.token
            }
        });
        const homePageFilterResult = JSON.parse(res.body);
        const homePageFilterLoaded = homePageFilterResult.hasOwnProperty("SaveHomePageFilter");
        check(res, { 'Homepage filter succeeded ': res => res.status === 200 && homePageFilterLoaded });
    }
}

export { loadHomePage }