import { useState } from 'react';
import { motion } from 'framer-motion';
import { getProfile, type ProfileId } from '../data/portfolio';
import { EASE, Magnetic, SectionHeading } from './fx';

/** THE FULL DOSSIER — a designed spec sheet preview plus view / download actions. */
export default function ResumeSection({ onView, profileId }: { onView: () => void; profileId?: ProfileId }) {
  const p = getProfile(profileId);

  return (
    <>
      <SectionHeading kicker="Lead Spec Sheet" title={`${p.firstName}'s Dossier`} />
      <div className="gutter grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.1, ease: EASE }}
          style={{ transformPerspective: 1600 }}
        >
          <CollapsibleSheet profileId={profileId} />
        </motion.div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-serif text-3xl italic leading-tight text-bone">Every milestone, on one page.</p>
          <p className="mt-3 text-sm leading-relaxed text-mist">
            Professional background, specialized client deliverables, technical arsenal, and credentials for {p.displayName}.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Magnetic className="w-full">
              <button
                type="button"
                data-cursor="view"
                onClick={onView}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-bone px-6 text-[15px] font-bold text-ink transition hover:bg-white"
              >
                ▶ View Full Dossier
              </button>
            </Magnetic>
            <Magnetic className="w-full">
              <a
                href={`mailto:${p.email}?subject=${encodeURIComponent(`Inquiry for ${p.fullName} (${p.role})`)}`}
                data-cursor="link"
                className="glass flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-6 text-[15px] font-semibold text-bone transition hover:bg-white/15"
              >
                ✉ Contact {p.firstName.split(' ')[0]}
              </a>
            </Magnetic>
          </div>
          <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/10 text-center">
            {[
              { v: String(p.projects.length), k: 'Originals' },
              { v: String(p.skillCategories.reduce((acc, c) => acc + c.skills.length, 0)), k: 'Skills' },
              { v: String(p.achievements.length), k: 'Awards' },
            ].map((s) => (
              <div key={s.k} className="bg-ink-2 px-2 py-4">
                <dd className="font-display text-3xl leading-none text-bone">{s.v}</dd>
                <dt className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">{s.k}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}

/** On phones the sheet starts as a teaser so the page keeps its pace; desktop shows it in full. */
function CollapsibleSheet({ profileId }: { profileId?: ProfileId }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div className={`overflow-hidden transition-[max-height] duration-700 ease-[var(--ease-cine)] md:max-h-none ${open ? 'max-h-[4000px]' : 'max-h-[560px]'}`}>
        <ResumeSheet profileId={profileId} />
      </div>
      {!open && (
        <div className="absolute inset-x-0 bottom-0 flex h-48 items-end justify-center rounded-b-2xl bg-gradient-to-t from-ink via-ink/85 to-transparent pb-4 md:hidden">
          <button type="button" onClick={() => setOpen(true)} className="glass min-h-11 rounded-full px-5 text-sm font-semibold text-bone">
            Read the full dossier ↓
          </button>
        </div>
      )}
    </div>
  );
}

function H({ children }: { children: string }) {
  return <h4 className="mb-3 mt-7 border-b border-white/10 pb-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-crimson-2 first:mt-0">{children}</h4>;
}

export function ResumeSheet({ profileId }: { profileId?: ProfileId }) {
  const p = getProfile(profileId);

  return (
    <article className="relative overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#121218,#0c0c11)] p-6 ring-1 ring-white/10 sm:p-10">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson-2/70 to-transparent" />
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <p className="text-[10px] font-bold tracking-[0.34em] text-smoke">SPECIALIST LEAD</p>
          <h3 className="mt-1 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[0.9] tracking-wide text-bone">{p.fullName}</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-crimson-2">{p.role}</p>
        </div>
        <div className="text-xs leading-relaxed text-mist sm:text-right">
          <a href={`mailto:${p.email}`} className="block hover:text-bone">
            {p.email}
          </a>
          {p.links.linkedin && (
            <a href={p.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-bone">
              LinkedIn ↗
            </a>
          )}
          {p.links.github && (
            <>
              {' · '}
              <a href={p.links.github} target="_blank" rel="noreferrer" className="hover:text-bone">
                GitHub ↗
              </a>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      <H>Professional Summary</H>
      <p className="text-sm leading-relaxed text-bone/85">{p.intro}</p>

      {/* Core Specialties */}
      <H>Featured Productions</H>
      <div className="space-y-4">
        {p.projects.map((proj) => (
          <div key={proj.id} className="text-xs">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-semibold text-bone">{proj.title}</span>
              <span className="text-smoke">{proj.genre} · {proj.year}</span>
            </div>
            <p className="mt-1 text-mist">{proj.logline}</p>
          </div>
        ))}
      </div>

      {/* Skills Universe */}
      <H>Technical &amp; Creative Arsenal</H>
      <div className="grid gap-3 sm:grid-cols-2 text-xs">
        {p.skillCategories.map((c) => (
          <div key={c.id} className="rounded-lg bg-white/[0.03] p-3">
            <span className="font-semibold text-bone">{c.title}</span>
            <p className="mt-1 text-mist">{c.skills.map((s) => s.name).join(', ')}</p>
          </div>
        ))}
      </div>

      {/* Milestones */}
      <H>Top Milestones &amp; Credentials</H>
      <ul className="space-y-2 text-xs text-mist">
        {p.achievements.map((a) => (
          <li key={a.id} className="flex items-start gap-2">
            <span className="text-[#d9b46a]">★</span>
            <div>
              <span className="font-semibold text-bone">{a.title}</span> ({a.org}) — {a.detail}
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
