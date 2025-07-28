from apscheduler.schedulers.background import BackgroundScheduler
from backend.models.train_aio_classifier import train as train_aio
from backend.models.train_ctr_model import train as train_ctr

def start_feedback_loop():
    sched = BackgroundScheduler()
    sched.add_job(train_aio, 'cron', day_of_week='sun', hour=2)
    sched.add_job(train_ctr, 'cron', day_of_week='sun', hour=4)
    sched.start()