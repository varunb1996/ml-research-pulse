# ML Research Pulse ⚡

> Automated weekly AI/ML research digest delivered to your inbox every Sunday at 8 PM IST. Zero paid services.

## What You Get

Every week, a beautiful HTML email with:
- 🏆 **Paper of the Week** — deep summary of the most impactful new paper
- 📚 **Top 5 Papers** — ranked by novelty & practical applicability
- 🔍 **Implementation Gap Radar** — hot papers with no GitHub implementation yet (your opportunity)
- 🔥 **Trending ML Repos** — top new GitHub repos in ML this week
- 💡 **One Thing To Try** — one actionable experiment for your week

## One-Time Setup (< 10 minutes)

### 1. Get a Gemini API Key (free)
1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Sign in with your Google account
3. Click **Get API Key** → **Create API key**
4. Copy the key

### 2. Get a Gmail App Password (free)
1. Go to your Google Account → **Security**
2. Enable **2-Step Verification** if not already on
3. Search for **App Passwords** → create one for "Mail"
4. Copy the 16-character password

### 3. Fork this repo & add GitHub Secrets
Go to your forked repo → **Settings → Secrets and variables → Actions → New repository secret**

Add these 4 secrets:

| Secret Name | Value |
|---|---|
| `GEMINI_API_KEY` | Your Gemini API key |
| `GMAIL_USER` | Your Gmail address (e.g. you@gmail.com) |
| `GMAIL_APP_PASSWORD` | The 16-char app password from step 2 |
| `RECIPIENT_EMAIL` | Where to send the digest (can be same as GMAIL_USER) |

### 4. Test it
Go to **Actions → ML Research Pulse — Weekly Digest → Run workflow**

That's it. Every Sunday at 8 PM IST, your inbox gets smarter.

## Stack

| Component | Tool | Cost |
|---|---|---|
| Scheduling | GitHub Actions | Free |
| Papers | arXiv RSS + Papers With Code API | Free |
| Repos | GitHub Search API | Free |
| Community | Hacker News Algolia API | Free |
| AI Summarisation | Gemini 1.5 Flash | Free |
| Email delivery | Gmail SMTP | Free |
| **Total** | | **$0** |
