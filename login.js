import http from "k6/http";
import { group } from "k6";
export function login(credentials) {
  let response, success, token, jsSessionId
  group("Login", function () {

    group('Login action - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/j_security_check', function () {

      /** Must make sure they are not logged otherwise getting 408 error */
      // @todo use different user if that happens? maybe try another for x times then quit?

      response = http.get(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/LogoutAction.action',
        {},
        {}
      )

        /** ATTEMPT LOGIN */
        / console.log('Login Credentials: ', credentials)
      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/j_security_check',
        {
          j_username: credentials.username,
          j_password: credentials.password,
          submit: 'Login',
        },
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            'content-type': 'application/x-www-form-urlencoded',
            origin: 'https://hmcts.mcgirrtech.com',
            connection: 'keep-alive',
            'upgrade-insecure-requests': '1',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
          },
        }
      )

      /** EXTRACT THE  XSRF-TOKEN AND JSESSIONID*/
      //  url = new URL(response.url);
      token = response.url.split('=').pop()
      jsSessionId = response.cookies.JSESSIONID[0].value // @todo: improve checking if exists etc. (for token as well) so it doesn't crash if undefined

      if (token === response.url) {
        success = false  //@todo handle this error, log it? choose another user?
      } else {
        success = true
      }

      /** IF THE USER WAS LOGGED IN THEN TEH HOME PAGE LOADS ABOVE, WE MAY NEED TO LOAD THE OTHER XHR ITEMS THAT ARE LOADING LIKE MENU AND LOADING GIF THIS ARE COMMENTED OUT FOR NOW */
      // response = http.post(
      //   'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/menu/LoadMainMenu.action',
      //   null,
      //   {
      //     headers: {
      //       host: 'hmcts.mcgirrtech.com',
      //       accept: 'application/json, text/plain, */*',
      //       'accept-language': 'en-US,en;q=0.5',
      //       'accept-encoding': 'gzip, deflate, br',
      //       'x-xsrf-token': token,
      //       origin: 'https://hmcts.mcgirrtech.com',
      //       connection: 'keep-alive',
      //       'sec-fetch-dest': 'empty',
      //       'sec-fetch-mode': 'cors',
      //       'sec-fetch-site': 'same-origin',
      //     },
      //   }
      // )

      // response = http.get('https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/loading.html', {
      //   headers: {
      //     host: 'hmcts.mcgirrtech.com',
      //     accept:
      //       'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      //     'accept-language': 'en-US,en;q=0.5',
      //     'accept-encoding': 'gzip, deflate, br',
      //     connection: 'keep-alive',
      //     'upgrade-insecure-requests': '1',
      //     'sec-fetch-dest': 'iframe',
      //     'sec-fetch-mode': 'navigate',
      //     'sec-fetch-site': 'same-origin',
      //   },
      // })       
    })
  })

  /** RETURN LOGIN VARS */
  return { token, jsSessionId }
}
