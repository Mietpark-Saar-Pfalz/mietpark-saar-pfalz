import React from 'react';

function App() {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f0f8f0',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#1a4d2e', textAlign: 'center', marginBottom: '20px' }}>
        🚀 Mietpark Saar-Pfalz - Test Version
      </h1>

      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2 style={{ color: '#1a4d2e' }}>✅ React App lädt erfolgreich!</h2>

        <p style={{ lineHeight: '1.6', color: '#333' }}>
          Wenn Sie diese Nachricht sehen, funktioniert die React-App korrekt.
          Das Hintergrundvideo sollte weiterhin sichtbar sein, aber jetzt ist die App darüber geladen.
        </p>

        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '5px' }}>
          <h3 style={{ color: '#1a4d2e', margin: '0 0 10px 0' }}>🔧 Nächste Schritte:</h3>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>Komponenten nach und nach wieder hinzufügen</li>
            <li>Jede Komponente einzeln testen</li>
            <li>Problemquelle identifizieren</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
