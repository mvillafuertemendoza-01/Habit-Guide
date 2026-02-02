// Game State
const gameState = {
    player: {
        name: 'Student Champion',
        level: 1,
        xp: 0,
        xpToNext: 100,
        totalPoints: 0,
        streak: 0,
        lastActive: null
    },
    habits: [],
    achievements: [
        { id: 'first_habit', name: 'First Step', icon: '🎯', unlocked: false, requirement: 'Create your first habit' },
        { id: 'streak_3', name: 'Getting Started', icon: '🔥', unlocked: false, requirement: '3-day streak' },
        { id: 'streak_7', name: 'On Fire!', icon: '⚡', unlocked: false, requirement: '7-day streak' },
        { id: 'level_5', name: 'Rising Star', icon: '⭐', unlocked: false, requirement: 'Reach level 5' },
        { id: 'complete_10', name: 'Dedicated', icon: '💪', unlocked: false, requirement: 'Complete 10 habits' },
        { id: 'complete_25', name: 'Committed', icon: '🚀', unlocked: false, requirement: 'Complete 25 habits' },
        { id: 'points_500', name: 'Point Master', icon: '👑', unlocked: false, requirement: 'Earn 500 points' },
        { id: 'level_10', name: 'Champion', icon: '🏆', unlocked: false, requirement: 'Reach level 10' }
    ],
    stats: {
        totalCompleted: 0,
        todayCompleted: 0
    }
};

// DOM Elements
const elements = {
    // Header
    headerStreak: document.getElementById('headerStreak'),
    headerLevel: document.getElementById('headerLevel'),
    
    // Player Card
    playerName: document.getElementById('playerName'),
    playerLevel: document.getElementById('playerLevel'),
    playerEmoji: document.getElementById('playerEmoji'),
    xpFill: document.getElementById('xpFill'),
    currentXP: document.getElementById('currentXP'),
    maxXP: document.getElementById('maxXP'),
    streakValue: document.getElementById('streakValue'),
    pointsValue: document.getElementById('pointsValue'),
    
    // Habits
    habitsGrid: document.getElementById('habitsGrid'),
    emptyState: document.getElementById('emptyState'),
    addHabitBtn: document.getElementById('addHabitBtn'),
    
    // Achievements
    achievementsGrid: document.getElementById('achievementsGrid'),
    
    // Modals
    habitModal: document.getElementById('habitModal'),
    closeModal: document.getElementById('closeModal'),
    cancelBtn: document.getElementById('cancelBtn'),
    habitForm: document.getElementById('habitForm'),
    levelUpModal: document.getElementById('levelUpModal'),
    closeLevelUp: document.getElementById('closeLevelUp'),
    newLevel: document.getElementById('newLevel'),
    
    // Confetti
    confettiContainer: document.getElementById('confettiContainer')
};

// Initialize App
function init() {
    loadData();
    checkDailyReset();
    updateUI();
    renderHabits();
    renderAchievements();
    setupEventListeners();
}

// Load data from localStorage
function loadData() {
    const saved = localStorage.getItem('studyStreaksData');
    if (saved) {
        const savedData = JSON.parse(saved);
        Object.assign(gameState, savedData);
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('studyStreaksData', JSON.stringify(gameState));
}

// Check if it's a new day and reset habits
function checkDailyReset() {
    const today = new Date().toDateString();
    const lastActive = gameState.player.lastActive;
    
    if (lastActive && lastActive !== today) {
        // Check if streak should continue
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastActive !== yesterday.toDateString()) {
            // Missed a day - reset streak
            gameState.player.streak = 0;
        }
        
        // Reset all habits
        gameState.habits.forEach(habit => {
            habit.completed = false;
        });
        
        gameState.stats.todayCompleted = 0;
    }
    
    gameState.player.lastActive = today;
    saveData();
}

// Setup Event Listeners
function setupEventListeners() {
    elements.addHabitBtn.addEventListener('click', openHabitModal);
    elements.closeModal.addEventListener('click', closeHabitModal);
    elements.cancelBtn.addEventListener('click', closeHabitModal);
    elements.habitForm.addEventListener('submit', handleHabitSubmit);
    elements.closeLevelUp.addEventListener('click', closeLevelUpModal);
    
    // Emoji picker
    document.querySelectorAll('.emoji-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            document.getElementById('habitEmoji').value = btn.dataset.emoji;
        });
    });
    
    // Default emoji selection
    document.querySelector('.emoji-btn').classList.add('selected');
    
    // Close modals on overlay click
    elements.habitModal.addEventListener('click', (e) => {
        if (e.target === elements.habitModal) closeHabitModal();
    });
    
    elements.levelUpModal.addEventListener('click', (e) => {
        if (e.target === elements.levelUpModal) closeLevelUpModal();
    });
}

// Open Habit Modal
function openHabitModal() {
    elements.habitModal.classList.add('active');
}

// Close Habit Modal
function closeHabitModal() {
    elements.habitModal.classList.remove('active');
    elements.habitForm.reset();
    document.querySelector('.emoji-btn').classList.add('selected');
}

// Handle Habit Form Submit
function handleHabitSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('habitName').value;
    const emoji = document.getElementById('habitEmoji').value;
    const points = parseInt(document.getElementById('habitPoints').value);
    
    const habit = {
        id: Date.now(),
        name,
        emoji,
        points,
        completed: false,
        timesCompleted: 0
    };
    
    gameState.habits.push(habit);
    
    // Check first habit achievement
    if (gameState.habits.length === 1) {
        unlockAchievement('first_habit');
    }
    
    saveData();
    renderHabits();
    closeHabitModal();
    updateUI();
}

// Render Habits
function renderHabits() {
    if (gameState.habits.length === 0) {
        elements.habitsGrid.style.display = 'none';
        elements.emptyState.style.display = 'block';
        return;
    }
    
    elements.habitsGrid.style.display = 'grid';
    elements.emptyState.style.display = 'none';
    
    elements.habitsGrid.innerHTML = gameState.habits.map(habit => `
        <div class="habit-card ${habit.completed ? 'completed' : ''}" data-id="${habit.id}">
            <div class="habit-header">
                <span class="habit-emoji">${habit.emoji}</span>
                <button class="habit-delete" onclick="deleteHabit(${habit.id})">×</button>
            </div>
            <div class="habit-name">${habit.name}</div>
            <div class="habit-footer">
                <div class="habit-points">
                    <span>⭐</span>
                    <span>${habit.points} pts</span>
                </div>
                <button class="check-btn" onclick="toggleHabit(${habit.id})">
                    ${habit.completed ? '✓' : ''}
                </button>
            </div>
        </div>
    `).join('');
}

// Toggle Habit Completion
function toggleHabit(habitId) {
    const habit = gameState.habits.find(h => h.id === habitId);
    if (!habit) return;
    
    habit.completed = !habit.completed;
    
    if (habit.completed) {
        // Add points and XP
        gameState.player.totalPoints += habit.points;
        gameState.player.xp += habit.points;
        habit.timesCompleted++;
        gameState.stats.totalCompleted++;
        gameState.stats.todayCompleted++;
        
        // Update streak
        if (gameState.stats.todayCompleted === 1) {
            gameState.player.streak++;
        }
        
        // Check for level up
        checkLevelUp();
        
        // Celebration effects
        createConfetti();
        
        // Check achievements
        checkAchievements();
    } else {
        // Remove points and XP
        gameState.player.totalPoints = Math.max(0, gameState.player.totalPoints - habit.points);
        gameState.player.xp = Math.max(0, gameState.player.xp - habit.points);
        habit.timesCompleted = Math.max(0, habit.timesCompleted - 1);
        gameState.stats.totalCompleted = Math.max(0, gameState.stats.totalCompleted - 1);
        gameState.stats.todayCompleted = Math.max(0, gameState.stats.todayCompleted - 1);
    }
    
    saveData();
    renderHabits();
    updateUI();
}

// Delete Habit
function deleteHabit(habitId) {
    if (confirm('Are you sure you want to delete this habit?')) {
        gameState.habits = gameState.habits.filter(h => h.id !== habitId);
        saveData();
        renderHabits();
    }
}

// Check for Level Up
function checkLevelUp() {
    let leveledUp = false;
    
    while (gameState.player.xp >= gameState.player.xpToNext) {
        gameState.player.xp -= gameState.player.xpToNext;
        gameState.player.level++;
        gameState.player.xpToNext = Math.floor(gameState.player.xpToNext * 1.4);
        leveledUp = true;
    }
    
    if (leveledUp) {
        showLevelUpModal();
        createCelebration();
        checkAchievements();
    }
}

// Show Level Up Modal
function showLevelUpModal() {
    elements.newLevel.textContent = gameState.player.level;
    elements.levelUpModal.classList.add('active');
}

// Close Level Up Modal
function closeLevelUpModal() {
    elements.levelUpModal.classList.remove('active');
}

// Check and Unlock Achievements
function checkAchievements() {
    const { player, stats } = gameState;
    
    // Streak achievements
    if (player.streak >= 3) unlockAchievement('streak_3');
    if (player.streak >= 7) unlockAchievement('streak_7');
    
    // Level achievements
    if (player.level >= 5) unlockAchievement('level_5');
    if (player.level >= 10) unlockAchievement('level_10');
    
    // Completion achievements
    if (stats.totalCompleted >= 10) unlockAchievement('complete_10');
    if (stats.totalCompleted >= 25) unlockAchievement('complete_25');
    
    // Points achievement
    if (player.totalPoints >= 500) unlockAchievement('points_500');
}

// Unlock Achievement
function unlockAchievement(achievementId) {
    const achievement = gameState.achievements.find(a => a.id === achievementId);
    if (achievement && !achievement.unlocked) {
        achievement.unlocked = true;
        renderAchievements();
        saveData();
        
        // Show achievement notification (could be enhanced)
        console.log(`Achievement Unlocked: ${achievement.name}!`);
    }
}

// Render Achievements
function renderAchievements() {
    elements.achievementsGrid.innerHTML = gameState.achievements.map(achievement => `
        <div class="achievement-card ${achievement.unlocked ? 'unlocked' : ''}" 
             title="${achievement.requirement}">
            <span class="achievement-icon">${achievement.icon}</span>
            <div class="achievement-name">${achievement.name}</div>
        </div>
    `).join('');
}

// Update UI
function updateUI() {
    const { player } = gameState;
    
    // Header
    elements.headerStreak.textContent = player.streak;
    elements.headerLevel.textContent = player.level;
    
    // Player Card
    elements.playerName.textContent = player.name;
    elements.playerLevel.textContent = player.level;
    
    // XP Bar
    const xpPercent = (player.xp / player.xpToNext) * 100;
    elements.xpFill.style.width = `${xpPercent}%`;
    elements.currentXP.textContent = player.xp;
    elements.maxXP.textContent = player.xpToNext;
    
    // Stats
    elements.streakValue.textContent = player.streak;
    elements.pointsValue.textContent = player.totalPoints;
}

// Create Confetti
function createConfetti() {
    const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.3 + 's';
        confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
        
        elements.confettiContainer.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Create Celebration (for level ups)
function createCelebration() {
    const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        
        elements.confettiContainer.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

// Make functions available globally
window.toggleHabit = toggleHabit;
window.deleteHabit = deleteHabit;

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
