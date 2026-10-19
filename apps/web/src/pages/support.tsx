import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, type FormEvent } from 'react';
import type { ApiError, CommunicationMode, IntakeCategory, WellnessSession } from '@sona/types';
import { Icon } from '../components/icons';
import { AppLayout } from '../components/layout';
import { api } from '../lib/api';

const topics: Array<{ value: IntakeCategory; label: string }> = [
  { value: 'ANXIETY', label: 'Anxiety or worry' },
  { value: 'ACADEMIC_STRESS', label: 'School or academic stress' },
  { value: 'RELATIONSHIPS', label: 'Relationships' },
  { value: 'DEPRESSION', label: 'Low mood' },
  { value: 'CAREER', label: 'Work or career pressure' },
  { value: 'SELF_ESTEEM', label: 'Self-esteem' },
  { value: 'GENERAL_SUPPORT', label: 'I just need to talk' },
  { value: 'DISTRESS', label: 'I feel overwhelmed' },
];
const modes: Array<{
  value: CommunicationMode;
  label: string;
  icon: 'chat' | 'audio' | 'video';
  copy: string;
}> = [
  { value: 'CHAT', label: 'Chat', icon: 'chat', copy: 'Message privately' },
  { value: 'AUDIO', label: 'Audio', icon: 'audio', copy: 'Talk without camera' },
  { value: 'VIDEO', label: 'Video', icon: 'video', copy: 'Meet face-to-face' },
];

export function SupportPage() {
  const queryClient = useQueryClient();
  const [topic, setTopic] = useState<IntakeCategory>('GENERAL_SUPPORT');
  const [mode, setMode] = useState<CommunicationMode>('CHAT');
  const [result, setResult] = useState<WellnessSession | null>(null);
  const mutation = useMutation({
    mutationFn: (input: { category: IntakeCategory; preferredMode: CommunicationMode; context?: string }) =>
      api.requestImmediateSession(input),
    onSuccess: (session) => {
      setResult(session);
      void queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    mutation.mutate({
      category: topic,
      preferredMode: mode,
      context: String(data.get('context') ?? '') || undefined,
    });
  }
  if (result)
    return (
      <AppLayout
        title={result.crisisSupportRequired ? 'Your safety comes first.' : 'We’re finding someone for you.'}
        subtitle={
          result.crisisSupportRequired ? undefined : 'You can stay on this page while we connect you.'
        }
      >
        <section className={`queue-card ${result.crisisSupportRequired ? 'crisis-card' : ''}`}>
          <div className="queue-pulse">
            <span />
            <Icon name={result.crisisSupportRequired ? 'heart' : 'message'} />
          </div>
          <p className="eyebrow">
            {result.crisisSupportRequired ? 'Immediate resources' : 'Request received'}
          </p>
          <h2>
            {result.crisisSupportRequired
              ? 'Please reach out for urgent help now.'
              : 'A licensed therapist will be with you soon.'}
          </h2>
          <p>
            {result.message ??
              `You selected ${result.preferredMode.toLowerCase()} support. We’ll let you know as soon as a therapist accepts.`}
          </p>
          {result.crisisSupportRequired ? (
            <div className="crisis-actions">
              <a className="button" href="tel:112">
                Call local emergency services
              </a>
              <p>If you can, move to a safe place and contact someone you trust nearby.</p>
            </div>
          ) : (
            <div className="queue-details">
              <span>
                <Icon name="lock" /> Your request is private
              </span>
              <span>
                <Icon name="clock" /> Status: {result.status.toLowerCase()}
              </span>
            </div>
          )}
        </section>
      </AppLayout>
    );
  return (
    <AppLayout
      title="What kind of support feels right?"
      subtitle="Share only what you’re comfortable with. You can always change your mind."
    >
      <form className="support-form" onSubmit={submit}>
        <section className="support-step">
          <div className="step-number">1</div>
          <div className="step-content">
            <h2>What’s weighing on you today?</h2>
            <p>This helps us connect you with the right kind of support.</p>
            <div className="topic-grid">
              {topics.map((item) => (
                <button
                  type="button"
                  key={item.value}
                  className={topic === item.value ? 'selected' : ''}
                  onClick={() => setTopic(item.value)}
                >
                  {item.label}
                  {topic === item.value && <Icon name="check" />}
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="support-step">
          <div className="step-number">2</div>
          <div className="step-content">
            <h2>How would you like to connect?</h2>
            <div className="support-mode-grid">
              {modes.map((item) => (
                <button
                  type="button"
                  key={item.value}
                  className={mode === item.value ? 'selected' : ''}
                  onClick={() => setMode(item.value)}
                >
                  <Icon name={item.icon} />
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.copy}</small>
                  </span>
                  {mode === item.value && (
                    <i>
                      <Icon name="check" />
                    </i>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="support-step">
          <div className="step-number">3</div>
          <div className="step-content">
            <h2>Anything you’d like them to know?</h2>
            <p>Optional. Please avoid names, phone numbers, or contact details.</p>
            <textarea
              name="context"
              rows={5}
              maxLength={2000}
              placeholder="A few words about what’s going on…"
            />
          </div>
        </section>
        {mutation.error && (
          <div className="form-error" role="alert">
            {(mutation.error as unknown as ApiError).message ?? 'We could not send your request.'}
          </div>
        )}
        <div className="support-submit">
          <div>
            <Icon name="shield" />
            <span>
              <strong>Private by design</strong>
              <small>Your details are protected.</small>
            </span>
          </div>
          <button className="button" disabled={mutation.isPending}>
            {mutation.isPending ? 'Sending request…' : 'Connect me with a therapist'} <Icon name="arrow" />
          </button>
        </div>
      </form>
    </AppLayout>
  );
}
