
import { sleep, group } from 'k6'
import { ModElement } from 'k6/html'
import http from 'k6/http'
import moment from '../../lib/moment.min.js';


/*
INFO:

The system uses a 'key' param when loading popupas and submitting the form. It seems to be dynamic. 
to get the 'key' part of the form we have a hidden field:
<input type="hidden" name="key" value="460622276" id="actionform_key"/>
we can grab that value when the add matter window loads and use it when submitting the form.


*/

export function matterPageSave(data) {
    console.log('Doing matterPageSave')
    let response
    //console.log('${exec.vu.iterationInInstance}', exec.vu.idInTest)
    let caseName = data. testConfig.users[data.vuId].username + '-' + moment().format('DD:MM:YYYY')
    console.log('caseName', caseName)
    group(
        'Load update jurisdiction page - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/UpdateJurisdiction.action?XSRF-TOKEN=' + data.token,
        function () {
            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/UpdateJurisdiction.action?XSRF-TOKEN=' + data.token,
                'map%5B%27documentTrayId%27%5D=&method=%2C&type=&index=&key=460607078&map%5B%27addRelatedEntity%27%5D=no&map%5B%27forwardToHearingRequirement%27%5D=no&mtrXrefType=JOIN&mtrActionMatterId=&mtrChargeMatterId=&map%5B%27courtCd%27%5D=1&matter.mtrJsCode=CIV&matter.lodgMethodCd=MANUAL&matter.areaCode=TSR&matter.mtrRegCode=&mtrRecDate=&matter.mtrComment=&mtrNumberAdded=&matter.mtrRoleCd=0&allocatedTo=6218&map.fieldId15=0&map.fieldId16=0&map.fieldId17=0&matter.mtrCitedNameFlag=3&matter.mtrAltTitle=&mtrCategory0=&mtrMatterCd0=&mtrMatterType0=&mtrCategory1=&mtrMatterCd1=&mtrCategory2=&mtrMatterCd2=&mtrCategory3=&mtrMatterCd3=&mtrCategory4=&mtrMatterCd4=&mtrCategory5=&mtrMatterCd5=&mtrCategory6=&mtrMatterCd6=&mtrCategory7=&mtrMatterCd7=&mtrCategory8=&mtrMatterCd8=&mtrCategory9=&mtrMatterCd9=&mtrCategory10=&mtrMatterCd10=&mtrCategory11=&mtrMatterCd11=&mtrCategory12=&mtrMatterCd12=&mtrCategory13=&mtrMatterCd13=&mtrCategory14=&mtrMatterCd14=&map%5B%27csaDecisionDate%27%5D=&matter.partiesModified=false&matter.reinstatementMatterId=&value%28validateCaveatRule%29=',
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
                        'x-xsrf-token': '' + data.token,
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                    },
                }
            )
            console.log('response', response.status)
            sleep(1)

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
            console.log('response', response.status)
            sleep(1)

            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/AjaxUpdateMatter.action',
                {
                    key: '460607078',
                    'matter.mtrRegCode': 'TV',
                },
                {
                    headers: {
                        host: 'hmcts.mcgirrtech.com',
                        accept: '*/*',
                        'accept-language': 'en-US,en;q=0.5',
                        'accept-encoding': 'gzip, deflate, br',
                        'x-xsrf-token': '' + data.token,
                        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                    },
                }
            )
            console.log('response', response.status)

            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/AjaxUpdateMatter.action',
                {
                    key: '460607078',
                    'matter.homeLocation': '300',
                },
                {
                    headers: {
                        host: 'hmcts.mcgirrtech.com',
                        accept: '*/*',
                        'accept-language': 'en-US,en;q=0.5',
                        'accept-encoding': 'gzip, deflate, br',
                        'x-xsrf-token': '' + data.token,
                        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                    },
                }
            )
            console.log('response', response.status)
            sleep(1)

            
           
  
        }
    )

    group(
        'Save Matter - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/SaveMatter.action?XSRF-TOKEN='+ data.token,
        function () {
          response = http.post(
            'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/SaveMatter.action?XSRF-TOKEN='+ data.token,
            'map%5B%27documentTrayId%27%5D=&method=%2C&type=&index=&key=460622276&map%5B%27addRelatedEntity%27%5D=no&map%5B%27forwardToHearingRequirement%27%5D=no&mtrXrefType=JOIN&mtrActionMatterId=&mtrChargeMatterId=&map%5B%27courtCd%27%5D=1&matter.mtrJsCode=CIV&matter.singleClassification.mtrCategory=13&matter.singleClassification.mtrMatterCd=19&matter.singleClassification.mtrMatterType=2&matter.listingEventTypeId=&matter.lodgMethodCd=MANUAL&matter.areaCode=TSR&matter.mtrRegCode=TV&matter.homeLocation=300&mtrRecDate=16-11-2022&matter.mtrComment=&mtrNumberAdded=jmaateruser1001-202211161215&matter.mtrRoleCd=0&allocatedTo=6218&matter.fieldConfigModel.data%5B%27CaseNameSuppression%27%5D=&map.fieldId15=0&map.fieldId16=0&map.fieldId17=0&matter.mtrCitedNameFlag=3&matter.mtrAltTitle=jmaateruser1001-202211161215&matter.partiesModified=false&matter.reinstatementMatterId=&value%28validateCaveatRule%29=',
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
          sleep(13.2)
    
          response = http.post(
            'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/menu/LoadMainMenu.action',
            null,
            {
              headers: {
                host: 'hmcts.mcgirrtech.com',
                accept: 'application/json, text/plain, */*',
                'accept-language': 'en-US,en;q=0.5',
                'accept-encoding': 'gzip, deflate, br',
                'x-xsrf-token': data.token,
                origin: 'https://hmcts.mcgirrtech.com',
                connection: 'keep-alive',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
              },
            }
          )
          sleep(0.9)
    
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
