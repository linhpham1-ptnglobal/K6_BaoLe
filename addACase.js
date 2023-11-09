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
        console.log('looping, response.cookies is', response.cookies)
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

  group(
    'page_3 - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/ViewMatter.action?XSRF-TOKEN=25d21d60-aa00-4f43-9410-c31619f8c536',
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
      sleep(2.6)
    }
  )

  group(
    'page_4 - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/UpdateJurisdiction.action?XSRF-TOKEN=25d21d60-aa00-4f43-9410-c31619f8c536',
    function () {
      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/UpdateJurisdiction.action?XSRF-TOKEN=25d21d60-aa00-4f43-9410-c31619f8c536',
        'map%5B%27documentTrayId%27%5D=&method=%2C&type=&index=&key=460529522&map%5B%27addRelatedEntity%27%5D=no&map%5B%27forwardToHearingRequirement%27%5D=no&mtrXrefType=JOIN&mtrActionMatterId=&mtrChargeMatterId=&map%5B%27courtCd%27%5D=1&matter.mtrJsCode=CIV&matter.lodgMethodCd=MANUAL&matter.areaCode=TSR&matter.mtrRegCode=&mtrRecDate=&matter.mtrComment=&mtrNumberAdded=&matter.mtrRoleCd=0&allocatedTo=-84&map.fieldId15=0&map.fieldId16=0&map.fieldId17=0&matter.mtrCitedNameFlag=3&matter.mtrAltTitle=&mtrCategory0=&mtrMatterCd0=&mtrMatterType0=&mtrCategory1=&mtrMatterCd1=&mtrCategory2=&mtrMatterCd2=&mtrCategory3=&mtrMatterCd3=&mtrCategory4=&mtrMatterCd4=&mtrCategory5=&mtrMatterCd5=&mtrCategory6=&mtrMatterCd6=&mtrCategory7=&mtrMatterCd7=&mtrCategory8=&mtrMatterCd8=&mtrCategory9=&mtrMatterCd9=&mtrCategory10=&mtrMatterCd10=&mtrCategory11=&mtrMatterCd11=&mtrCategory12=&mtrMatterCd12=&mtrCategory13=&mtrMatterCd13=&mtrCategory14=&mtrMatterCd14=&map%5B%27csaDecisionDate%27%5D=&matter.partiesModified=false&matter.reinstatementMatterId=&value%28validateCaveatRule%29=',
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
      sleep(20.8)

      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/AjaxUpdateMatter.action',
        {
          key: '460529522',
          'matter.mtrRegCode': 'TV',
        },
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept: '*/*',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            'x-xsrf-token': '25d21d60-aa00-4f43-9410-c31619f8c536',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            origin: 'https://hmcts.mcgirrtech.com',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )

      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/AjaxUpdateMatter.action',
        {
          key: '460529522',
          'matter.homeLocation': '300',
        },
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept: '*/*',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            'x-xsrf-token': '25d21d60-aa00-4f43-9410-c31619f8c536',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            origin: 'https://hmcts.mcgirrtech.com',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )
      sleep(21.4)
    }
  )

  group(
    'page_5 - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/SaveMatter.action?XSRF-TOKEN=25d21d60-aa00-4f43-9410-c31619f8c536',
    function () {
      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/EventEdit.do?method=menuCall&eventCd=HEARGREQ&matterId=&XSRF-TOKEN=25d21d60-aa00-4f43-9410-c31619f8c536',
        null,
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            connection: 'keep-alive',
            'upgrade-insecure-requests': '1',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
          },
        }
      )
      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/EventEdit.do?method=menuCall&eventCd=HEARGREQ&matterId=&XSRF-TOKEN=25d21d60-aa00-4f43-9410-c31619f8c536',
        null,
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            connection: 'keep-alive',
            'upgrade-insecure-requests': '1',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
          },
        }
      )
      sleep(0.5)
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
    }
  )
}
