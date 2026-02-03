# Study Streaks v2 - With Weekly Reflections! 📝

An enhanced gamified habit tracker for students with weekly check-ins and reflections!

## 🆕 What's New in V2

### Weekly Reflections 📅
- **Weekly Check-in Banner**: Reminds you to reflect each week
- **Reflection Prompts**: 
  - What went well this week?
  - What challenges did you face?
  - What did you learn about yourself?
  - Goals for next week
- **Week Rating**: Rate your week from 1-5 stars
- **Reflection History**: Review all past reflections

### Weekly Stats 📊
- **This Week's Progress**: Track habits completed this week
- **Completion Rate**: See your success percentage
- **Active Days**: Days you completed habits this week
- **Points Earned**: Total points from this week

## ✨ Core Features

- 🎮 **Gamification**: Level up as you complete habits
- 🔥 **Streak System**: Build and maintain daily streaks
- 🏆 **Achievements**: Unlock 8 different achievements
- ⭐ **Point System**: Earn points for completing habits
- 📱 **Mobile Responsive**: Works on all devices
- 💾 **Auto-Save**: All progress saved locally
- ✨ **Celebrations**: Confetti for completions!

## 🎯 How to Use

### Creating Habits
1. Click "Add Habit"
2. Enter habit name
3. Choose an emoji
4. Select difficulty (10-50 points)
5. Start tracking!

### Weekly Reflections
1. **Banner Reminder**: Shows up automatically each week
2. **Click "Weekly Reflection"** button in header anytime
3. **Review Your Stats**: See completion rate and progress
4. **Answer Prompts**: Reflect on your week
5. **Rate Your Week**: Give it 1-5 stars
6. **Save**: Your reflection is stored for future reference

### Viewing Past Reflections
1. Click "Weekly Reflection" button
2. Click "Past Reflections" tab
3. Browse all your previous reflections
4. See how you've grown over time!

## 🚀 Deploy to Netlify

### Method 1: Update Your Existing Site

1. **Download these new files**
2. **Go to Netlify**: [app.netlify.com](https://app.netlify.com)
3. **Find your site**: "serene-sundae-8e591b"
4. **Deploy manually**:
   - Go to "Deploys" tab
   - Drag and drop the new folder
5. **Done!** Your site updates instantly

### Method 2: Fresh Deploy

1. Download the ZIP file
2. Extract it
3. Go to [netlify.com/drop](https://app.netlify.com/drop)
4. Drag the folder
5. Get your new live URL!

## 📊 Weekly Reflection Benefits

- **Self-awareness**: Understand your patterns
- **Accountability**: Regular check-ins keep you on track
- **Growth tracking**: See progress over weeks and months
- **Goal setting**: Plan improvements for next week
- **Motivation**: Celebrate wins and learn from challenges

## 💾 Data Storage

- All data stored in browser localStorage
- Includes:
  - Habits and completions
  - XP, levels, and achievements
  - Weekly stats
  - All reflections
- Persists between sessions
- Export tip: Copy localStorage to backup

## 🎨 Customization

### Change Reflection Frequency
In `app.js`, modify the `checkWeeklyReflection()` function to change when the banner appears.

### Add More Reflection Questions
Edit the reflection form in `index.html` to add custom prompts.

### Customize Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary: #6366f1;
    --secondary: #ec4899;
    --accent: #f59e0b;
}
```

## 📱 Mobile Friendly

- Full responsive design
- Touch-friendly buttons
- Optimized for small screens
- Works on all devices

## 🔄 Migration from V1

Your existing data will be preserved! The new version:
- Keeps all your habits
- Maintains your level and XP
- Preserves your streak
- Adds new weekly tracking features

## 🎯 Best Practices

1. **Daily Habits**: Complete at least one habit daily for streaks
2. **Weekly Reflections**: Take 5 minutes every Sunday evening
3. **Be Honest**: Reflections work best when truthful
4. **Review History**: Look back monthly to see patterns
5. **Set Goals**: Use next week's goals to improve

## 📈 Track Your Growth

With weekly reflections, you can:
- See patterns in what works/doesn't work
- Identify challenges early
- Celebrate consistent progress
- Adjust strategies based on insights
- Build self-awareness over time

## 🆘 Troubleshooting

**Banner won't disappear?**
- Complete a weekly reflection to hide it

**Stats not updating?**
- Refresh the page
- Check if habits were completed today

**Lost data?**
- Check if browser cleared localStorage
- Use backup feature in future

## 📄 Files

- `index.html` - Main structure with reflection modal
- `styles.css` - Styling for all new features
- `app.js` - Logic for reflections and weekly stats
- `netlify.toml` - Deployment configuration

## 🎉 Start Reflecting!

Weekly reflections transform habit tracking from simple checkboxes into meaningful personal growth. Take a few minutes each week to reflect, and watch yourself grow! 🌱

---

Built with ❤️ for students who want to level up their lives!
