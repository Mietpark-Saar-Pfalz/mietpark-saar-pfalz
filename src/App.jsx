import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Impressum from './pages/Impressum';
import Agb from './pages/Agb';
import Datenschutz from './pages/Datenschutz';
import NewsletterConfirm from './pages/NewsletterConfirm';
import Widerruf from './pages/Widerruf';
import ScrollToTop from './components/ScrollToTop';

const CONSENT_STORAGE_KEY = 'cookiePreferences_v20251230';
const defaultPreferences = {
  necessary: true,
  externalMedia: false,
  decided: false,
};

const loadConsentPreferences = () => {
  if (typeof window === 'undefined') {
    return defaultPreferences;
  }

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      return { ...defaultPreferences, ...JSON.parse(stored) };
    }

    const legacy = localStorage.getItem('cookieConsent');
    if (legacy === 'accepted') {
      return { ...defaultPreferences, externalMedia: true, decided: true };
    }
    if (legacy === 'declined') {
      return { ...defaultPreferences, decided: true };
    }
  } catch (error) {
    console.warn('Konnte Cookie-Präferenzen nicht laden:', error);
  }
  return defaultPreferences;
};

function App() {
  const [cookiePreferences, setCookiePreferences] = useState(() => loadConsentPreferences());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(() => !loadConsentPreferences().decided);
  const [settingsDraft, setSettingsDraft] = useState(cookiePreferences);

  useEffect(() => {
    setSettingsDraft(cookiePreferences);
  }, [cookiePreferences]);

  const persistPreferences = (prefs, { decided = false } = {}) => {
    if (typeof window === 'undefined') return;
    const next = { ...defaultPreferences, ...prefs, decided };
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next));
    localStorage.removeItem('cookieConsent');
    setCookiePreferences(next);
    setShowBanner(!next.decided);
  };

  const handleAcceptAll = () => {
    persistPreferences({ necessary: true, externalMedia: true }, { decided: true });
  };

  const handleDeclineAll = () => {
    persistPreferences({ necessary: true, externalMedia: false }, { decided: true });
  };

  const handleOpenSettings = () => {
    setSettingsDraft(cookiePreferences);
    setIsSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
    if (!cookiePreferences.decided) {
      setShowBanner(true);
    }
  };

  const handleSaveSettings = () => {
    persistPreferences(settingsDraft, { decided: true });
    setIsSettingsOpen(false);
  };

  const shouldShowBanner = useMemo(() => showBanner && !cookiePreferences.decided, [cookiePreferences.decided, showBanner]);

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Header />
        <main id="main" tabIndex={-1}>
          <Routes>
            <Route path="/partybox/*" element={<Navigate to="/" replace />} />
            <Route
              path="/"
              element={(
                <Home
                  externalMediaEnabled={!!cookiePreferences.externalMedia}
                  onOpenConsent={handleOpenSettings}
                />
              )}
            />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/agb" element={<Agb />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/widerruf" element={<Widerruf />} />
            <Route path="/newsletter/confirm" element={<NewsletterConfirm />} />
          </Routes>
        </main>
        <Footer onOpenCookieSettings={handleOpenSettings} />
        {shouldShowBanner && (
          <div className="cookie-banner" role="dialog" aria-modal="true" aria-labelledby="cookie-banner-title">
            <div className="cookie-banner__content">
              <h2 id="cookie-banner-title">Cookies & externe Medien</h2>
              <p>
                Wir verwenden nur technisch notwendige Cookies sowie optionale Inhalte (z. B. Karten). Sie können selbst entscheiden,
                ob Sie diese externen Dienste zulassen. Ihre Auswahl können Sie jederzeit über den Link "Cookie-Einstellungen" im Footer ändern.
              </p>
            </div>
            <div className="cookie-banner__actions">
              <button type="button" className="btn btn-outline" onClick={handleDeclineAll}>Nur notwendige</button>
              <button type="button" className="btn btn-outline" onClick={handleOpenSettings}>Einstellungen</button>
              <button type="button" className="btn btn-filled" onClick={handleAcceptAll}>Alle akzeptieren</button>
            </div>
          </div>
        )}

        {isSettingsOpen && (
          <div className="cookie-modal" role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title">
            <div className="cookie-modal__backdrop" onClick={handleCloseSettings} />
            <div className="cookie-modal__panel" role="document">
              <h2 id="cookie-settings-title">Cookie-Einstellungen</h2>
              <p>
                Sie können die Nutzung optionaler Dienste steuern. Technisch notwendige Cookies sind für den Betrieb dieser Website erforderlich
                und daher stets aktiv.
              </p>
              <div className="cookie-modal__option">
                <div>
                  <strong>Technisch notwendig</strong>
                  <p>Speichert Ihre Session und Ihre Auswahl. Immer aktiv.</p>
                </div>
                <label className="switch">
                  <input type="checkbox" checked disabled />
                  <span className="slider" aria-hidden="true"></span>
                </label>
              </div>
              <div className="cookie-modal__option">
                <div>
                  <strong>Externe Medien (Karte)</strong>
                  <p>Aktiviert die Leaflet/OpenStreetMap-Karte im Bereich "So finden Sie uns".</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settingsDraft.externalMedia}
                    onChange={(event) =>
                      setSettingsDraft((prev) => ({ ...prev, externalMedia: event.target.checked }))
                    }
                  />
                  <span className="slider" aria-hidden="true"></span>
                </label>
              </div>
              <div className="cookie-modal__actions">
                <button type="button" className="btn btn-outline" onClick={handleDeclineAll}>Nur notwendige</button>
                <button type="button" className="btn btn-outline" onClick={handleCloseSettings}>Abbrechen</button>
                <button type="button" className="btn btn-filled" onClick={handleSaveSettings}>Speichern</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
