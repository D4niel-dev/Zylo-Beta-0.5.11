// frontend/files/js/game/zs-upgrades.js
window.ZS_Upgrades = {
    MAX_LEVEL: 200,
    
    getUpgradeCost: function(baseCost, currentLevel) {
        return Math.floor(baseCost * Math.pow(1.05, currentLevel));
    },
    
    // Upgrade existing Equipment piece in inventory
    upgradeEquipment: function(itemId) {
        let state = window.ZyloSlayer.state;
        const item = state.inventory.find(i => i.id === itemId && i.type !== 'resource');
        if (!item) return;
        
        if (!item.upgrades) item.upgrades = 0;
        if (item.upgrades >= this.MAX_LEVEL) {
             alert('Item has reached maximum upgrade level (+200).');
             return;
        }
        
        // Base cost relies on rarity & tier
        const rarityMult = { 'Common': 1, 'Uncommon': 2, 'Rare': 4, 'Epic': 10, 'Legendary': 25 }[item.rarity] || 1;
        const baseCost = 50 * rarityMult * item.tier;
        const cost = this.getUpgradeCost(baseCost, item.upgrades);
        
        if (state.gold < cost) {
             alert(`Not enough Gold! Cost: ${cost}g`);
             return;
        }
        
        state.gold -= cost;
        item.upgrades++;
        
        // Boost stats ~5% per upgrade
        if (item.atk) item.atk = Math.floor(item.atk * 1.05) + 1;
        if (item.hp) item.hp = Math.floor(item.hp * 1.05) + 10;
        if (item.regen) item.regen = Math.floor(item.regen * 1.05) + 1;
        
        if (window.ZyloSlayer.log) window.ZyloSlayer.log(`Upgraded ${item.name} to +${item.upgrades}!`, 'text-gray-300');
        
        // If it's equipped, update current hp max
        if (Object.values(state.equipped).includes(itemId) && window.ZS_Combat) {
             window.ZS_Combat.currentHp = state.stats.maxHp + window.ZS_Combat.getEquipStats().maxHp + window.ZS_Combat.getPassiveStats().maxHp;
        }
        
        window.ZyloSlayer.saveGame();
        if (window.ZS_UI) window.ZS_UI.renderEquipTab(true);
    },
    
    // Upgrade base player stats
    upgradeBaseStat: function(type) {
        let state = window.ZyloSlayer.state;
        const cost = state.costs[type];
        
        if (state.gold < cost) {
             return false;
        }
        
        state.gold -= cost;
        if (type === 'atk') { state.stats.atk += 5; state.costs.atk = Math.floor(cost * 1.5); }
        if (type === 'hp') { state.stats.maxHp += 50; state.costs.hp = Math.floor(cost * 1.5); if (window.ZS_Combat) window.ZS_Combat.currentHp += 50; }
        if (type === 'regen') { state.stats.regen += 2; state.costs.regen = Math.floor(cost * 2.5); }
        if (type === 'crit') { 
            if (state.stats.crit < 100) { state.stats.crit += 1; state.costs.crit = Math.floor(cost * 1.8); }
            else { alert("Max Crit Reached."); state.gold += cost; }
        }
        
        window.ZyloSlayer.saveGame();
        if (window.ZS_UI) window.ZS_UI.renderStatsTab();
        return true;
    },
    
    // Upgrade Spirit
    upgradeSpirit: function(spiritId) {
        let state = window.ZyloSlayer.state;
        const sData = state.spirits[spiritId];
        if (!sData || !sData.unlocked) return;
        
        if (sData.level >= this.MAX_LEVEL) {
             alert('Spirit has reached max level (+200).');
             return;
        }
        
        const cost = this.getUpgradeCost(1000, sData.level);
        if (state.gold < cost) {
             alert(`Not enough Gold! Cost: ${cost}g`);
             return;
        }
        
        state.gold -= cost;
        sData.level++;
        
        if (window.ZyloSlayer.log) window.ZyloSlayer.log(`Spirit leveled up! Level ${sData.level}`, 'text-teal-400');
        
        window.ZyloSlayer.saveGame();
        if (window.ZS_UI) window.ZS_UI.renderSpiritsTab();
    }
};
