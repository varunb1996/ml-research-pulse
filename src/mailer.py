import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from jinja2 import Environment, FileSystemLoader, select_autoescape


def _render_email(digest_data: dict, web_url: str) -> str:
    env = Environment(
        loader=FileSystemLoader("templates"),
        autoescape=select_autoescape(["html"]),
    )
    template = env.get_template("email_teaser.html")
    return template.render(data=digest_data, web_url=web_url)


def send_digest(digest_data: dict, web_url: str = "") -> None:
    gmail_user = os.environ["GMAIL_USER"]
    gmail_password = os.environ["GMAIL_APP_PASSWORD"]
    recipient = os.environ["RECIPIENT_EMAIL"]

    week = digest_data.get("week_number", "")
    style = digest_data.get("post_style", "roundup").upper()
    subject = f"ML Research Pulse — Week #{week} ({style})"

    potw = digest_data.get("paper_of_week") or {}
    headline = potw.get("headline", "Your weekly AI/ML digest is ready")
    subject = f"⚡ {headline} — ML Research Pulse Week #{week}"

    html_body = _render_email(digest_data, web_url)

    # Plain text fallback
    paper = potw.get("paper") or {}
    plain = f"""ML Research Pulse — Week #{week}

PAPER OF THE WEEK
{potw.get('headline', '')}
{paper.get('title', '')}
{potw.get('key_takeaway', '')}

Read the full digest: {web_url}

--
ML Research Pulse · Automated weekly digest
"""

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = gmail_user
    msg["To"] = recipient
    msg.attach(MIMEText(plain, "plain"))
    msg.attach(MIMEText(html_body, "html"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(gmail_user, gmail_password)
        server.sendmail(gmail_user, recipient, msg.as_string())

    print(f"[mailer] Email sent to {recipient}")
