# Game of App

Un gioco divertente e interattivo creato con React, Tailwind CSS e Vite. Perfetto per serate in compagnia!

## 🎮 Caratteristiche

- **Interfaccia moderna**: Design pulito e responsive con Tailwind CSS
- **Temi personalizzati**: Colori brand Rumble
- **Completamente responsive**: Ottimizzato per desktop e mobile
- **Animazioni fluide**: Background SVG animato e transizioni CSS
- **Facile da usare**: Setup intuitivo del gioco e gameplay semplice

## 🚀 Deployment

### GitHub Pages

Il progetto è configurato per essere deployato su GitHub Pages:

1. **Clona il repository**
   ```bash
   git clone https://github.com/mioii/gameof-app.git
   cd gameof-app
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Costruisci per produzione**
   ```bash
   npm run build
   ```

4. **Pusha su GitHub**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

5. **Configura GitHub Pages**
   - Vai su Settings → Pages
   - Seleziona "Deploy from a branch"
   - Branch: `main`
   - Folder: `docs`

### Dominio Personalizzato

Il progetto include un file `CNAME` per il dominio `gameof.app`. Per configurare il dominio:

1. **Nelle impostazioni del repository GitHub**:
   - Vai su Settings → Pages
   - Inserisci `gameof.app` nel campo Custom domain
   - Salva

2. **Configura il DNS del tuo dominio**:
   - Aggiungi un record CNAME che punta a `tuousername.github.io`
   - Oppure un record A che punta agli IP di GitHub Pages

## 🛠️ Sviluppo

### Requisiti
- Node.js (v16 o superiore)
- npm

### Comandi disponibili

```bash
# Avvia il server di sviluppo
npm run dev

# Costruisci per produzione
npm run build

# Anteprima build di produzione
npm run preview

# Lint del codice
npm run lint
```

## 🎯 Come giocare

1. **Setup del gioco**: Inserisci le parole o usa i preset
2. **Aggiungi giocatori**: Ogni giocatore inserisce il proprio nome
3. **Inizia a giocare**: I giocatori vengono eliminati uno alla volta
4. **Wildcard**: Usa il pulsante stella per salvare un giocatore
5. **Vincitore**: Celebra il vincitore con la schermata finale!

## 🎨 Tecnologie utilizzate

- **React**: Framework JavaScript per l'interfaccia
- **Tailwind CSS**: Framework CSS per lo styling
- **Vite**: Build tool e dev server
- **Lucide React**: Icone moderne
- **PostCSS**: Post-processing CSS
- **ESLint**: Linting del codice

## 🏢 Brand

Powered by [Rumble](https://gorumble.app)

## 📝 Licenza

MIT License - Sentiti libero di usare questo progetto per i tuoi scopi!+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
