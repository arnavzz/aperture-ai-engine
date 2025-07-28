from apscheduler.schedulers.background import BackgroundScheduler
from ga4_fetcher import get_scroll_data
from gsc_fetcher import fetch_gsc_data

def start_scheduler():
    scheduler = BackgroundScheduler()
    # Schedule GA4 fetch every 24 hours
    scheduler.add_job(lambda: get_scroll_data('YOUR_GA4_PROPERTY_ID'), 'interval', hours=24)
    # Schedule GSC fetch every 24 hours
    scheduler.add_job(lambda: fetch_gsc_data('https://example.com'), 'interval', hours=24)
    scheduler.start()

if __name__ == "__main__":
    start_scheduler()
    import time
    while True:
        time.sleep(60)
