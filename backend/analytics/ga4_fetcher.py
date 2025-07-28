from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import RunReportRequest, DateRange, Dimension, Metric

def get_scroll_data(property_id: str):
    client = BetaAnalyticsDataClient()
    request = RunReportRequest(
        property=f"properties/{property_id}",
        dimensions=[Dimension(name="pagePath")],
        metrics=[Metric(name="averageSessionDuration"), Metric(name="engagedSessions")],
        date_ranges=[DateRange(start_date="7daysAgo", end_date="today")]
    )
    response = client.run_report(request)
    return response
