export function Logo({ size = 28 }: { size?: number }) {
  return (
    <span className="flex items-center gap-3">
      <svg
        width={size}
        height={size}
        viewBox="0 0 60 60"
        style={{ overflow: 'visible', display: 'block', flexShrink: 0 }}
        aria-hidden="true"
      >
        <path
          d="M 49.05 19 A 22 22 0 0 1 50.67 37.52"
          fill="none"
          stroke="#14170F"
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="1"
        />
        <path
          d="M 50.67 37.52 A 22 22 0 0 1 37.52 50.67"
          fill="none"
          stroke="#14170F"
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="0.82"
        />
        <path
          d="M 37.52 50.67 A 22 22 0 0 1 19 49.05"
          fill="none"
          stroke="#14170F"
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="0.64"
        />
        <path
          d="M 19 49.05 A 22 22 0 0 1 8.33 33.82"
          fill="none"
          stroke="#14170F"
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="0.46"
        />
        <path
          d="M 8.33 33.82 A 22 22 0 0 1 13.15 15.86"
          fill="none"
          stroke="#14170F"
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="0.28"
        />
        <path
          d="M 13.15 15.86 A 22 22 0 0 1 30 8"
          fill="none"
          stroke="#14170F"
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="0.1"
        />
        <circle cx="32.3" cy="4.1" r="1.8" fill="#2563EB" opacity="0.75" />
        <circle cx="41.8" cy="4.6" r="1.3" fill="#2563EB" opacity="0.5" />
        <circle cx="49.1" cy="10.9" r="0.9" fill="#2563EB" opacity="0.3" />
      </svg>
      <span
        className="font-display font-bold tracking-tight text-txt"
        style={{ fontSize: size === 28 ? '19px' : '17px', letterSpacing: '-0.01em' }}
      >
        dissolve<span className="text-acid">labs</span>
      </span>
    </span>
  );
}
