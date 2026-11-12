import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { agency, viewerProfiles, type ProfileId } from '../data/portfolio';
import { EASE } from './fx';

export function ProfileAvatar({ id, size = 'lg' }: { id: ProfileId; size?: 'sm' | 'lg' }) {
  const p = viewerProfiles.find((v) => v.id === id) || viewerProfiles[0];
  const box = size === 'lg' ? 'h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 rounded-2xl' : 'h-8 w-8 rounded-lg';

  const glyph = p.glyph || (id === 'basit' ? '</>' : id === 'ahram' ? '✦' : '🛒');
  const gradient =
    id === 'basit'
      ? 'radial-gradient(circle at 50% 30%, #7a0f24, #1a0509 90%)'
      : id === 'ahram'
      ? 'radial-gradient(circle at 50% 30%, #4c1d95, #130324 90%)'
      : 'radial-gradient(circle at 50% 30%, #064e3b, #031c15 90%)';

  if (p.avatarImg) {
    return (
      <span
        className={`relative block overflow-hidden shadow-2xl transition-all duration-300 ${box}`}
        style={{
          background: gradient,
          boxShadow: `0 8px 30px ${p.color}40`,
        }}
      >
        <img
          src={p.avatarImg}
          alt={p.name}
          className="absolute inset-x-0 bottom-0 mx-auto h-[115%] w-auto max-w-none object-cover object-top"
        />
        <span className="absolute inset-0 rounded-2xl ring-1 ring-white/20" />
      </span>
    );
  }

  return (
    <span
      className={`relative flex items-center justify-center overflow-hidden font-display text-bone shadow-2xl transition-all duration-300 ${box}`}
      style={{
        background: gradient,
        boxShadow: `0 8px 30px ${p.color}33`,
      }}
    >
      <span
        aria-hidden
        className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:12px_12px]"
      />
      <span className="absolute inset-0 rounded-2xl ring-1 ring-white/20" />
      <span className={`relative font-display tracking-wider ${size === 'lg' ? 'text-4xl sm:text-5xl' : 'text-sm'}`}>
        {glyph}
      </span>
    </span>
  );
}

export default function ProfileSelector({ onPick }: { onPick: (id: ProfileId) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onPick('basit');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onPick]);

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center overflow-y-auto bg-ink px-4 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
      transition={{ duration: 0.7, ease: EASE }}
      role="dialog"
      aria-label="Who's watching?"
    >
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(229,19,43,0.18),transparent_70%)]" />

      <motion.p
        className="relative mb-3 text-xs font-bold uppercase tracking-[0.4em] text-crimson-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {agency.seriesTag} • AGENCY PROFILES
      </motion.p>

      <motion.h2
        className="relative mb-3 text-center font-sans text-3xl font-medium tracking-tight text-bone sm:text-5xl"
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        Who&apos;s watching?
      </motion.h2>

      <motion.p
        className="relative mb-10 max-w-md text-center text-xs text-mist sm:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Choose a dedicated specialist to explore their projects, skills &amp; track record.
      </motion.p>

      <motion.ul
        className="relative grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8 max-w-4xl"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      >
        {viewerProfiles.map((p) => (
          <motion.li key={p.id} variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}>
            <button
              type="button"
              onClick={() => onPick(p.id)}
              data-cursor="play"
              className="group flex flex-col items-center gap-3 text-center p-3 rounded-2xl transition hover:bg-white/[0.04]"
            >
              <span className="relative rounded-2xl ring-2 ring-transparent transition duration-300 group-hover:scale-105 group-hover:ring-bone group-focus-visible:ring-bone">
                <ProfileAvatar id={p.id} />
                <span
                  className="absolute -right-2 -top-2 rounded-full px-2.5 py-0.5 text-[9px] font-bold tracking-[0.16em] text-white shadow-lg"
                  style={{ backgroundColor: p.color }}
                >
                  {p.badge}
                </span>
              </span>
              <span className="font-sans text-base font-bold text-bone transition group-hover:text-white sm:text-lg">
                {p.name}
              </span>
              <span className="text-xs font-semibold text-mist -mt-2">
                {p.role}
              </span>
              <span className="max-w-[12rem] text-[11px] leading-snug text-smoke">
                {p.blurb}
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      <p className="relative mt-12 max-w-md text-center text-xs leading-relaxed text-smoke">
        Agency Specialization: Full-Stack &amp; AI Engineering • Video &amp; Motion Graphics • Business Development &amp; E-Commerce
      </p>
    </motion.div>
  );
}
