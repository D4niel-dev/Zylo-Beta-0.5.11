// frontend/files/js/game/zs-skills.js
window.ZS_Skills = {
    combatCooldowns: {}, // e.g. { "fire_strike_01": 2 } - managed by combat loop
    
    // Check if skill exists and player owns it
    canEquip: function(skillId) {
        if (!window.ZyloSlayer || !window.ZS_Data) return false;
        const owned = window.ZyloSlayer.state.skillInventory.includes(skillId);
        return owned;
    },
    
    equipSkill: function(slotIndex, skillId) {
        let state = window.ZyloSlayer.state;
        if (slotIndex < 0 || slotIndex >= 8) return false;
        
        // Prevent dupes
        if (skillId && state.skillSlots.includes(skillId)) {
            const existingIndex = state.skillSlots.indexOf(skillId);
            state.skillSlots[existingIndex] = null; // Remove from old slot
        }
        
        state.skillSlots[slotIndex] = skillId;
        window.ZyloSlayer.saveGame();
        
        if (window.ZS_UI) window.ZS_UI.renderSkillsTab();
        if (window.ZS_UI) window.ZS_UI.renderHotbar();
        return true;
    },
    
    unequipSkill: function(slotIndex) {
        this.equipSkill(slotIndex, null);
    },
    
    toggleAutoMode: function() {
        let state = window.ZyloSlayer.state;
        state.autoMode = !state.autoMode;
        if (window.ZyloSlayer.log) {
            window.ZyloSlayer.log(`Auto Mode: ${state.autoMode ? 'ON' : 'OFF'}`, state.autoMode ? 'text-green-400 font-bold' : 'text-gray-400 font-bold');
        }
        window.ZyloSlayer.saveGame();
        if (window.ZS_UI) window.ZS_UI.updateAutoModeVisuals();
    },
    
    // Get full active skills
    getActiveSkills: function() {
        let state = window.ZyloSlayer.state;
        if (!window.ZS_Data) return [];
        return state.skillSlots.map(id => {
            if (!id) return null;
            return window.ZS_Data.SKILL_DATABASE.find(s => s.id === id) || null;
        });
    },
    
    // Evaluate and execute auto mode
    evaluateAutoCast: function(enemyInfo, currentHp) {
        let state = window.ZyloSlayer.state;
        if (!state.autoMode || !enemyInfo) return null;
        
        const active = this.getActiveSkills().filter(s => s !== null);
        if (active.length === 0) return null;
        
        // Priority logic:
        // 1. Timed skills (highest priority if not on cooldown)
        // 2. Strike skills (if mana allows)
        // Disregard passives as they are passive
        
        let candidates = active.filter(s => {
            if (s.type === 'passive') return false;
            // Cooldown check
            if (this.combatCooldowns[s.id] > 0) return false;
            // Mana check
            if (state.mana < s.manaCost) return false;
            return true;
        });
        
        if (candidates.length === 0) return null;
        
        // Sort by type priority, then by damage effectiveness against enemy
        candidates.sort((a, b) => {
            if (a.type === 'timed' && b.type !== 'timed') return -1;
            if (b.type === 'timed' && a.type !== 'timed') return 1;
            
            // Both timed or both strike. Prioritize by element advantage multiplier
            const multA = window.ZS_Elements ? window.ZS_Elements.getMultiplier(a.element, enemyInfo.element) : 1;
            const multB = window.ZS_Elements ? window.ZS_Elements.getMultiplier(b.element, enemyInfo.element) : 1;
            
            const effA = a.multiplier * multA;
            const effB = b.multiplier * multB;
            
            return effB - effA; // Highest effective damage first
        });
        
        return candidates[0]; // best skill to cast
    },
    
    castSkill: function(skillId) {
        if (!window.ZS_Combat || !window.ZS_Data) return;
        
        const skill = window.ZS_Data.SKILL_DATABASE.find(s => s.id === skillId);
        if (!skill) return;
        
        let state = window.ZyloSlayer.state;
        
        if (this.combatCooldowns[skill.id] > 0) {
            if (window.ZyloSlayer.log) window.ZyloSlayer.log(`Skill [${skill.name}] is on cooldown!`, 'text-red-400');
            return;
        }
        
        if (state.mana < skill.manaCost) {
            if (window.ZyloSlayer.log) window.ZyloSlayer.log(`Not enough mana for [${skill.name}]!`, 'text-blue-400');
            return;
        }
        
        // Push cast action to combat system
        window.ZS_Combat.executeSkill(skill);
    },
    
    // Handled by Combat Tick
    tickCooldowns: function() {
        for (let key in this.combatCooldowns) {
            if (this.combatCooldowns[key] > 0) {
                this.combatCooldowns[key]--;
            }
        }
        if (window.ZS_UI) window.ZS_UI.renderHotbarCooldowns();
    },
    
    resetCooldowns: function() {
        this.combatCooldowns = {};
        if (window.ZS_UI) window.ZS_UI.renderHotbarCooldowns();
    }
};
