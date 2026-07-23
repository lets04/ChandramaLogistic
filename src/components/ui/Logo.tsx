import logo from "../../assets/images/logoR.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#inicio"
      className={`flex items-center gap-3 ${className}`}
    >
      <img
        src={logo}
        alt="Chandrama Logistic"
        className="h-14 w-auto sm:h-18 lg:h-22"
      />

      <div className="flex flex-col justify-center leading-tight">
        <span className="font-heading text-xl font-bold text-white sm:text-2xl lg:text-2xl">
          CHANDRAMA
        </span>

        <span className="text-sm tracking-[0.25em] text-accent-light sm:text-base lg:text-lg">
          LOGISTIC S.R.L.
        </span>
      </div>
    </a>
  );
}