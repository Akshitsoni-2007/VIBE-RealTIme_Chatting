import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NotFound = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [glitchActive, setGlitchActive] = useState(false);

  // Background follows the mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Periodic glitch effect
  useEffect(() => {
    let glitchTimeout;

    const triggerGlitch = () => {
      setGlitchActive(true);

      clearTimeout(glitchTimeout);

      glitchTimeout = setTimeout(() => {
        setGlitchActive(false);
      }, 350);
    };

    const initialTimeout = setTimeout(triggerGlitch, 500);
    const interval = setInterval(triggerGlitch, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
      clearTimeout(glitchTimeout);
    };
  }, []);

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
      style={{ background: '#070a13' }}
    >
      {/* Animated gradient orbs */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ filter: 'blur(120px)', opacity: 0.5 }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: '45vw',
            height: '45vw',
            maxWidth: '600px',
            maxHeight: '600px',
            background:
              'radial-gradient(circle, #5a5fdb 0%, transparent 70%)',
            left: `${mousePos.x * 0.3 + 5}%`,
            top: `${mousePos.y * 0.3 + 5}%`,
            transition: 'left 1.5s ease-out, top 1.5s ease-out',
          }}
        />

        <div
          className="absolute rounded-full"
          style={{
            width: '35vw',
            height: '35vw',
            maxWidth: '500px',
            maxHeight: '500px',
            background:
              'radial-gradient(circle, #6d8bf4 0%, transparent 70%)',
            right: `${(100 - mousePos.x) * 0.2 + 10}%`,
            bottom: `${(100 - mousePos.y) * 0.2 + 10}%`,
            transition: 'right 2s ease-out, bottom 2s ease-out',
          }}
        />

        <div
          className="absolute rounded-full"
          style={{
            width: '25vw',
            height: '25vw',
            maxWidth: '350px',
            maxHeight: '350px',
            background:
              'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
            left: '55%',
            top: '20%',
            animation: 'notfound-float 8s ease-in-out infinite',
          }}
        />
      </div>

      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Glitching 404 */}
        <div className="relative mb-2 select-none">
          <h1
            className="font-black leading-none tracking-tighter"
            style={{
              fontSize: 'clamp(8rem, 20vw, 14rem)',
              background:
                'linear-gradient(135deg, #5a5fdb 0%, #6d8bf4 40%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: glitchActive
                ? 'drop-shadow(0 0 20px rgba(0, 229, 255, 0.45))'
                : 'drop-shadow(0 0 35px rgba(90, 95, 219, 0.55))',
            }}
          >
            404
          </h1>

          {glitchActive && (
            <>
              {/* Red/pink glitch slice */}
              <h1
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 font-black leading-none tracking-tighter"
                style={{
                  fontSize: 'clamp(8rem, 20vw, 14rem)',
                  background:
                    'linear-gradient(135deg, #ff0055 0%, #ff1744 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  clipPath: 'inset(10% 0 65% 0)',
                  filter:
                    'drop-shadow(0 0 12px rgba(255, 0, 85, 0.8))',
                  animation:
                    'notfound-glitch-red 350ms steps(2, end) infinite',
                }}
              >
                404
              </h1>

              {/* Cyan glitch slice */}
              <h1
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 font-black leading-none tracking-tighter"
                style={{
                  fontSize: 'clamp(8rem, 20vw, 14rem)',
                  background:
                    'linear-gradient(135deg, #00e5ff 0%, #00ffc8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  clipPath: 'inset(60% 0 15% 0)',
                  filter:
                    'drop-shadow(0 0 12px rgba(0, 229, 255, 0.8))',
                  animation:
                    'notfound-glitch-cyan 350ms steps(2, end) infinite',
                }}
              >
                404
              </h1>
            </>
          )}
        </div>

        {/* Information card */}
        <div
          className="max-w-md rounded-3xl border border-white/10 px-10 py-8"
          style={{
            background: 'rgba(10, 11, 22, 0.5)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 0 60px -15px rgba(75, 85, 150, 0.3)',
          }}
        >
          <h2 className="mb-3 text-2xl font-bold tracking-wide text-white">
            Lost in the Void
          </h2>

          <p className="mb-8 text-[0.95rem] leading-relaxed text-gray-400">
            The page you're looking for has drifted into another dimension.
            Let's get you back to familiar territory.
          </p>

          <Link
            to="/"
            className="group relative inline-flex items-center justify-center space-x-2 rounded-2xl px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 active:scale-95"
            style={{
              background:
                'linear-gradient(135deg, #5a5fdb 0%, #6d8bf4 100%)',
              boxShadow: '0 4px 20px rgba(90, 95, 219, 0.35)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                'linear-gradient(135deg, #4b50c4 0%, #5c7ae0 100%)';

              e.currentTarget.style.boxShadow =
                '0 6px 30px rgba(90, 95, 219, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                'linear-gradient(135deg, #5a5fdb 0%, #6d8bf4 100%)';

              e.currentTarget.style.boxShadow =
                '0 4px 20px rgba(90, 95, 219, 0.35)';
            }}
          >
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>

            <span>Go Home</span>
          </Link>
        </div>

        {/* Floating particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${4 + i * 2}px`,
                height: `${4 + i * 2}px`,
                background: `rgba(${109 + i * 15}, ${139 + i * 10}, 244, ${0.2 + i * 0.05})`,
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animation: `notfound-particle ${4 + i * 1.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.7}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes notfound-float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(2deg);
          }
          66% {
            transform: translateY(10px) rotate(-1deg);
          }
        }

        @keyframes notfound-particle {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-30px) translateX(15px) scale(1.4);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-60px) translateX(-10px) scale(0.8);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-30px) translateX(20px) scale(1.2);
            opacity: 0.6;
          }
        }

        @keyframes notfound-glitch-red {
          0% {
            transform: translate(-8px, -3px) skewX(-2deg);
            clip-path: inset(10% 0 65% 0);
          }
          25% {
            transform: translate(10px, 2px) skewX(4deg);
            clip-path: inset(35% 0 45% 0);
          }
          50% {
            transform: translate(-5px, -1px) skewX(-4deg);
            clip-path: inset(65% 0 15% 0);
          }
          75% {
            transform: translate(12px, 3px) skewX(2deg);
            clip-path: inset(20% 0 60% 0);
          }
          100% {
            transform: translate(-8px, -3px) skewX(-2deg);
            clip-path: inset(10% 0 65% 0);
          }
        }

        @keyframes notfound-glitch-cyan {
          0% {
            transform: translate(8px, 3px) skewX(2deg);
            clip-path: inset(60% 0 15% 0);
          }
          25% {
            transform: translate(-10px, -2px) skewX(-4deg);
            clip-path: inset(15% 0 70% 0);
          }
          50% {
            transform: translate(6px, 2px) skewX(4deg);
            clip-path: inset(40% 0 35% 0);
          }
          75% {
            transform: translate(-12px, -3px) skewX(-2deg);
            clip-path: inset(70% 0 10% 0);
          }
          100% {
            transform: translate(8px, 3px) skewX(2deg);
            clip-path: inset(60% 0 15% 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;