function LogoIcon({ className = 'h-9 w-9 sm:h-10 sm:w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="10" fill="#7CB518" />
      <path
        d="M8 32h32M12 22h24M16 12h16"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="36" cy="32" r="5" fill="#FFFFFF" />
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="#inicio" className={`flex min-w-0 items-center gap-2 sm:gap-3 ${className}`}>
      <LogoIcon />
      <div className="min-w-0 leading-tight">
        <span className="block truncate font-heading text-base font-bold text-white sm:text-lg md:text-xl">
          Chandrama
        </span>
        <span className="block text-[10px] font-medium tracking-wider text-accent-light sm:text-xs md:text-sm">
          LOGISTIC
        </span>
      </div>
    </a>
  )
}
