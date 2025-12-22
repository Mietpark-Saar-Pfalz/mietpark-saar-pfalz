import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Impressum from './pages/Impressum';
import Agb from './pages/Agb';
import Datenschutz from './pages/Datenschutz';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [hasAcceptedCookies, setHasAcceptedCookies] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted') {
      setHasAcceptedCookies(true);
    } else {
      setShowCookieBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setHasAcceptedCookies(true);
    setShowCookieBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setHasAcceptedCookies(false);
    setShowCookieBanner(false);
    // Optionally, disable analytics or tracking scripts here
  };

  return (
    <Router basename="/mietpark-saar-pfalz">
      <ScrollToTop />
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/agb" element={<Agb />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
          </Routes>
        </main>
        <Footer />
        {showCookieBanner && !hasAcceptedCookies && (
          <div style={{
            position: 'fixed',
            bottom: '0',
            left: '0',
            width: '100%',
            backgroundColor: 'var(--primary)',
            color: 'white',
            padding: 'var(--spacing-md) var(--spacing-xl)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--spacing-md)',
            zIndex: 1000,
            boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
          }}>
            <p style={{ margin: '0', textAlign: 'center' }}>
              Wir verwenden Cookies, um die Nutzerfreundlichkeit unserer Website zu verbessern. Durch die weitere Nutzung stimmen Sie dem zu.
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
              <button onClick={acceptCookies} className="btn btn-accent" style={{ padding: 'var(--spacing-xs) var(--spacing-md)' }}>Cookies akzeptieren</button>
              <button onClick={declineCookies} className="btn btn-secondary" style={{ padding: 'var(--spacing-xs) var(--spacing-md)' }}>Ablehnen</button>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
