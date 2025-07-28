from .channel_clients import slack, sg, yt, reddit
from .hook_generator import wrap_with_hooks

def distribute(fragment_html: str, metadata: dict):
    # 1) Wrap with hooks
    hooked = wrap_with_hooks(
        fragment_html,
        metadata.get("summary", ""),
        metadata.get("sections", [])
    )

    # 2) Slack alert
    slack.chat_postMessage(
        channel=os.getenv("SLACK_CHANNEL"),
        text=f"New augment for {metadata.get('page_url')}",
        blocks=[{"type":"section", "text":{"type":"mrkdwn","text":hooked}}]
    )

    # 3) Send email
    sg.send({
        "from": "noreply@aperture.ai",
        "personalizations":[{"to":[{"email":os.getenv("NEWSLETTER_EMAIL")}]}],
        "subject": f"New SEO Fragment for {metadata.get('page_url')}",
        "content":[{"type":"text/html","value":hooked}]
    })

    # 4) Reddit post
    reddit.subreddit(metadata.get("reddit_sub", "seo")).submit(
        title=metadata.get("title", "SEO Update"), selftext=hooked
    )

    # 5) YouTube Short (simplified)
    yt.videos().insert(
        part="snippet,status",
        body={
            "snippet": {"title": metadata.get("yt_title", ""), "description": metadata.get("yt_desc", "")},
            "status": {"privacyStatus": "public"}
        },
        media_body=metadata.get("video_file", "")
    ).execute()