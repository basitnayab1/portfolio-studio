import type { ReactNode } from 'react';
import type { Palette, Project } from '../data/portfolio';

/**
 * Generated "key art" for thumbnails — layered gradients, light falloff and a motif.
 * No stock imagery: every card is art-directed from its palette.
 */
export function PosterBackdrop({ palette, children, className = '' }: { palette: Palette; children?: ReactNode; className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 85% 10%, ${palette.via} 0%, transparent 60%),
          radial-gradient(90% 80% at 0% 100%, ${palette.from} 0%, transparent 70%),
          linear-gradient(160deg, ${palette.from} 0%, ${palette.to} 100%)`,
      }}
    >
      <div
        aria-hidden
        className="absolute -right-1/4 -top-1/3 h-[140%] w-[70%] rotate-[18deg] opacity-40 blur-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}55, transparent)` }}
      />
      <div aria-hidden className="absolute inset-0 opacity-[0.18] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_4px)]" />
      {children}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
    </div>
  );
}

/** Motif illustrations for each Original, built from the project's own architecture. */
export function ProjectArt({ project, className = '' }: { project: Project; className?: string }) {
  const a = project.palette.accent;
  return (
    <PosterBackdrop palette={project.palette} className={className}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id={`g-${project.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={a} stopOpacity="0.55" />
            <stop offset="100%" stopColor={a} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="290" cy="120" r="130" fill={`url(#g-${project.id})`} />
        {project.motif === 'shield' && (
          <g transform="translate(232 40)" fill="none" stroke={a} strokeOpacity="0.85">
            <path d="M58 0 L116 22 V78 C116 120 90 146 58 160 C26 146 0 120 0 78 V22 Z" strokeWidth="2" />
            <path d="M58 16 L102 33 V78 C102 111 82 132 58 144 C34 132 14 111 14 78 V33 Z" strokeWidth="1" strokeOpacity="0.4" />
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={i} x1="30" x2={i % 2 ? 72 : 86} y1={56 + i * 14} y2={56 + i * 14} strokeWidth="3" strokeLinecap="round" strokeOpacity={0.35 + i * 0.1} />
            ))}
            <path d="M40 124 l12 12 l26 -28" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
        {project.motif === 'flow' && (
          <g fill="none" stroke={a}>
            <rect x="200" y="56" width="150" height="94" rx="12" strokeWidth="2" strokeOpacity="0.85" />
            <rect x="214" y="72" width="28" height="20" rx="4" strokeOpacity="0.7" />
            <line x1="214" x2="330" y1="124" y2="124" strokeWidth="3" strokeOpacity="0.4" strokeDasharray="18 8" />
            <g transform="translate(176 196)" fontFamily="Inter" fontSize="10" fill={a} stroke="none" letterSpacing="2">
              <circle cx="16" cy="16" r="16" fill="none" stroke={a} strokeWidth="2" />
              <path d="M34 16 h46" stroke={a} strokeWidth="2" />
              <circle cx="96" cy="16" r="16" fill="none" stroke={a} strokeWidth="2" strokeOpacity="0.8" />
              <path d="M112 8 l38 -22 M112 24 l38 22" stroke={a} strokeWidth="2" strokeOpacity="0.6" />
              <circle cx="166" cy="-18" r="10" fill={a} fillOpacity="0.8" />
              <circle cx="166" cy="50" r="10" fill="none" stroke={a} strokeWidth="2" strokeOpacity="0.5" />
            </g>
          </g>
        )}
        {project.motif === 'tenants' && (
          <g fill="none" stroke={a}>
            {[0, 1, 2].map((r) =>
              [0, 1, 2, 3].map((c) => (
                <rect
                  key={`${r}-${c}`}
                  x={196 + c * 44}
                  y={50 + r * 44}
                  width="34"
                  height="34"
                  rx="7"
                  strokeWidth="1.6"
                  strokeOpacity={0.25 + ((r + c) % 3) * 0.25}
                  fill={(r + c) % 4 === 0 ? a : 'none'}
                  fillOpacity="0.25"
                />
              )),
            )}
            <path d="M188 200 h190" strokeWidth="2" strokeOpacity="0.7" />
            <path d="M188 214 h190" strokeWidth="1" strokeOpacity="0.35" />
            <path d="M188 228 h190" strokeWidth="1" strokeOpacity="0.2" />
          </g>
        )}
        {project.motif === 'agent' && (
          <g fill="none" stroke={a} transform="translate(180 40)">
            <circle cx="80" cy="80" r="32" strokeWidth="2.5" strokeOpacity="0.9" fill={a} fillOpacity="0.15" />
            <circle cx="80" cy="80" r="16" strokeWidth="1.5" strokeOpacity="0.6" />
            <circle cx="80" cy="80" r="6" fill={a} />
            <circle cx="20" cy="30" r="12" strokeWidth="1.8" strokeOpacity="0.8" />
            <line x1="30" y1="38" x2="56" y2="60" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.6" />
            <circle cx="140" cy="30" r="12" strokeWidth="1.8" strokeOpacity="0.8" />
            <line x1="130" y1="38" x2="104" y2="60" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.6" />
            <circle cx="20" cy="130" r="12" strokeWidth="1.8" strokeOpacity="0.8" />
            <line x1="30" y1="122" x2="56" y2="100" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.6" />
            <circle cx="140" cy="130" r="12" strokeWidth="1.8" strokeOpacity="0.8" />
            <line x1="130" y1="122" x2="104" y2="100" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.6" />
            <path d="M0 160 h160" strokeWidth="1.5" strokeOpacity="0.4" />
          </g>
        )}
        {project.motif === 'video' && (
          <g fill="none" stroke={a} transform="translate(190 40)">
            <rect x="10" y="20" width="140" height="95" rx="8" strokeWidth="2" strokeOpacity="0.85" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect key={i} x={18 + i * 22} y="26" width="10" height="8" rx="2" fill={a} fillOpacity="0.6" />
            ))}
            <polygon points="70,55 70,85 96,70" fill={a} fillOpacity="0.8" strokeWidth="1" />
            <path d="M20 135 C 50 115, 110 115, 140 135" strokeWidth="2" strokeOpacity="0.6" />
            <path d="M10 145 C 50 125, 110 125, 150 145" strokeWidth="1" strokeOpacity="0.3" />
          </g>
        )}
        {project.motif === 'commerce' && (
          <g fill="none" stroke={a} transform="translate(190 40)">
            <path d="M10 25 h20 l18 60 h70 l14 -42 h-94" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.85" />
            <circle cx="58" cy="98" r="8" strokeWidth="2" strokeOpacity="0.9" fill={a} fillOpacity="0.2" />
            <circle cx="108" cy="98" r="8" strokeWidth="2" strokeOpacity="0.9" fill={a} fillOpacity="0.2" />
            <path d="M40 70 L 70 45 L 95 55 L 135 15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
            <polyline points="120,15 135,15 135,30" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" fill="none" />
            <rect x="55" y="32" width="22" height="20" rx="3" strokeWidth="1.2" strokeOpacity="0.6" />
            <rect x="80" y="36" width="20" height="16" rx="3" strokeWidth="1.2" strokeOpacity="0.5" />
          </g>
        )}
      </svg>
    </PosterBackdrop>
  );
}

/** Small fictional platform mark used in the nav and on cards. */
export function SeriesMark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <svg viewBox="0 0 24 32" className="h-[1.1em] w-auto" aria-hidden>
        <path d="M18 6c-1.8-1.8-4-2.6-6.5-2.6C7.6 3.4 5 5.6 5 9c0 7.6 14 4.6 14 11.6 0 3-2.8 5-6.4 5-3 0-5.4-1.2-7.2-3" fill="none" stroke="#e5132b" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span className="font-sans text-[0.62em] font-bold tracking-[0.36em] text-mist">SERIES</span>
    </span>
  );
}
