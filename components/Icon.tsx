export type IconName =
  | "check"
  | "chart"
  | "compass"
  | "gear"
  | "shield"
  | "layers"
  | "arrow-left"
  | "arrow-up"
  | "mail"
  | "pin"
  | "user"
  | "target"
  | "trend"
  | "handshake"
  | "document"
  | "phone"
  | "whatsapp"
  | "sun"
  | "moon";

const icons: Record<IconName, React.ReactNode> = {
  check: <path d="M20 6 9 17l-5-5" />,
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="m7 15 4-4 3 3 5-6" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6z" />
      <path d="m9.5 12 1.8 1.8 3.2-3.6" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 4.5-9 4.5-9-4.5z" />
      <path d="m3 12.5 9 4.5 9-4.5" />
      <path d="m3 16.5 9 4.5 9-4.5" />
    </>
  ),
  "arrow-left": <path d="M19 12H5m6-7-7 7 7 7" />,
  "arrow-up": <path d="M12 19V5m-7 7 7-7 7 7" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m3 8 9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.2-3.6 4.3-5.5 8-5.5s6.8 1.9 8 5.5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" />
    </>
  ),
  trend: (
    <>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  handshake: (
    <>
      <path d="m11 17 2 2a1.5 1.5 0 0 0 2.1 0M10 14l1.5 1.5a1.5 1.5 0 0 0 2.1 0" />
      <path d="M3 8.5 8 5l4 2.5L16 5l5 3.5" />
      <path d="M3 15.5 8 12l4 2.5 4-2.5 5 3.5" />
    </>
  ),
  document: (
    <>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5" />
      <path d="M10 13h5m-5 4h5" />
    </>
  ),
  phone: (
    <>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />,
  whatsapp: (
    <>
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3z" />
      <path d="M8.8 8.2c-.3 0-.6.3-.6.8 0 1.6 1.1 3.6 2.6 4.6 1 .7 1.9 1 2.5 1 .5 0 .7-.4.7-.9v-.8c0-.3-.2-.5-.5-.6l-1.2-.5c-.2-.1-.4 0-.6.2l-.4.5c-.8-.4-1.5-1.1-1.9-1.9l.5-.4c.2-.2.3-.4.2-.6l-.5-1.2c-.1-.3-.3-.5-.6-.5h-1.7z" />
    </>
  ),
};

export function Icon({
  name,
  size = 20,
  strokeWidth = 1.7,
  className = "",
  "aria-hidden": ariaHidden = true,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
  "aria-hidden"?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`ico ${className}`.trim()}
      aria-hidden={ariaHidden}
    >
      {icons[name]}
    </svg>
  );
}