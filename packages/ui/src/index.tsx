import type { PropsWithChildren, ReactNode } from 'react';

export function SonaMark() {
  return (
    <span className="sona-mark" aria-hidden="true">
      S
    </span>
  );
}

export function AppShell({
  title,
  audience,
  children,
  actions,
}: PropsWithChildren<{ title: string; audience: string; actions?: ReactNode }>) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/">
          <SonaMark />
          <span>Sona</span>
        </a>
        <span className="audience">{audience}</span>
        <div className="top-actions">{actions}</div>
      </header>
      <main className="page">
        <p className="eyebrow">Connected care, designed around people</p>
        <h1>{title}</h1>
        {children}
      </main>
      <footer>Private by design · Secure by default · Built for coordinated care</footer>
    </div>
  );
}

export function FeatureGrid({ items }: { items: Array<{ title: string; description: string }> }) {
  return (
    <section className="feature-grid">
      {items.map((item, index) => (
        <article className="feature-card" key={item.title}>
          <span>0{index + 1}</span>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </article>
      ))}
    </section>
  );
}
