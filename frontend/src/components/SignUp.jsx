import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Blobatar } from "blobatar/react";

const GENDERS = ["male", "female"];

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const navigate = useNavigate();

  const updateField = (field) => (event) => {
    setUser((current) => ({ ...current, [field]: event.target.value }));
    if (field === "confirmPassword" || field === "password") setConfirmError("");
  };

  const handleCheckBox = (selectedGender) => {
    setUser((current) => ({
      ...current,
      gender: current.gender === selectedGender ? "" : selectedGender,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setFormError("");

    if (user.password !== user.confirmPassword) {
      setConfirmError("Passwords don't match yet.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/register`,
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      setFormError(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-dvh w-full bg-ink-950 lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <aside className="relative hidden overflow-hidden lg:block">
        <img
          src="/Moonlit_bg.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/10" />
        <div className="pointer-events-none absolute inset-0 grain" />

        <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/VIBE_Favicon.png"
              alt=""
              className="h-9 w-9 rounded-[10px] object-contain ring-1 ring-white/15"
            />
            <span className="font-serif text-[26px] leading-none text-white">
              VIBE
            </span>
          </Link>

          <div className="max-w-[30rem]">
            <p className="text-2xs font-medium uppercase tracking-[0.28em] text-mist-300/75">
              Join the conversation
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.6rem,3.4vw,3.5rem)] leading-[1.02] text-white">
              Every conversation
              <br />
              starts somewhere.
            </h2>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-mist-300/80">
              Create an account, pick a name, and your avatar draws itself. Then
              say hello.
            </p>
          </div>

          <p className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-mist-500">
            VIBE · Connect. Chat. Vibe.
          </p>
        </div>
      </aside>

      <main className="relative flex min-h-dvh flex-col justify-center px-5 py-10 sm:px-10">
        <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-accent-500/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[380px]">
          <Link to="/" className="mb-7 inline-flex items-center gap-2.5 lg:hidden">
            <img
              src="/VIBE_Favicon.png"
              alt=""
              className="h-8 w-8 rounded-[9px] object-contain ring-1 ring-white/10"
            />
            <span className="font-serif text-[22px] leading-none text-mist-50">
              VIBE
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-ink-800 ring-1 ring-white/10">
              <Blobatar
                name={user.fullname || user.username || "VIBE"}
                size={56}
                background="circle"
                alt=""
              />
            </span>
            <div className="min-w-0">
              <h1 className="font-serif text-[32px] leading-tight text-mist-50">
                Create your account.
              </h1>
              <p className="mt-1 text-[13px] leading-snug text-mist-500">
                Your avatar is drawn from your name.
              </p>
            </div>
          </div>

          <form className="mt-8 space-y-4" onSubmit={onSubmitHandler}>
            <div>
              <label htmlFor="signup-fullname" className="field-label">
                Full name
              </label>
              <input
                id="signup-fullname"
                name="fullname"
                type="text"
                autoComplete="name"
                required
                value={user.fullname}
                onChange={updateField("fullname")}
                placeholder="Sam Rivera"
                className="field"
              />
            </div>

            <div>
              <label htmlFor="signup-username" className="field-label">
                Username
              </label>
              <input
                id="signup-username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={user.username}
                onChange={updateField("username")}
                placeholder="sam"
                className="field"
              />
            </div>

            <div>
              <label htmlFor="signup-password" className="field-label">
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={user.password}
                  onChange={updateField("password")}
                  placeholder="Choose a password"
                  className="field pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="icon-btn absolute right-1.5 top-1/2 h-9 w-9 -translate-y-1/2"
                >
                  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {showPassword ? (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </>
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="signup-confirm" className="field-label">
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="signup-confirm"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={user.confirmPassword}
                  onChange={updateField("confirmPassword")}
                  placeholder="Repeat your password"
                  aria-invalid={Boolean(confirmError)}
                  aria-describedby={confirmError ? "confirm-error" : undefined}
                  className="field pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  aria-pressed={showConfirmPassword}
                  className="icon-btn absolute right-1.5 top-1/2 h-9 w-9 -translate-y-1/2"
                >
                  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {showConfirmPassword ? (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </>
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    )}
                  </svg>
                </button>
              </div>

              {confirmError && (
                <p id="confirm-error" role="alert" className="mt-1.5 text-[12px] text-red-300">
                  {confirmError}
                </p>
              )}
            </div>

            <div role="group" aria-labelledby="gender-label">
              <span id="gender-label" className="field-label">
                Gender
              </span>
              <div className="grid grid-cols-2 gap-2">
                {GENDERS.map((gender) => {
                  const selected = user.gender === gender;
                  return (
                    <button
                      key={gender}
                      type="button"
                      onClick={() => handleCheckBox(gender)}
                      aria-pressed={selected}
                      className={`h-11 rounded-xl border text-[13.5px] font-medium capitalize transition-colors duration-150 active:scale-[0.99] ${
                        selected
                          ? "border-accent-400/60 bg-accent-500/15 text-mist-50"
                          : "border-line bg-ink-850 text-mist-400 hover:border-line-strong hover:text-mist-200"
                      }`}
                    >
                      {gender}
                    </button>
                  );
                })}
              </div>
            </div>

            {formError && (
              <div
                role="alert"
                className="anim-fade flex items-start gap-2.5 rounded-xl border border-red-400/25 bg-red-500/[0.07] px-3.5 py-3 text-[13px] leading-snug text-red-200"
              >
                <svg className="mt-px h-4 w-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v4m0 4h.01M10.3 3.9 1.9 18a2 2 0 0 0 1.7 3h16.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                </svg>
                {formError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary mt-2 h-12 w-full"
            >
              {isSubmitting ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.3" />
                    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  Creating account…
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p className="mt-7 text-center text-[13px] text-mist-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-accent-300 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
