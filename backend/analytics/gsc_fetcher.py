from googleapiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials

def fetch_gsc_data(site_url: str, start_date: str='7daysAgo', end_date: str='today'):
    credentials = ServiceAccountCredentials.from_json_keyfile_name(
        "credentials.json",
        scopes=['https://www.googleapis.com/auth/webmasters.readonly']
    )
    service = build('searchconsole', 'v1', credentials=credentials)
    request = {
        'startDate': start_date,
        'endDate': end_date,
        'dimensions': ['query', 'page'],
    }
    response = service.searchanalytics().query(siteUrl=site_url, body=request).execute()
    return response
