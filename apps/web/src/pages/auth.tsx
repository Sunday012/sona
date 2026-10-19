import { useNavigate } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import type { ApiError } from '@sona/types';
import { AuthLayout } from '../components/layout';
import { api } from '../lib/api';
import { getPendingVerification, setPendingVerification, setSession } from '../lib/session';

function ErrorMessage({ error }: { error: string }) {
  return (
    <div className="form-error" role="alert">
      {error}
    </div>
  );
}

export function SignInPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);
    const data = new FormData(event.currentTarget);
    try {
      const session = await api.login(String(data.get('email')), String(data.get('password')));
      setSession(session);
      const me = await api.me();
      await navigate({ to: me.patient?.onboardingCompletedAt ? '/app' : '/onboarding' });
    } catch (cause) {
      setError((cause as ApiError).message ?? 'We could not sign you in.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to your space"
      description="Your private support space is ready when you are."
    >
      <form className="form-stack" onSubmit={submit}>
        <label>
          Email address
          <input type="email" name="email" autoComplete="email" required placeholder="you@example.com" />
        </label>
        <label>
          <span>
            Password{' '}
            <button type="button" className="inline-link">
              Forgot password?
            </button>
          </span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            placeholder="Enter your password"
          />
        </label>
        {error && <ErrorMessage error={error} />}
        <button className="button form-submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        <p className="form-switch">
          New to Sona? <a href="/create-account">Create an account</a>
        </p>
      </form>
    </AuthLayout>
  );
}

export function CreateAccountPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);
    const data = new FormData(event.currentTarget);
    try {
      const email = String(data.get('email'));
      const result = await api.registerPatient({
        email,
        password: String(data.get('password')),
        fullName: String(data.get('fullName')),
        dateOfBirth: String(data.get('dateOfBirth')),
        countryCode: String(data.get('countryCode')),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        acceptedTerms: data.get('terms') === 'on',
      });
      setPendingVerification({ email, token: result.developmentVerificationToken });
      await navigate({ to: '/verify-email' });
    } catch (cause) {
      setError((cause as ApiError).message ?? 'We could not create your account.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <AuthLayout
      eyebrow="Start with one small step"
      title="Create your private account"
      description="We only ask for what is needed to keep your care safe."
    >
      <form className="form-stack two-column-form" onSubmit={submit}>
        <label className="full-field">
          Full name
          <input name="fullName" autoComplete="name" required minLength={2} placeholder="Your full name" />
        </label>
        <label className="full-field">
          Email address
          <input type="email" name="email" autoComplete="email" required placeholder="you@example.com" />
        </label>
        <label>
          Date of birth
          <input type="date" name="dateOfBirth" required />
        </label>
        <label>
          Country
          <select name="countryCode" required defaultValue="NG">
            <option value="NG">Nigeria</option>
            <option value="GH">Ghana</option>
            <option value="KE">Kenya</option>
            <option value="ZA">South Africa</option>
            <option value="GB">United Kingdom</option>
            <option value="US">United States</option>
          </select>
        </label>
        <label className="full-field">
          Password
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            required
            minLength={12}
            placeholder="At least 12 characters"
          />
        </label>
        <label className="check-label full-field">
          <input type="checkbox" name="terms" required />
          <span>I’m 18 or older and agree to Sona’s terms and privacy notice.</span>
        </label>
        {error && (
          <div className="full-field">
            <ErrorMessage error={error} />
          </div>
        )}
        <button className="button form-submit full-field" disabled={loading}>
          {loading ? 'Creating your space…' : 'Create my account'}
        </button>
        <p className="form-switch full-field">
          Already have an account? <a href="/sign-in">Sign in</a>
        </p>
      </form>
    </AuthLayout>
  );
}

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const pending = getPendingVerification();
  const [token, setToken] = useState(pending?.token ?? '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  async function verify(event: FormEvent) {
    event.preventDefault();
    setError('');
    try {
      await api.verifyEmail(token);
      setPendingVerification(null);
      await navigate({ to: '/sign-in' });
    } catch (cause) {
      setError((cause as ApiError).message ?? 'That link is invalid or expired.');
    }
  }
  async function resend() {
    if (!pending?.email) return setError('Return to account creation and enter your email again.');
    const result = await api.resendVerification(pending.email);
    setToken(result.developmentVerificationToken ?? '');
    setMessage(result.message);
  }
  return (
    <AuthLayout
      eyebrow="Check your inbox"
      title="Verify your email"
      description={`We sent a private verification link${pending?.email ? ` to ${pending.email}` : ''}.`}
    >
      <form className="form-stack" onSubmit={verify}>
        <label>
          Verification token
          <input
            value={token}
            onChange={(event) => setToken(event.target.value)}
            required
            minLength={32}
            placeholder="Paste your verification token"
          />
        </label>
        {message && <div className="form-success">{message}</div>}
        {error && <ErrorMessage error={error} />}
        <button className="button form-submit">Verify email</button>
        <button type="button" className="button button-ghost form-submit" onClick={resend}>
          Send a new link
        </button>
      </form>
    </AuthLayout>
  );
}
