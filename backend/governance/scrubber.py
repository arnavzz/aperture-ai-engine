import re

PII_PATTERNS = [
    r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",  # email addresses
    r"\+?\d[\d\s-]{8,}\d"                          # phone numbers
]

def scrub_pii(html: str) -> str:
    for pat in PII_PATTERNS:
        html = re.sub(pat, "[REDACTED]", html)
    return html