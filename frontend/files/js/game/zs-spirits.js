// frontend/files/js/game/zs-spirits.js
window.ZS_Spirits = {
    actionTimers: {}, // Tracks cooldown ticks for spirits
    
    tick: function(enemyInfo, currentHp, maxHp) {
        if (!window.ZyloSlayer || !window.ZS_Data || !enemyInfo) return;
        let state = window.ZyloSlayer.state;
        
        // Ensure unlocks are processed properly
        this.checkUnlocks(state.highestStage);
        
        const activeId = state.activeSpirit;
        if (!activeId) return; // No spirit equipped
        
        const spiritData = window.ZS_Data.SPIRIT_DATABASE[activeId];
        const spiritState = state.spirits[activeId];
        
        if (!spiritData || !spiritState || !spiritState.unlocked) return;
        
        // Base cooldown defaults to 5s if not present
        const cd = spiritData.skill.cooldown || 5; 
        
        if (this.actionTimers[activeId] === undefined) {
             this.actionTimers[activeId] = cd;
        }
        
        if (this.actionTimers[activeId] > 0) {
             this.actionTimers[activeId]--;
             return;
        }
        
        // Spirit Action Time!
        this.actionTimers[activeId] = cd; // Reset
        this.executeSpiritAction(spiritData, spiritState, enemyInfo, currentHp, maxHp);
    },
    
    checkUnlocks: function(highestStage) {
        let state = window.ZyloSlayer.state;
        let updated = false;
        
        // Stage 1: Wolf, Stage 25: Sprite, Stage 50: Golem
        if (highestStage >= 1 && !state.spirits.fire_wolf.unlocked) {
             state.spirits.fire_wolf.unlocked = true; updated = true;
        }
        if (highestStage >= 25 && !state.spirits.aqua_sprite.unlocked) {
             state.spirits.aqua_sprite.unlocked = true; updated = true;
             if (window.ZyloSlayer.log) window.ZyloSlayer.log('AQUA SPRITE Spirit Unlocked!', 'text-blue-400 font-bold drop-shadow');
        }
        if (highestStage >= 50 && !state.spirits.stone_golem.unlocked) {
             state.spirits.stone_golem.unlocked = true; updated = true;
             if (window.ZyloSlayer.log) window.ZyloSlayer.log('STONE GOLEM Spirit Unlocked!', 'text-orange-400 font-bold drop-shadow');
        }
        if (updated && window.ZS_UI) window.ZS_UI.renderSpiritsTab();
    },
    
    executeSpiritAction: function(spiritData, spiritState, enemyInfo, currentHp, maxHp) {
        // Calculate power based on spirit base stats * level
        const levelMult = 1.0 + ((spiritState.level - 1) * 0.1); 
        
        let msg = `[${spiritData.name}] uses ${spiritData.skill.name}! `;
        let color = 'text-gray-400';
        
        if (spiritData.element === 'fire') color = 'text-red-400 font-bold';
        if (spiritData.element === 'water') color = 'text-blue-400 font-bold';
        if (spiritData.element === 'earth') color = 'text-orange-400 font-bold';
        
        if (spiritData.role === 'DPS') {
            const elemMult = window.ZS_Elements ? window.ZS_Elements.getMultiplier(spiritData.element, enemyInfo.element) : 1;
            const dmg = spiritData.stats.atk * levelMult * spiritData.skill.multiplier * elemMult;
            enemyInfo.hp -= dmg;
            msg += `Deals ${Math.floor(dmg)} damage!`;
            
        } else if (spiritData.role === 'Support') {
            const heal = spiritData.stats.regen * levelMult * spiritData.skill.multiplier;
            window.ZS_Combat.currentHp = Math.min(maxHp, currentHp + heal);
            msg += `Heals you for ${Math.floor(heal)} HP!`;
            
        } else if (spiritData.role === 'Control') {
            const dmg = spiritData.stats.atk * levelMult * spiritData.skill.multiplier;
            enemyInfo.hp -= dmg;
            // Simulated stun: enemy misses next turn. We'll simply heal you for their ATK this specific frame to offset it
            msg += `Deals ${Math.floor(dmg)} damage & stuns enemy!`;
            if (enemyInfo.hp > 0) window.ZS_Combat.currentHp = Math.min(maxHp, currentHp + enemyInfo.atk);
        }
        
        if (window.ZyloSlayer.log) window.ZyloSlayer.log(msg, color);
        if (window.ZS_UI) window.ZS_UI.render();
    },
    
    switchSpirit: function(spiritId) {
        let state = window.ZyloSlayer.state;
        if (!state.spirits[spiritId] || !state.spirits[spiritId].unlocked) {
             alert('This Spirit is sealed! Reach higher stages to unlock.');
             return;
        }
        state.activeSpirit = spiritId;
        this.actionTimers[spiritId] = 0; // Ready immediately
        window.ZyloSlayer.saveGame();
        if (window.ZS_UI) window.ZS_UI.renderSpiritsTab();
    }
};
