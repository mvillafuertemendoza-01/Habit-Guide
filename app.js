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
    },
    weeklyStats: {
        completed: 0,
        totalPossible: 0,
        points: 0,
        activeDays: 0,
        weekStart: null
    },
    reflections: [],
    lastReflection: null
};

// DOM Elements
const elements = {
    // Header
    headerStreak: document.getElementById('headerStreak'),
    headerLevel: document.getElementById('headerLevel'),
    openReflectionBtn: document.getElementById('openReflectionBtn'),
    
    // Weekly Banner
    weeklyBanner: document.getElementById('weeklyBanner'),
    startReflectionBtn: document.getElementById('startReflectionBtn'),
    
    // Player Card
    playerName: document.getElementById('playerName'),
    playerLevel: document.getElementById('playerLevel'),
    playerEmoji: document.getElementById('playerEmoji'),
    xpFill: document.getElementById('xpFill'),
    currentXP: document.getElementById('currentXP'),
    maxXP: document.getElementById('maxXP'),
    streakValue: document.getElementById('streakValue'),
    pointsValue: document.getElementById('pointsValue'),
    
    // Weekly Stats
    weekCompleted: document.getElementById('weekCompleted'),
    weekRate: document.getElementById('weekRate'),
    weekStreak: document.getElementById('weekStreak'),
    weekPoints: document.getElementById('weekPoints'),
    
    // Habits
    habitsGrid: document.getElementById('habitsGrid'),
    emptyState: document.getElementById('emptyState'),
    addHabitBtn: document.getElementById('addHabitBtn'),
    
    // Achievements
    achievementsGrid: document.getElementById('achievementsGrid'),
    
    // Habit Modal
    habitModal: document.getElementById('habitModal'),
    closeModal: document.getElementById('closeModal'),
    cancelBtn: document.getElementById('cancelBtn'),
    habitForm: document.getElementById('habitForm'),
    
    // Reflection Modal
    reflectionModal: document.getElementById('reflectionModal'),
    closeReflectionModal: document.getElementById('closeReflectionModal'),
    cancelReflection: document.getElementById('cancelReflection'),
    reflectionForm: document.getElementById('reflectionForm'),
    weekDateRange: document.getElementById('weekDateRange'),
    summaryCompleted: document.getElementById('summaryCompleted'),
    summaryRate: document.getElementById('summaryRate'),
    summaryPoints: document.getElementById('summaryPoints'),
    reflectionsHistory: document.getElementById('reflectionsHistory'),
    
    // Level Up Modal
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
    checkWeeklyReset();
    updateUI();
    updateWeeklyStats();
    renderHabits();
    renderAchievements();
    setupEventListeners();
    checkWeeklyReflection();
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

// Get week start date (Monday)
function getWeekStart(date = new Date()) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff)).toDateString();
}

// Check if it's a new week
function checkWeeklyReset() {
    const weekStart = getWeekStart();
    
    if (!gameState.weeklyStats.weekStart || gameState.weeklyStats.weekStart !== weekStart) {
        // New week - reset weekly stats
        gameState.weeklyStats = {
            completed: 0,
            totalPossible: 0,
            points: 0,
            activeDays: 0,
            weekStart: weekStart
        };
        saveData();
    }
}

// Check if weekly reflection is needed
function checkWeeklyReflection() {
    const lastReflection = gameState.lastReflection;
    const weekStart = getWeekStart();
    
    // Show banner if no reflection this week
    if (!lastReflection || new Date(lastReflection) < new Date(weekStart)) {
        elements.weeklyBanner.style.display = 'flex';
    }
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
    
    // Reflection buttons
    elements.openReflectionBtn.addEventListener('click', openReflectionModal);
    elements.startReflectionBtn.addEventListener('click', openReflectionModal);
    elements.closeReflectionModal.addEventListener('click', closeReflectionModal);
    elements.cancelReflection.addEventListener('click', closeReflectionModal);
    elements.reflectionForm.addEventListener('submit', handleReflectionSubmit);
    
    // Reflection tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(tab + 'Tab').classList.add('active');
        });
    });
    
    // Star rating
    document.querySelectorAll('.star-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const rating = parseInt(btn.dataset.rating);
            document.getElementById('weekRating').value = rating;
            
            document.querySelectorAll('.star-btn').forEach((star, index) => {
                if (index < rating) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });
        });
    });
    
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
    
    elements.reflectionModal.addEventListener('click', (e) => {
        if (e.target === elements.reflectionModal) closeReflectionModal();
    });
    
    elements.levelUpModal.addEventListener('click', (e) => {
        if (e.target === elements.levelUpModal) closeLevelUpModal();
    });
}

// Open/Close Modals
function openHabitModal() {
    elements.habitModal.classList.add('active');
}

function closeHabitModal() {
    elements.habitModal.classList.remove('active');
    elements.habitForm.reset();
    document.querySelector('.emoji-btn').classList.add('selected');
}

function openReflectionModal() {
    updateReflectionSummary();
    renderReflectionHistory();
    elements.reflectionModal.classList.add('active');
}

function closeReflectionModal() {
    elements.reflectionModal.classList.remove('active');
    elements.reflectionForm.reset();
    document.querySelectorAll('.star-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('weekRating').value = 0;
}

// Update reflection summary
function updateReflectionSummary() {
    const weekStart = new Date(getWeekStart());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const dateFormat = { month: 'short', day: 'numeric' };
    elements.weekDateRange.textContent = 
        `${weekStart.toLocaleDateString('en-US', dateFormat)} - ${weekEnd.toLocaleDateString('en-US', dateFormat)}`;
    
    elements.summaryCompleted.textContent = `${gameState.weeklyStats.completed} habits`;
    
    const rate = gameState.weeklyStats.totalPossible > 0 
        ? Math.round((gameState.weeklyStats.completed / gameState.weeklyStats.totalPossible) * 100)
        : 0;
    elements.summaryRate.textContent = `${rate}%`;
    elements.summaryPoints.textContent = `${gameState.weeklyStats.points} pts`;
}

// Render reflection history
function renderReflectionHistory() {
    if (!gameState.reflections || gameState.reflections.length === 0) {
        elements.reflectionsHistory.innerHTML = `
            <div class="empty-reflections">
                <div class="empty-reflections-icon">📝</div>
                <h3>No reflections yet</h3>
                <p>Complete your first weekly reflection to see it here</p>
            </div>
        `;
        return;
    }
    
    elements.reflectionsHistory.innerHTML = gameState.reflections
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(reflection => {
            const date = new Date(reflection.weekStart);
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const stars = '⭐'.repeat(reflection.rating);
            
            return `
                <div class="reflection-item">
                    <div class="reflection-header">
                        <div class="reflection-date">Week of ${dateStr}</div>
                        <div class="reflection-rating">${stars}</div>
                    </div>
                    <div class="reflection-content">
                        ${reflection.wentWell ? `<p><span class="reflection-label">What went well:</span><br>${reflection.wentWell}</p>` : ''}
                        ${reflection.challenges ? `<p><span class="reflection-label">Challenges:</span><br>${reflection.challenges}</p>` : ''}
                        ${reflection.learned ? `<p><span class="reflection-label">Learned:</span><br>${reflection.learned}</p>` : ''}
                        ${reflection.nextWeekGoals ? `<p><span class="reflection-label">Goals:</span><br>${reflection.nextWeekGoals}</p>` : ''}
                    </div>
                </div>
            `;
        }).join('');
}

// Handle Reflection Submit
function handleReflectionSubmit(e) {
    e.preventDefault();
    
    const reflection = {
        date: new Date().toISOString(),
        weekStart: gameState.weeklyStats.weekStart,
        wentWell: document.getElementById('wentWell').value,
        challenges: document.getElementById('challenges').value,
        learned: document.getElementById('learned').value,
        nextWeekGoals: document.getElementById('nextWeekGoals').value,
        rating: parseInt(document.getElementById('weekRating').value) || 3,
        stats: { ...gameState.weeklyStats }
    };
    
    gameState.reflections = gameState.reflections || [];
    gameState.reflections.push(reflection);
    gameState.lastReflection = new Date().toISOString();
    
    // Hide banner after reflection
    elements.weeklyBanner.style.display = 'none';
    
    saveData();
    closeReflectionModal();
    
    // Show success message
    alert('✅ Weekly reflection saved! Keep up the great work!');
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
    updateWeeklyStats();
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
        
        // Update weekly stats
        gameState.weeklyStats.completed++;
        gameState.weeklyStats.points += habit.points;
        
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
        
        gameState.weeklyStats.completed = Math.max(0, gameState.weeklyStats.completed - 1);
        gameState.weeklyStats.points = Math.max(0, gameState.weeklyStats.points - habit.points);
    }
    
    saveData();
    renderHabits();
    updateUI();
    updateWeeklyStats();
}

// Delete Habit
function deleteHabit(habitId) {
    if (confirm('Are you sure you want to delete this habit?')) {
        gameState.habits = gameState.habits.filter(h => h.id !== habitId);
        saveData();
        renderHabits();
        updateWeeklyStats();
    }
}

// Update Weekly Stats
function updateWeeklyStats() {
    // Calculate total possible (habits × days in week so far)
    const weekStart = new Date(getWeekStart());
    const today = new Date();
    const daysInWeek = Math.min(7, Math.floor((today - weekStart) / (1000 * 60 * 60 * 24)) + 1);
    gameState.weeklyStats.totalPossible = gameState.habits.length * daysInWeek;
    
    // Update UI
    elements.weekCompleted.textContent = gameState.weeklyStats.completed;
    
    const rate = gameState.weeklyStats.totalPossible > 0 
        ? Math.round((gameState.weeklyStats.completed / gameState.weeklyStats.totalPossible) * 100)
        : 0;
    elements.weekRate.textContent = `${rate}%`;
    
    elements.weekStreak.textContent = daysInWeek;
    elements.weekPoints.textContent = gameState.weeklyStats.points;
    
    saveData();
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
