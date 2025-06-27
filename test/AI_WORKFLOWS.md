# AI & Smart Features: Design Workflows

This document outlines the design and workflow for the AI-powered features in PiPortal.

## 1. Session Optimizer

The Session Optimizer is an ML model that recommends the best time for a user to start their 5-hour mining session to maximize their potential rewards.

### Data Collection
- **Global Usage Data:** Anonymized data on active mining sessions globally, aggregated hourly.
- **Network Hashrate:** Real-time (or near real-time) data on the Pi Network's overall hashrate.
- **User's History:** The user's own session history and rewards.

### Model & Logic
- **Model Type:** A time-series forecasting model (like ARIMA or a simple LSTM neural network) could be used.
- **Prediction:** The model will predict periods of lower global activity. Mining during these "off-peak" hours could theoretically lead to a slightly larger share of mining rewards for that period.
- **Recommendation:** The backend runs a daily job to generate a recommendation for each user (or globally). This is displayed in the "AI Insights" widget on the dashboard.

### Workflow
1.  Backend service collects global session data every hour.
2.  A scheduled task (e.g., daily at midnight UTC) runs the ML model with the latest data.
3.  The model outputs a recommendation for the next 24-hour period (e.g., "10:00 PM").
4.  This recommendation is stored and served to the user via the `/api/insights` endpoint.

---

## 2. Fraud Detection

The fraud detection system uses AI to identify and flag suspicious activity, such as bots or fake sessions.

### Data Points for Analysis
- **Session Patterns:** Unusually consistent or robotic session start times (e.g., exactly every 5 hours and 1 second).
- **IP Address Analysis:** Multiple accounts operating from a single IP address (with some leniency for households).
- **Account Age vs. Activity:** New accounts with unusually high referral rates.
- **Device Fingerprinting:** Basic device and browser information to spot inconsistencies.

### Model & Logic
- **Model Type:** An anomaly detection model or a rules-based engine.
- **Scoring:** Each user account can have a "trust score". Certain patterns will lower the score.
- **Flagging:** Accounts that fall below a certain trust score threshold are flagged for manual review.

### Workflow
1.  All user sessions and activities are logged with relevant metadata (IP, user agent, etc.).
2.  A real-time or batch process analyzes this data against the fraud detection rules/model.
3.  Suspicious activities are flagged in an internal admin dashboard.
4.  Automated actions could include temporary suspension of rewards pending a review.

---

## 3. Smart Notifications

Smart notifications provide adaptive reminders to users about their mining sessions.

### Logic
This is less of an "AI" feature and more of a "smart" logic system.
- **Timezone Awareness:** It sends notifications based on the user's local timezone.
- **Behavioral Analysis:** If a user consistently starts their session around 8 AM, the system will learn to send a reminder around 7:45 AM if a session hasn't started. If the user is erratic, it might fall back to a standard notification pattern.
- **Adaptive Frequency:** If a user snoozes or ignores notifications, the system might reduce the frequency to avoid being intrusive.

### Workflow
1.  The user's session start times are stored.
2.  A daily task analyzes the user's pattern to determine the optimal notification time.
3.  When a user's 5-hour session is over and they haven't started a new one, the notification service is triggered at the personalized time. 