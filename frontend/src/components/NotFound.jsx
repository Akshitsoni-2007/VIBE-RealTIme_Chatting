import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-ink-950 px-6">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[26rem] w-[26rem] rounded-full bg-accent-500/[0.09] blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 grain" />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute select-none font-serif text-[clamp(13rem,34vw,26rem)] leading-none text-white/[0.035]"
      >
        404
      </span>

      <div className="anim-rise relative z-10 w-full max-w-md text-center">
        <Link to="/" className="mb-9 inline-flex items-center gap-2.5">
          <img
            src="/VIBE_Favicon.png"
            alt=""
            className="h-9 w-9 rounded-[10px] object-contain ring-1 ring-white/10"
          />
          <span className="font-serif text-[24px] leading-none text-mist-50">
            VIBE
          </span>
        </Link>

        <p className="text-2xs font-semibold uppercase tracking-[0.28em] text-mist-500">
          Error 404
        </p>
        <h1 className="mt-3 font-serif text-[clamp(2.25rem,6vw,3rem)] leading-[1.05] text-mist-50">
          This page drifted off.
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-[13.5px] leading-relaxed text-mist-500">
          The page you're looking for isn't here. It may have moved, or the link
          may be out of date.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
          <Link to="/" className="btn-primary w-full sm:w-auto">
            Back to messages
          </Link>
          <Link to="/login" className="btn-quiet w-full sm:w-auto">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
