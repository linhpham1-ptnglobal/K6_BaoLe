

/*
Create a case without LR, create a session with JOH allocated, list it

Steps:
// Load cases list (required?)
Load New case page
Save new case (https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/ViewMatter.action?XSRF-TOKEN=27215c4d-80ec-4d98-b945-f9d45b3a248c
    Jurisdiction: Civil
    Service - antisocial behaviour
    Case Type: Commital
    Case sub type N/A
    Cluster Thames Valley
    Owning Hearing Location: Milton Keynes Country court and family court
    case received date
    case number
    )
Load case details page
Load List a case page
Filter by booking date
Load Create session page
Save new session (allocated)
    start time 08:00
    end time 08:05
    Session Type: CCMC
    JOH Tier
    PTO
    JOH: B. Mark

Delete session ??????????? (to clear it up
*/

export function NK_UJ1() {

    let response
    //console.log('${exec.vu.iterationInInstance}', exec.vu.idInTest)
    let token = testConfig.users[exec.vu.idInInstance].token
    group(
        'Load Matter Page - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/ViewMatter.action?XSRF-TOKEN=' + token,
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
                        'x-xsrf-token': '' + token,
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                    },
                }
            )
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
            sleep(1)
        }
    )

    group(
        'Load update jurisdiction page - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/UpdateJurisdiction.action?XSRF-TOKEN=' + token,
        function () {
            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/UpdateJurisdiction.action?XSRF-TOKEN=' + token,
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
                        'x-xsrf-token': '' + token,
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                    },
                }
            )
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
                        'x-xsrf-token': '' + token,
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
                    key: '460607078',
                    'matter.homeLocation': '300',
                },
                {
                    headers: {
                        host: 'hmcts.mcgirrtech.com',
                        accept: '*/*',
                        'accept-language': 'en-US,en;q=0.5',
                        'accept-encoding': 'gzip, deflate, br',
                        'x-xsrf-token': '' + token,
                        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                    },
                }
            )
            sleep(1)
        }
    )

    group(
        'Save Matter - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/SaveMatter.action?XSRF-TOKEN=' + token,
        function () {
            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/SaveMatter.action?XSRF-TOKEN=' + token,
                'map%5B%27documentTrayId%27%5D=&method=%2C&type=&index=&key=460607078&map%5B%27addRelatedEntity%27%5D=no&map%5B%27forwardToHearingRequirement%27%5D=no&mtrXrefType=JOIN&mtrActionMatterId=&mtrChargeMatterId=&map%5B%27courtCd%27%5D=1&matter.mtrJsCode=CIV&matter.singleClassification.mtrCategory=13&matter.singleClassification.mtrMatterCd=19&matter.singleClassification.mtrMatterType=2&matter.listingEventTypeId=&matter.lodgMethodCd=MANUAL&matter.areaCode=TSR&matter.mtrRegCode=TV&matter.homeLocation=300&mtrRecDate=13-11-2022&matter.mtrComment=&mtrNumberAdded=jmaateruser1001-A&matter.mtrRoleCd=0&allocatedTo=6218&matter.fieldConfigModel.data%5B%27CaseNameSuppression%27%5D=&map.fieldId15=0&map.fieldId16=0&map.fieldId17=0&matter.mtrCitedNameFlag=3&matter.mtrAltTitle=jmaateruser1001-A&matter.partiesModified=false&matter.reinstatementMatterId=&value%28validateCaveatRule%29=',
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
            sleep(1)

            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/menu/LoadMainMenu.action',
                null,
                {
                    headers: {
                        host: 'hmcts.mcgirrtech.com',
                        accept: 'application/json, text/plain, */*',
                        'accept-language': 'en-US,en;q=0.5',
                        'accept-encoding': 'gzip, deflate, br',
                        'x-xsrf-token': '' + token,
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
            sleep(1)

            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/LockMattersRequest.action?objectId=460607078&',
                null,
                {
                    headers: {
                        host: 'hmcts.mcgirrtech.com',
                        accept: '*/*',
                        'accept-language': 'en-US,en;q=0.5',
                        'accept-encoding': 'gzip, deflate, br',
                        'x-xsrf-token': '' + token,
                        'x-requested-with': 'XMLHttpRequest',
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                    },
                }
            )
            sleep(1)
        }
    )

    group(
        'Load Hearing Schedule - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/Html5ResourceScheduler/init.action?key=460607078&XSRF-TOKEN=' + token,
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
                        'x-xsrf-token': '' + token,
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
                        'x-xsrf-token': '' + token,
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
                        'x-xsrf-token': '' + token,
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
                        'x-xsrf-token': '' + token,
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
                        'x-xsrf-token': '' + token,
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
                        'x-xsrf-token': '' + token,
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
                        'x-xsrf-token': '' + token,
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
                        'x-xsrf-token': '' + token,
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
                '{"params":{"filter":{"fromDate":"","toDate":"","jurisdictionTypes":[],"localities":[],"locations":[],"sessionTypes":[],"mtrCategories":[],"bodyPositions":[],"employeeWorkTypesIn":[],"employeeWorkTypesEx":[],"memTypesIn":[],"memTypesInTemp":[],"memTypesEx":[],"showWeekend":false,"firstAvailable":"N","availability":"E","dataType":"","displayTab":"HSRM","dataPeriod":"","currentRowSelected":"","hearingDuration":"","hearingDurationSt":8,"hearingDurationEt":21,"hearingDurationInc":30,"hearingChannel":[],"matterId":"460607078","partyAvailability":false,"venueBookingType":[],"noOfAttendees":"","area":[],"registry":[],"bodyPositionsEx":[],"specialism":[],"matterCode":[],"employmentType":[],"employmentTypeTemp":[],"externalVenue":"E","layout":[],"roomAttribute":[],"currentTabSelected":"","selectedRoom":[],"selectedDay":[],"selectedJoh":[],"portableEquipment":[],"nationalResourcePools":"","multiDayLov":"","multiDay":"","multidayHearing":"","multidayHearingWeeks":"","multidayHearingHours":""}}}',
                {
                    headers: {
                        host: 'hmcts.mcgirrtech.com',
                        accept: 'application/json, text/plain, */*',
                        'accept-language': 'en-US,en;q=0.5',
                        'accept-encoding': 'gzip, deflate, br',
                        'x-xsrf-token': '' + token,
                        'content-type': 'application/json; charset=utf-8',
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                    },
                }
            )
            sleep(1)

            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/HearingScheduleData.action',
                '{"params":{"filter":{"fromDate":"13-11-2022","toDate":"19-11-2022","jurisdictionTypes":[],"localities":[],"locations":[],"sessionTypes":[],"mtrCategories":[],"bodyPositions":[],"employeeWorkTypesIn":[],"employeeWorkTypesEx":[],"memTypesIn":[],"memTypesInTemp":[],"memTypesEx":[],"showWeekend":false,"firstAvailable":"N","availability":"E","dataType":"R","displayTab":"HSRM","dataPeriod":"","currentRowSelected":"","hearingDuration":"","hearingDurationSt":8,"hearingDurationEt":21,"hearingDurationInc":5,"hearingChannel":[],"matterId":"460607078","partyAvailability":true,"venueBookingType":[],"noOfAttendees":"","area":[],"registry":[],"bodyPositionsEx":[],"specialism":[],"matterCode":[],"employmentType":[],"employmentTypeTemp":["SALARY"],"externalVenue":"E","layout":[],"roomAttribute":[],"currentTabSelected":"HSRM","selectedRoom":[],"selectedDay":[],"selectedJoh":[],"portableEquipment":[],"nationalResourcePools":null,"multiDayLov":"1","multiDay":"","multidayHearing":"","multidayHearingWeeks":"","multidayHearingHours":"","savedSearchId":""}}}',
                {
                    headers: {
                        host: 'hmcts.mcgirrtech.com',
                        accept: 'application/json, text/plain, */*',
                        'accept-language': 'en-US,en;q=0.5',
                        'accept-encoding': 'gzip, deflate, br',
                        'x-xsrf-token': '' + token,
                        'content-type': 'application/json; charset=utf-8',
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                    },
                }
            )
            sleep(1)

            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/HearingScheduleData.action',
                '{"params":{"filter":{"hearingDuration":"","matterCode":[],"localities":["300"],"sessionTypes":[],"bodyPositions":[],"roomAttribute":[],"portableEquipment":[],"selectedJoh":[],"displayTab":"HSRM","currentRowSelected":"","firstAvailable":"N","savedSearchId":"","jurisdictionTypes":[],"noOfAttendees":"","matterId":"460607078","nationalResourcePools":null,"mtrCategories":[],"multidayHearingHours":"","dataPeriod":"","area":["TSR"],"selectedDay":[],"dataType":"R","hearingDurationSt":8,"specialism":[],"fromDate":"14-11-2022","bodyPositionsEx":[],"hearingDurationInc":5,"multidayHearingWeeks":"","availability":"E","multiDay":"","employeeWorkTypesEx":[],"externalVenue":"E","memTypesInTemp":[],"registry":["TV"],"currentTabSelected":"HSRM","venueBookingType":[],"employmentType":[],"toDate":"18-11-2022","employeeWorkTypesIn":[],"showWeekend":false,"memTypesIn":[],"multiDayLov":"1","employmentTypeTemp":["SALARY"],"layout":[],"hearingDurationEt":21,"memTypesEx":[],"partyAvailability":true,"hearingChannel":[],"locations":[],"selectedRoom":[],"multidayHearing":""}}}',
                {
                    headers: {
                        host: 'hmcts.mcgirrtech.com',
                        accept: 'application/json, text/plain, */*',
                        'accept-language': 'en-US,en;q=0.5',
                        'accept-encoding': 'gzip, deflate, br',
                        'x-xsrf-token': '' + token,
                        'content-type': 'application/json; charset=utf-8',
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                    },
                }
            )
            sleep(1)

            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/HearingScheduleSaveFilter.action',
                '{"params":{"filter":{"hearingDuration":"","matterCode":[],"localities":["300"],"sessionTypes":[],"bodyPositions":[],"roomAttribute":[],"portableEquipment":[],"selectedJoh":[],"displayTab":"HSRM","currentRowSelected":"302","firstAvailable":"N","savedSearchId":"","jurisdictionTypes":[],"noOfAttendees":"","matterId":"460607078","nationalResourcePools":null,"mtrCategories":[],"multidayHearingHours":"","dataPeriod":"","area":["TSR"],"selectedDay":[],"dataType":"R","hearingDurationSt":8,"specialism":[],"fromDate":"14-11-2022","bodyPositionsEx":[],"hearingDurationInc":5,"multidayHearingWeeks":"","availability":"E","multiDay":"","employeeWorkTypesEx":[],"externalVenue":"E","memTypesInTemp":[],"registry":["TV"],"currentTabSelected":"HSRM","venueBookingType":[],"employmentType":[],"toDate":"18-11-2022","employeeWorkTypesIn":[],"showWeekend":false,"memTypesIn":[],"multiDayLov":["1"],"employmentTypeTemp":["SALARY"],"layout":[],"hearingDurationEt":21,"memTypesEx":[],"partyAvailability":true,"hearingChannel":[],"locations":[],"selectedRoom":[],"multidayHearing":""}}}',
                {
                    headers: {
                        host: 'hmcts.mcgirrtech.com',
                        accept: 'application/json, text/plain, */*',
                        'accept-language': 'en-US,en;q=0.5',
                        'accept-encoding': 'gzip, deflate, br',
                        'x-xsrf-token': '' + token,
                        'content-type': 'application/json; charset=utf-8',
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                    },
                }
            )
            sleep(1)
        }
    )

    group(
        'page_6 - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/VenueBooking.do?method=initaliseBooking&venueBookingId=0&bookingDateNew=14-Nov-2022&location=302&sessionTime=LOC&locality=300&XSRF-TOKEN=' + token,
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
                        'x-xsrf-token': '' + token,
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
            sleep(69.5)

            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/VenueBooking.do',
                'method=ajaxUpdateForm&venueBooking.empTypesArray=DDJ%2CDDR%2CDRA%2CFTO%2CMEM%2CPTO%2CSM%2CT1%2CT2%2CT3',
                {
                    headers: {
                        host: 'hmcts.mcgirrtech.com',
                        accept: '*/*',
                        'accept-language': 'en-US,en;q=0.5',
                        'accept-encoding': 'gzip, deflate, br',
                        'x-xsrf-token': '' + token,
                        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                    },
                }
            )
            sleep(3.7)

            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/VenueBooking.do',
                {
                    method: 'ajaxUpdateForm',
                    'venueBooking.empTypesArray': '',
                },
                {
                    headers: {
                        host: 'hmcts.mcgirrtech.com',
                        accept: '*/*',
                        'accept-language': 'en-US,en;q=0.5',
                        'accept-encoding': 'gzip, deflate, br',
                        'x-xsrf-token': '' + token,
                        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                    },
                }
            )
            sleep(0.8)

            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/VenueBooking.do',
                {
                    method: 'ajaxUpdateForm',
                    'venueBooking.empTypesArray': 'DDJ',
                },
                {
                    headers: {
                        host: 'hmcts.mcgirrtech.com',
                        accept: '*/*',
                        'accept-language': 'en-US,en;q=0.5',
                        'accept-encoding': 'gzip, deflate, br',
                        'x-xsrf-token': '' + token,
                        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                    },
                }
            )
            sleep(37.6)
        }
    )

    group(
        'page_7 - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/VenueBooking.do?XSRF-TOKEN=e707b542-0fa2-42ee-a4eb-dd2cd04b1416&diaryId=1&startTime=14-11-2022&startHour=08:00&location=300&room=302&relatedMatterIds=&endDateTime=&venueBooking.recWeeks=&defDurChanged=false&fromMemberView=null',
        function () {
            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/VenueBooking.do?XSRF-TOKEN=e707b542-0fa2-42ee-a4eb-dd2cd04b1416&diaryId=1&startTime=14-11-2022&startHour=08:00&location=300&room=302&relatedMatterIds=&endDateTime=&venueBooking.recWeeks=&defDurChanged=false&fromMemberView=null',
                'venueBooking.venueBookingId=&venueBooking.venueBookingParentId=&newListing=false&value%28numActiveBookings%29=0&value%28clashConfirmAnswer%29=&value%28newVBListingStopMessage%29=&venueBooking.editableStartTime=14-11-2022&value%28pattern%29=&venueBooking.editableEndTime=&venueBooking.recWeeks=&venueBooking.startHour=08%3A00&venueBooking.convertedEndTime=08%3A05&location=300&venueBooking.location.evtLocationCode=302&venueBooking.jsCode=&venueBooking.venueBookingTypeCode=3&venueBooking.sessionType=&venueBooking.overbooking=N&venueBooking.bulkBooking=false&venueBooking.defListingDuration=30&venueBooking.autoList=false&venueBooking.youthFlag=false&venueBooking.mobileResourceCode=&venueBooking.feeIncurredCode=&venueBooking.venueBookingDesc=&venueBooking.externalComments=&venueBooking.empTypesArray=DDJ&__multiselect_venueBooking.empTypesArray=true&value%28rubbish%29=&venueBooking.members%5B0%5D.presidingMember=true%2Cfalse&venueBooking.members%5B0%5D.otherMember=false&venueBooking.members%5B0%5D.ptpDbPosId=818&venueBooking.members%5B0%5D.deleteFlag=false&value%28cancellationCode%29=&venueBooking.templateId=&changeHistoryTableId_length=10&listIndex=0&method=saveBooking',
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
                        'x-xsrf-token': '' + token,
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
            sleep(21.7)

            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/VenueBooking.do?method=deleteBreak&index=0',
                null,
                {
                    headers: {
                        host: 'hmcts.mcgirrtech.com',
                        accept: '*/*',
                        'accept-language': 'en-US,en;q=0.5',
                        'accept-encoding': 'gzip, deflate, br',
                        'x-xsrf-token': '' + token,
                        'x-requested-with': 'XMLHttpRequest',
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                    },
                }
            )
            sleep(3.1)

            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/VenueBooking.do?XSRF-TOKEN=e707b542-0fa2-42ee-a4eb-dd2cd04b1416&diaryId=1&startTime=14-11-2022&startHour=08:00&location=300&room=302&relatedMatterIds=&endDateTime=&venueBooking.recWeeks=&defDurChanged=false&fromMemberView=null',
                'org.apache.struts.taglib.html.TOKEN=809e79136699e2e0baba48280e2e3d18&venueBooking.venueBookingId=&venueBooking.venueBookingParentId=&newListing=false&value%28numActiveBookings%29=0&value%28clashConfirmAnswer%29=&value%28newVBListingStopMessage%29=&venueBooking.editableStartTime=14-11-2022&value%28pattern%29=&venueBooking.editableEndTime=&venueBooking.recWeeks=&venueBooking.startHour=08%3A00&venueBooking.convertedEndTime=08%3A05&location=300&venueBooking.location.evtLocationCode=302&venueBooking.jsCode=&venueBooking.venueBookingTypeCode=3&venueBooking.sessionType=&venueBooking.overbooking=N&venueBooking.bulkBooking=false&venueBooking.defListingDuration=30&venueBooking.autoList=false&venueBooking.youthFlag=false&venueBooking.mobileResourceCode=&venueBooking.feeIncurredCode=&venueBooking.venueBookingDesc=&venueBooking.externalComments=&venueBooking.empTypesArray=DDJ&__multiselect_venueBooking.empTypesArray=true&value%28rubbish%29=&venueBooking.members%5B0%5D.presidingMember=true%2Cfalse&venueBooking.members%5B0%5D.otherMember=false&venueBooking.members%5B0%5D.ptpDbPosId=818&venueBooking.members%5B0%5D.deleteFlag=false&value%28cancellationCode%29=&venueBooking.templateId=&changeHistoryTableId_length=10&listIndex=1&method=saveBooking',
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
            sleep(1.2)

            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/menu/LoadMainMenu.action',
                null,
                {
                    headers: {
                        host: 'hmcts.mcgirrtech.com',
                        accept: 'application/json, text/plain, */*',
                        'accept-language': 'en-US,en;q=0.5',
                        'accept-encoding': 'gzip, deflate, br',
                        'x-xsrf-token': '' + token,
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
                        'x-xsrf-token': '' + token,
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
                        'x-xsrf-token': '' + token,
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
                        'x-xsrf-token': '' + token,
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
                        'x-xsrf-token': '' + token,
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
                        'x-xsrf-token': '' + token,
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
                        'x-xsrf-token': '' + token,
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
                        'x-xsrf-token': '' + token,
                        'content-type': 'application/json; charset=utf-8',
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                    },
                }
            )
            sleep(1.4)

            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/HearingScheduleData.action',
                '{"params":{"filter":{"fromDate":"14-11-2022","toDate":"18-11-2022","jurisdictionTypes":[],"localities":["300"],"locations":[],"sessionTypes":[],"mtrCategories":[],"bodyPositions":[],"employeeWorkTypesIn":[],"employeeWorkTypesEx":[],"memTypesIn":[],"memTypesInTemp":[],"memTypesEx":[],"showWeekend":false,"firstAvailable":"N","availability":"E","dataType":"R","displayTab":"HSRM","dataPeriod":"","currentRowSelected":"302","hearingDuration":"","hearingDurationSt":8,"hearingDurationEt":21,"hearingDurationInc":5,"hearingChannel":[],"partyAvailability":false,"venueBookingType":[],"noOfAttendees":"","area":["TSR"],"registry":["TV"],"bodyPositionsEx":[],"specialism":[],"matterCode":[],"employmentType":[],"employmentTypeTemp":["SALARY"],"externalVenue":"E","layout":[],"roomAttribute":[],"currentTabSelected":"HSRM","selectedRoom":[],"selectedDay":[],"selectedJoh":[],"portableEquipment":[],"nationalResourcePools":null,"multiDayLov":"1","multiDay":"","multidayHearing":"","multidayHearingWeeks":"","multidayHearingHours":"","savedSearchId":"","matterId":""}}}',
                {
                    headers: {
                        host: 'hmcts.mcgirrtech.com',
                        accept: 'application/json, text/plain, */*',
                        'accept-language': 'en-US,en;q=0.5',
                        'accept-encoding': 'gzip, deflate, br',
                        'x-xsrf-token': '' + token,
                        'content-type': 'application/json; charset=utf-8',
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                    },
                }
            )
            sleep(12.7)

            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/HearingScheduleVenueBookingData.action',
                '{"params":{"venueBookingId":"460607085"}}',
                {
                    headers: {
                        host: 'hmcts.mcgirrtech.com',
                        accept: 'application/json, text/plain, */*',
                        'accept-language': 'en-US,en;q=0.5',
                        'accept-encoding': 'gzip, deflate, br',
                        'x-xsrf-token': '' + token,
                        'content-type': 'application/json; charset=utf-8',
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                    },
                }
            )
            sleep(0.6)

            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/HearingScheduleSaveFilter.action',
                '{"params":{"filter":{"hearingDuration":"","matterCode":[],"localities":["300"],"sessionTypes":[],"bodyPositions":[],"roomAttribute":[],"portableEquipment":[],"selectedJoh":[],"displayTab":"HSRM","currentRowSelected":"302","firstAvailable":"N","savedSearchId":"","jurisdictionTypes":[],"noOfAttendees":"","nationalResourcePools":null,"matterId":"","mtrCategories":[],"multidayHearingHours":"","dataPeriod":"","area":["TSR"],"selectedDay":[],"dataType":"R","hearingDurationSt":8,"specialism":[],"fromDate":"14-11-2022","bodyPositionsEx":[],"hearingDurationInc":5,"multidayHearingWeeks":"","availability":"E","multiDay":"","employeeWorkTypesEx":[],"externalVenue":"E","memTypesInTemp":[],"registry":["TV"],"currentTabSelected":"HSRM","venueBookingType":[],"employmentType":[],"toDate":"18-11-2022","employeeWorkTypesIn":[],"showWeekend":false,"memTypesIn":[],"multiDayLov":["1"],"employmentTypeTemp":["SALARY"],"layout":[],"hearingDurationEt":21,"memTypesEx":[],"partyAvailability":false,"hearingChannel":[],"locations":[],"selectedRoom":[],"multidayHearing":""}}}',
                {
                    headers: {
                        host: 'hmcts.mcgirrtech.com',
                        accept: 'application/json, text/plain, */*',
                        'accept-language': 'en-US,en;q=0.5',
                        'accept-encoding': 'gzip, deflate, br',
                        'x-xsrf-token': '' + token,
                        'content-type': 'application/json; charset=utf-8',
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                    },
                }
            )
            sleep(32.5)
        }
    )

    group(
        'page_8 - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/VenueBooking.do?method=initaliseBooking&venueBookingId=460607085&location=302&sessionTime=LOC&droppedMtrId=460607078&newListing=true&locality=300&XSRF-TOKEN=' + token,
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
                        'x-xsrf-token': '' + token,
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
            sleep(34.4)
        }
    )

    group(
        'page_9 - https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/VenueBooking.do?XSRF-TOKEN=e707b542-0fa2-42ee-a4eb-dd2cd04b1416&fromMemberView=null',
        function () {
            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/VenueBooking.do?XSRF-TOKEN=e707b542-0fa2-42ee-a4eb-dd2cd04b1416&fromMemberView=null',
                'org.apache.struts.taglib.html.TOKEN=809e79136699e2e0baba48280e2e3d18&venueBooking.venueBookingId=460607085&venueBooking.venueBookingParentId=&newListing=true&value%28numActiveBookings%29=0&value%28clashConfirmAnswer%29=&value%28newVBListingStopMessage%29=&venueBookingResSessions%5B0%5D.reserved=false&venueBookingResSessions%5B0%5D.reserveReason=&venueBooking.editableStartTime=14-11-2022&value%28pattern%29=&venueBooking.editableEndTime=&venueBooking.recWeeks=&venueBooking.startHour=08%3A00&venueBooking.convertedEndTime=08%3A05&location=300&venueBooking.location.evtLocationCode=302&venueBooking.jsCode=&venueBooking.venueBookingTypeCode=3&venueBooking.sessionType=&venueBooking.overbooking=N&venueBooking.matterLimit=&venueBooking.overbookingPercentage=&venueBooking.bulkBooking=false&venueBooking.defListingDuration=30&venueBooking.autoList=false&venueBooking.youthFlag=false&venueBooking.mobileResourceCode=&venueBooking.feeIncurredCode=&venueBooking.venueBookingDesc=&venueBooking.externalComments=&venueBooking.empTypesArray=DDJ&__multiselect_venueBooking.empTypesArray=true&value%28rubbish%29=&venueBooking.members%5B0%5D.presidingMember=true%2Cfalse&venueBooking.members%5B0%5D.otherMember=false&venueBooking.members%5B0%5D.ptpDbPosId=818&venueBooking.members%5B0%5D.deleteFlag=false&value%28cancellationCode%29=&venueBooking.templateId=&changeHistoryTableId_length=10&listIndex=1&method=cancelBooking',
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
                        'x-xsrf-token': '' + token,
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
                        'x-xsrf-token': '' + token,
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
                        'x-xsrf-token': '' + token,
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
                        'x-xsrf-token': '' + token,
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
                        'x-xsrf-token': '' + token,
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
                        'x-xsrf-token': '' + token,
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
                        'x-xsrf-token': '' + token,
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
                        'x-xsrf-token': '' + token,
                        'content-type': 'application/json; charset=utf-8',
                        origin: 'https://hmcts.mcgirrtech.com',
                        connection: 'keep-alive',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                    },
                }
            )
            sleep(1.2)

            response = http.post(
                'https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/HearingScheduleData.action',
                '{"params":{"filter":{"fromDate":"14-11-2022","toDate":"18-11-2022","jurisdictionTypes":[],"localities":["300"],"locations":[],"sessionTypes":[],"mtrCategories":[],"bodyPositions":[],"employeeWorkTypesIn":[],"employeeWorkTypesEx":[],"memTypesIn":[],"memTypesInTemp":[],"memTypesEx":[],"showWeekend":false,"firstAvailable":"N","availability":"E","dataType":"R","displayTab":"HSRM","dataPeriod":"","currentRowSelected":"302","hearingDuration":"","hearingDurationSt":8,"hearingDurationEt":21,"hearingDurationInc":5,"hearingChannel":[],"partyAvailability":false,"venueBookingType":[],"noOfAttendees":"","area":["TSR"],"registry":["TV"],"bodyPositionsEx":[],"specialism":[],"matterCode":[],"employmentType":[],"employmentTypeTemp":["SALARY"],"externalVenue":"E","layout":[],"roomAttribute":[],"currentTabSelected":"HSRM","selectedRoom":[],"selectedDay":[],"selectedJoh":[],"portableEquipment":[],"nationalResourcePools":null,"multiDayLov":"1","multiDay":"","multidayHearing":"","multidayHearingWeeks":"","multidayHearingHours":"","savedSearchId":"","matterId":""}}}',
                {
                    headers: {
                        host: 'hmcts.mcgirrtech.com',
                        accept: 'application/json, text/plain, */*',
                        'accept-language': 'en-US,en;q=0.5',
                        'accept-encoding': 'gzip, deflate, br',
                        'x-xsrf-token': '' + token,
                        'content-type': 'application/json; charset=utf-8',
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
