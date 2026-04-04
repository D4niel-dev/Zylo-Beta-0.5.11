// frontend/files/js/game/zs-summon.js
window.ZS_Summon = {
    pullEquipment: function(times) {
        let state = window.ZyloSlayer.state;
        const cost = times * 100;
        
        if (state.gems < cost) {
            alert("Not enough Gems! Defeat Bosses or clear Quests to earn more.");
            return;
        }
        
        state.gems -= cost;
        const slots = ['weapon', 'accessory', 'relic', 'class'];
        const slotNames = { weapon: 'Sword', accessory: 'Ring', relic: 'Relic', class: 'Amulet' };
        let results = [];
        
        for (let i = 0; i < times; i++) {
            state.pityCounters.equipment++;
            
            const roll = Math.random();
            let rarity = 'Common';
            let statMult = 1;
            
            // Pity logic
            if (state.pityCounters.equipment >= 100) { rarity = 'Legendary'; statMult = 20; state.pityCounters.equipment = 0; }
            else if (state.pityCounters.equipment >= 30 && roll > 0.5) { rarity = 'Epic'; statMult = 8; }
            else {
                if (roll > 0.4) { rarity = 'Uncommon'; statMult = 1.5; }
                if (roll > 0.7) { rarity = 'Rare'; statMult = 3; }
                if (roll > 0.9) { rarity = 'Epic'; statMult = 8; }
                if (roll > 0.98) { rarity = 'Legendary'; statMult = 20; state.pityCounters.equipment = 0; }
            }
            
            const slot = slots[Math.floor(Math.random() * slots.length)];
            const item = {
                id: 'item_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
                type: slot,
                rarity,
                tier: 1,
                name: `${rarity} ${slotNames[slot]}`,
                atk: 0, hp: 0, regen: 0
            };

            if(slot === 'weapon') item.atk = Math.floor(10 * statMult);
            if(slot === 'relic') item.regen = Math.floor(1 * statMult);
            if(slot === 'class') item.hp = Math.floor(100 * statMult);
            if(slot === 'accessory') {
                 item.atk = Math.floor(5 * statMult);
                 item.hp = Math.floor(50 * statMult);
            }
            
            state.inventory.push(item);
            results.push(item);
        }
        
        if (window.ZS_Quests) window.ZS_Quests.registerSummon(times);
        if (window.ZyloSlayer.log) window.ZyloSlayer.log(`Summoned ${times} Equipments!`, 'text-blue-300 font-bold');
        
        window.ZyloSlayer.saveGame();
        if (window.ZS_UI) window.ZS_UI.showSummonResults(results, 'equipment');
        if (window.ZS_UI) window.ZS_UI.render();
    },
    
    pullSkill: function(times) {
        let state = window.ZyloSlayer.state;
        const cost = times * 150; // Skills are a bit more expensive
        
        if (state.gems < cost) {
            alert("Not enough Gems! Defeat Bosses or clear Quests to earn more.");
            return;
        }
        
        if (!window.ZS_Data || !window.ZS_Data.SKILL_DATABASE) return;
        
        state.gems -= cost;
        let results = [];
        
        for (let i = 0; i < times; i++) {
            state.pityCounters.skills++;
            
            const roll = Math.random();
            let targetRarity = 'Common';
            
            // Pity logic
            if (state.pityCounters.skills >= 100) { targetRarity = 'Legendary'; state.pityCounters.skills = 0; }
            else if (state.pityCounters.skills >= 30 && roll > 0.5) { targetRarity = 'Epic'; }
            else {
                if (roll > 0.4) targetRarity = 'Uncommon';
                if (roll > 0.7) targetRarity = 'Rare';
                if (roll > 0.9) targetRarity = 'Epic';
                if (roll > 0.98) { targetRarity = 'Legendary'; state.pityCounters.skills = 0; }
                if (roll > 0.995) { targetRarity = 'Mythical'; state.pityCounters.skills = 0; }
                if (roll > 0.999) { targetRarity = 'Immortal'; state.pityCounters.skills = 0; }
            }
            
            const pool = window.ZS_Data.SKILL_DATABASE.filter(s => s.rarity === targetRarity);
            let pulledSkill = null;
            if (pool.length > 0) pulledSkill = pool[Math.floor(Math.random() * pool.length)];
            else pulledSkill = window.ZS_Data.SKILL_DATABASE[0]; // Fallback
            
            // Skills drop as "Skill Cards" which go into the skillInventory directly
            // If they already have it, we can give a duplicate resource or just allow dupes for upgrading
            results.push(pulledSkill);
            
            if (!state.skillInventory.includes(pulledSkill.id)) {
                 state.skillInventory.push(pulledSkill.id);
            } else {
                 // Duplicate handling: convert to generic skill card currency for upgrades
                 const cardId = 'card_' + pulledSkill.rarity.toLowerCase();
                 let existingCard = state.inventory.find(item => item.id === cardId);
                 if (existingCard) existingCard.count = (existingCard.count || 1) + 1;
                 else {
                      state.inventory.push({
                           id: cardId, type: 'resource', name: `${targetRarity} Skill Card`, tier: 1, rarity: targetRarity, count: 1
                      });
                 }
                 results[results.length-1].isDuplicate = true;
            }
        }
        
        if (window.ZS_Quests) window.ZS_Quests.registerSummon(times);
        if (window.ZyloSlayer.log) window.ZyloSlayer.log(`Summoned ${times} Skills!`, 'text-purple-400 font-bold drop-shadow');
        
        window.ZyloSlayer.saveGame();
        if (window.ZS_UI) window.ZS_UI.showSummonResults(results, 'skill');
        if (window.ZS_UI) window.ZS_UI.render();
    }
};
