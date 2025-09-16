src/
  main.ts                // Einstiegspunkt, Initialisierung
  core/
    decorators/          // Custom-Element-Dekoratoren
    routes/              // SPA-Routing
    shared/              // Response-Typen, API-Modelle
    utils/               // Hilfsfunktionen, API, Cookies, Language
  components/
    extra/               // Icons, Tooltips
    forms/               // Login, Register
    templates/           // Body, Header, Footer
  layouts/               // Layout-Templates
  styles/                // Globale und modulare Styles (.xcss)
  types/                 // TypeScript-Typen
```

---

# Hierarchie

1. **Einstiegspunkt (`main.ts`)**
  - Initialisiert das Setup, startet Alpine.js, setzt globale Styles und bindet Routing & API.
2. **Setup (`core/utils/setup.ts`)**
  - Registriert alle Komponenten (aktuell synchron, Potenzial für Lazy Loading).
  - Bindet globale Utilities: Routing, API, Cookies, Styles.
... WIP
---

# todos

- **Lazy Loading**: Komponenten dynamisch nach Layout/Template laden
- **Translations**: Übersetzungen laden 

---
