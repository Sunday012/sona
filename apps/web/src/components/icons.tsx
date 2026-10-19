import type { SVGProps } from 'react';

type IconName =
  | 'arrow'
  | 'audio'
  | 'calendar'
  | 'chat'
  | 'check'
  | 'chevron'
  | 'clock'
  | 'heart'
  | 'home'
  | 'lock'
  | 'menu'
  | 'message'
  | 'shield'
  | 'sparkle'
  | 'user'
  | 'video';

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    audio: (
      <>
        <path d="M12 3v10.5a3.5 3.5 0 1 1-2-3.15V6l8-2v7.5a3.5 3.5 0 1 1-2-3.15V4.5L12 5.6" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M8 3v4m8-4v4M3 10h18" />
      </>
    ),
    chat: (
      <>
        <path d="M20 15a4 4 0 0 1-4 4H8l-5 2 1.6-4.2A7 7 0 0 1 3 12V8a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4z" />
        <path d="M8 10h8M8 14h5" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    heart: (
      <path d="M20.8 5.7a5.5 5.5 0 0 0-7.8 0L12 6.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v11h14V10M9 21v-7h6v7" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="3" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    message: (
      <>
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 2 1.6-4.2A7 7 0 0 1 3 12V8a4 4 0 0 1 4-4h13z" />
        <circle cx="8" cy="11" r=".5" />
        <circle cx="12" cy="11" r=".5" />
        <circle cx="16" cy="11" r=".5" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 4.5 6v5.2c0 4.8 3.1 8.2 7.5 9.8 4.4-1.6 7.5-5 7.5-9.8V6z" />
        <path d="m9 12 2 2 4-5" />
      </>
    ),
    sparkle: (
      <>
        <path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4z" />
        <path d="m18 14 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    video: (
      <>
        <rect x="3" y="6" width="13" height="12" rx="3" />
        <path d="m16 10 5-3v10l-5-3" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
