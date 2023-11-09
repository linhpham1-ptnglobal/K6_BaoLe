export const ReportType = {
    INTERNAL_V2: "internal_v2",
    EXTERNAL_V2: "external_v2",
    EXTERNAL_WELSH_V2: "external_welsh_v2"
}

export const Environment = {
    LOCAL: 'TRUNK',
    AZURE: 'AZURE'
}

export const DatetimeAction = {
    ADD: "add",
    SUBTRACT: "subtract"
}

// ALL METRICS DEFINE HERE
export const MetricType = {
    LOGIN_PAGE_LOADED: "loginPageLoaded",
    LOGIN_ACTION: "loginAction",
    MATTER_PAGE_LOADED: "matterPageLoaded",
    MATTER_CREATED: "matterCreated",
    LISTING_REQUIREMENT_PAGE_LOADED: "listingRequirementPageLoaded",
    LISTING_REQUIREMENT_CREATED: "listingRequirementCreated",
    CASE_HISTORY_PAGE_LOADED: 'caseHistoryPageLoaded',
    AWAITING_LISTING_PAGE_LOADED: "awaitingListingPageLoaded",
    HEARING_SCHEDULE_ROOMS_TAB_LOADED: "hearingScheduleRoomsTabLoaded",
    HEARING_SCHEDULE_JOH_TAB_LOADED: "hearingScheduleJOHTabLoaded",
    HEARING_SCHEDULE_JOH_CALENDAR_TAB_LOADED: "hearingScheduleJOHCalendarTabLoaded",
    HEARING_SCHEDULE_ROOM_CALENDAR_TAB_LOADED: "hearingScheduleRoomCalendarTabLoaded",
    HEARING_SCHEDULE_COMPLEX_FILTER_ROOMS_TAB_LOADED: "hearingScheduleComplexFilterRoomsTabLoaded",
    HEARING_SCHEDULE_COMPLEX_FILTER_JOH_TAB_LOADED: "hearingScheduleComplexFilterJOHTabLoaded",
    HEARING_SCHEDULE_COMPLEX_FILTER_JOH_CALENDAR_TAB_LOADED: "hearingScheduleComplexFilterJOHCalendarTabLoaded",
    HEARING_SCHEDULE_COMPLEX_FILTER_ROOM_CALENDAR_TAB_LOADED: "hearingScheduleComplexFilterRoomCalendarTabLoaded",
    VENUE_BOOKING_PAGE_LOADED: "venueBookingPageLoaded",
    VENUE_BOOKING_CREATED: "venueBookingCreated",
    VENUE_BOOKING_LISTING_CREATED: "venueBookingListingCreated",
    VENUE_BOOKING_UPDATED: "venueBookingUpdated",
    RESOURCE_MANAGEMENT_USER_LIST_LOADED: "resourceManagementUserListLoaded",
    RESOURCE_MANAGEMENT_USER_LIST_FILTERED: "resourceManagementUserListFiltered",
    RESOURCE_MANAGEMENT_PERSONAL_DETAILS_TAB_LOADED: "resourceManagementPersonalDetailsTabLoaded",
    RESOURCE_MANAGEMENT_PERSONAL_DETAILS_TAB_SAVED: "resourceManagementPersonalDetailsTabSaved",
    RESOURCE_MANAGEMENT_SYSTEM_DETAILS_TAB_LOADED: "resourceManagementPersonalDetailsTabLoaded",
    RESOURCE_MANAGEMENT_SYSTEM_DETAILS_TAB_SAVED: "resourceManagementPersonalDetailsTabSaved",
    RESOURCE_MANAGEMENT_APPOINTMENT_TAB_LOADED: "resourceManagementPersonalDetailsTabLoaded",
    RESOURCE_MANAGEMENT_APPOINTMENT_TAB_SAVED: "resourceManagementPersonalDetailsTabSaved",
    RESOURCE_MANAGEMENT_JURISDICTIONS_TAB_LOADED: "resourceManagementPersonalDetailsTabLoaded",
    RESOURCE_MANAGEMENT_JURISDICTIONS_TAB_SAVED: "resourceManagementPersonalDetailsTabSaved",
    RESOURCE_MANAGEMENT_WEEKLY_WORK_PATTERN_TAB_LOADED: "resourceManagementPersonalDetailsTabSaved",
    RESOURCE_MANAGEMENT_WEEKLY_WORK_PATTERN_TAB_SAVED: "resourceManagementPersonalDetailsTabSaved"
}

export const FormCounterMetric = {
    LOGIN_FORM_ERROR_COUNTER: "loginFormErrorCounter",
    LISTING_REQUIREMENT_FORM_ERROR_COUNTER: "listingRequirementFormErrorCounter",
    VENUE_BOOKING_CREATE_FORM_ERROR_COUNTER: "venueBookingCreateFormErrorCounter",
    VENUE_BOOKING_UPDATE_FORM_ERROR_COUNTER: "venueBookingUpdateFormErrorCounter",
    VENUE_BOOKING_DELETE_FORM_ERROR_COUNTER: "venueBookingDeleteFormErrorCounter",
    MATTER_FORM_ERROR_COUNTER: "matterFormErrorCounter"
}