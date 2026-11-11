import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getProfile, type ProfileId, type Screening, type ScreeningShelf } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';
import { RailButtons } from './Rail';

/**
 * SCREENINGS — video work shown as streaming-style rows.
 * Thumbnails come from YouTube's image CDN; videos play in an in-page player.
 * The player is cropped so YouTube's top title bar (video title + channel) stays hidden.
 */
export default function Screenings({ profileId }: { profileId?: ProfileId }) {
  const p = getProfile(profileId);
  const shelves = p.screenings ?? [];
  const [playing, setPlaying] = useState<Screening | null>(null);
  const total = shelves.reduce((n, s) => n + s.videos.length, 0);

  if (!shelves.length) return null;

  return (
    <>
      <SectionHeading kicker={`Now Streaming · ${total} Videos`} title="Screenings" />
      <div className="space-y-10 sm:space-y-14">
        {shelves.map((shelf) => (
          <Shelf key={shelf.title} shelf={shelf} onPlay={setPlaying} />
        ))}
      </div>
      {createPortal(
        <AnimatePresence>{playing && <Player key={playing.id} video={playing} onClose={() => setPlaying(null)} />}</AnimatePresence>,
        document.body,
      )}
    </>
  );
}

function Shelf({ shelf, onPlay }: { shelf: ScreeningShelf; onPlay: (v: Screening) => void }) {
  const rail = useRef<HTMLDivElement>(null);
  return (
    <div>
      <div className="gutter flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h3 className="font-sans text-lg font-semibold tracking-tight text-bone sm:text-2xl">{shelf.title}</h3>
        <p className="text-xs text-smoke sm:text-sm">{shelf.blurb}</p>
      </div>
      <div className="group/rail relative">
        <div
          ref={rail}
          className="rail gutter flex snap-x snap-mandatory items-start gap-3 overflow-x-auto py-5 sm:gap-4"
          style={{ scrollPaddingInline: 'var(--gutter)' }}
        >
          {shelf.videos.map((v, i) => (
            <VideoCard key={v.id} video={v} index={i} onPlay={onPlay} />
          ))}
        </div>
        <RailButtons rail={rail} />
      </div>
    </div>
  );
}

export function VideoCard({ video, index, onPlay, className }: { video: Screening; index: number; onPlay: (v: Screening) => void; className?: string }) {
  const short = video.format === 'short';
  return (
    <motion.button
      type="button"
      data-cursor="play"
      onClick={() => onPlay(video)}
      aria-label={`Play ${video.title}`}
      className={`group relative shrink-0 snap-start text-left ${className ?? (short ? 'w-[40vw] sm:w-[200px]' : 'w-[72vw] sm:w-[42vw] md:w-[30vw] lg:w-[22vw]')}`}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '0px -5% 0px 0px' }}
      transition={{ duration: 0.6, delay: Math.min(index, 5) * 0.05, ease: EASE }}
    >
      <div
        className={`relative w-full overflow-hidden rounded-lg bg-white/5 ring-1 ring-white/10 transition duration-500 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(185,139,255,0.7)] ${short ? 'aspect-[9/16]' : 'aspect-video'}`}
      >
        <img
          src={thumbnail(video.id)}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <span className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/50 text-lg text-bone opacity-90 backdrop-blur transition duration-500 group-hover:scale-110 group-hover:border-[#b98bff] group-hover:text-[#b98bff]">
          ▶
        </span>
        <span className="absolute right-2 top-2 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-bone">{video.runtime}</span>
        <span className="absolute inset-x-3 bottom-3 line-clamp-2 font-display text-xl leading-[0.95] tracking-wide text-bone sm:text-2xl">{video.title}</span>
      </div>
    </motion.button>
  );
}

/** YouTube thumbnail for a video id (4:3 with letterbox; crop it with object-cover). */
export const thumbnail = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/** Height (px) of YouTube's in-player title bar that we crop off the top. */
const TOP_BAR = 64;

export function Player({ video, onClose }: { video: Screening; onClose: () => void }) {
  const short = video.format === 'short';
  const params = new URLSearchParams({ autoplay: '1', rel: '0', modestbranding: '1', iv_load_policy: '3', playsinline: '1', color: 'white' });

  useEffect(() => {
    // capture + stopPropagation so Escape closes only the player, not a project modal underneath
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.stopPropagation();
      onClose();
    };
    window.addEventListener('keydown', onKey, true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey, true);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${short ? 'max-w-[min(420px,calc((100vh-8rem)*9/16))]' : 'max-w-[min(1100px,calc((100vh-8rem)*16/9))]'}`}
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 20 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="font-display text-2xl tracking-wide text-bone sm:text-3xl">{video.title}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-xl text-bone transition hover:border-white/60"
          >
            ✕
          </button>
        </div>
        <div className={`relative w-full overflow-hidden rounded-xl bg-black ring-1 ring-white/10 ${short ? 'aspect-[9/16]' : 'aspect-video'}`}>
          {/* The iframe is taller than the frame and shifted up, so YouTube's title/channel bar sits outside the visible area
              while the playback controls stay visible at the bottom. */}
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?${params}`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute left-0 w-full border-0"
            style={{ top: -TOP_BAR, height: `calc(100% + ${TOP_BAR}px)` }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
