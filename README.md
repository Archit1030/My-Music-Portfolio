# 🎵 My Music Portfolio

A modern, interactive music portfolio website featuring hand gesture controls powered by MediaPipe. Built with React, this portfolio showcases music production work with an innovative gesture-based music player interface.

![Music Portfolio](https://img.shields.io/badge/React-19.0.0-blue)
![MediaPipe](https://img.shields.io/badge/MediaPipe-Hands-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

### 🎹 Music Player
- Interactive music player with custom controls
- Track visualization and progress tracking
- Volume control and playback rate adjustment
- Responsive design for all devices

### 👋 Gesture Control
- **Hand gesture recognition** using MediaPipe Hands
- Control music playback without touching your device
- Real-time hand skeleton visualization
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

### 📱 Sections
- **Hero** - Animated landing section
- **Music** - Featured tracks with playback
- **Gesture Control** - Interactive camera-based controls
- **About** - Personal information and bio
- **Projects** - Portfolio showcase
- **Footer** - Contact and social links

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Python 3.8+ (for backend)
- Webcam (for gesture control features)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Archit1030/My-Music-Portfolio.git
cd My-Music-Portfolio
```

2. **Install frontend dependencies**
```bash
cd frontend
npm install
```

3. **Install backend dependencies**
```bash
cd ../backend
pip install -r requirements.txt
```

### Running the Application

1. **Start the backend server**
```bash
cd backend
python server.py
```

2. **Start the frontend development server**
```bash
cd frontend
npm start
```

3. **Open your browser**
Navigate to `http://localhost:3000`

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Framer Motion** - Animations
- **MediaPipe Hands** - Hand gesture recognition
- **Tailwind CSS** - Styling
- **Radix UI** - Component primitives
- **Lucide React** - Icons

### Backend
- **Flask** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing

### Build Tools
- **CRACO** - Create React App Configuration Override
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
My-Music-Portfolio/
├── frontend/
│   ├── public/
│   │   ├── audio/          # Music files
│   │   ├── images/         # Image assets
│   │   └── index.html
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Hero.jsx
│   │   │   ├── MusicSection.jsx
│   │   │   ├── GestureControlSection.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   ├── ProjectsSection.jsx
│   │   │   └── Footer.jsx
│   │   ├── context/        # React context
│   │   │   └── MusicPlayerContext.jsx
│   │   ├── hooks/          # Custom hooks
│   │   │   └── useGestureDetection.js
│   │   ├── utils/          # Utility functions
│   │   │   └── gestureRecognizer.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── backend/
│   ├── server.py           # Flask server
│   └── requirements.txt
└── README.md
```

## 🎮 Using Gesture Controls

1. Click **"Activate Gesture Control"** in the Gesture Control section
2. Allow camera access when prompted
3. Position your hand in front of the camera
4. Perform gestures to control music playback:
   - Show your **open palm** to play
   - Make a **fist** to pause
   - **Thumbs up** to increase volume
   - **Thumbs down** to decrease volume
   - **Swipe right** for next track
   - **Swipe left** for previous track

## 🎨 Customization

### Adding Your Music
1. Place your audio files in `frontend/public/audio/`
2. Update `frontend/src/mock.js` with your track information:

```javascript
{
  id: 'unique-id',
  title: 'Track Title',
  genre: 'Genre',
  duration: 180, // in seconds
  audioUrl: '/audio/your-track.mp3',
  coverArt: '/images/cover.jpg'
}
```

### Styling
- Modify `frontend/src/App.css` for global styles
- Update Tailwind configuration in `frontend/tailwind.config.js`
- Customize colors and themes in component files

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the frontend directory:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

### MediaPipe Configuration
Adjust gesture detection sensitivity in `frontend/src/hooks/useGestureDetection.js`:

```javascript
hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.5,
});
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Archit**
- GitHub: [@Archit1030](https://github.com/Archit1030)

## 🙏 Acknowledgments

- [MediaPipe](https://google.github.io/mediapipe/) for hand tracking
- [Unsplash](https://unsplash.com/) for images
- [Lucide](https://lucide.dev/) for icons
- [Framer Motion](https://www.framer.com/motion/) for animations

## 🐛 Known Issues

- Gesture detection requires good lighting conditions
- Camera must be enabled for gesture controls to work
- Some gestures may require practice for consistent detection

## 🚧 Future Enhancements

- [ ] Add more gesture types
- [ ] Implement playlist management
- [ ] Add audio visualization effects
- [ ] Support for multiple hand tracking
- [ ] Mobile gesture controls optimization
- [ ] Dark/Light theme toggle

## 📞 Support

For support, email your-email@example.com or open an issue in the GitHub repository.

---

Made with ❤️ and 🎵 by Archit
