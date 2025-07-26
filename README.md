# Media Server

Ein moderner Medienserver mit Vite, TypeScript, SCSS und Web Components (Shadow DOM).

## Features
- Komponentenbasierte Architektur (Header, Footer, Body, Login-Form)
- Eigene Vite-Plugins für HTML- und SCSS-Import in Shadow DOM
- AlpineTemplate-Dekorator für Web Components
- SCSS für modulare und gekapselte Styles

## Ordnerstruktur

```
media-server/
├── package.json            # Projektabhängigkeiten und Skripte
├── tsconfig.json           # TypeScript-Konfiguration
├── vite.config.ts          # Vite-Konfiguration
├── public/                 # Statische Assets
│   └── icons/              # SVG-Icons für UI
├── src/                    # Quellcode
│   ├── global.scss         # Globale Styles
│   ├── index.html          # Einstiegspunkt
│   ├── index.ts            # Einstiegspunkt TypeScript
│   ├── vite-env.d.ts       # Vite-spezifische Typen
│   ├── components/         # UI-Komponenten
│   │   ├── body/           # Body-Komponente
│   │   ├── footer/         # Footer-Komponente
│   │   ├── header/         # Header-Komponente
│   │   └── login-form/     # Login-Formular-Komponente
│   ├── layouts/            # Layout-Templates (z.B. Login)
│   └── utils/              # Hilfsfunktionen (z.B. AlpineTemplate, PineconeRoutes)
├── vite-plugins/           # Eigene Vite-Plugins für HTML/SCSS-Import
└── README.md               # Projektdokumentation
```

## Hinweise zur Entwicklung
- Komponenten nutzen Shadow DOM für Style-Kapselung
- SCSS-Dateien werden über ein eigenes Vite-Plugin importiert (Dateiendung: `.scsssheet`)
- AlpineTemplate-Dekorator verbindet Template, Style und Tag mit der Komponente
