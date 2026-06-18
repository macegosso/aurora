/** The Aurora mark — concentric orb with the signature aurora gradient. */
export function Mark({ size = 26, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <radialGradient id="aurora-mark" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#34e3c4" />
          <stop offset="55%" stopColor="#9d8bff" />
          <stop offset="100%" stopColor="#ff5fa8" />
        </radialGradient>
      </defs>
      <circle cx="13" cy="13" r="13" fill="#11142a" />
      <circle cx="13" cy="13" r="9" fill="url(#aurora-mark)" opacity="0.4" />
      <circle cx="13" cy="13" r="5" fill="url(#aurora-mark)" />
    </svg>
  );
}
