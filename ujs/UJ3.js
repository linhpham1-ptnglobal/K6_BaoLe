/*
Steps:
    1. Navigate to each of other 4 hearing schedule tabs with default filters
    2. Navigate to each of other 4 hearing schedule tabs with complex filters
*/

import { group } from 'k6';

import { loadHearingSchedule } from '../components/common/resourceScheduler.js';

export function UJ3(data) {
    group('User Journey 3', function () {
        let res = null;
        
        // Load Resource Scheduler with Default Filter
        res = loadHearingSchedule(data, res, [1, 2, 3, 4]);

        // Load Resource Scheduler with Complex Filter
        res = loadHearingSchedule(data, res, [4, 3, 2, 1], true);
    });
}