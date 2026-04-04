// frontend/files/js/game/zs-craft.js
window.ZS_Craft = {
    // Merge identical equipment to upgrade tier
    craftEquipment: function(sampleId) {
        let state = window.ZyloSlayer.state;
        const sample = state.inventory.find(i => i.id === sampleId && i.type !== 'resource');
        if (!sample) return;
        
        const identicals = state.inventory.filter(i => i.name === sample.name && i.tier === sample.tier);
        if (identicals.length < 5) {
             alert('You need 5 identical equipment pieces to craft the next tier.');
             return;
        }
        
        // Remove 5 pieces
        for (let count = 0; count < 5; count++) {
            const toRemove = identicals[count].id;
            const idx = state.inventory.findIndex(i => i.id === toRemove);
            if (idx > -1) state.inventory.splice(idx, 1);
            if (state.equipped[sample.type] === toRemove) state.equipped[sample.type] = null; // unequip if consumed
        }

        // Add upgraded piece
        const newItem = {
             id: 'item_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
             type: sample.type,
             rarity: sample.rarity,
             tier: sample.tier + 1,
             name: sample.name,
             atk: sample.atk * 2,
             hp: sample.hp * 2,
             regen: sample.regen * 2
        };
        
        state.inventory.push(newItem);
        if (window.ZyloSlayer.log) window.ZyloSlayer.log(`Forged Tier ${newItem.tier} ${newItem.name}!`, 'text-yellow-400 font-bold drop-shadow');
        
        if (window.ZS_Quests) window.ZS_Quests.registerCraft(1);
        
        window.ZyloSlayer.saveGame();
        if (window.ZS_UI) window.ZS_UI.renderEquipTab(true);
    },
    
    // Attempt to evolve a skill using Gold and matching Element Stones
    evolveSkill: function(skillId) {
        let state = window.ZyloSlayer.state;
        if (!window.ZS_Data || !window.ZS_Data.SKILL_DATABASE) return;
        
        // Ensure player owns the skill
        if (!state.skillInventory.includes(skillId)) return;
        
        const skill = window.ZS_Data.SKILL_DATABASE.find(s => s.id === skillId);
        if (!skill) return;
        
        // Check if there's a higher rarity version of this skill type/element
        const rarityPath = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythical', 'Immortal', 'Ancient'];
        const currentIdx = rarityPath.indexOf(skill.rarity);
        
        if (currentIdx === -1 || currentIdx >= rarityPath.length - 1) {
             alert('This skill cannot be evolved further.');
             return;
        }
        
        const nextRarity = rarityPath[currentIdx + 1];
        const nextSkill = window.ZS_Data.SKILL_DATABASE.find(s => s.rarity === nextRarity && s.type === skill.type && s.element === skill.element);
        
        if (!nextSkill) {
             alert('No known evolution for this skill.');
             return;
        }
        
        if (state.skillInventory.includes(nextSkill.id)) {
             alert('You already own the evolved version of this skill.');
             return;
        }
        
        // Costs
        const goldCost = 5000 * Math.pow(3, currentIdx);
        const stoneCost = 10 * Math.pow(2, currentIdx);
        const stoneName = (skill.element + "_stone").toUpperCase();
        
        const stoneRes = state.inventory.filter(i => i.name === stoneName && i.type === 'resource');
        const totalStones = stoneRes.length; // We push individual items for stones right now, could be count-based later
        
        if (state.gold < goldCost) {
             alert(`Not enough Gold to evolve! Need ${goldCost}g.`);
             return;
        }
        
        if (totalStones < stoneCost) {
             alert(`Not enough ${stoneName}s! Need ${stoneCost}, but you have ${totalStones}.`);
             return;
        }
        
        // Consume Costs
        state.gold -= goldCost;
        let stonesRemoved = 0;
        for (let i = state.inventory.length - 1; i >= 0; i--) {
             if (stonesRemoved >= stoneCost) break;
             if (state.inventory[i].name === stoneName && state.inventory[i].type === 'resource') {
                  state.inventory.splice(i, 1);
                  stonesRemoved++;
             }
        }
        
        // Consume original skill? Let's just grant the new one, they keep the original too.
        state.skillInventory.push(nextSkill.id);
        
        if (window.ZyloSlayer.log) window.ZyloSlayer.log(`Evolution Success! Unlocked ${nextSkill.name}!`, 'text-purple-400 font-bold drop-shadow');
        if (window.ZS_Quests) window.ZS_Quests.registerCraft(1);
        
        window.ZyloSlayer.saveGame();
        if (window.ZS_UI) window.ZS_UI.renderSkillsTab();
    }
};
