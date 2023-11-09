UJ1 script 1 (jmeteruser 1009)

import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = {
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
        { target: 20, duration: '1m' },
        { target: 20, duration: '3m30s' },
        { target: 0, duration: '1m' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  group(
    'page_2 - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/ViewMatter.action?XSRF-TOKEN=27215c4d-80ec-4d98-b945-f9d45b3a248c',
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
            'x-xsrf-token': '27215c4d-80ec-4d98-b945-f9d45b3a248c',
            origin: 'https://hmcts.mcgirrtech.com',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )
      sleep(8.4)
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
      sleep(12.4)
    }
  )

  group(
    'page_3 - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/UpdateJurisdiction.action?XSRF-TOKEN=27215c4d-80ec-4d98-b945-f9d45b3a248c',
    function () {
      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/UpdateJurisdiction.action?XSRF-TOKEN=27215c4d-80ec-4d98-b945-f9d45b3a248c',
        'map%5B%27documentTrayId%27%5D=&method=%2C&type=&index=&key=460607070&map%5B%27addRelatedEntity%27%5D=no&map%5B%27forwardToHearingRequirement%27%5D=no&mtrXrefType=JOIN&mtrActionMatterId=&mtrChargeMatterId=&map%5B%27courtCd%27%5D=1&matter.mtrJsCode=CIV&matter.lodgMethodCd=MANUAL&matter.areaCode=TSR&matter.mtrRegCode=&mtrRecDate=&matter.mtrComment=&mtrNumberAdded=&matter.mtrRoleCd=0&allocatedTo=6226&map.fieldId15=0&map.fieldId16=0&map.fieldId17=0&matter.mtrCitedNameFlag=3&matter.mtrAltTitle=&mtrCategory0=&mtrMatterCd0=&mtrMatterType0=&mtrCategory1=&mtrMatterCd1=&mtrCategory2=&mtrMatterCd2=&mtrCategory3=&mtrMatterCd3=&mtrCategory4=&mtrMatterCd4=&mtrCategory5=&mtrMatterCd5=&mtrCategory6=&mtrMatterCd6=&mtrCategory7=&mtrMatterCd7=&mtrCategory8=&mtrMatterCd8=&mtrCategory9=&mtrMatterCd9=&mtrCategory10=&mtrMatterCd10=&mtrCategory11=&mtrMatterCd11=&mtrCategory12=&mtrMatterCd12=&mtrCategory13=&mtrMatterCd13=&mtrCategory14=&mtrMatterCd14=&map%5B%27csaDecisionDate%27%5D=&matter.partiesModified=false&matter.reinstatementMatterId=&value%28validateCaveatRule%29=',
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
      sleep(0.6)

      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/menu/LoadMainMenu.action',
        null,
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            'x-xsrf-token': '27215c4d-80ec-4d98-b945-f9d45b3a248c',
            origin: 'https://hmcts.mcgirrtech.com',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )
      sleep(6.3)

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
      sleep(15.7)

      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/AjaxUpdateMatter.action',
        {
          key: '460607070',
          'matter.mtrRegCode': 'TV',
        },
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept: '*/*',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            'x-xsrf-token': '27215c4d-80ec-4d98-b945-f9d45b3a248c',
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
          key: '460607070',
          'matter.homeLocation': '',
        },
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept: '*/*',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            'x-xsrf-token': '27215c4d-80ec-4d98-b945-f9d45b3a248c',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            origin: 'https://hmcts.mcgirrtech.com',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )
      sleep(8.2)

      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/AjaxUpdateMatter.action',
        {
          key: '460607070',
          'matter.homeLocation': '300',
        },
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept: '*/*',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            'x-xsrf-token': '27215c4d-80ec-4d98-b945-f9d45b3a248c',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            origin: 'https://hmcts.mcgirrtech.com',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )
      sleep(59.2)
    }
  )

  group(
    'page_4 - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/SaveMatter.action?XSRF-TOKEN=27215c4d-80ec-4d98-b945-f9d45b3a248c',
    function () {
      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/SaveMatter.action?XSRF-TOKEN=27215c4d-80ec-4d98-b945-f9d45b3a248c',
        'map%5B%27documentTrayId%27%5D=&method=%2C&type=&index=&key=460607070&map%5B%27addRelatedEntity%27%5D=no&map%5B%27forwardToHearingRequirement%27%5D=no&mtrXrefType=JOIN&mtrActionMatterId=&mtrChargeMatterId=&map%5B%27courtCd%27%5D=1&matter.mtrJsCode=CIV&matter.singleClassification.mtrCategory=13&matter.singleClassification.mtrMatterCd=19&matter.singleClassification.mtrMatterType=2&matter.listingEventTypeId=&matter.lodgMethodCd=MANUAL&matter.areaCode=TSR&matter.mtrRegCode=TV&matter.homeLocation=300&mtrRecDate=13-11-2022&matter.mtrComment=&mtrNumberAdded=jmeteruser2009-A&matter.mtrRoleCd=0&allocatedTo=6226&matter.fieldConfigModel.data%5B%27CaseNameSuppression%27%5D=&map.fieldId15=0&map.fieldId16=0&map.fieldId17=0&matter.mtrCitedNameFlag=3&matter.mtrAltTitle=jmeteruser2009-A&matter.partiesModified=false&matter.reinstatementMatterId=&value%28validateCaveatRule%29=',
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
      sleep(29)

      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/menu/LoadMainMenu.action',
        null,
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            'x-xsrf-token': '27215c4d-80ec-4d98-b945-f9d45b3a248c',
            origin: 'https://hmcts.mcgirrtech.com',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )
      sleep(0.5)

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
      sleep(18.4)

      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/LockMattersRequest.action?objectId=460607070&',
        null,
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept: '*/*',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            'x-xsrf-token': '27215c4d-80ec-4d98-b945-f9d45b3a248c',
            'x-requested-with': 'XMLHttpRequest',
            origin: 'https://hmcts.mcgirrtech.com',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )
      sleep(0.8)
    }
  )

  group(
    'page_5 - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/Html5ResourceScheduler/init.action?key=460607070&XSRF-TOKEN=27215c4d-80ec-4d98-b945-f9d45b3a248c',
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
            'x-xsrf-token': '27215c4d-80ec-4d98-b945-f9d45b3a248c',
            origin: 'https://hmcts.mcgirrtech.com',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )

      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/CmsSecureItem.action',
        '{"params":{"module":"HSAdvancedFilter","mode":"load","accessLevel":"true"}}',
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            'x-xsrf-token': '27215c4d-80ec-4d98-b945-f9d45b3a248c',
            'content-type': 'application/json; charset=utf-8',
            origin: 'https://hmcts.mcgirrtech.com',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )

      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/CmsSecureItem.action',
        '{"params":{"module":"HSSaveSearch","mode":"load","accessLevel":"true"}}',
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            'x-xsrf-token': '27215c4d-80ec-4d98-b945-f9d45b3a248c',
            'content-type': 'application/json; charset=utf-8',
            origin: 'https://hmcts.mcgirrtech.com',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )

      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/CmsSecureItem.action',
        '{"params":{"module":"HSMemberInclude","mode":"load","accessLevel":"true"}}',
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            'x-xsrf-token': '27215c4d-80ec-4d98-b945-f9d45b3a248c',
            'content-type': 'application/json; charset=utf-8',
            origin: 'https://hmcts.mcgirrtech.com',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )

      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/CmsSecureItem.action',
        '{"params":{"module":"HSSaveSearch","mode":"load","accessLevel":"true"}}',
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            'x-xsrf-token': '27215c4d-80ec-4d98-b945-f9d45b3a248c',
            'content-type': 'application/json; charset=utf-8',
            origin: 'https://hmcts.mcgirrtech.com',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )

      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/CmsSecureItem.action',
        '{"params":{"module":"HSSecondaryFilter","mode":"load","accessLevel":"true"}}',
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            'x-xsrf-token': '27215c4d-80ec-4d98-b945-f9d45b3a248c',
            'content-type': 'application/json; charset=utf-8',
            origin: 'https://hmcts.mcgirrtech.com',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )

      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/CmsSecureItem.action',
        '{"params":{"module":"HSPrimaryFilter","mode":"load","accessLevel":"true"}}',
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            'x-xsrf-token': '27215c4d-80ec-4d98-b945-f9d45b3a248c',
            'content-type': 'application/json; charset=utf-8',
            origin: 'https://hmcts.mcgirrtech.com',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )

      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/CmsSecureItem.action',
        '{"params":{"module":"HSCartAllSessions","mode":"load","accessLevel":"true"}}',
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            'x-xsrf-token': '27215c4d-80ec-4d98-b945-f9d45b3a248c',
            'content-type': 'application/json; charset=utf-8',
            origin: 'https://hmcts.mcgirrtech.com',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )

      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/HearingScheduleHearingReqFilter.action',
        '{"params":{"filter":{"fromDate":"","toDate":"","jurisdictionTypes":[],"localities":[],"locations":[],"sessionTypes":[],"mtrCategories":[],"bodyPositions":[],"employeeWorkTypesIn":[],"employeeWorkTypesEx":[],"memTypesIn":[],"memTypesInTemp":[],"memTypesEx":[],"showWeekend":false,"firstAvailable":"N","availability":"E","dataType":"","displayTab":"HSRM","dataPeriod":"","currentRowSelected":"","hearingDuration":"","hearingDurationSt":8,"hearingDurationEt":21,"hearingDurationInc":30,"hearingChannel":[],"matterId":"460607070","partyAvailability":false,"venueBookingType":[],"noOfAttendees":"","area":[],"registry":[],"bodyPositionsEx":[],"specialism":[],"matterCode":[],"employmentType":[],"employmentTypeTemp":[],"externalVenue":"E","layout":[],"roomAttribute":[],"currentTabSelected":"","selectedRoom":[],"selectedDay":[],"selectedJoh":[],"portableEquipment":[],"nationalResourcePools":"","multiDayLov":"","multiDay":"","multidayHearing":"","multidayHearingWeeks":"","multidayHearingHours":""}}}',
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            'x-xsrf-token': '27215c4d-80ec-4d98-b945-f9d45b3a248c',
            'content-type': 'application/json; charset=utf-8',
            origin: 'https://hmcts.mcgirrtech.com',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )
      sleep(1.5)

      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/HearingScheduleData.action',
        '{"params":{"filter":{"fromDate":"13-11-2022","toDate":"19-11-2022","jurisdictionTypes":[],"localities":[],"locations":[],"sessionTypes":[],"mtrCategories":[],"bodyPositions":[],"employeeWorkTypesIn":[],"employeeWorkTypesEx":[],"memTypesIn":[],"memTypesInTemp":[],"memTypesEx":[],"showWeekend":false,"firstAvailable":"N","availability":"E","dataType":"R","displayTab":"HSRM","dataPeriod":"","currentRowSelected":"","hearingDuration":"","hearingDurationSt":8,"hearingDurationEt":21,"hearingDurationInc":5,"hearingChannel":[],"matterId":"460607070","partyAvailability":true,"venueBookingType":[],"noOfAttendees":"","area":[],"registry":[],"bodyPositionsEx":[],"specialism":[],"matterCode":[],"employmentType":[],"employmentTypeTemp":["SALARY"],"externalVenue":"E","layout":[],"roomAttribute":[],"currentTabSelected":"HSRM","selectedRoom":[],"selectedDay":[],"selectedJoh":[],"portableEquipment":[],"nationalResourcePools":null,"multiDayLov":"1","multiDay":"","multidayHearing":"","multidayHearingWeeks":"","multidayHearingHours":"","savedSearchId":""}}}',
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            'x-xsrf-token': '27215c4d-80ec-4d98-b945-f9d45b3a248c',
            'content-type': 'application/json; charset=utf-8',
            origin: 'https://hmcts.mcgirrtech.com',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )
      sleep(69.2)

      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/HearingScheduleData.action',
        '{"params":{"filter":{"hearingDuration":"","matterCode":[],"localities":[],"sessionTypes":[],"bodyPositions":[],"roomAttribute":[],"portableEquipment":[],"selectedJoh":[],"displayTab":"HSRM","currentRowSelected":"","firstAvailable":"N","savedSearchId":"","jurisdictionTypes":[],"noOfAttendees":"","matterId":"460607070","nationalResourcePools":null,"mtrCategories":[],"multidayHearingHours":"","dataPeriod":"","area":["TSR"],"selectedDay":[],"dataType":"R","hearingDurationSt":8,"specialism":[],"fromDate":"14-11-2022","bodyPositionsEx":[],"hearingDurationInc":5,"multidayHearingWeeks":"","availability":"E","multiDay":"","employeeWorkTypesEx":[],"externalVenue":"E","memTypesInTemp":[],"registry":["TV"],"currentTabSelected":"HSRM","venueBookingType":[],"employmentType":[],"toDate":"18-11-2022","employeeWorkTypesIn":[],"showWeekend":false,"memTypesIn":[],"multiDayLov":"1","employmentTypeTemp":["SALARY"],"layout":[],"hearingDurationEt":21,"memTypesEx":[],"partyAvailability":true,"hearingChannel":[],"locations":[],"selectedRoom":[],"multidayHearing":""}}}',
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            'x-xsrf-token': '27215c4d-80ec-4d98-b945-f9d45b3a248c',
            'content-type': 'application/json; charset=utf-8',
            origin: 'https://hmcts.mcgirrtech.com',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )
      sleep(40.5)

      response = http.post(
        'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/HearingScheduleSaveFilter.action',
        '{"params":{"filter":{"hearingDuration":"","matterCode":[],"localities":[],"sessionTypes":[],"bodyPositions":[],"roomAttribute":[],"portableEquipment":[],"selectedJoh":[],"displayTab":"HSRM","currentRowSelected":"302","firstAvailable":"N","savedSearchId":"","jurisdictionTypes":[],"noOfAttendees":"","matterId":"460607070","nationalResourcePools":null,"mtrCategories":[],"multidayHearingHours":"","dataPeriod":"","area":["TSR"],"selectedDay":[],"dataType":"R","hearingDurationSt":8,"specialism":[],"fromDate":"14-11-2022","bodyPositionsEx":[],"hearingDurationInc":5,"multidayHearingWeeks":"","availability":"E","multiDay":"","employeeWorkTypesEx":[],"externalVenue":"E","memTypesInTemp":[],"registry":["TV"],"currentTabSelected":"HSRM","venueBookingType":[],"employmentType":[],"toDate":"18-11-2022","employeeWorkTypesIn":[],"showWeekend":false,"memTypesIn":[],"multiDayLov":["1"],"employmentTypeTemp":["SALARY"],"layout":[],"hearingDurationEt":21,"memTypesEx":[],"partyAvailability":true,"hearingChannel":[],"locations":[],"selectedRoom":[],"multidayHearing":""}}}',
        {
          headers: {
            host: 'hmcts.mcgirrtech.com',
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            'x-xsrf-token': '27215c4d-80ec-4d98-b945-f9d45b3a248c',
            'content-type': 'application/json; charset=utf-8',
            origin: 'https://hmcts.mcgirrtech.com',
            connection: 'keep-alive',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
        }
      )
      sleep(10)
    }
  )

  group(
    'page_6 - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/VenueBooking.do?method=initaliseBooking&venueBookingId=0&bookingDateNew=14-Nov-2022&location=302&sessionTime=LOC&locality=300&XSRF-TOKEN=27215c4d-80ec-4d98-b945-f9d45b3a248c',
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
            'x-xsrf-token': '27215c4d-80ec-4d98-b945-f9d45b3a248c',
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
