
/*
*************** UJ1 **************************

Steps:
    1. Load new case page and get caseId.
    2. Save new case and go to Listing Requirement page.
        Url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/ViewMatter.action?XSRF-TOKEN=token

        Payload:
        {
            "key": caseId,                                     // Returned from getAvailableCaseId
            "map["forwardToHearingRequirement"]": "Y",         // Click "Save and Add Listing Requirements" button
            "matter.mtrJsCode": "CIV",                         // Jurisdiction = Civil
            "matter.singleClassification.mtrCategory": "13",   // Service = Antisocial behaviour
            "matter.singleClassification.mtrMatterCd": "19",   // Case Type = Commital
            "matter.singleClassification.mtrMatterType": "2",  // Case Sub-Type = N/A
            "matter.areaCode": "TSR",                          // Region: Thames Valley
            "matter.mtrRegCode": "TV",                         // Cluster: Thames Valley
            "matter.homeLocation": "300",                      // Owning Hearing Location: Milton Keynes Country court and family court
            "mtrRecDate": "14-12-2022",                        // Case Received = today in format DD-MM-YYYY
            "mtrNumberAdded": "UJ1_",                          // HMCTS Case Number = UJ1_ + username + timestamps
            "matter.mtrAltTitle": "UJ1_"                       // Case Name = UJ1_ + username + timestamps
        }

    3. Save Listing Requirement and go to Case History page.
        Url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/EventEdit.do?method=menuCall&eventCd=HEARGREQ&matterId=&XSRF-TOKEN=token
        
        Payload:
        {
            "method": "save",
            "event.eventAttribute.listingEventTypeId": "36",              // Hearing Type = Committal
            "event.eventAttribute.listingStatus": "DRAFT",                // Listing status = Draft - Parties yet to be Notified
            "event.eventAttribute.hearingDuration": "5",                  // Hearing duration: 0.05
            "event.eventAttribute.autoListingFlag": true,                 // Offences = Checked
            "event.eventAttribute.listAfterDateStr": "09-12-2022 00:00",  // Must list after = -8 days from bookingDate
            "event.eventAttribute.listBeforeDateStr": "11-12-2022 00:00", // Must list before = -6 days from bookingDate

            "event.eventAttribute.sessionsArray": "CCCMC",                // Session Type = Civil CCMC
            "event.eventAttribute.portableEquipmentArray": "2",           // Portable Equipment = Projector 2
            "event.eventAttribute.otherConsiderationsArray": "",          // Other Considerations = 
            "event.eventAttribute.attributeArray": "1",                   // Room Attributes = Video Conference Facilities
            "event.eventAttribute.empTypesArray": "DDJ",                  // JOH Tier = Deputy District Judge
            "event.eventAttribute.hearingMethodsArray": "INTER",          // Hearing Channel = In Person
            "event.eventAttribute.johTicketsArray": "AC",                 // JOH Ticket(s) = Administrative Court
            "event.eventAttribute.specialismsArray": ""                   // JOH Specialisms = 
        }

    4. Load Venue Booking page.
        Params:
        {
            "method": "initaliseBooking",
            "venueBookingId": 0,
            "sessionTime": "LOC",
            "bookingDateNew": "22-Dec-2022",  // Booking date in format DD-MMM-YYYY
            "locality": "300",                // Locality value from the location in the location list
            "location": "301"                 // Location value from the location in the location list
        }

        Url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/VenueBooking.do?method=initaliseBooking&venueBookingId=0&sessionTime=LOC&
            bookingDateNew=22-Dec-2022&locality=300&location=301&XSRF-TOKEN=token


    5. Save new Venue Booking.
        Url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/VenueBooking.do?method=initaliseBooking&venueBookingId=0&sessionTime=LOC&
            bookingDateNew=22-Dec-2022&locality=300&location=301&XSRF-TOKEN=token

        Payload:
        {
            "venueBooking.editableStartTime": "22-12-2022",   // Date = bookingDate
            "value(pattern)": "test1",                        // Pattern = test1
            "venueBooking.editableEndTime": "24-12-2022",     // To Date = +7 days from bookingDate
            "venueBooking.recurringDay2": "2",                // Recurrence = Monday
            "venueBooking.recurringDay3": "3",                // Recurrence = Tuesday
            "venueBooking.recWeeks": "1",                     // Recurrence = Every 1 week
            "venueBooking.startHour": "08:00",                // Start Hour = startTime
            "venueBooking.convertedEndTime": "08:05",         // End Time = +5 minutes from startTime
            "location": "300",                                // Locality = Locality value from the location in the location list
            "venueBooking.evtLocationCode": "301",            // Location = Location value from the location in the location list
            "venueBooking.jsCode": "CIV",                     // Jurisdiction = Civil
            "venueBooking.empTypesArray": "DDJ",              // JOH Tier = Deputy District Judge
            "venueBooking.venueBookingTypeCode": "3",         // Session Status = Draft
            "venueBooking.defListingDuration": "5",            // Default Listing Duration (hours) = 0:05
            "startTime": "22-12-2022",                        // Start Time = bookingDate
            "startHour": "08:00",                             // Start Hour = startTime
            "ptpDbPosId": "2208"                              // Random JOH form the JOH list
        }

*************** UJ2 **************************

Steps:
    1. Load new case page and get caseId.
    2. Save new case.
        Url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/ViewMatter.action?XSRF-TOKEN=token

        Payload:
        {
            "key": caseId,                                     // Returned from getAvailableCaseId
            "map["forwardToHearingRequirement"]": "N",         // Click "Save" button
            "matter.mtrJsCode": "CIV",                         // Jurisdiction = Civil
            "matter.singleClassification.mtrCategory": "13",   // Service = Antisocial behaviour
            "matter.singleClassification.mtrMatterCd": "19",   // Case Type = Commital
            "matter.singleClassification.mtrMatterType": "2",  // Case Sub-Type = N/A
            "matter.areaCode": "TSR",                          // Region: Thames Valley
            "matter.mtrRegCode": "TV",                         // Cluster: Thames Valley
            "matter.homeLocation": "300",                      // Owning Hearing Location: Milton Keynes Country court and family court
            "mtrRecDate": "14-12-2022",                        // Case Received = today in format DD-MM-YYYY
            "mtrNumberAdded": "UJ2_",                          // HMCTS Case Number = UJ2_ + username + timestamps
            "matter.mtrAltTitle": "UJ2_"                       // Case Name = UJ2_ + username + timestamps
        }

    3. List the case by going to Hearing Schedule.
        Params:
        {
            "key": caseId   // Returned from getAvailableCaseId
        }

        Url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/Html5ResourceScheduler/init.action?key=caseId&XSRF-TOKEN=token`

    4. Check and delete existing Listings and existing Venue Booking:
        - Check if two time range are overlap then delete existing Listings and existing Venue Booking and go to the next step.
        - If two time range are different then go to the next step.

        Note: On the UI, we can choose available time slot, no need to do this step

    5. Load Venue Booking page.
        Params:
        {
            "method": "initaliseBooking",
            "venueBookingId": 0,
            "droppedMtrId": caseId,            // Returned from getAvailableCaseId,
            "newListing": true,                // Allow create venue booking listing
            "sessionTime": "LOC",
            "bookingDateNew": "22-Dec-2022",   // Booking date in format DD-MMM-YYYY
            "locality": "300",                 // Locality value from the location in the location list
            "location": "301"                  // Location value from the location in the location list
        }

        Url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/VenueBooking.do?method=initaliseBooking&venueBookingId=0&droppedMtrId=caseId&
            newListing=true&sessionTime=LOC&bookingDateNew=22-Dec-2022&locality=300&location=301&XSRF-TOKEN=token


    6. Save new Venue Booking.
        Url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/VenueBooking.do?diaryId=1&startTime=09:00&startHour=09:30&location=300&room=301&
            relatedMatterIds=&endDateTime=&venueBooking.recWeeks=&defDurChanged=false&fromMemberView=null&XSRF-TOKEN=token

        Payload:
        {
            "venueBooking.venueBookingId": "",
            "venueBooking.venueBookingParentId": "",
            "newListing": true,                                   // Allow create listing
            "value(numActiveBookings)": 0,
            "value(clashConfirmAnswer)": "",
            "value(newVBListingStopMessage)": "",
            "venueBooking.editableStartTime": "22-12-2022",       // Editable Start Time = bookingDate
            "value(pattern)": "",
            "venueBooking.editableEndTime": "",
            "venueBooking.recWeeks": "",
            "venueBooking.startHour": "09:00",                    // Start Time = startTime
            "venueBooking.convertedEndTime": "09:30",             // End Time = +30 minutes from startTime (will have 3 listings, each listing will be 10 mins)
            "location": "300",                                    // Locality = Locality value from the location in the location list
            "venueBooking.evtLocationCode": "301",                // Location = Location value from the location in the location list
            "venueBooking.jsCode": "CIV",                         // Jurisdiction = Civil
            "venueBooking.venueBookingTypeCode": 3,               // Session Status = Draft
            "venueBooking.sessionType": "",
            "venueBooking.overbooking": "N",                      // Overbooking Allowed = N
            "venueBooking.bulkBooking": false,                    // Group Booking = false
            "venueBooking.defListingDuration": 10,                // Each listing will be 10 mins, we will have 3 listing foreach venuebooking
            "venueBooking.autoList": false,                       // Auto List = false
            "venueBooking.youthFlag": false,                      // Youth Session = false
            "venueBooking.mobileResourceCode": "",
            "venueBooking.feeIncurredCode": "",
            "venueBooking.venueBookingDesc": "",
            "venueBooking.externalComments": "",
            "venueBooking.empTypesArray": "DDJ",                  // JOH Tier = Deputy District Judge
            "__multiselect_venueBooking.empTypesArray": true,
            "value(rubbish)": "",
            "value(cancellationCode)": "",
            "venueBooking.templateId": "",
            "changeHistoryTableId_length": 10,
            "listIndex": 0,
            "method": "saveBooking",
            "XSRF-TOKEN": token
        }

    * List a case to Venue booking (Create listing):
        - Load VenueBooking Edit - List Case:
            Params:
            {
                "method": "initaliseBooking",
                "venueBookingId": venueBookingId,   // Returned from saveVenueBooking_ListCase
                "droppedMtrId": caseId,             // Returned from getAvailableCaseId,
                "newListing": true,                 // Allow create venue booking listing
                "sessionTime": "LOC",
                "locality": "300",                  // Locality value from the location in the location list
                "location": "301"                   // Location value from the location in the location list
            }

            Url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/VenueBooking.do?method=initaliseBooking&venueBookingId=venueBookingId
                &droppedMtrId=caseId&newListing=true&sessionTime=LOC&locality=300&location=301&XSRF-TOKEN=token

        - Load Listing Popup - List Case:
            Url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/VenueBooking.do?method=loadListingPopup&XSRF-TOKEN=token

        - Save Listing Popup - List Case:
            Params:
            {
                "method": "saveListingPopup",
                "venueBookingId": venueBookingId,   // Returned from saveVenueBooking_ListCase
                "droppedMtrId": caseId,             // Returned from getAvailableCaseId,
                "newListing": true,                 // Allow create venue booking listing
                "sessionTime": "LOC",
                "locality": "300",                  // Locality value from the location in the location list
                "location": "301"                   // Location value from the location in the location list
            }

            Url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/VenueBooking.do?method=saveListingPopup&venueBookingId=venueBookingId
                &droppedMtrId=caseId&newListing=true&sessionTime=LOC&locality=300&location=301&XSRF-TOKEN=token

            Payload:
            {
                "value(startHour)": "",
                "value(checkListFail)": "",
                "value(rescheduledBookingId)": "",
                "value(reserveSlotOverlapAnswer)": "",
                "venueBooking.recurringOnListingPopup": true,
                "value(listingIndex)": listingIndex,                // We have 3 listings, index will be = 0, 1 or 2
                "venueBooking.convertedEndTime": endTime,           // End Time = +30 minutes from startTime
                "value(bookVideoHearing)": "",
                "listing.locationComment": "",
                "value(newListinghearingNotes)": "",
                "listing.evtEventTypeId": "24",                     // Hearing Type = Committal
                "listing.comments": "test comment",                 // Internal Comments = test comment
                "listing.startHour": "09:00",                       // Listing Start Hour = Previous Listing End Hour
                "listing.endHour": "09:10",                         // Listing End Hour = +10 minutes from Listing Start Hour
                "listing.evtListingStatus": "DRAFT",                // Listing status = Draft - Parties yet to be Notified
                "listing.riskFlag": false,                          // Risk/Crack = false
                "applyToAllDays": false,
                "listing.purposeOfListing": "",
                "value(memberType)": "",
                "listing.memberId": "",
                "listing.presidingMember": false,                   // Presiding Judicial Office Holder = false
                "listing.externalComments": "",
                "__multiselect_listing.hearingMethodArray": true,
                "method": "saveListingPopup",
                "XSRF-TOKEN": token
            }

        - Save VenueBooking Edit - List Case:
            Params: 
            {
                "diaryId": 1,
                "startTime": "22-12-2022",      // Booking date in format DD-MM-YYYY
                "startHour": "09:00",           // Start Time = startTime
                "location": "300",              // Locality value from the location in the location list
                "room": "301",                  // Location value from the location in the location list
                "relatedMatterIds": "",
                "endDateTime": "",
                "venueBooking.recWeeks": "",
                "defDurChanged": false,
                "fromMemberView": null
            }

            Url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/VenueBooking.do?diaryId=1&startTime=22-12-2022&startHour=09:00&location=300
                &room=301&relatedMatterIds=&endDateTime=&venueBooking.recWeeks=&defDurChanged=false&fromMemberView=null&XSRF-TOKEN=token

            Payload:
            {
                "venueBooking.venueBookingId": ,
                "venueBooking.venueBookingParentId": "",
                "newListing": false,                                // Allow create listing
                "value(numActiveBookings)": 0,
                "value(clashConfirmAnswer)": "",
                "value(newVBListingStopMessage)": "",
                "venueBooking.editableStartTime": "22-12-2022",     // Editable Start Time = bookingDate
                "value(pattern)": "",
                "venueBooking.editableEndTime": "",
                "venueBooking.recWeeks": "",
                "venueBooking.startHour": "09:00",                  // Start Time = startTime
                "venueBooking.convertedEndTime": "09:30",           // End Time = +30 minutes from startTime (will have 3 listings, each listing will be 10 mins)
                "location": "300",                                  // Locality = Locality value from the location in the location list
                "venueBooking.location.evtLocationCode": "301",     // Location = Location value from the location in the location list
                "venueBooking.jsCode": "CIV",                       // Jurisdiction = Civil
                "venueBooking.venueBookingTypeCode": 3,             // Session Status = Draft
                "venueBooking.sessionType": "",
                "venueBooking.overbooking": "N",                    // Overbooking Allowed = N
                "venueBooking.matterLimit": "",
                "venueBooking.overbookingPercentage": "",
                "venueBooking.bulkBooking": false,                  // Group Booking = false
                "venueBooking.autoList": false,                     // Auto List = false
                "venueBooking.youthFlag": false,                    // Youth Session = false
                "venueBooking.mobileResourceCode": "",
                "venueBooking.feeIncurredCode": "",
                "venueBooking.venueBookingDesc": "",
                "venueBooking.externalComments": "",
                "venueBooking.empTypesArray": "DDJ",                // JOH Tier = Deputy District Judge
                "__multiselect_venueBooking.empTypesArray": true,
                "value(rubbish)": "",
                "value(cancellationCode)": "",
                "venueBooking.templateId": "",
                "changeHistoryTableId_length": 10,
                "listIndex": 0,
                "method": "saveBooking",
                "XSRF-TOKEN": token
            }


    7. Edit Venue Booking and save. (NOT INCLUDED YET)
    Params:
    {
        "method": "initaliseBooking",
        "venueBookingId": venueBookingId,   // Returned from saveVenueBooking_ListCase
    }

    Url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/VenueBooking.do?method=initaliseBooking&venueBookingId=venueBookingId&XSRF-TOKEN=token

    Payload:
    {
        "venueBooking.venueBookingId": venueBookingId,     // Returned from saveVenueBooking_ListCase
        "venueBooking.venueBookingDesc": "test commmet",   // Internal Comments = test commmet
        "venueBooking.empTypesArray": "DDJ",               // JOH Tier = Deputy District Judge
        "method": "saveBooking",
        "startTime": "22-12-2022",                         // Start Time = bookingDate
        "startHour": "09:00"                               // Start Hour = startTime
    }

*************** UJ3 **************************

Steps:
    1. Navigate to each of other 4 hearing schedule tabs with default filters
        Rooms url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/Html5ResourceScheduler/init.action
        Jurdicial office holder url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/Html5ResourceScheduler/init.action
        JOH calendar url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/ResourceScheduler/init.action
        Room calendar url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/ResourceScheduler/roomViewInit.action

        Filter url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/HearingScheduleData.action?XSRF-TOKEN=token
        Filter payload: {
            "params": {
                "filter": {
                    "dayOptions": [],
                    "days": [],
                    "fromDate": "",
                    "toDate": "",
                    "jurisdictionTypes": [],
                    "localities": [],
                    "locations": [],
                    "sessionTypes": [],
                    "mtrCategories": [],
                    "employeeWorkTypesIn": [],
                    "employeeWorkTypesEx": [],
                    "memTypesIn": [],
                    "memTypesEx": [],
                    "showWeekend": false,
                    "firstAvailable": "N",
                    "availability": "E",
                    "dataType": "",
                    "dataPeriod": "",
                    "currentRowSelected": "",
                    "hearingDuration": "",
                    "hearingDurationSt": 8,
                    "hearingDurationEt": 21,
                    "hearingDurationInc": 30,
                    "hearingChannel": [],
                    "savedSearchId": "13",
                    "matterId": "",
                    "partyAvailability": false,
                    "venueBookingType": [],
                    "noOfAttendees": "",
                    "memTypesInTemp": [],
                    "secondaryRoomTemp": [],
                    "secondaryJohTemp": [],
                    "selectedDay": [],
                    "selectedRoom": [],
                    "selectedJoh": [],
                    "isIncludeCase": true,
                    "currentTabSelected": "",
                    "area": [],
                    "registry": [],
                    "bodyPositions": [],
                    "bodyPositionsEx": [],
                    "specialism": [],
                    "matterCode": [],
                    "employmentType": [],
                    "employmentTypeTemp": [],
                    "externalVenue": "E",
                    "layout": [],
                    "roomAttribute": [],
                    "portableEquipment": [],
                    "nationalResourcePools": "",
                    "multiDayLov": "",
                    "multiDay": "",
                    "multidayHearing": "",
                    "multidayHearingWeeks": "",
                    "multidayHearingHours": ""
                }
            }
        }

    2. Navigate to each of other 4 hearing schedule tabs with complex filters
        Rooms url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/Html5ResourceScheduler/init.action
        Jurdicial office holder url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/Html5ResourceScheduler/init.action
        JOH calendar url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/ResourceScheduler/init.action
        Room calendar url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/ResourceScheduler/roomViewInit.action

        Filter url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/HearingScheduleData.action?XSRF-TOKEN=token
        Filter payload: {
            "params": {
                "filter": {
                    "hearingDuration": "",
                    "matterCode": [],
                    "localities": [
                        "300",
                        "309"
                    ],
                    "sessionTypes": [],
                    "bodyPositions": [],
                    "roomAttribute": [],
                    "portableEquipment": [],
                    "selectedJoh": [],
                    "displayTab": "HSRM",
                    "currentRowSelected": "",
                    "firstAvailable": "N",
                    "savedSearchId": "9",
                    "jurisdictionTypes": [],
                    "noOfAttendees": "",
                    "matterId": "",
                    "nationalResourcePools": null,
                    "mtrCategories": [],
                    "multidayHearingHours": "",
                    "dataPeriod": "",
                    "area": [
                        "TSR"
                    ],
                    "selectedDay": [],
                    "dataType": "R",
                    "hearingDurationSt": 8,
                    "specialism": [],
                    "fromDate": "26-12-2022",
                    "savedSearchView": "HS",
                    "bodyPositionsEx": [],
                    "hearingDurationInc": 5,
                    "multidayHearingWeeks": "",
                    "availability": "E",
                    "multiDay": "",
                    "employeeWorkTypesEx": [],
                    "externalVenue": "E",
                    "memTypesInTemp": [],
                    "registry": [
                        "TV"
                    ],
                    "currentTabSelected": "HSRM",
                    "venueBookingType": [],
                    "employmentType": [],
                    "toDate": "01-01-2023",
                    "employeeWorkTypesIn": [],
                    "showWeekend": false,
                    "memTypesIn": [],
                    "multiDayLov": "1",
                    "employmentTypeTemp": [
                        "SALARY"
                    ],
                    "layout": [],
                    "hearingDurationEt": 21,
                    "memTypesEx": [],
                    "partyAvailability": false,
                    "hearingChannel": [],
                    "locations": [
                        "301",
                        "302",
                        "303",
                        "304",
                        "305"
                    ],
                    "selectedRoom": [],
                    "multidayHearing": ""
                }
            }
        }

*************** UJ4 **************************
Updated to random JOH allocation (See the userManagement.js for further details)
Steps:
    1. Go to Users
        Url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/UserListManagement/init.action?XSRF-TOKEN=token

        User record url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/UserListManagement/load.action?XSRF-TOKEN=token
        User record payload: {
            "params": {
                "page": 1,
                "pageSize": 10,
                "searchContent": "",
                "order": "asc",
                "column": "0",
                "showInactive": false,
                "filter": {
                    "personalDetails": {
                        "name": "",
                        "bussinessPhone": ""
                    },
                    "systemDetails": {
                        "regions": [],
                        "clusters": [],
                        "courts": []
                    },
                    "employmentDetails": {
                        "jobRoles": []
                    },
                    "jurisdictions": [],
                    "shortNotice": false
                }
            }
        }

    2. Search by username
        User record url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/UserListManagement/load.action?XSRF-TOKEN=token
        User record payload: {
            "params": {
                "page": 1,
                "pageSize": 10,
                "searchContent": jmeterUserName, // Random JOH allocation
                "order": "asc",
                "column": "0",
                "showInactive": false,
                "filter": {
                    "personalDetails": {
                        "name": "",
                        "bussinessPhone": ""
                    },
                    "systemDetails": {
                        "regions": [],
                        "clusters": [],
                        "courts": []
                    },
                    "employmentDetails": {
                        "jobRoles": []
                    },
                    "jurisdictions": [],
                    "shortNotice": false
                }
            }
        }

        We have userId, userName from this step and it can be used on the next steps

    3. Go to User Details -> Personal Details is default tab
        User details url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/UserManagement/initFromUserList.action?userId=userId&XSRF-TOKEN=token

        User details data url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/UserManagement/loadSingleTab.action&XSRF-TOKEN=token
        User details data payload: {
            "params": {
                "userId": userId, // Random JOH allocation
                "tab": "UMPersonalTab"
            }
        }

        We have userDetails node from this step and it can be used on step 4

    4. Enter new Email and Save Personal Details tab
        Update JOH allocation values:
            userDetails.email = userName + @mcgirrtech.com  // Random JOH allocation
            userDetails.givenNames = jmeterGivenName        // Random JOH allocation
            userDetails.surname = jmeterFamilyName          // Random JOH allocation

        User detail save url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/UserManagement/saveSingleTab.action&XSRF-TOKEN=token
        User detail save payload: {
            "params": {
                "userId": userId, // Random JOH allocation
                "tab": "UMPersonalTab",
                "userDetails": userDetails,
                "refreshPtpIntPartLov": false // If tab 1 or 2 then true otherwise false
            }
        }

    5. Go to System Details tab and Save
        User details data url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/UserManagement/loadSingleTab.action&XSRF-TOKEN=token
        User details data payload: {
            "params": {
                "userId": userId, // Random JOH allocation
                "tab": "UMSystemTab"
            }
        }

        We have userDetails node

        Update JOH allocation values:
            userDetails.userId = userId     // Random JOH allocation
            userDetails.loginId = userName  // Random JOH allocation

        User detail save url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/UserManagement/saveSingleTab.action&XSRF-TOKEN=token
        User detail save payload: {
            "params": {
                "userId": userId, // Random JOH allocation
                "tab": "UMSystemTab",
                "userDetails": userDetails,
                "refreshPtpIntPartLov": false // If tab 1 or 2 then true otherwise false
            }
        }

    6. Go to Jurisdictions tab
        User details data url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/UserManagement/loadSingleTab.action&XSRF-TOKEN=token
        User details data payload: {
            "params": {
                "userId": userId, // Random JOH allocation
                "tab": "UMJurisdictionTab"
            }
        }

        We have userDetails node from this step and it can be used on step 7

    7. Edit Jurisdiction Details
        If Thames Valley region exists on Location Preferences table then close Jurisdiction Details

        Else Add Thames Valley Region to Location Preferences table and Save
        Update the location preferences:
        const locationPreferences = [
            {
                "area": "TSR",
                "registry": "TV",
                "registryLabel": "Thames Valley",
                "localityLabel": "Milton Keynes County Court and Family Court",
                "inactiveDate": null,
                "locality": "300",
                "location": null,
                "locationLabel": null,
                "id": null,
                "areaLabel": "Thames Valley Region",
                "primaryFlag": false
            }
        ]

        userDetails.userJurisdiction = userDetails.userJurisdiction.map(jurisdiction =>
            Object.assign({}, jurisdiction, { locationPreferences: [...jurisdiction.locationPreferences, ...locationPreferences] })
        )

        User detail save url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/UserManagement/saveSingleTab.action&XSRF-TOKEN=token
        User detail save payload: {
            "params": {
                "userId": userId, // Random JOH allocation
                "tab": "UMJurisdictionTab",
                "userDetails": userDetails,
                "refreshPtpIntPartLov": false // If tab 1 or 2 then true otherwise false
            }
        }

    8. Go to Weekly Work Pattern tab
        User details data url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/UserManagement/loadSingleTab.action&XSRF-TOKEN=token
        User details data payload: {
            "params": {
                "userId": userId, // Random JOH allocation
                "tab": "UMWeeklyWorkPatternTab"
            }
        }

        We have userDetails node from this step and it can be used on step 9

    9. Delete all existing Patterns
        To delete weekly work pattern, we need to set endDate and inactiveDate to the date in the past:
        cosnt inactiveDate = "2022-12-01 12:00:00.000"
        const endDate = "01-12-2022"

        userDetails.workPatterns = userDetails.workPatterns.map(workPatten =>
            (Object.assign({}, workPatten, {
                inactiveDate: "2022-12-01 12:00:00.000",
                endDate: "01-12-2022",
                userId: userId // Random JOH returned from searchUser
            }))
        )

        User detail save url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/UserManagement/saveSingleTab.action&XSRF-TOKEN=token
        User detail save payload: {
            "params": {
                "userId": userId, // Random JOH allocation
                "tab": "UMWeeklyWorkPatternTab",
                "userDetails": userDetails,
                "refreshPtpIntPartLov": false // If tab 1 or 2 then true otherwise false
            }
        }

    10. Add new Pattern
        User detail save url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/vue/UserManagement/saveSingleTab.action&XSRF-TOKEN=token
        User detail save payload: {
            "params": {
                "userId": userId, // Random JOH allocation
                "tab": "UMWeeklyWorkPatternTab",
                "userDetails": {
                    "workPatterns": [
                        {
                            "startDate": "29-12-2022",
                            "endDate": "01-03-2023",
                            "location": "300",
                            "jurisdiction": "CIV",
                            "recurrance": 1,
                            "maximumDaysPerWeek": 5,
                            "targetSittingPercentage": null,
                            "targetSittingDays": null,
                            "jurisdictionSplit": null,
                            "locationLabel": "Milton Keynes County Court and Family Court",
                            "jurisdictionLabel": "Civil",
                            "detailList": [
                                {
                                    "availability": "TRAVEL",
                                    "comments": "test comment",
                                    "dayName": "Monday",
                                    "dayNumber": 1,
                                    "startTime": "08:00",
                                    "endTime": "17:00",
                                    "id": null,
                                    "patternId": null
                                },
                                {
                                    "availability": "UNAVAIL-DS",
                                    "comments": null,
                                    "dayName": "Tuesday",
                                    "dayNumber": 2,
                                    "startTime": "08:00",
                                    "endTime": "12:00",
                                    "id": null,
                                    "patternId": null
                                },
                                {
                                    "availability": null,
                                    "comments": null,
                                    "dayName": "Wednesday",
                                    "dayNumber": 3,
                                    "startTime": null,
                                    "endTime": null,
                                    "id": null,
                                    "patternId": null
                                },
                                {
                                    "availability": null,
                                    "comments": null,
                                    "dayName": "Thursday",
                                    "dayNumber": 4,
                                    "startTime": null,
                                    "endTime": null,
                                    "id": null,
                                    "patternId": null
                                },
                                {
                                    "availability": null,
                                    "comments": null,
                                    "dayName": "Friday",
                                    "dayNumber": 5,
                                    "startTime": null,
                                    "endTime": null,
                                    "id": null,
                                    "patternId": null
                                },
                                {
                                    "availability": null,
                                    "comments": null,
                                    "dayName": "Saturday",
                                    "dayNumber": 6,
                                    "startTime": null,
                                    "endTime": null,
                                    "id": null,
                                    "patternId": null
                                },
                                {
                                    "availability": null,
                                    "comments": null,
                                    "dayName": "Sunday",
                                    "dayNumber": 7,
                                    "startTime": null,
                                    "endTime": null,
                                    "id": null,
                                    "patternId": null
                                }
                            ],
                            "userId": userId // Random JOH allocation
                        }
                    ]
                },
                "refreshPtpIntPartLov": false // If tab 1 or 2 then true otherwise false
            }
            }
        }

    11. Go to Home Page
        Url: https://hmcts.mcgirrtech.com/HMCTSQA-AZURE/CMSHomeAction.do&XSRF-TOKEN=token
*/

