# Game Of... App

A modern and responsive React word-guessing game with Rumble branding. Players select a word category and guess a mystery word letter by letter, with beautiful animations and mobile-friendly interface.

## 🎮 Features

- **Multiple Categories**: Animals, Food, Countries, Sports, Movies, and more
- **Interactive UI**: Touch-friendly interface with smooth animations
- **Responsive Design**: Optimized for desktop and mobile devices
- **Rumble Branding**: Custom color palette and logo integration
- **Advanced Scrolling**: Intelligent auto-scroll and touch gestures
- **SVG Overlays**: Dynamic background animations with fade effects
- **Wildcard Feature**: Skip difficult letters with limited wildcards

## 🌐 Live Demo

Visit [gameof.app](https://gameof.app) to play the game!

## 🚀 Development

This project is built with:
- React 18
- Vite
- Tailwind CSS
- Modern ES6+ JavaScript

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment

This project is configured for GitHub Pages deployment:

1. **GitHub Pages**: Automatically deploys from the `docs/` folder
2. **Custom Domain**: Configured with CNAME file for `gameof.app`
3. **Build Output**: Production build automatically generated in `docs/`

### DNS Configuration

For the custom domain `gameof.app`, configure these DNS records:

```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   sickmind.github.io
```

## 🎨 Design Features

- **Rumble Color Palette**: Custom orange, red, and dark theme
- **Mobile-First**: Responsive design with touch optimizations
- **Smooth Animations**: CSS transitions and hover effects
- **Accessibility**: High contrast and touch-friendly elements
- **Modern UI**: Clean, professional interface with subtle shadows and gradients

## 📱 Mobile Optimizations

- Touch-friendly button sizes (min 44px)
- Horizontal scroll for long words/names
- Swipe gestures for navigation
- Responsive font sizes and spacing
- Optimized for various screen sizes

## 🔧 Technical Details

- **Vite**: Fast development and optimized builds
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing with Autoprefixer
- **ESLint**: Code linting and formatting
- **GitHub Actions**: Automated deployment pipeline

## 📄 License

This project is part of the Rumble ecosystem. All rights reserved.

---

**Powered by [gorumble.app](https://gorumble.app)**
