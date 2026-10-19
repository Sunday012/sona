import { Link, useNavigate } from '@tanstack/react-router';
import type { PropsWithChildren, ReactNode } from 'react';
import { api } from '../lib/api';
import { getSession, setSession, useSession } from '../lib/session';
import { Icon } from './icons';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo-light' : ''}`} aria-label="Sona home">
      <span className="logo-symbol">
        <span />
        <span />
        <span />
      </span>
      <span>Sona</span>
    </Link>
  );
}

export function PublicHeader() {
  return (
    <header className="public-header">
      <Logo />
      <nav aria-label="Main navigation">
        <a href="#how-it-works">How it works</a>
        <a href="#why-sona">Why Sona</a>
        <a href="#safety">Safety</a>
      </nav>
      <div className="header-actions">
        <Link to="/sign-in" className="text-link">
          Sign in
        </Link>
        <Link to="/create-account" className="button button-small">
          Get started
        </Link>
      </div>
    </header>
  );
}

export function AuthLayout({
  eyebrow,
  title,
  description,
  children,
}: PropsWithChildren<{ eyebrow: string; title: string; description: string }>) {
  return (
    <main className="auth-page">
      <section className="auth-story">
        <Logo light />
        <div className="auth-story-copy">
          <span className="soft-pill">
            <Icon name="shield" /> Private by design
          </span>
          <h1>A softer place to talk about the hard things.</h1>
          <p>
            Professional mental health support, when you need it, without judgment or unnecessary exposure.
          </p>
        </div>
        <blockquote>“You don’t have to carry everything alone.”</blockquote>
      </section>
      <section className="auth-panel">
        <div className="auth-card">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="form-intro">{description}</p>
          {children}
        </div>
      </section>
    </main>
  );
}

const nav = [
  { to: '/app', label: 'Home', icon: 'home' as const },
  { to: '/app/support', label: 'Find support', icon: 'heart' as const },
];

export function AppLayout({
  children,
  title,
  subtitle,
  actions,
}: PropsWithChildren<{ title: string; subtitle?: string; actions?: ReactNode }>) {
  const navigate = useNavigate();
  useSession();
  async function signOut() {
    const refreshToken = getSession()?.refreshToken;
    if (refreshToken) await api.logout(refreshToken).catch(() => undefined);
    setSession(null);
    await navigate({ to: '/' });
  }
  return (
    <div className="app-frame">
      <aside className="sidebar">
        <Logo light />
        <nav aria-label="Patient navigation">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === '/app' }}
              activeProps={{ className: 'active' }}
            >
              <Icon name={item.icon} /> {item.label}
            </Link>
          ))}
        </nav>
        <div className="sidebar-trust">
          <Icon name="lock" />
          <div>
            <strong>Your space is private</strong>
            <span>Protected and confidential</span>
          </div>
        </div>
        <button className="sidebar-signout" type="button" onClick={signOut}>
          Sign out
        </button>
      </aside>
      <div className="app-main">
        <header className="app-topbar">
          <Logo />
          <button className="icon-button mobile-menu" type="button" aria-label="Open menu">
            <Icon name="menu" />
          </button>
          <div className="avatar" aria-hidden="true">
            S
          </div>
        </header>
        <main className="dashboard-page">
          <div className="page-heading">
            <div>
              <p className="eyebrow">Your Sona space</p>
              <h1>{title}</h1>
              {subtitle && <p>{subtitle}</p>}
            </div>
            {actions}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
