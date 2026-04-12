'use client';

import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import Image from 'next/image';

interface AttachmentItem {
  type: 'image' | 'pdf' | 'link';
  src: string;
  title?: string;
  desc?: string;
}

interface AttachmentModalProps {
  isOpen: boolean;
  items: AttachmentItem[];
  startIndex?: number;
  onClose: () => void;
}

const PdfPreview = dynamic(() => import('@/components/PdfPreview'), {
  ssr: false,
  loading: () => <div className="pdf-loading">Loading PDF...</div>,
}) as ComponentType<{ src: string; title?: string }>;

export default function AttachmentModal({ isOpen, items, startIndex = 0, onClose }: AttachmentModalProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const showPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const showNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(items.length - 1, prev + 1));
  }, [items.length]);

  const handleClose = useCallback(() => {
    setCurrentIndex(startIndex);
    onClose();
  }, [onClose, startIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose, showNext, showPrev]);

  // Lock background scroll and focus panel when open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      // Focus the panel for better keyboard interaction
      requestAnimationFrame(() => {
        panelRef.current?.focus();
      });
      // Prevent touch scroll bubbling on mobile
      const prevent = (e: TouchEvent) => {
        // if touch starts on overlay (outside panel), prevent background scroll
        if (e.target && (e.target as HTMLElement).closest('.attachment-modal .panel') == null) {
          e.preventDefault();
        }
      };
      document.addEventListener('touchmove', prevent, { passive: false });
      return () => {
        document.body.classList.remove('modal-open');
        document.removeEventListener('touchmove', prevent);
      };
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isOpen]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return createPortal(
    <div className="attachment-modal active" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div
        className="panel"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        ref={panelRef}
        onWheel={(e) => e.stopPropagation()}
      >
        <div className="header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="title">{currentItem.title || ''}</div>
            {items.length > 1 && (
              <div className="controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  className="prev-btn"
                  aria-label="Previous attachment"
                  onClick={showPrev}
                  disabled={currentIndex === 0}
                >
                  ◀
                </button>
                <span className="counter" aria-live="polite">
                  {currentIndex + 1} / {items.length}
                </span>
                <button
                  className="next-btn"
                  aria-label="Next attachment"
                  onClick={showNext}
                  disabled={currentIndex === items.length - 1}
                >
                  ▶
                </button>
              </div>
            )}
          </div>
          <button className="close-btn" aria-label="Close preview" onClick={handleClose}>
            Close
          </button>
        </div>
        <div className="body">
          {currentItem.type === 'image' && (
            <>
              <Image
                className="preview"
                src={currentItem.src}
                alt={currentItem.title || 'Preview image'}
                width={1280}
                height={900}
                unoptimized
              />
              {currentItem.desc && <p style={{ marginTop: '8px' }}>{currentItem.desc}</p>}
            </>
          )}
          {currentItem.type === 'pdf' && (
            <>
              <PdfPreview src={currentItem.src} title={currentItem.title} />
              {currentItem.desc && <p style={{ marginTop: '8px' }}>{currentItem.desc}</p>}
            </>
          )}
          {currentItem.type === 'link' && (
            <>
              <a
                href={currentItem.src}
                target="_blank"
                rel="noopener noreferrer"
              >
                {currentItem.title || currentItem.src}
              </a>
              {currentItem.desc && <p style={{ marginTop: '8px' }}>{currentItem.desc}</p>}
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
