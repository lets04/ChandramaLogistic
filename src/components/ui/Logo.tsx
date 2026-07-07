import logo from "../../assets/images/logoR.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#inicio" className={`flex min-w-0 items-center gap-2 sm:gap-3 ${className}`}>
      <img
        src={logo}
        alt="Chandrama Logistic"
        className="h-12 w-auto sm:h-16 lg:h-20"
      />

      <div className="min-w-0 leading-tight">
        <span className="block font-heading text-base font-bold text-white sm:text-lg">
          Chandrama
        </span>

        <span className="block text-[10px] tracking-widest text-accent-light sm:text-xs">
          LOGISTIC S.R.L.
        </span>
      </div>
    </a>
  );
}
