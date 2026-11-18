import { useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { projectVideos, thumbnail, type Project, type Screening } from '../data/portfolio';
import { EASE, Tilt } from './fx';
import { CinetrioGlyph, ProjectArt } from './Poster';
import { Player } from './Screenings';

export default function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const videos = projectVideos(project);
  const featured = videos[0];
  const [playing, setPlaying] = useState<Screening | null>(null);

  return (
    <motion.article
      className="w-[84vw] shrink-0 snap-start sm:w-[62vw] lg:w-[46vw] xl:w-[42vw]"
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px -10% 0px 0px' }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: EASE }}
    >
      <Tilt max={7} className="group rounded-2xl shadow-[0_15px_0_-8px_rgba(80,80,90,0.65),0_28px_38px_-12px_rgba(0,0,0,0.65)] transition-shadow duration-500 hover:shadow-[0_19px_0_-8px_rgba(115,115,125,0.7),0_42px_60px_-12px_rgba(0,0,0,0.8)]">
        <div
          role="button"
          tabIndex={0}
          data-cursor="view"
          onClick={onOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpen();
            }
          }}
          aria-label={`Open ${project.title}`}
          className="focus-ring relative flex min-h-[580px] sm:min-h-[620px] lg:h-[72vh] lg:min-h-[640px] flex-col justify-between overflow-hidden rounded-2xl p-5 sm:p-7 ring-1 ring-white/20 transition duration-500 group-hover:ring-white/40"
        >
          {/* Background Poster Artwork */}
          <motion.div layoutId={`art-${project.id}`} className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-cine)] group-hover:scale-[1.07]">
              <ProjectArt project={project} />
              {featured && (
                <>
                  {/* featured reel still, blended into the poster art */}
                  <img
                    src={thumbnail(featured.id)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover opacity-55 mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
                </>
              )}
            </div>
            {/* Contrast gradient from top to bottom so both top header and bottom text are crystal clear */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-black/35" />
          </motion.div>
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_2px_0_rgba(255,255,255,0.2),inset_-5px_0_10px_rgba(0,0,0,0.35),inset_0_-8px_15px_rgba(0,0,0,0.5)]" />

          {/* Top Bar (Natural flex flow at top of card, never collides) */}
          <div className="relative z-10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CinetrioGlyph className="h-5 w-auto shrink-0" />
              <span className="text-[10px] font-bold tracking-[0.34em] text-bone/80">ORIGINAL</span>
            </div>
            <span className="shrink-0 rounded border border-white/30 px-2 py-0.5 text-[10px] font-bold text-bone">
              {project.year}
            </span>
          </div>

          {/* Bottom Content (Natural flex flow at bottom of card with mt-auto) */}
          <div className="relative z-10 mt-auto pt-6 [transform:translateZ(40px)]">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-mist">{project.genre}</p>
            <motion.h3
              layoutId={`title-${project.id}`}
              className="font-display text-[clamp(1.9rem,3.4vw,3.6rem)] leading-[0.92] tracking-wide text-bone line-clamp-3"
            >
              {project.title}
            </motion.h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-bone/75 sm:text-[15px] line-clamp-2">{project.logline}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <span key={t} className="rounded-full bg-black/40 border border-white/10 px-2.5 py-1 text-[11px] font-medium text-bone/90 backdrop-blur">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {featured ? (
                <>
                  <button
                    type="button"
                    data-cursor="play"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPlaying(featured);
                    }}
                    className="flex min-h-11 items-center gap-2 rounded-md bg-bone px-5 text-sm font-bold text-ink transition hover:bg-white"
                  >
                    ▶ Play Reel
                  </button>
                  <span className="flex min-h-11 items-center gap-2 rounded-md border border-white/25 bg-black/30 px-4 text-sm font-semibold text-bone backdrop-blur transition group-hover:border-bone">
                    {videos.length} Videos · View Project
                  </span>
                </>
              ) : (
                <span className="flex min-h-11 items-center gap-2 rounded-md bg-bone px-5 text-sm font-bold text-ink transition group-hover:bg-white">▶ View Project</span>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  onClick={(e) => e.stopPropagation()}
                  className="flex min-h-11 items-center gap-2 rounded-md border border-white/25 bg-black/30 px-4 text-sm font-semibold text-bone backdrop-blur transition hover:border-bone"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </Tilt>
      {createPortal(
        <AnimatePresence>{playing && <Player key={playing.id} video={playing} onClose={() => setPlaying(null)} />}</AnimatePresence>,
        document.body,
      )}
    </motion.article>
  );
}
