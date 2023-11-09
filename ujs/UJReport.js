import { ReportType } from "../data/constant.js";
import { loadInternalReportV2 } from "../components/reports/internalReport_v2.js";
import { loadExternalReportV2 } from "../components/reports/externalReport_v2.js";
import { loadExternalReportWelshV2 } from "../components/reports/externalReportWelsh_v2.js";

/* LOAD REPORTS */

export function UJReport(data) {
    if (data.reportType === ReportType.INTERNAL_V2) {
        loadInternalReportV2(data);
    }
    else if (data.reportType === ReportType.EXTERNAL_V2) {
        loadExternalReportV2(data);
    }
    else if (data.reportType === ReportType.EXTERNAL_WELSH_V2) {
        loadExternalReportWelshV2(data);
    }
}
