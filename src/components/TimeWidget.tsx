import { useState, useEffect } from 'react';
import { useI18n } from '../i18n/I18nContext';
import './TimeWidget.css';

function getGreeting(
  hour: number,
  t: { greeting_morning: string; greeting_afternoon: string; greeting_evening: string; greeting_night: string }
) {
  if (hour >= 5 && hour < 12) return t.greeting_morning;
  if (hour >= 12 && hour < 17) return t.greeting_afternoon;
  if (hour >= 17 && hour < 21) return t.greeting_evening;
  return t.greeting_night;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

/**
 * TimeWidget that avoids SSG hydration mismatch.
 *
 * Strategy: render a static placeholder during SSG / initial hydration,
 * then switch to live time after mount. This prevents the server-rendered
 * date (build time) from mismatching the client-rendered date (current time).
 */
export default function TimeWidget() {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date());

  // Mark as mounted and start the live clock
  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Before hydration completes, show a static placeholder
  // that doesn't depend on the current time
  if (!mounted) {
    return (
      <div className="time-widget time-widget--float">
        <div className="time-widget__greeting">···</div>
        <div className="time-widget__clock">
          <span className="time-widget__hm">--:--</span>
          <span className="time-widget__sep">:</span>
          <span className="time-widget__sec">--</span>
        </div>
        <div className="time-widget__progress">
          <div className="time-widget__progress-fill" style={{ width: '0%' }} />
        </div>
        <div className="time-widget__date">
          <span className="time-widget__month-day">-/-</span>
          <span className="time-widget__weekday">---</span>
        </div>
        <div className="time-widget__location">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ marginRight: 3, flexShrink: 0 }}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" opacity="0.8"/>
          </svg>
          {t.time.location}
        </div>
        <div className="time-widget__clouds">
          <svg className="time-widget__cloud time-widget__cloud--1" viewBox="0 0 80 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 28c-6 0-10-4-10-9s4-8 9-8c1-5 6-9 12-9 5 0 9 3 10 7 2-1 4-2 6-2 5 0 9 4 9 8s-4 8-9 8H16z" fill="currentColor" opacity="0.45" />
          </svg>
          <svg className="time-widget__cloud time-widget__cloud--2" viewBox="0 0 60 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22c-5 0-8-3-8-7s3-6 7-6c1-4 5-7 9-7 4 0 7 2 8 6 1-1 3-2 5-2 4 0 7 3 7 7s-3 6-7 6H12z" fill="currentColor" opacity="0.3" />
          </svg>
          <svg className="time-widget__cloud time-widget__cloud--3" viewBox="0 0 50 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 18c-4 0-7-3-7-6s3-5 6-5c1-3 4-6 8-6 3 0 6 2 7 5 1-1 2-1 4-1 3 0 6 2 6 5s-3 5-6 5H10z" fill="currentColor" opacity="0.35" />
          </svg>
        </div>
      </div>
    );
  }

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const weekdays_en = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekdays_zh = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekday_en = weekdays_en[now.getDay()];
  const weekday_zh = weekdays_zh[now.getDay()];

  // Progress bar for seconds (0-60)
  const secProgress = (seconds / 60) * 100;

  const greeting = getGreeting(hours, t.time);

  return (
    <div className="time-widget time-widget--float">
      {/* Greeting */}
      <div className="time-widget__greeting">{greeting}</div>

      {/* Clock face */}
      <div className="time-widget__clock">
        <span className="time-widget__hm">{pad(hours)}:{pad(minutes)}</span>
        <span className="time-widget__sep">:</span>
        <span className="time-widget__sec">{pad(seconds)}</span>
      </div>

      {/* Seconds progress bar */}
      <div className="time-widget__progress">
        <div
          className="time-widget__progress-fill"
          style={{ width: `${secProgress}%` }}
        />
      </div>

      {/* Date */}
      <div className="time-widget__date">
        <span className="time-widget__month-day">
          {month}/{day}
        </span>
        <span className="time-widget__weekday">
          {weekday_en} {weekday_zh}
        </span>
      </div>

      {/* Location */}
      <div className="time-widget__location">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ marginRight: 3, flexShrink: 0 }}>
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" opacity="0.8"/>
        </svg>
        {t.time.location}
      </div>

      {/* Decorative dots */}
      <div className="time-widget__dots">
        <div className="time-widget__dot" style={{ animationDelay: '0s' }} />
        <div className="time-widget__dot" style={{ animationDelay: '0.3s' }} />
        <div className="time-widget__dot" style={{ animationDelay: '0.6s' }} />
      </div>
    </div>
  );
}