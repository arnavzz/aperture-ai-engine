import os
from slack_sdk import WebClient
from sendgrid import SendGridAPIClient
from googleapiclient.discovery import build
import praw

# Slack client
slack = WebClient(token=os.getenv("SLACK_BOT_TOKEN"))

# SendGrid client
sg = SendGridAPIClient(os.getenv("SENDGRID_API_KEY"))

# YouTube client
yt = build("youtube", "v3", developerKey=os.getenv("YOUTUBE_API_KEY"))

# Reddit client
reddit = praw.Reddit(
    client_id=os.getenv("REDDIT_CLIENT_ID"),
    client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
    user_agent=os.getenv("REDDIT_USER_AGENT")
)