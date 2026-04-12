'use client';

import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

export default function PdfPreview({ src, title }: { src: string; title?: string }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadError, setLoadError] = useState<string>('');
  const normalizedSrc = encodeURI(src);

  useEffect(() => {
    setPageNumber(1);
    setLoadError('');
  }, [src]);

  return (
    <div className="pdf-preview-wrap">
      <div className="pdf-toolbar" role="group" aria-label="PDF controls">
        <button
          type="button"
          className="pdf-nav-btn"
          onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
          disabled={pageNumber <= 1}
          aria-label="Previous PDF page"
        >
          Prev Page
        </button>
        <span className="pdf-page-indicator" aria-live="polite">
          {numPages > 0 ? `Page ${pageNumber} / ${numPages}` : 'Loading PDF...'}
        </span>
        <button
          type="button"
          className="pdf-nav-btn"
          onClick={() => setPageNumber((p) => Math.min(numPages || 1, p + 1))}
          disabled={numPages === 0 || pageNumber >= numPages}
          aria-label="Next PDF page"
        >
          Next Page
        </button>
        <a className="pdf-open-link" href={normalizedSrc} target="_blank" rel="noopener noreferrer">
          Open in new tab
        </a>
      </div>

      <div className="pdf-canvas-wrap">
        <Document
          file={normalizedSrc}
          onLoadSuccess={({ numPages: pages }) => {
            setNumPages(pages);
            setLoadError('');
          }}
          onLoadError={() => {
            setNumPages(0);
            setLoadError('Unable to render PDF in this view. Use "Open in new tab".');
          }}
          loading={<div className="pdf-loading">Loading PDF...</div>}
          error={<div className="pdf-error">Unable to render PDF in this view. Use "Open in new tab".</div>}
        >
          <Page
            pageNumber={pageNumber}
            width={940}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>
      </div>

      {loadError && (
        <div className="pdf-error-actions">
          <a href={normalizedSrc} target="_blank" rel="noopener noreferrer">Open PDF directly</a>
        </div>
      )}

      <p className="pdf-title">{title || 'PDF Preview'}</p>
    </div>
  );
}
