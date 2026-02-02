# Study Streaks - Gamified Habit Tracker for Students

A fun, engaging habit tracker designed specifically for students! Turn your daily tasks into an exciting game with levels, achievements, and streaks.

## ✨ Features

- **🎮 Gamification**: Level up your character as you complete habits
- **🔥 Streak System**: Build and maintain daily streaks
- **🏆 Achievements**: Unlock 8 different achievements
- **⭐ Point System**: Earn points for completing habits
- **📱 Mobile Responsive**: Works perfectly on phones and tablets
- **💾 Auto-Save**: All progress saved automatically to your browser
- **🎨 Beautiful Design**: Clean, colorful, student-friendly interface
- **✨ Celebrations**: Confetti animations when you complete habits!

## 🚀 Live Demo

This app is deployed on Netlify! [View Live Site](#)

## 🎯 How It Works

### Creating Habits
1. Click the "Add Habit" button
2. Enter your habit name (e.g., "Study Math for 30 minutes")
3. Choose an emoji that represents your habit
4. Select the difficulty:
   - Easy: 10 points
   - Medium: 20 points
   - Hard: 30 points
   - Super Hard: 50 points
5. Click "Create Habit"

### Completing Habits
- Click the ✓ button on any habit to mark it complete
- You'll earn points and XP instantly
- See confetti celebration! 🎉
- Build your streak by completing at least one habit per day

### Leveling Up
- Earn XP by completing habits
- Each level requires 40% more XP than the previous
- Get a special celebration when you level up!

### Achievements
Unlock achievements by:
- **First Step**: Create your first habit
- **Getting Started**: Build a 3-day streak
- **On Fire!**: Build a 7-day streak
- **Rising Star**: Reach level 5
- **Dedicated**: Complete 10 habits
- **Committed**: Complete 25 habits
- **Point Master**: Earn 500 points
- **Champion**: Reach level 10

## 🛠️ Tech Stack

- HTML5
- CSS3 (with custom animations)
- Vanilla JavaScript
- LocalStorage for data persistence
- No frameworks - pure web technologies!

## 📦 Deployment

### Deploy to Netlify (Recommended)

1. **Option 1: Drag & Drop**
   - Go to [netlify.com](https://www.netlify.com/)
   - Sign in or create an account
   - Drag and drop this folder into Netlify
   - Your site is live! 🎉

2. **Option 2: Git Integration**
   - Push this code to GitHub
   - Connect your GitHub repo to Netlify
   - Netlify will automatically deploy

3. **Option 3: Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify deploy --dir=. --prod
   ```

### Local Development

Simply open `index.html` in your browser - no build process needed!

```bash
# Option 1: Direct open
open index.html  # macOS
start index.html # Windows

# Option 2: Simple HTTP server
python -m http.server 8000
# Then visit http://localhost:8000
```

## 💾 Data Storage

- All data is stored in your browser's localStorage
- Your progress persists between sessions
- No account or login required
- Complete privacy - data never leaves your device

**Backup Your Data:**
Open browser console and run:
```javascript
localStorage.getItem('studyStreaksData')
```

**Restore Data:**
```javascript
localStorage.setItem('studyStreaksData', 'YOUR_BACKUP_STRING')
```

## 🎨 Customization

### Change Player Name
Edit in `app.js`:
```javascript
player: {
    name: 'Your Name Here',
    // ...
}
```

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary: #6366f1;
    --secondary: #ec4899;
    --accent: #f59e0b;
    --success: #10b981;
}
```

### Add More Achievements
Add to the achievements array in `app.js`:
```javascript
{
    id: 'my_achievement',
    name: 'Achievement Name',
    icon: '🎯',
    unlocked: false,
    requirement: 'Your requirement'
}
```

## 📱 Browser Support

Works on all modern browsers:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## 🤝 Perfect For

- Students building study routines
- Anyone wanting to track habits
- Teachers assigning to students
- Study groups staying accountable

## 🎯 Roadmap Ideas

- [ ] Dark mode toggle
- [ ] Custom avatar selection
- [ ] Export/import data
- [ ] Weekly stats dashboard
- [ ] Habit categories
- [ ] Reminder notifications
- [ ] Leaderboards (multiplayer)
- [ ] Custom themes

## 📄 License

MIT License - Feel free to use and modify!

## 🙌 Contributing

Ideas and contributions are welcome! Feel free to:
- Fork this project
- Add new features
- Customize the design
- Share with students

## 💡 Tips for Students

1. **Start Small**: Begin with 2-3 easy habits
2. **Be Consistent**: Complete at least one habit daily for streaks
3. **Challenge Yourself**: Gradually increase difficulty
4. **Celebrate Wins**: Enjoy the confetti! 🎉
5. **Track Progress**: Watch your level grow over time

---

Built with ❤️ for students everywhere. Start your journey to better habits today! 🚀
