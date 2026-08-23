# Eurovision Night – statische Event-Landingpage

Die Website besteht nur aus HTML, CSS und JavaScript und kann direkt auf GitHub Pages veröffentlicht werden.

## Dateien

- `index.html` – Inhalte und Aufbau
- `styles.css` – Farben, Layout und Responsive Design
- `app.js` – Länder, Formular und Supabase-Anbindung
- `supabase.sql` – optionale Datenbank für echte First-Come-First-Serve-Anmeldungen

## Schnell anpassen

### Texte / Datum / Ort
Direkt in `index.html` ändern. Besonders einfach zu finden sind:

- `XX.XX.2026`
- `XX:XX Uhr`
- `Deine Location`
- Überschriften und Infotexte in den einzelnen `<section>`-Blöcken

### Farben
Ganz oben in `styles.css` stehen alle Hauptfarben als CSS-Variablen:

```css
--bg: #09091a;
--pink: #ff2d95;
--violet: #7c4dff;
--cyan: #35d9ff;
--gold: #ffd166;
```

### Länder
In `app.js` im Array `CONFIG.countries`. Ein Eintrag sieht so aus:

```js
["DE", "Deutschland"]
```

## Warum Supabase?

GitHub Pages stellt ausschließlich statische Dateien bereit. Eine echte First-Come-First-Serve-Vergabe kann deshalb nicht allein mit HTML/JS zuverlässig funktionieren: Zwei Besucher müssen denselben zentralen Datenstand sehen und gleichzeitige Anmeldungen müssen serverseitig abgefangen werden.

Die beigelegte Lösung verwendet Supabase als kostenlosen externen Datenspeicher. Die Seite selbst bleibt vollständig auf GitHub Pages.

## Supabase in wenigen Schritten

1. Kostenloses Projekt auf Supabase erstellen.
2. Im SQL Editor den kompletten Inhalt aus `supabase.sql` ausführen.
3. In Supabase unter **Project Settings → API** die Project URL und den `anon` / `public` Key kopieren.
4. In `app.js` eintragen:

```js
const CONFIG = {
  supabaseUrl: "https://DEIN-PROJEKT.supabase.co",
  supabaseAnonKey: "DEIN-ANON-KEY",
  // ...
};
```

Danach:

- bereits vergebene Länder werden aus dem Dropdown entfernt,
- jede erfolgreiche Anmeldung landet in `registrations`,
- ein Land kann durch den UNIQUE-Constraint technisch nur einmal vergeben werden,
- persönliche Anmeldedaten sind nicht direkt über die öffentliche API lesbar,
- Besucher können öffentlich nur die belegten Ländercodes abrufen.

## Anmeldungen ansehen

In Supabase unter **Table Editor → registrations**.

## GitHub Pages veröffentlichen

1. Neues GitHub-Repository anlegen.
2. Alle Dateien aus diesem Ordner in die oberste Ebene des Repositories hochladen.
3. Repository → **Settings → Pages**.
4. Unter **Build and deployment** `Deploy from a branch` wählen.
5. Branch `main` und Ordner `/ (root)` auswählen.
6. Speichern.

Nach kurzer Zeit ist die Seite über die von GitHub angezeigte Pages-Adresse erreichbar.

## Lokal testen

Du kannst `index.html` direkt öffnen. Für realistischeres Verhalten empfiehlt sich ein kleiner lokaler Webserver, z. B. mit Python:

```bash
python -m http.server 8000
```

Dann `http://localhost:8000` öffnen.
