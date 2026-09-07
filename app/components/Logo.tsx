export function LogoMark({ size = 28, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="15" stroke={color} strokeWidth="1.2" />
      <path
        d="M17.5 6.5L10 17h5l-1.2 8.5L22 14h-5l.5-7.5z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function Logo({ color = "currentColor" }: { color?: string }) {
  return (
    <div className="flex items-center gap-2.5" style={{ color }}>
      <LogoMark color={color} />
      <div className="leading-none">
        <div className="text-[17px] font-medium tracking-[-.02em]">Strøm</div>
        <div className="mt-0.5 text-[10px] tracking-[.24em] uppercase opacity-60">
          Electric Co.
        </div>
      </div>
    </div>
  );
}
