import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProfile, type ProfileId } from '../data/portfolio';
import { useScrollLock } from '../hooks/smoothScroll';
import { EASE } from './fx';
import { ResumeSheet } from './ResumeViewer';

/** Full-screen Dossier viewer showing complete profile specs and credentials */
export default function ResumeModal({ onClose, profileId }: { onClose: () => void; profileId?: ProfileId }) {
  useScrollLock(true);
  const p = getProfile(profileId);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[140] flex flex-col bg-black/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Profile Dossier"
    >
      <div className="gutter flex h-16 shrink-0 items-center justify-between gap-3 pt-[env(safe-area-inset-top)]">
        <div>
          <p className="truncate font-display text-2xl tracking-wide text-bone">{p.fullName}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-crimson-2 -mt-1">{p.role}</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${p.email}?subject=${encodeURIComponent(`Project inquiry for ${p.fullName}`)}`}
            className="rounded-md bg-bone px-4 py-2 text-xs font-bold text-ink hover:bg-white"
          >
            ✉ Contact
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dossier"
            data-cursor="close"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-bone hover:bg-white/20"
          >
            ✕
          </button>
        </div>
      </div>
      <motion.div
        className="gutter flex-1 overflow-y-auto pb-10"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        data-lenis-prevent
      >
        <div className="max-w-4xl mx-auto mt-4">
          <ResumeSheet profileId={profileId} />
        </div>
      </motion.div>
    </motion.div>
  );
}
