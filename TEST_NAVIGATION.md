# Navigation Test Guide

Diese Datei enthält alle zu testenden Navigationspfade der Mietpark Saar-Pfalz Website.

## 🧪 Test-Szenarien

### 1. Von Homepage aus navigieren

**Start:** `https://mietpark-saar-pfalz.com/`

#### Header Navigation (Desktop & Mobile)
- [ ] **Logo** → Zurück zur Homepage
- [ ] **Startseite** → Scrollt nach oben (gleiche Seite)
- [ ] **Vermietung** → Scrollt zu #products Sektion
- [ ] **Blog** → Navigiert zu `/blog`
- [ ] **Kontakt** → Scrollt zu #contact Sektion
- [ ] **WhatsApp** → Öffnet WhatsApp Web/App
- [ ] **Anfrage senden** → Scrollt zu #contact Sektion

#### Footer Navigation
- [ ] **Startseite** → Zurück zur Homepage
- [ ] **Blog** → Navigiert zu `/blog`
- [ ] **Impressum** → Navigiert zu `/impressum`
- [ ] **AGB** → Navigiert zu `/agb`
- [ ] **Datenschutz** → Navigiert zu `/datenschutz`

#### Produkt-Navigation
- [ ] **Produkt-Karten** → Navigiert zu `/product/{id}`
- [ ] **"Details & Buchen" Button** → Navigiert zu `/product/{id}`

### 2. Von Blog-Seite aus navigieren

**Start:** `https://mietpark-saar-pfalz.com/blog`

#### Header Navigation
- [ ] **Logo** → Navigiert zur Homepage (`/`)
- [ ] **Startseite** → Navigiert zur Homepage (`/`)
- [ ] **Vermietung** → Navigiert zu `/#products`
- [ ] **Blog** → Bleibt auf Blog (keine Änderung)
- [ ] **Kontakt** → Navigiert zu `/#contact`
- [ ] **Anfrage senden** → Navigiert zu `/#contact`

#### Blog-Inhalte
- [ ] **Blog-Artikel Titel** → Navigiert zu `/blog/{id}`
- [ ] **"WEITERLESEN" Link** → Navigiert zu `/blog/{id}`

#### Footer Navigation
- [ ] **Startseite** → Navigiert zur Homepage (`/`)
- [ ] **Blog** → Bleibt auf Blog (keine Änderung)
- [ ] **Impressum** → Navigiert zu `/impressum`
- [ ] **AGB** → Navigiert zu `/agb`
- [ ] **Datenschutz** → Navigiert zu `/datenschutz`

### 3. Von Produkt-Detail-Seite aus navigieren

**Start:** `https://mietpark-saar-pfalz.com/product/1`

#### Header Navigation
- [ ] **Logo** → Navigiert zur Homepage (`/`)
- [ ] **Startseite** → Navigiert zur Homepage (`/`)
- [ ] **Vermietung** → Navigiert zu `/#products`
- [ ] **Blog** → Navigiert zu `/blog`
- [ ] **Kontakt** → Navigiert zu `/#contact`
- [ ] **Anfrage senden** → Scrollt zu Kontaktformular (gleiche Seite)

#### Produkt-Navigation
- [ ] **Galerie-Navigation** → Wechselt Bilder in der Galerie
- [ ] **"Zurück" Button** → Geht zurück zur vorherigen Seite
- [ ] **WhatsApp Kontakt** → Öffnet WhatsApp

### 4. Von anderen Seiten aus navigieren

**Startseiten:** `/impressum`, `/agb`, `/datenschutz`

#### Header Navigation (von allen Unterseiten)
- [ ] **Logo** → Navigiert zur Homepage (`/`)
- [ ] **Startseite** → Navigiert zur Homepage (`/`)
- [ ] **Vermietung** → Navigiert zu `/#products`
- [ ] **Blog** → Navigiert zu `/blog`
- [ ] **Kontakt** → Navigiert zu `/#contact`

#### Footer Navigation (von allen Unterseiten)
- [ ] Alle Footer-Links funktionieren korrekt

## 🔄 Browser Navigation testen

### Vorwärts/Rückwärts Navigation
- [ ] **Browser "Zurück" Button** funktioniert von allen Seiten
- [ ] **Browser "Vorwärts" Button** funktioniert nach Zurück-Navigation
- [ ] **URL direkt aufrufen** funktioniert für alle Routen:
  - `/` - Homepage
  - `/blog` - Blog-Übersicht
  - `/blog/1` - Blog-Artikel
  - `/product/1` - Produkt-Details
  - `/impressum` - Impressum
  - `/agb` - AGB
  - `/datenschutz` - Datenschutz

### Direkte URL-Zugriffe
- [ ] **Page Refresh (F5)** funktioniert auf allen Seiten
- [ ] **Direkte Links teilen** funktionieren
- [ ] **Lesezeichen** funktionieren

## 📱 Mobile Navigation testen

### Mobile Menü
- [ ] **Hamburger-Menü öffnen/schließen**
- [ ] **Alle Links im Mobile-Menü funktionieren**
- [ ] **Menü schließt sich nach Link-Klick**

### Touch-Navigation
- [ ] **Touch-Gesten** für Galerie/Navigation
- [ ] **Swipe** für Bildergalerien
- [ ] **Scroll-Verhalten** ist smooth

## 🐛 Bekannte Issues & Fixes

### Issue: Navigation funktioniert nicht von Unterseiten
**Symptom:** Klick auf "Vermietung" von Blog-Seite führt nirgendwo hin
**Fix:** Links von `#products` zu `/#products` geändert

### Issue: Kontakt-Link funktioniert nicht
**Symptom:** Klick auf "Kontakt" scrollt nicht
**Fix:** Links von `#contact` zu `/#contact` geändert

## ✅ Test Checklist

### Grundfunktionalität
- [ ] Alle Header-Links funktionieren von allen Seiten
- [ ] Alle Footer-Links funktionieren von allen Seiten
- [ ] Browser Vorwärts/Zurück funktioniert
- [ ] Direkte URLs funktionieren
- [ ] Page Refresh funktioniert

### Mobile
- [ ] Mobile Menü öffnet/schließt korrekt
- [ ] Mobile Links funktionieren
- [ ] Touch-Navigation funktioniert

### Edge Cases
- [ ] Sehr lange URLs funktionieren
- [ ] Umlaute/Sonderzeichen in URLs
- [ ] Query Parameter werden beibehalten
- [ ] Fragment Links (#anker) funktionieren

---

## 🎯 Test-Status

**Datum:** [Datum eintragen]
**Tester:** [Name eintragen]
**Browser:** [Chrome/Firefox/Safari/Edge]
**Device:** [Desktop/Mobile/Tablet]

**Ergebnis:** [✅ Alle Tests bestanden / ❌ Issues gefunden]

**Notizen:**
[Hier Issues oder besondere Beobachtungen eintragen]
