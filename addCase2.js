import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = {
  insecureSkipTLSVerify: true,
  ext: {
    loadimpact: {
      distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
      apm: [],
    },
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 1, duration: '1m' },
        { target: 1, duration: '3m30s' },
        { target: 0, duration: '1m' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  group('page_2 - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/j_security_check', function () {
    response = http.post(
      'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/j_security_check',
      {
        j_username: 'sysadm',
        j_password: 'password',
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
    sleep(1.7)
    for (let i = 0; i < 5; i++) {
       console.log('looping, response is', response)
      }
    response = http.post(
      'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/menu/LoadMainMenu.action',
      null,
      {
        headers: {
          host: 'hmcts.mcgirrtech.com',
          accept: 'application/json, text/plain, */*',
          'accept-language': 'en-US,en;q=0.5',
          'accept-encoding': 'gzip, deflate, br',
          'x-xsrf-token': '25d21d60-aa00-4f43-9410-c31619f8c536',
          origin: 'https://hmcts.mcgirrtech.com',
          connection: 'keep-alive',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )

    response = http.get('https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/loading.html', {
      headers: {
        host: 'hmcts.mcgirrtech.com',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'accept-language': 'en-US,en;q=0.5',
        'accept-encoding': 'gzip, deflate, br',
        connection: 'keep-alive',
        'upgrade-insecure-requests': '1',
        'sec-fetch-dest': 'iframe',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
      },
    })

    response = http.get('https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/loading.html', {
      headers: {
        host: 'hmcts.mcgirrtech.com',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'accept-language': 'en-US,en;q=0.5',
        'accept-encoding': 'gzip, deflate, br',
        connection: 'keep-alive',
        'upgrade-insecure-requests': '1',
        'sec-fetch-dest': 'iframe',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
      },
    })
    sleep(6.1)
  })

  // group(
  //   'page_3 - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/ViewMatter.action?XSRF-TOKEN=25d21d60-aa00-4f43-9410-c31619f8c536',
  //   function () {
  //     response = http.post(
  //       'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/menu/LoadMainMenu.action',
  //       null,
  //       {
  //         headers: {
  //           host: 'hmcts.mcgirrtech.com',
  //           accept: 'application/json, text/plain, */*',
  //           'accept-language': 'en-US,en;q=0.5',
  //           'accept-encoding': 'gzip, deflate, br',
  //           'x-xsrf-token': '25d21d60-aa00-4f43-9410-c31619f8c536',
  //           origin: 'https://hmcts.mcgirrtech.com',
  //           connection: 'keep-alive',
  //           'sec-fetch-dest': 'empty',
  //           'sec-fetch-mode': 'cors',
  //           'sec-fetch-site': 'same-origin',
  //         },
  //       }
  //     )
  //     response = http.get('https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/loading.html', {
  //       headers: {
  //         host: 'hmcts.mcgirrtech.com',
  //         accept:
  //           'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  //         'accept-language': 'en-US,en;q=0.5',
  //         'accept-encoding': 'gzip, deflate, br',
  //         connection: 'keep-alive',
  //         'upgrade-insecure-requests': '1',
  //         'sec-fetch-dest': 'iframe',
  //         'sec-fetch-mode': 'navigate',
  //         'sec-fetch-site': 'same-origin',
  //       },
  //     })
  //     sleep(2.6)
  //   }
  // )


}
