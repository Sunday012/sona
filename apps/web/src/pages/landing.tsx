import { Link } from '@tanstack/react-router';
import { Icon } from '../components/icons';
import { Logo, PublicHeader } from '../components/layout';

export function LandingPage() {
  return (
    <div className="marketing-page">
      <PublicHeader />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Mental wellness, made human</p>
            <h1>
              Feel better, sooner with someone who <em>listens.</em>
            </h1>
            <p className="hero-lede">
              Connect privately with a licensed therapist—through chat, audio, or video—when life feels like
              too much.
            </p>
            <div className="hero-actions">
              <Link to="/create-account" className="button">
                Find support <Icon name="arrow" />
              </Link>
              <a href="#how-it-works" className="button button-ghost">
                See how it works
              </a>
            </div>
            <div className="trust-row">
              <span>
                <Icon name="shield" /> Licensed professionals
              </span>
              <span>
                <Icon name="lock" /> Private & secure
              </span>
              <span>
                <Icon name="clock" /> Support when you need it
              </span>
            </div>
          </div>
          <div
            className="hero-art"
            role="img"
            aria-label="A woman relaxing with a warm drink in a sunlit room"
          >
            <img src="/images/sona-hero-v2.png" alt="" aria-hidden="true" />
            <div className="hero-photo-shade" />
            <div className="availability-card">
              <span className="availability-icon">
                <Icon name="message" />
              </span>
              <div>
                <small>Therapists available now</small>
                <strong>Talk when you’re ready</strong>
              </div>
              <span className="live-dot" />
            </div>
            <div className="hero-note">
              <Icon name="shield" />
              <span>
                Private, human support
                <br />
                <strong>on your terms</strong>
              </span>
            </div>
          </div>
        </section>

        <section className="reassurance-strip">
          <p>Whatever you’re carrying, you don’t have to carry it alone.</p>
        </section>

        <section className="section support-gallery" id="why-sona">
          <div className="section-heading">
            <p className="eyebrow">Support for real life</p>
            <h2>Whatever you’re facing, start where you are.</h2>
            <p>Choose immediate support or take a quieter first step. There’s no perfect way to begin.</p>
          </div>
          <div className="story-grid">
            <article className="story-card story-card-wide">
              <div className="story-copy">
                <span>For the moments that feel heavy</span>
                <h3>Talk to someone today</h3>
                <p>Share what’s going on and connect with an available licensed therapist.</p>
                <Link to="/create-account">
                  Find immediate support <Icon name="arrow" />
                </Link>
              </div>
              <img
                src="/images/sona-student-support.png"
                alt="A student taking a restorative walk outdoors"
                loading="lazy"
              />
            </article>
            <article className="story-card">
              <div className="story-copy">
                <span>From your own space</span>
                <h3>Private online sessions</h3>
                <p>Get thoughtful support without a commute or crowded waiting room.</p>
              </div>
              <img
                src="/images/sona-private-session.png"
                alt="A person having a private online support session at home"
                loading="lazy"
              />
            </article>
            <article className="story-card connection-card">
              <div className="story-copy">
                <span>Choose what feels comfortable</span>
                <h3>Chat, audio, or video</h3>
                <p>You decide how to connect. You can change your preference at any time.</p>
              </div>
              <div className="connection-options">
                <span>
                  <Icon name="chat" /> Chat
                </span>
                <span>
                  <Icon name="audio" /> Audio
                </span>
                <span>
                  <Icon name="video" /> Video
                </span>
              </div>
            </article>
          </div>
        </section>

        <section className="section how-section" id="how-it-works">
          <div className="how-copy">
            <p className="eyebrow">Simple by design</p>
            <h2>Support in three gentle steps.</h2>
            <p>We’ve made getting help feel less clinical and more human.</p>
            <Link to="/create-account" className="button button-light">
              Start your journey <Icon name="arrow" />
            </Link>
          </div>
          <ol className="steps">
            <li>
              <span>01</span>
              <div>
                <h3>Tell us what’s going on</h3>
                <p>
                  Share only what feels comfortable. A few thoughtful questions help us understand your needs.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Choose how to connect</h3>
                <p>Chat, audio, or video—you’re always in control of the conversation.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Meet your therapist</h3>
                <p>Connect with a licensed professional in a private, supportive space.</p>
              </div>
            </li>
          </ol>
        </section>

        <section className="section safety-section" id="safety">
          <div className="safety-card">
            <span className="icon-tile">
              <Icon name="shield" />
            </span>
            <div>
              <p className="eyebrow">Your privacy matters</p>
              <h2>A safe space should feel safe.</h2>
              <p>
                Your identity is protected in sessions, your information is encrypted, and your conversations
                are never used for advertising.
              </p>
            </div>
            <ul>
              <li>
                <Icon name="check" /> Pseudonymous by default
              </li>
              <li>
                <Icon name="check" /> Licensed therapists only
              </li>
              <li>
                <Icon name="check" /> You control what you share
              </li>
            </ul>
          </div>
        </section>

        <section className="closing-cta">
          <div>
            <Icon name="heart" />
            <h2>You don’t have to figure it all out today.</h2>
            <p>Just take the first small step. We’ll meet you there.</p>
            <Link to="/create-account" className="button button-light">
              Find support now <Icon name="arrow" />
            </Link>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <Logo light />
        <p>Sona offers mental wellness support and is not an emergency service.</p>
        <div>
          <a href="#safety">Privacy</a>
          <a href="#safety">Safety</a>
          <a href="mailto:hello@sona.care">Contact</a>
        </div>
        <span>© 2026 Sona Health</span>
      </footer>
    </div>
  );
}
