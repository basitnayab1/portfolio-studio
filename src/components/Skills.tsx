import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getProfile, type ProfileId, type Skill } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';

const HUES = ['#ff3d5a', '#4cc9ff', '#46e3a8', '#ffb547', '#b98bff', '#ff8a5c', '#7ee0ff'];

export default function Skills({ profileId }: { profileId?: ProfileId }) {
  const p = getProfile(profileId);
  const categories = p.skillCategories;
  const [cat, setCat] = useState(0);
  const safeIndex = Math.min(cat, categories.length - 1);
  const category = categories[safeIndex] || categories[0];
  const hue = HUES[safeIndex % HUES.length];

  return (
    <>
      <SectionHeading
        kicker="Stack & Disciplines"
        title={`${p.firstName}'s Skill Universe`}
        aside={<p className="max-w-xs text-sm text-mist">Explore technical capabilities, software tools, and production workflows.</p>}
      />

      <div className="gutter grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
        {/* genre list */}
        <div className="rail -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0" role="tablist" aria-label="Skill categories">
          {categories.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={i === safeIndex}
              onClick={() => setCat(i)}
              className={`group relative shrink-0 rounded-lg px-4 py-3 text-left transition lg:px-5 ${i === safeIndex ? 'text-bone' : 'text-smoke hover:text-bone'}`}
            >
              {i === safeIndex && <motion.span layoutId="skill-tab" className="absolute inset-0 rounded-lg bg-white/[0.07] ring-1 ring-white/10" transition={{ duration: 0.45, ease: EASE }} />}
              {i === safeIndex && <motion.span layoutId="skill-bar" className="absolute bottom-2 left-0 top-2 hidden w-[3px] rounded lg:block" style={{ background: hue }} />}
              <span className="relative block font-display text-2xl tracking-wide lg:text-3xl">{c.title}</span>
              <span className="relative hidden text-xs text-smoke lg:block">
                {c.skills.length} skills · {c.subtitle}
              </span>
            </button>
          ))}
        </div>

        {/* skill cards */}
        <div className="min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div key={category.id} initial="hidden" animate="show" exit="exit" transition={{ staggerChildren: 0.05 }}>
              <motion.p
                className="mb-5 text-sm text-mist"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } }}
              >
                <span className="font-semibold text-bone">{category.title}</span> — {category.subtitle}
              </motion.p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {category.skills.map((s) => (
                  <SkillCard key={s.name} skill={s} hue={hue} evidence={p.skillEvidence[s.name]} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

function SkillCard({ skill, hue, evidence }: { skill: Skill; hue: string; evidence?: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.button
      type="button"
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.94, filter: 'blur(6px)' },
        show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.55, ease: EASE } },
        exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
      }}
      whileHover={{ y: -6 }}
      className="group relative flex min-h-[148px] flex-col overflow-hidden rounded-xl bg-ink-2 p-4 text-left ring-1 ring-white/10 transition-shadow duration-500 hover:ring-white/20"
      style={{ boxShadow: open ? `0 18px 50px -12px ${hue}55, 0 0 0 1px ${hue}66` : undefined }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-mist">{skill.mono}</span>
        {skill.note && (
          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-bone">
            {skill.note}
          </span>
        )}
      </div>

      <p className="mt-auto font-display text-xl tracking-wide text-bone sm:text-2xl">{skill.name}</p>

      {evidence && evidence.length > 0 && (
        <p className="mt-1 line-clamp-1 text-[11px] text-smoke transition group-hover:text-mist">
          {evidence[0]}
        </p>
      )}
    </motion.button>
  );
}
