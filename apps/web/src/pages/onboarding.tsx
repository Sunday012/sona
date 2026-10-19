import { useNavigate } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import type { ApiError, CommunicationMode } from '@sona/types';
import { Icon } from '../components/icons';
import { Logo } from '../components/layout';
import { api } from '../lib/api';

const goals = [
  'Managing anxiety',
  'Academic stress',
  'Relationships',
  'Low mood',
  'Career pressure',
  'Self-esteem',
];
const modes: Array<{
  value: CommunicationMode;
  icon: 'chat' | 'audio' | 'video';
  label: string;
  copy: string;
}> = [
  { value: 'CHAT', icon: 'chat', label: 'Chat', copy: 'Write at your pace' },
  { value: 'AUDIO', icon: 'audio', label: 'Audio', copy: 'Talk without video' },
  { value: 'VIDEO', icon: 'video', label: 'Video', copy: 'Connect face-to-face' },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<CommunicationMode>('CHAT');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  function toggleGoal(goal: string) {
    setSelectedGoals((current) =>
      current.includes(goal) ? current.filter((item) => item !== goal) : [...current, goal],
    );
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    const data = new FormData(event.currentTarget);
    try {
      await api.updatePatientProfile({
        preferredDisplayName: String(data.get('displayName')),
        ageRange: String(data.get('ageRange')),
        communicationPreference: mode,
        supportGoals: selectedGoals,
        emailNotifications: data.get('emailNotifications') === 'on',
        pushNotifications: data.get('pushNotifications') === 'on',
        completeOnboarding: true,
      });
      await navigate({ to: '/app' });
    } catch (cause) {
      setError((cause as ApiError).message ?? 'We could not save your preferences.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="onboarding-page">
      <header>
        <Logo />
        <span>Step 1 of 1</span>
        <div className="progress-track">
          <i />
        </div>
      </header>
      <section className="onboarding-card">
        <p className="eyebrow">Make Sona yours</p>
        <h1>How can we support you?</h1>
        <p className="form-intro">
          You can change these preferences any time. Share only what feels comfortable.
        </p>
        <form className="onboarding-form" onSubmit={submit}>
          <div className="form-section">
            <h2>What should we call you?</h2>
            <label>
              Preferred name
              <input name="displayName" required minLength={2} placeholder="The name you’d like us to use" />
            </label>
            <label>
              Age range
              <select name="ageRange" required defaultValue="">
                <option value="" disabled>
                  Select an age range
                </option>
                <option>18–24</option>
                <option>25–34</option>
                <option>35–44</option>
                <option>45–54</option>
                <option>55+</option>
              </select>
            </label>
          </div>
          <div className="form-section">
            <h2>How do you prefer to talk?</h2>
            <div className="choice-grid">
              {modes.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  className={mode === item.value ? 'selected' : ''}
                  onClick={() => setMode(item.value)}
                >
                  <Icon name={item.icon} />
                  <strong>{item.label}</strong>
                  <span>{item.copy}</span>
                  {mode === item.value && (
                    <i>
                      <Icon name="check" />
                    </i>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="form-section">
            <h2>What would you like support with?</h2>
            <p>Choose as many as you like.</p>
            <div className="chip-grid">
              {goals.map((goal) => (
                <button
                  type="button"
                  key={goal}
                  className={selectedGoals.includes(goal) ? 'selected' : ''}
                  onClick={() => toggleGoal(goal)}
                >
                  {goal}
                  {selectedGoals.includes(goal) && <Icon name="check" />}
                </button>
              ))}
            </div>
          </div>
          <div className="form-section">
            <h2>Gentle reminders</h2>
            <label className="toggle-row">
              <span>
                <strong>Email updates</strong>
                <small>Session confirmations and important account updates</small>
              </span>
              <input type="checkbox" name="emailNotifications" defaultChecked />
            </label>
            <label className="toggle-row">
              <span>
                <strong>Push notifications</strong>
                <small>Know when a therapist is ready to connect</small>
              </span>
              <input type="checkbox" name="pushNotifications" defaultChecked />
            </label>
          </div>
          {error && (
            <div className="form-error" role="alert">
              {error}
            </div>
          )}
          <button className="button form-submit" disabled={loading}>
            {loading ? 'Saving…' : 'Enter my Sona space'} <Icon name="arrow" />
          </button>
        </form>
      </section>
    </main>
  );
}
