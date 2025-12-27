import React, { useCallback, useMemo, useState } from 'react';

const buildMailtoUrl = ({ subject, body }) => {
    const params = new URLSearchParams();
    if (subject) params.set('subject', subject);
    if (body) params.set('body', body);
    return `mailto:?${params.toString()}`;
};

const buildWhatsAppUrl = ({ text }) => {
    // WhatsApp universal share (mobile + desktop)
    const params = new URLSearchParams();
    params.set('text', text);
    return `https://wa.me/?${params.toString()}`;
};

export default function ShareButtons({
    title,
    url,
    className,
    compact = false,
    variant = 'default',
}) {
    const [copyState, setCopyState] = useState('idle'); // idle | copied | error

    const shareText = useMemo(() => {
        const safeTitle = title?.trim() || 'Link';
        return `Schau mal, was ich gefunden habe: ${safeTitle}\n${url}`;
    }, [title, url]);

    const whatsappUrl = useMemo(() => buildWhatsAppUrl({ text: shareText }), [shareText]);

    const mailtoUrl = useMemo(() => {
        const safeTitle = title?.trim() || 'Empfehlung';
        return buildMailtoUrl({
            subject: `Schau mal, was ich gefunden habe: ${safeTitle}`,
            body: `Hi,\n\nich habe etwas Passendes gefunden: ${safeTitle}.\nHier bekommst du alle Details: ${url}\n\nFalls du Fragen hast, sag Bescheid!`,
        });
    }, [title, url]);

    const copyToClipboard = useCallback(async () => {
        try {
            if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(url);
            } else if (typeof window !== 'undefined') {
                // Fallback for older browsers
                window.prompt('Link kopieren:', url);
            }
            setCopyState('copied');
            window.setTimeout(() => setCopyState('idle'), 2000);
        } catch {
            setCopyState('error');
            window.setTimeout(() => setCopyState('idle'), 2500);
        }
    }, [url]);

    const nativeShare = useCallback(async () => {
        try {
            if (typeof navigator !== 'undefined' && navigator.share) {
                await navigator.share({
                    title: title || undefined,
                    text: shareText,
                    url,
                });
                return;
            }
            await copyToClipboard();
        } catch (error) {
            // User canceled share (AbortError) - this is expected, no need to log
            if (error?.name === 'AbortError') {
                await copyToClipboard();
                return;
            }
            // Log unexpected errors for debugging
            console.error('Share failed:', error);
            // Fallback to copy on any error
            await copyToClipboard();
        }
    }, [copyToClipboard, shareText, title, url]);

    const rootClass = [
        'share-buttons',
        compact ? 'share-buttons--compact' : '',
        variant === 'hero' ? 'share-buttons--hero' : '',
        className || '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={rootClass} aria-label="Seite teilen">
            <button type="button" className="btn btn-secondary share-buttons__btn" onClick={nativeShare}>
                Teilen
            </button>

            <a
                className="btn btn-secondary share-buttons__btn"
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Per WhatsApp teilen"
            >
                WhatsApp
            </a>

            <a className="btn btn-secondary share-buttons__btn" href={mailtoUrl} aria-label="Per E-Mail teilen">
                E-Mail
            </a>

            <button type="button" className="btn btn-secondary share-buttons__btn" onClick={copyToClipboard}>
                Link kopieren
            </button>

            {copyState === 'copied' && <span className="share-buttons__status">Link kopiert</span>}
            {copyState === 'error' && <span className="share-buttons__status share-buttons__status--error">Kopieren fehlgeschlagen</span>}
        </div>
    );
}
