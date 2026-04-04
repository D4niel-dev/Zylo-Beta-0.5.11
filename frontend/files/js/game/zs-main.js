// frontend/files/js/game/zs-main.js
window.ZyloSlayer = {
    state: {},
    interval: null,
    
    init: function() {
        this.loadSave();
        
        // Initialize systems that require setup
        if (window.ZS_Data) window.ZS_Data.init();
        if (window.ZS_Offline) window.ZS_Offline.calculate();
        if (window.ZS_UI) window.ZS_UI.init();
        if (window.ZS_Quests) window.ZS_Quests.checkDailyWeeklyResets();
        
        // Start Combat Tick
        this.interval = setInterval(() => {
            if (window.ZS_Combat) window.ZS_Combat.tick();
        }, 1000);
    },
    
    destroy: function() {
        if (this.interval) clearInterval(this.interval);
        this.saveGame();
        if (window.ZS_UI) window.ZS_UI.destroy();
    },
    
    saveGame: function() {
        this.state.lastSaveTimestamp = Date.now();
        const saveKey = `zylo_slayer_save_${localStorage.getItem('username') || 'default'}`;
        localStorage.setItem(saveKey, JSON.stringify(this.state));
    },
    
    loadSave: function() {
        // Default State (v2)
        let defaultState = {
            saveVersion: 2,
            gold: 0, gems: 0,
            level: 1, xp: 0,
            stage: 1, highestStage: 1, killsInStage: 0,
            mana: 100,
            stats: { atk: 10, maxHp: 100, regen: 1, crit: 5 },
            costs: { atk: 10, hp: 15, regen: 50, crit: 100 },
            quest: { name: 'Monster Hunter', progress: 0, target: 50, active: true },
            quests: { daily: [], weekly: [], repeated: [], achievements: [] },
            lastSaveTimestamp: Date.now(),
            inventory: [], // Equipment and Resources like Element Stones
            equipped: { weapon: null, accessory: null, relic: null, class: null },
            skillInventory: [], // array of skill object metadata or string IDs
            skillSlots: [null, null, null, null, null, null, null, null], // Max 8 equipped skill IDs
            autoMode: false,
            // Spirit unlocks at Stage 1, Stage 25, Stage 50
            spirits: { 
                fire_wolf: { unlocked: true, level: 1 }, 
                aqua_sprite: { unlocked: false, level: 1 }, 
                stone_golem: { unlocked: false, level: 1 } 
            },
            activeSpirit: 'fire_wolf',
            pityCounters: { skills: 0, equipment: 0 } // Subsystem tracking
        };
        
        try {
            const saveKey = `zylo_slayer_save_${localStorage.getItem('username') || 'default'}`;
            let saved = localStorage.getItem(saveKey);
            
            if (!saved) {
                // Migrate old generic save
                saved = localStorage.getItem('zylo_slayer_save');
                if (saved) localStorage.setItem(saveKey, saved);
            }
            
            if (saved) {
                const parsed = JSON.parse(saved);
                
                // MIGRATION: v1 -> v2
                if (!parsed.saveVersion || parsed.saveVersion < 2) {
                    parsed.saveVersion = 2;
                    parsed.mana = defaultState.mana;
                    parsed.highestStage = parsed.stage || 1;
                    parsed.quests = defaultState.quests;
                    parsed.skillInventory = [];
                    parsed.skillSlots = defaultState.skillSlots;
                    parsed.autoMode = false;
                    parsed.spirits = defaultState.spirits;
                    parsed.activeSpirit = 'fire_wolf';
                    parsed.pityCounters = defaultState.pityCounters;
                    parsed.lastSaveTimestamp = Date.now();
                }
                
                this.state = { ...defaultState, ...parsed };
                if (!this.state.equipped) this.state.equipped = defaultState.equipped;
                if (!this.state.costs) this.state.costs = defaultState.costs;
                if (!this.state.stats) this.state.stats = defaultState.stats;
                if (!this.state.pityCounters) this.state.pityCounters = defaultState.pityCounters;
            } else {
                this.state = defaultState;
            }
        } catch (e) {
            console.error('Failed to load Zylo Slayer save', e);
            this.state = defaultState;
        }
    },
    
    resetSave: function() {
        if (confirm("Are you sure you want to completely erase your Zylo Slayer progress?")) {
            const saveKey = `zylo_slayer_save_${localStorage.getItem('username') || 'default'}`;
            localStorage.removeItem(saveKey);
            localStorage.removeItem('zylo_slayer_save');
            if (this.interval) clearInterval(this.interval);
            if (typeof closeAppModal === 'function') closeAppModal();
        }
    }
};
