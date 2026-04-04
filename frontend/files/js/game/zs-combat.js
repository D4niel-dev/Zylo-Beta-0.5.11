// frontend/files/js/game/zs-combat.js
window.ZS_Combat = {
    enemy: null,
    currentHp: 0,
    maxMana: 100, // Based on specs and passive buffs
    
    tick: function() {
        if (!window.ZyloSlayer || !window.ZS_Data) return;
        let state = window.ZyloSlayer.state;
        
        // 1. Ensure Stats Calculate Properly
        const eqStats = this.getEquipStats();
        const passiveStats = this.getPassiveStats();
        
        const totalMaxHp = state.stats.maxHp + eqStats.maxHp + passiveStats.maxHp;
        const totalAtk = state.stats.atk + eqStats.atk + passiveStats.atk;
        const totalRegen = state.stats.regen + eqStats.regen + passiveStats.regen;
        const totalCrit = state.stats.crit; // Passives might boost this, but ignoring for now
        
        if (this.currentHp === 0) this.currentHp = totalMaxHp; // init
        if (state.mana === undefined) state.mana = 100;
        
        // Passive/Regen Phase
        this.currentHp = Math.min(totalMaxHp, this.currentHp + totalRegen);
        state.mana = Math.min(this.maxMana, state.mana + 10); // 10 regen/tick as requested
        
        if (window.ZS_Skills) window.ZS_Skills.tickCooldowns();
        
        // Ensure enemy exists
        if (!this.enemy) {
            this.spawnEnemy(state.stage);
            return; // Wait one tick so we don't instantly hit them
        }
        
        // Check Death
        if (this.currentHp <= 0) {
            this.log('You fainted! Resting to recover...', 'text-red-400');
            this.currentHp = totalMaxHp;
            state.stage = Math.max(1, state.stage - 1); // Fallback a stage on death
            state.killsInStage = 0;
            this.enemy = null;
            if (window.ZS_Skills) window.ZS_Skills.resetCooldowns();
            window.ZyloSlayer.saveGame();
            if (window.ZS_UI) window.ZS_UI.render();
            return;
        }

        // --- PLAYER TURN ---
        
        // Check Auto-Cast First
        let skillToCast = null;
        if (window.ZS_Skills && state.autoMode) {
            skillToCast = window.ZS_Skills.evaluateAutoCast(this.enemy, this.currentHp);
        }
        
        if (skillToCast) {
            this.executeSkill(skillToCast, false); // Will process in this tick
        } else {
            // Normal Auto-Attack
            this.inflictDamage({
                name: 'Basic Attack',
                element: 'physical',
                hits: 1,
                multiplier: 1.0,
                isCritAble: true
            }, totalAtk, totalCrit);
        }
        
        // Companion Action
        if (window.ZS_Spirits) {
            window.ZS_Spirits.tick(this.enemy, this.currentHp, totalMaxHp);
        }

        // Enemy Death Check
        if (this.enemy.hp <= 0) {
            this.handleEnemyDeath();
            return;
        }

        // --- ENEMY TURN ---
        this.currentHp -= this.enemy.atk;
        this.log(`${this.enemy.name} hits you for ${Math.floor(this.enemy.atk)} dmg!`, 'text-red-300');
        
        // UI Update
        if (window.ZS_UI) window.ZS_UI.render();
    },
    
    inflictDamage: function(attackInfo, totalAtk, critChance) {
        if (!this.enemy) return;
        
        const elemMult = window.ZS_Elements ? window.ZS_Elements.getMultiplier(attackInfo.element, this.enemy.element) : 1;
        let baseDmg = totalAtk * attackInfo.multiplier * elemMult;
        
        let totalDamage = 0;
        let critCount = 0;
        
        for (let i = 0; i < attackInfo.hits; i++) {
            let hitDmg = baseDmg;
            if (attackInfo.isCritAble && Math.random() * 100 < critChance) {
                hitDmg *= 2; // Simple crit
                critCount++;
            }
            totalDamage += hitDmg;
        }
        
        this.enemy.hp -= totalDamage;
        
        const elemText = attackInfo.element !== 'physical' ? `[${attackInfo.element.toUpperCase()}] ` : '';
        const elemColor = elemMult > 1 ? 'text-green-400 font-bold' : (elemMult < 1 ? 'text-orange-400' : 'text-white');
        
        let msg = `You used ${attackInfo.name} for ${Math.floor(totalDamage)} dmg!`;
        if (critCount > 0) msg += ` (${critCount}x CRIT!)`;
        
        this.log(`${elemText}${msg}`, elemColor);
    },
    
    executeSkill: function(skill, triggeredFromUI = true) {
        if (!this.enemy || !skill) return;
        const state = window.ZyloSlayer.state;
        
        // Deduct Mana and apply CD
        state.mana -= skill.manaCost;
        if (window.ZS_Skills) window.ZS_Skills.combatCooldowns[skill.id] = skill.cooldown;
        
        const eqStats = this.getEquipStats();
        const passiveStats = this.getPassiveStats();
        const totalAtk = state.stats.atk + eqStats.atk + passiveStats.atk;
        const totalCrit = state.stats.crit;
        
        // Action
        this.inflictDamage({
            name: skill.name,
            element: skill.element,
            hits: skill.hits || 1,
            multiplier: skill.multiplier,
            isCritAble: true
        }, totalAtk, totalCrit);
        
        if (triggeredFromUI) {
            // We need to re-render to update CD and Mana bars
            if (window.ZS_UI) window.ZS_UI.render();
            // If the enemy died due to manual click, handle it immediately
            if (this.enemy.hp <= 0) {
                this.handleEnemyDeath();
            }
        }
    },
    
    spawnEnemy: function(stageLevel) {
        if (!window.ZS_Data || !window.ZS_Data.getStageData) return;
        
        this.enemy = window.ZS_Data.getStageData(stageLevel);
        this.enemy.hp = this.enemy.maxHp; // Fix: Assign HP
        const elemColor = this.enemy.isBoss ? 'text-purple-400 font-bold' : 'text-gray-400';
        this.log(`[${this.enemy.name} - ${this.enemy.element.toUpperCase()}] appeared! (HP: ${Math.floor(this.enemy.hp)})`, elemColor);
        if (window.ZS_UI) window.ZS_UI.render();
    },
    
    handleEnemyDeath: function() {
        let state = window.ZyloSlayer.state;
        this.log(`You defeated ${this.enemy.name}! Gained ${Math.floor(this.enemy.goldReward)}g & ${Math.floor(this.enemy.xpReward)}xp.`, 'text-green-400');
        
        state.gold += this.enemy.goldReward;
        state.xp += this.enemy.xpReward;
        if (this.enemy.gemReward > 0) {
            state.gems += this.enemy.gemReward;
            this.log(`Boss dropped ${this.enemy.gemReward} Gems!`, 'text-teal-400 font-bold');
        }
        
        // Stone drops
        if (Math.random() < this.enemy.stoneDropChance) {
             const stoneName = this.enemy.element + "_stone";
             // Push simple resource to inventory
             state.inventory.push({
                 id: 'res_' + Date.now() + Math.random(),
                 type: 'resource',
                 name: stoneName.toUpperCase(),
                 tier: 1, rarity: 'Common', atk: 0, hp: 0, regen: 0
             });
             this.log(`Dropped ${stoneName.toUpperCase()}!`, 'text-blue-300 font-bold');
             if (window.ZS_UI) window.ZS_UI.renderEquipTab(true); // force lazy render
        }
        
        // Quests
        if (window.ZS_Quests) window.ZS_Quests.registerKill(this.enemy.isBoss);
        
        // Old bounty fallback backwards compatibility:
        if (state.quest && state.quest.active) {
            state.quest.progress++;
            if (state.quest.progress >= state.quest.target) {
                state.quest.active = false;
                const questRewardGold = 100 * state.level;
                const questRewardGems = state.level * 50;
                state.gold += questRewardGold;
                state.gems += questRewardGems;
                this.log(`BOUNTY COMPLETE! Gained ${questRewardGold}g & ${questRewardGems} Gems!`, 'text-yellow-400 font-bold bg-yellow-500/10 p-1 rounded mt-1 mb-1');
                 setTimeout(() => {
                    state.quest = {
                        name: `Slayer Rank ${state.level + 1}`,
                        progress: 0,
                        target: Math.floor(50 * Math.pow(1.2, state.level)),
                        active: true
                    };
                    if (window.ZS_UI) window.ZS_UI.render();
                    window.ZyloSlayer.saveGame();
                    this.log(`New Bounty Assigned: ${state.quest.name}`, 'text-green-400 italic');
                }, 3000);
            }
        }
        
        // Boss progression
        if (this.enemy.isBoss) {
            if (state.stage === state.highestStage) {
                 state.highestStage++;
            }
            state.stage++;
            state.killsInStage = 0;
            this.log(`STAGE CLEARED! Advancing to Stage ${state.stage}.`, 'text-blue-400 font-bold drop-shadow-sm');
        } else {
            state.killsInStage++;
        }
        
        // Level up
        const getNextXp = () => Math.floor(100 * Math.pow(1.5, state.level - 1));
        while (state.xp >= getNextXp()) {
            state.xp -= getNextXp();
            state.level++;
            state.stats.atk += 2;
            state.stats.maxHp += 20;
            const eqStats = this.getEquipStats();
            this.currentHp = state.stats.maxHp + eqStats.maxHp + this.getPassiveStats().maxHp;
            this.log(`LEVEL UP! You are now Level ${state.level}!`, 'text-pink-400 font-bold text-center bg-pink-500/10 rounded py-0.5 mt-1');
        }
        
        this.enemy = null;
        window.ZyloSlayer.saveGame();
        if (window.ZS_UI) window.ZS_UI.render();
    },
    
    getEquipStats: function() {
        let state = window.ZyloSlayer.state;
        let total = { atk: 0, maxHp: 0, regen: 0 };
        if (!state.equipped || !state.inventory) return total;
        
        Object.values(state.equipped).forEach(itemId => {
            if (!itemId) return;
            const item = state.inventory.find(i => i.id === itemId);
            if (item) {
                if (item.atk) total.atk += item.atk;
                if (item.hp) total.maxHp += item.hp;
                if (item.regen) total.regen += item.regen;
            }
        });
        return total;
    },
    
    getPassiveStats: function() {
        let state = window.ZyloSlayer.state;
        let total = { atk: 0, maxHp: 0, regen: 0 };
        if (!window.ZS_Skills || !window.ZS_Data) return total;
        
        const active = window.ZS_Skills.getActiveSkills();
        active.forEach(skill => {
             if (skill && skill.type === 'passive') {
                 // Passive multiplier scales base stats directly
                 total.atk += Math.floor(state.stats.atk * (skill.multiplier - 1.0));
                 total.maxHp += Math.floor(state.stats.maxHp * (skill.multiplier - 1.0));
             }
        });
        return total;
    },
    
    // Globally accessible logger hook for ZyloSlayer
    log: function(msg, colorClass) {
        if (window.ZS_UI) {
            window.ZS_UI.pushLog(msg, colorClass);
        } else {
            console.log("ZYLO SLAYER LOG:", msg); // Fallback
        }
    }
};

window.ZyloSlayer.log = function(msg, color) { window.ZS_Combat.log(msg, color); };
