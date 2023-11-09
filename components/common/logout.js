import http from 'k6/http';
import { check, fail } from 'k6';

const logout = (data) => {
    const logoutUrl = `https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/LogoutAction.action?XSRF-TOKEN=${data.token}`;
    let res = http.get(logoutUrl);

    check(res, { 'Logout succeeded ': res => res.status === 302 || res.status === 200 })
    // || fail('Logout failed: ' + res.url);
}

export { logout }