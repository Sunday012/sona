import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Icon } from '../components/icons';
import { AppLayout } from '../components/layout';
import { api } from '../lib/api';

function greeting() {
  const hour = new Date().getHours();
  return hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
}

export function DashboardPage() {
  const user = useQuery({ queryKey: ['me'], queryFn: () => api.me() });
  const sessions = useQuery({ queryKey: ['sessions'], queryFn: () => api.sessions() });
  const name = user.data?.alias ?? 'there';
  const active = sessions.data?.find((session) => session.status === 'ACTIVE' || session.status === 'QUEUED');
  return (
    <AppLayout title={`${greeting()}, ${name}.`} subtitle="How are you feeling today?">
      <section className="dashboard-grid">
        <article className="support-hero-card">
          <div>
            <span className="soft-pill">
              <i /> Support is available
            </span>
            <h2>You don’t have to hold it all by yourself.</h2>
            <p>Connect privately with a licensed therapist by chat, audio, or video.</p>
            <Link to="/app/support" className="button button-light">
              Find support now <Icon name="arrow" />
            </Link>
          </div>
          <div className="calm-illustration">
            <span className="sun" />
            <span className="hill hill-one" />
            <span className="hill hill-two" />
            <span className="figure">
              <i />
              <b />
            </span>
          </div>
        </article>
        <aside className="check-in-card">
          <span className="icon-tile">
            <Icon name="heart" />
          </span>
          <p className="eyebrow">A small check-in</p>
          <h2>How does today feel?</h2>
          <div className="mood-row" role="group" aria-label="Select your mood">
            {['Low', 'Heavy', 'Okay', 'Calm', 'Good'].map((mood, index) => (
              <button type="button" key={mood} aria-label={mood}>
                <span>{['◡', '—', '•', '⌣', '⌣'][index]}</span>
                <small>{mood}</small>
              </button>
            ))}
          </div>
          <p className="microcopy">This check-in stays private to you.</p>
        </aside>
      </section>
      <section className="dashboard-section">
        <div className="section-title">
          <div>
            <p className="eyebrow">Your support</p>
            <h2>{active ? 'Your current session' : 'Ready when you are'}</h2>
          </div>
          <Link to="/app/support">
            View options <Icon name="chevron" />
          </Link>
        </div>
        {active ? (
          <article className="session-row">
            <span className={`status-dot ${active.status.toLowerCase()}`} />
            <div>
              <strong>
                {active.status === 'QUEUED' ? 'Finding the right therapist' : 'Your session is active'}
              </strong>
              <p>
                {active.preferredMode.toLowerCase()} support · Requested{' '}
                {new Date(active.queuedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <span className="status-pill">{active.status.toLowerCase()}</span>
          </article>
        ) : (
          <article className="empty-support">
            <div className="empty-icon">
              <Icon name="message" />
            </div>
            <div>
              <h3>No active sessions</h3>
              <p>When you’re ready, starting a private conversation takes only a few minutes.</p>
            </div>
            <Link to="/app/support" className="button button-small">
              Start a conversation
            </Link>
          </article>
        )}
      </section>
      <section className="privacy-reminder">
        <Icon name="shield" />
        <div>
          <strong>Your privacy comes first</strong>
          <p>
            Therapists see your Sona alias—not your legal name—and only the information needed to support you.
          </p>
        </div>
      </section>
    </AppLayout>
  );
}
