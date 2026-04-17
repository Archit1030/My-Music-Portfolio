# 🎵 My Music Portfolio

A modern, interactive music portfolio website featuring hand gesture controls powered by MediaPipe. Built with React, this portfolio showcases music production work with an innovative gesture-based music player interface.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://my-music-portfolio-delta.vercel.app/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Hands-green?style=for-the-badge)](https://google.github.io/mediapipe/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

## 🌐 Live Demo

**[View Live Site →](https://my-music-portfolio-delta.vercel.app/)**

Experience the interactive music portfolio with hand gesture controls!

## ✨ Features

### 🎹 Music Player
- Interactive music player with custom controls
- Track visualization and progress tracking
- Volume control and playback rate adjustment
- Responsive design for all devices

### 👋 Gesture Control
- **Hand gesture recognition** using MediaPipe Hands
- Control music playback without touching your device
- Real-time hand skeleton visualization on black background
- Supported gestures:
  - 👋 **Open Palm** - Play
  - ✊ **Fist** - Pause
  - 👍 **Thumbs Up** - Volume Up
  - 👎 **Thumbs Down** - Volume Down
  - 👉 **Swipe Right** - Next Track
  - 👈 **Swipe Left** - Previous Track

### 🎨 Modern UI/UX
- Smooth animations with Framer Motion
- Dark theme with gradient accents
- Custom cursor effects
- Film grain texture overlay
- Responsive grid layouts

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Webcam (for gesture control features)

### Installation

```bash
# Clone the repository
git clone https://github.com/Archit1030/My-Music-Portfolio.git
cd My-Music-Portfolio

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Framer Motion** - Animations
- **MediaPipe Hands** - Hand gesture recognition
- **Tailwind CSS** - Styling
- **Radix UI** - Component primitives
- **Lucide React** - Icons

## 📁 Project Structure

```
My-Music-Portfolio/
├── public/
│   ├── audio/              # Music files
│   ├── images/             # Image assets
│   └── index.html
├── src/
│   ├── components/         # React components
│   ├── context/            # React context
│   ├── hooks/              # Custom hooks
│   ├── utils/              # Utility functions
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## 🎮 Using Gesture Controls

1. Click **"Activate Gesture Control"**
2. Allow camera access
3. Position your hand in front of the camera
4. Perform gestures to control playback

## 🎨 Customization

### Adding Your Music

1. Place audio files in `public/audio/`
2. Update `src/mock.js`:

```javascript
{
  id: 'unique-id',
  title: 'Track Title',
  genre: 'Genre',
  duration: 180,
  audioUrl: '/audio/your-track.mp3',
  coverArt: '/images/cover.jpg'
}
```

## 🚀 Deployment

### Deploy to Vercel (Recommended - FREE)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy

**That's it!** Your site is live at `https://your-project.vercel.app`

### Other Options
- **Netlify** - Free hosting
- **GitHub Pages** - Free hosting
- **Cloudflare Pages** - Free hosting

All options are **100% FREE** for portfolios!

## 📝 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 👤 Author

**Archit**
- GitHub: [@Archit1030](https://github.com/Archit1030)

## 🙏 Acknowledgments

- [MediaPipe](https://google.github.io/mediapipe/) - Hand tracking
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide](https://lucide.dev/) - Icons

## 📝 License

MIT License - feel free to use this project for your own portfolio!

---

## 🔗 Links

- **Live Demo**: [https://my-music-portfolio-delta.vercel.app/](https://my-music-portfolio-delta.vercel.app/)
- **GitHub**: [https://github.com/Archit1030/My-Music-Portfolio](https://github.com/Archit1030/My-Music-Portfolio)

---

Made with ❤️ and 🎵 by Archit
