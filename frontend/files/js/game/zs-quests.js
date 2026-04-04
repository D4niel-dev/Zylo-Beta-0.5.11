// frontend/files/js/game/zs-quests.js
window.ZS_Quests = {
    checkDailyWeeklyResets: function() {
        if (!window.ZyloSlayer) return;
        let state = window.ZyloSlayer.state;
        
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        const oneWeek = 7 * oneDay;
        
        // Ensure state fields exist
        if (!state.lastDailyReset) state.lastDailyReset = now;
        if (!state.lastWeeklyReset) state.lastWeeklyReset = now;
        
        // Reset check
        if (now - state.lastDailyReset > oneDay || state.quests.daily.length === 0) {
            this.generateQuests('daily', 3);
            state.lastDailyReset = now;
        }
        
        if (now - state.lastWeeklyReset > oneWeek || state.quests.weekly.length === 0) {
            this.generateQuests('weekly', 2);
            state.lastWeeklyReset = now;
        }
        
        // Initialize repeated and achievements if empty
        if (!state.quests.repeated || state.quests.repeated.length === 0) {
            this.generateQuests('repeated', 2);
        }
        
        if (!state.quests.achievements || state.quests.achievements.length === 0) {
            this.initAchievements();
        }
    },
    
    generateQuests: function(category, count) {
        if (!window.ZS_Data || !window.ZS_Data.QUEST_POOL) return;
        let state = window.ZyloSlayer.state;
        
        const pool = window.ZS_Data.QUEST_POOL[category];
        if (!pool) return;
        
        // For simplicity, grab first N from the pool and reset them
        const selected = pool.slice(0, count).map(q => {
            return {
                id: q.id, name: q.name, type: q.type, target: q.target, gemReward: q.gemReward,
                progress: 0, completed: false, claimed: false
            };
        });
        
        state.quests[category] = selected;
    },
    
    initAchievements: function() {
        if (!window.ZS_Data || !window.ZS_Data.QUEST_POOL) return;
        let state = window.ZyloSlayer.state;
        const pool = window.ZS_Data.QUEST_POOL.achievements;
        
        state.quests.achievements = pool.map(q => {
            return {
                id: q.id, name: q.name, type: q.type, target: q.target, gemReward: q.gemReward,
                progress: 0, completed: false, claimed: false
            };
        });
    },
    
    // Core event hooks from Combat and other activities
    registerKill: function(isBoss) {
        this.advanceProgress('kill', 1);
        if (isBoss) this.advanceProgress('boss', 1);
    },
    
    registerSummon: function(amount) {
        this.advanceProgress('summon', amount);
    },

    registerCraft: function(amount) {
        this.advanceProgress('craft', amount);
    },
    
    registerLevel: function(level) {
        this.advanceProgress('level', level, true); // true = absolute value, not increment
    },
    
    registerStage: function(stage) {
        this.advanceProgress('stage', stage, true);
    },
    
    advanceProgress: function(type, amount, isAbsolute = false) {
        let state = window.ZyloSlayer.state;
        let updated = false;
        
        ['daily', 'weekly', 'repeated', 'achievements'].forEach(cat => {
            if (!state.quests[cat]) return;
            state.quests[cat].forEach(q => {
                if (q.type === type && !q.completed) {
                    if (isAbsolute) {
                        q.progress = Math.max(q.progress, amount);
                    } else {
                        q.progress += amount;
                    }
                    
                    if (q.progress >= q.target) {
                        q.progress = q.target;
                        q.completed = true;
                        if (window.ZyloSlayer.log) {
                            window.ZyloSlayer.log(`Quest Completed: ${q.name}! Check Quests tab.`, 'text-yellow-400 font-bold bg-yellow-500/10 p-1');
                        }
                    }
                    updated = true;
                }
            });
        });
        
        if (updated && window.ZS_UI) window.ZS_UI.renderQuestsTab();
    },
    
    claimReward: function(category, index) {
        let state = window.ZyloSlayer.state;
        const q = state.quests[category][index];
        if (!q || !q.completed || q.claimed) return false;
        
        state.gems += q.gemReward;
        state.gold += q.gemReward * 10 * state.level; // bonus gold
        q.claimed = true;
        
        if (window.ZyloSlayer.log) {
            window.ZyloSlayer.log(`Claimed ${q.gemReward} gems from ${q.name}!`, 'text-teal-400 font-bold');
        }
        
        // Repeated quests reset themselves when claimed
        if (category === 'repeated') {
            q.progress = 0;
            q.completed = false;
            q.claimed = false;
        }
        
        window.ZyloSlayer.saveGame();
        if (window.ZS_UI) {
             window.ZS_UI.render();
             window.ZS_UI.renderQuestsTab();
        }
        return true;
    }
};
