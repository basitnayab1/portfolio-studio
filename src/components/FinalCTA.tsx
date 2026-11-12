import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { agency, getProfile, type ProfileId } from '../data/portfolio';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { EASE, Magnetic, Particles } from './fx';
import { SeriesMark } from './Poster';

export default function FinalCTA({ onReplay, profileId }: { onReplay: () => void; profileId?: ProfileId }) {
  const ref = useRef<HTMLElement>(null);
  const p = getProfile(profileId);
  const { scrollTo } = useSmoothScroll();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.2'] });
  const spacing = useTransform(scrollYProgress, [0, 1], ['0.6em', '0.02em']);
  const blur = useTransform(scrollYProgress, [0, 1], ['blur(16px)', 'blur(0px)']);
  const opacity = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  const ctas = [
    { label: `Work With ${p.firstName.split(' ')[0]}`, href: `mailto:${p.email}?subject=${encodeURIComponent(`Project inquiry for ${p.fullName}`)}`, primary: true, cursor: 'play' },
    { label: 'Agency Inquiry', href: `mailto:${agency.email}?subject=${encodeURIComponent("Agency Inquiry - Creative & Tech Systems")}`, primary: false, cursor: 'link' },
    ...(p.links.linkedin ? [{ label: 'LinkedIn', href: p.links.linkedin, primary: false, cursor: 'link' }] : []),
    ...(p.links.github ? [{ label: 'GitHub', href: p.links.github, primary: false, cursor: 'link' }] : []),
  ];

  return (
    <section id="contact" ref={ref} className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(60% 50% at 50% 60%, ${p.color}25, transparent 70%)`,
        }}
      />
      <Particles count={36} />

      <motion.p
        className="relative mb-6 text-[11px] font-bold uppercase tracking-[0.5em] text-crimson-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        The Next Chapter
      </motion.p>
      <motion.h2
        className="relative font-display leading-[0.85] text-bone"
        style={{ fontSize: 'clamp(3.4rem, 13vw, 12rem)', letterSpacing: spacing, filter: blur, opacity }}
      >
        LET&apos;S BUILD.
      </motion.h2>

      <motion.div
        className="relative mt-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
      >
        <p className="font-sans text-2xl font-semibold tracking-[0.2em] text-bone sm:text-3xl">{p.displayName.toUpperCase()}</p>
        <p className="mt-2 text-xs font-semibold tracking-[0.4em] text-mist sm:text-sm">{p.role.toUpperCase()}</p>
      </motion.div>

      <motion.div
        className="relative mt-10 flex flex-wrap justify-center gap-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.08, delayChildren: 0.35 }}
      >
        {ctas.map((c) => (
          <motion.div key={c.label} variants={{ hidden: { opacity: 0, y: 20, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } } }}>
            <Magnetic>
              <a
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                data-cursor={c.cursor}
                className={`flex min-h-12 items-center gap-2 rounded-full px-7 text-sm font-bold tracking-[0.12em] transition ${
                  c.primary ? 'bg-crimson text-white shadow-[0_0_50px_rgba(229,19,43,0.5)] hover:bg-crimson-2' : 'border border-white/25 text-bone hover:border-bone hover:bg-white/10'
                }`}
              >
                {c.primary && <span>▶</span>}
                {c.label.toUpperCase()}
                {!c.primary && <span className="text-mist">↗</span>}
              </a>
            </Magnetic>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative mt-16 flex flex-wrap justify-center gap-6 text-xs font-semibold tracking-[0.24em] text-smoke">
        <button type="button" onClick={() => scrollTo(0, { offset: 0 })} className="hover:text-bone">
          ↺ TOP OF PAGE
        </button>
        <button type="button" onClick={onReplay} className="hover:text-bone">
          ▶ REPLAY CINETRIO INTRO
        </button>
      </div>

      <footer className="absolute inset-x-0 bottom-0 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center">
        <div className="mb-2 text-base">
          <SeriesMark />
        </div>
        <p className="text-[11px] leading-relaxed text-smoke">
          © {new Date().getFullYear()} {agency.name} — Dedicated Agency Leads: Basit Nayab (AI &amp; Dev) • Ahram Ali (Video &amp; Motion) • Muhammad Faraz (Business Development &amp; E-Commerce).
        </p>
      </footer>
    </section>
  );
}
