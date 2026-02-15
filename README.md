# Gemini Time Planner

An intelligent task management and time planning application powered by Google Gemini AI. Plan your day efficiently with AI-assisted time estimation and visual progress tracking.

## Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Usage Guide](#-usage-guide)
- [Accessibility](#-accessibility)
- [Project Structure](#-project-structure)
- [API Integration](#-api-integration)

---

## Features

### AI-Powered Time Estimation
- **Google Gemini Integration**: Analyzes task complexity and suggests realistic time estimates
- **Smart Learning**: Improves accuracy based on task descriptions and patterns
- **Priority Queue**: Automatically prioritizes tasks based on urgency and importance

### Visual Progress Tracking
- **Timeline View**: See all tasks laid out with their time allocations
- **Progress Bar**: Real-time visualization of overall workflow completion
- **Task Cards**: Individual cards showing task details, time, and status

### Time Management
- **Total Available Hours**: Set your working time limit
- **Task Breakdown**: Divide work into manageable chunks with time estimates
- **Real-time Updates**: See time remaining as you work through tasks

### Task Management
- **Add/Remove Tasks**: Easily manage your task list
- **Reorder Tasks**: Move tasks up or down to adjust priority
- **Adjust Time**: Fine tune time allocations with "Need less" / "Need more"
- **Mark Complete**: Track finished tasks with the "Mark finished" button

### Accessibility Features

#### Light & Dark Mode
- **Dark Mode**:
  - Reduces eye strain during extended work sessions
  - Lower blue light emission for evening use
  - Better for low-light environments
  - Easier on OLED screens (saves battery)

- **Light Mode**:
  - Better contrast in bright environments
  - Easier reading for some visual impairments
  - Traditional interface preference
  - Better for printing or screenshots

**Reason:**
- People with light sensitivity benefit from dark mode
- People with astigmatism may prefer light mode
- Different lighting conditions require different contrasts
- Accessibility is about choice and comfort

### Keyboard Navigation *(Planned)*
- Arrow keys for task navigation
- Enter to confirm actions
- Full keyboard support for accessibility

---

## Demo

### Setup Phase

- Enter total available hours
- Add tasks with descriptions
- Set time estimates
- AI helps with time suggestions

### Workflow Phase

- Monitor overall progress
- View timeline of all tasks
- Adjust task times on the fly
- Mark tasks as finished
- Real-time countdown

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI framework
- **Vite 5.0** - Build tool & dev server
- **CSS3** - Styling with modern features
- **JavaScript ES6+** - Modern syntax

### Backend
- **Python 3.11** - Server language
- **Flask** - Web framework
- **Google Gemini API** - AI time estimation
- **Priority Queue** - Task optimization

### Development Tools
- **VS Code** - Recommended IDE
- **Node.js 16+** - JavaScript runtime
- **npm** - Package manager

---

## Getting Started

### Prerequisites

Ensure you have installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.11 or higher) - [Download](https://python.org/)
- **npm** (comes with Node.js)
- **pip** (comes with Python)

### Quick Start

```bash
# 1. Clone or download the repository
cd gemini-time-planner

# 2. Install frontend dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open browser to http://localhost:5173
```

For detailed setup instructions, see [HOW_TO_RUN.md](HOW_TO_RUN.md)

### Backend Setup

```bash
# Navigate to server directory
cd server

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your Gemini API key
echo "GEMINI_API_KEY=your_api_key_here" > .env

# Run backend server
python app.py
```

---

## Usage Guide

### 1. Setup Your Workflow

1. **Set Available Time**
   - Enter total hours you have available (e.g., 4)
   - This sets your working time limit

2. **Add Tasks**
   - Task name: Brief description (e.g., "Design homepage")
   - Estimated time: Minutes needed (e.g., 30)
   - Description: Optional notes or details
   - Click "Add task" to add to your list

3. **Organize**
   - Add multiple tasks
   - Review total time allocation
   - Click "Proceed" when ready

### 2. Work Through Tasks

1. **Monitor Progress**
   - Top bar shows "Total left: Xh Ym"
   - Progress bar fills as you complete tasks
   - Timeline shows all tasks with percentages

2. **Adjust as Needed**
   - **Need less**: Reduce time allocation
   - **Need more**: Increase time allocation
   - **Move up/down**: Reorder task priority
   - **Mark finished**: Complete a task

3. **Complete Session**
   - Click "End session" when finished
   - Returns to setup for new workflow

### 3. Toggle Theme

- Click the theme button (top-right corner)
- Switches between light and dark mode
- Preference is saved automatically

---

## Accessibility

### Current Features

**Visual Accessibility**
- High contrast in both themes
- Clear color distinctions
- Large, readable fonts
- Color-blind friendly palette

**Theme Options**
- Dark mode for light sensitivity
- Light mode for contrast preference
- Smooth theme transitions
- Saved theme preference

 **Responsive Design**
- Works on desktop and tablets
- Readable at all screen sizes
- Touch-friendly buttons

### Planned Features

**Keyboard Navigation** (In Development)
- Arrow keys to navigate tasks
- Enter to confirm actions
- Tab through interactive elements
- Escape to cancel/close

**Voice Notifications** (Planned)
- Audible time alerts
- Task completion sounds
- Customizable notification tones

**Screen Reader Support** (Planned)
- ARIA labels
- Semantic HTML
- Proper heading structure

---

## Project Structure

```
gemini-time-planner/
│
├── client/                          # Frontend application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   │   ├── TaskBar.jsx         # Task visualization bar
│   │   │   ├── TaskBlock.jsx       # Individual task block
│   │   │   ├── TaskMenu.jsx        # Task action menu
│   │   │   └── VerticalTimeline.jsx # Timeline sidebar
│   │   │
│   │   ├── pages/                   # Page components
│   │   │   └── (Setup & Workflow pages)
│   │   │
│   │   ├── utils/                   # Helper functions
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   │
│   ├── index.html                   # HTML template
│   ├── package.json                 # Node dependencies
│   └── vite.config.js               # Vite configuration
│
├── server/                          # Backend application
│   ├── app.py                       # Flask server
│   ├── gemini_query.py             # Gemini AI integration
│   ├── priority_queue.py           # Task prioritization
│   ├── Task.py                      # Task data model
│   ├── requirements.txt             # Python dependencies
│   └── .env                         # Environment variables
│
├── README.md                        # This file
└── .gitignore                       # Git ignore rules
```

---

## API Integration

### Google Gemini API

The application uses Google's Gemini AI for intelligent time estimation:

**Setup:**
1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `server/.env` file:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

**Features:**
- Task complexity analysis
- Realistic time estimation
- Learning from patterns
- Priority suggestions

## Roadmap

### Completed (v1.0)
- [x] Basic task management
- [x] Time tracking system
- [x] Light/Dark mode toggle
- [x] Visual timeline
- [x] Task reordering
- [x] Progress tracking
- [x] Gemini AI integration (backend)

### Planned (v2.0)
- [ ] Mobile app (React Native)
- [ ] Pomodoro timer integration
- [ ] Team collaboration features
- [ ] Analytics dashboard
- [ ] Browser extension

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test accessibility features
- Update documentation

## Developers
- Ali Khan
- Nishtha Kapoor
- Talha Agro
- Winson Lu

## Acknowledgments

- **Google Gemini** - AI-powered time estimation
- **React Team** - Amazing UI framework
- **Vite** - Lightning-fast build tool
- **Flask** - Simple, powerful backend