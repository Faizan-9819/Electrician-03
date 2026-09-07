export type IconName =
  | "tooth"
  | "sparkle"
  | "implant"
  | "whitening"
  | "aligner"
  | "emergency"
  | "shield"
  | "heart"
  | "star"
  | "check"
  | "chevronDown"
  | "chevronRight"
  | "chevronLeft"
  | "plus"
  | "minus"
  | "phone"
  | "mail"
  | "pin"
  | "clock"
  | "arrowUR"
  | "arrowRight"
  | "play"
  | "quote"
  | "burger"
  | "close"
  | "spark"
  | "calendar"
  | "leaf"
  | "award"
  | "wallet"
  | "chair"
  | "smile"
  | "bolt"
  | "bulb"
  | "panel"
  | "gauge"
  | "building"
  | "smart"
  | "ev"
  | "tools";

type IconProps = {
  name: IconName;
  size?: number;
  stroke?: number;
  className?: string;
  style?: React.CSSProperties;
};

const PATHS: Record<IconName, React.ReactNode> = {
  tooth: (
    <path d="M7.5 3.5c-2.2 0-3.8 1.6-3.8 4 0 1.6.6 2.4 1 4 .5 2 .2 4 .8 6.5.5 2 1.6 3.5 2.5 3.5 1 0 1.2-1.5 1.5-3.5.3-2 .5-3.5 2-3.5s1.7 1.5 2 3.5c.3 2 .5 3.5 1.5 3.5.9 0 2-1.5 2.5-3.5.6-2.5.3-4.5.8-6.5.4-1.6 1-2.4 1-4 0-2.4-1.6-4-3.8-4-1.7 0-2.7.9-4 .9s-2.3-.9-4-.9z" />
  ),
  sparkle: (
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
  ),
  implant: (
    <>
      <path d="M12 3l2 3.5h-4L12 3z" />
      <rect x="9" y="6.5" width="6" height="6" rx="1.5" />
      <path d="M10 12.5v3M12 12.5v5M14 12.5v3" />
    </>
  ),
  whitening: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M9 10.5c.8-1.2 4.2-1.2 5 0M9 14c.5.8 4.5.8 5 0" />
    </>
  ),
  aligner: (
    <path d="M4 9c0-2 1-4 4-4 2 0 2.5 1.5 4 1.5S14 5 16 5c3 0 4 2 4 4 0 1.5-.5 2-.8 3-.3 1.2-.2 3.5-.7 5-.3 1-1 2-1.7 2s-1-1-1.3-2.5c-.3-1.5-.5-2.5-1.5-2.5s-1.2 1-1.5 2.5C12.2 18 11.5 19 11 19s-1.2-1-1.5-2.5C9.2 15 9 14 8 14s-1.2 1-1.5 2.5C6.2 18 5.5 19 5 19s-1.4-1-1.7-2c-.5-1.5-.4-3.8-.7-5C2.3 11 1.8 10.5 1.8 9" />
  ),
  emergency: <path d="M12 2l2.5 4 4.5.6-3.2 3.1.8 4.5L12 12l-4.5 2.2.8-4.5L5 6.6l4.5-.6L12 2z" />,
  shield: (
    <>
      <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  heart: <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" />,
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z" />,
  check: <path d="M4 12l5 5L20 6" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  chevronLeft: <path d="M15 6l-6 6 6 6" />,
  plus: <path d="M5 12h14M12 5v14" />,
  minus: <path d="M5 12h14" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  arrowUR: <path d="M7 17L17 7M9 7h8v8" />,
  arrowRight: <path d="M5 12h14M13 5l7 7-7 7" />,
  play: <path d="M8 5l11 7-11 7V5z" />,
  quote: <path d="M7 7h4v4c0 3-2 5-5 5M14 7h4v4c0 3-2 5-5 5" />,
  burger: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  spark: (
    <>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <path d="M12 7l1.4 3.6L17 12l-3.6 1.4L12 17l-1.4-3.6L7 12l3.6-1.4L12 7z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z" />
      <path d="M5 19l8-8" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13.5L7 21l5-2 5 2-2-7.5" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M3 10h18M16 14h2" />
    </>
  ),
  chair: (
    <>
      <path d="M5 20v-3M19 20v-3M6 17h12M7 6c0-1.5 1-2 2.5-2H14c1.5 0 2.5.5 2.5 2v8H7V6z" />
      <path d="M7 14h10v3H7z" />
    </>
  ),
  smile: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 14c1 1.5 2.5 2 4 2s3-.5 4-2" />
      <circle cx="9" cy="10" r=".8" fill="currentColor" />
      <circle cx="15" cy="10" r=".8" fill="currentColor" />
    </>
  ),
  bolt: <path d="M13 2L5 13h5l-1 9 8-12h-5l1-8z" />,
  bulb: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 00-4 10.5c.7.7 1 1.4 1 2.5h6c0-1.1.3-1.8 1-2.5A6 6 0 0012 3z" />
    </>
  ),
  panel: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 7h6M9 11h6M9 15h3" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 17a8 8 0 0116 0" />
      <path d="M12 17l4.5-3.5" />
      <circle cx="12" cy="17" r="1.2" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M8 7h2M14 7h2M8 11h2M14 11h2M10 21v-3.5h4V21" />
    </>
  ),
  smart: (
    <>
      <path d="M4 11l8-6 8 6M6 9.5V19h12V9.5" />
      <circle cx="12" cy="14" r="2.2" />
    </>
  ),
  ev: (
    <>
      <rect x="2.5" y="11" width="12.5" height="6" rx="1.5" />
      <path d="M4.5 11l1.5-3.6h6L14 11M6 19v-2M11.5 19v-2" />
      <path d="M18.5 8.5v5a1.8 1.8 0 001.8 1.8M20.3 8.5v3" />
    </>
  ),
  tools: (
    <path d="M14.5 6.5a3.4 3.4 0 00-4.5 4.5l-6 6 2 2 6-6a3.4 3.4 0 004.5-4.5l-2.2 2.2-2-2 2.2-2.2z" />
  ),
};

export default function Icon({ name, size = 20, stroke = 1.5, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {PATHS[name] ?? null}
    </svg>
  );
}
