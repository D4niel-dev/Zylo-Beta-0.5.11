// frontend/files/js/game/zs-ui.js
window.ZS_UI = {
    init: function() {
        // Expand Modal
        const modalInner = document.querySelector('#appsModal > div');
        if (modalInner) {
             modalInner.classList.remove('max-w-md');
             modalInner.classList.add('max-w-5xl', 'flex', 'flex-col');
             modalInner.style.height = '85vh';
        }
        this.render();
    },
    
    destroy: function() {
        // Revert Modal sizing
        const modalInner = document.querySelector('#appsModal > div');
        if (modalInner) {
             modalInner.classList.add('max-w-md');
             modalInner.classList.remove('max-w-5xl', 'flex', 'flex-col');
             modalInner.style.height = 'auto';
        }
    },
    
    changeTab: function(tabName) {
        window.ZyloSlayer.currentTab = tabName;
        // Hide all
        document.querySelectorAll('.zs-tab-content').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.zs-tab-btn').forEach(el => {
             el.classList.remove('text-purple-400', 'border-purple-500');
             el.classList.add('text-discord-gray-400', 'border-transparent');
        });
        
        // Show active
        const activeTab = document.getElementById(`zsContent${tabName}`);
        const activeBtn = document.getElementById(`zsTab${tabName}`);
        if (activeTab) activeTab.classList.remove('hidden');
        if (activeBtn) {
             activeBtn.classList.remove('text-discord-gray-400', 'border-transparent');
             activeBtn.classList.add('text-purple-400', 'border-purple-500');
        }
        
        // Trigger generic renders
        if (tabName === 'Quests') this.renderQuestsTab();
        if (tabName === 'Equip') this.renderEquipTab();
        if (tabName === 'Skills') this.renderSkillsTab();
        if (tabName === 'Spirits') this.renderSpiritsTab();
        if (tabName === 'Stages') this.renderStagesTab();
        if (tabName === 'Stats') this.renderStatsTab();
    },
    
    render: function() {
        if (!window.ZyloSlayer) return;
        let state = window.ZyloSlayer.state;
        const enemy = window.ZS_Combat ? window.ZS_Combat.enemy : null;
        const currentHp = window.ZS_Combat ? window.ZS_Combat.currentHp : state.stats.maxHp;
        
        // Header Updates
        if (document.getElementById('rpgStage')) document.getElementById('rpgStage').textContent = state.stage;
        if (document.getElementById('rpgGold')) document.getElementById('rpgGold').textContent = state.gold;
        if (document.getElementById('rpgGems')) document.getElementById('rpgGems').textContent = state.gems;
        
        // Core Combat Hub (Play Tab)
        if (document.getElementById('rpgLevel')) document.getElementById('rpgLevel').textContent = state.level;
        if (document.getElementById('rpgXp')) document.getElementById('rpgXp').textContent = state.xp;
        
        const nextXp = Math.floor(100 * Math.pow(1.5, Math.max(1, state.level) - 1));
        if (document.getElementById('rpgNextXp')) document.getElementById('rpgNextXp').textContent = nextXp;
        if (document.getElementById('rpgXpBar')) document.getElementById('rpgXpBar').style.width = Math.min(100, (state.xp/nextXp)*100) + '%';
        
        const eqStats = window.ZS_Combat ? window.ZS_Combat.getEquipStats() : { maxHp: 0 };
        const psStats = window.ZS_Combat ? window.ZS_Combat.getPassiveStats() : { maxHp: 0 };
        const totalHp = state.stats.maxHp + eqStats.maxHp + psStats.maxHp;
        
        if (document.getElementById('rpgHp')) document.getElementById('rpgHp').textContent = Math.floor(currentHp);
        if (document.getElementById('rpgMaxHp')) document.getElementById('rpgMaxHp').textContent = Math.floor(totalHp);
        if (document.getElementById('rpgHpBar')) document.getElementById('rpgHpBar').style.width = Math.min(100, (currentHp / totalHp) * 100) + '%';
        
        // Mana Bar
        if (document.getElementById('rpgMana')) document.getElementById('rpgMana').textContent = state.mana;
        if (document.getElementById('rpgManaBar')) document.getElementById('rpgManaBar').style.width = Math.min(100, (state.mana / 100) * 100) + '%';
        
        // Enemy Bar
        if (enemy && document.getElementById('rpgEnemyInfo')) {
             document.getElementById('rpgEnemyInfo').classList.remove('hidden');
             const enemyHpBar = document.getElementById('rpgEnemyHpBar');
             const maxEHp = enemy.isBoss ? (enemy.maxHp) : (enemy.maxHp);
             if (enemyHpBar) enemyHpBar.style.width = Math.max(0, Math.min(100, (enemy.hp / maxEHp) * 100)) + '%';
             if (document.getElementById('rpgEnemyName')) {
                  const elemText = `[${enemy.element.toUpperCase()}]`;
                  document.getElementById('rpgEnemyName').innerHTML = `<span class="text-[10px] text-discord-gray-400 mr-1">${elemText}</span>${enemy.name}`;
             }
        }
        
        this.renderHotbarCooldowns();
    },
    
    // Renders the specific Hotbar elements visually
    renderHotbar: function() {
        let state = window.ZyloSlayer.state;
        const container = document.getElementById('rpgHotbar');
        if (!container) return;
        
        let html = '';
        for (let i = 0; i < 8; i++) {
             const skillId = state.skillSlots[i];
             if (!skillId) {
                  html += `<div class="w-12 h-12 shrink-0 bg-discord-gray-800 border border-white/5 rounded-lg flex items-center justify-center text-discord-gray-600 text-xs shadow-inner cursor-pointer hover:bg-white/5" onclick="window.ZS_UI.changeTab('Skills')"><i data-feather="plus" class="w-4 h-4"></i></div>`;
                  continue;
             }
             
             const skill = window.ZS_Data.SKILL_DATABASE.find(s => s.id === skillId);
             if (!skill) {
                  state.skillSlots[i] = null;
                  html += `<div class="w-12 h-12 shrink-0 bg-discord-gray-800 border border-white/5 rounded-lg flex items-center justify-center text-discord-gray-600 text-xs shadow-inner cursor-pointer hover:bg-white/5" onclick="window.ZS_UI.changeTab('Skills')"><i data-feather="plus" class="w-4 h-4"></i></div>`;
                  continue;
             }
             
             let elemColor = 'text-gray-400';
             if (skill.element === 'fire') elemColor = 'text-red-400';
             if (skill.element === 'water') elemColor = 'text-blue-400';
             if (skill.element === 'earth') elemColor = 'text-orange-400';
             if (skill.element === 'wind') elemColor = 'text-green-400';
             
             html += `
             <div class="relative w-12 h-12 shrink-0 bg-discord-gray-800 border border-white/10 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 transition group shadow-sm overflow-hidden" onclick="window.ZS_Skills.castSkill('${skill.id}')">
                 <div class="${elemColor} font-bold text-xs truncate max-w-[40px]" title="${skill.name}">${skill.name.split(' ')[1]}</div>
                 <div class="text-[8px] text-blue-300 mt-0.5">${skill.manaCost} MP</div>
                 <div id="cdOverlay_${skill.id}" class="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center text-white font-bold text-lg hidden backdrop-blur-[1px]"></div>
             </div>`;
        }
        container.innerHTML = html;
        if (window.feather) window.feather.replace();
    },
    
    renderHotbarCooldowns: function() {
        if (!window.ZS_Skills) return;
        const cds = window.ZS_Skills.combatCooldowns;
        
        for (let key in cds) {
             const overlay = document.getElementById(`cdOverlay_${key}`);
             if (overlay) {
                  if (cds[key] > 0) {
                       overlay.classList.remove('hidden');
                       overlay.textContent = cds[key];
                  } else {
                       overlay.classList.add('hidden');
                  }
             }
        }
    },
    
    updateAutoModeVisuals: function() {
        let state = window.ZyloSlayer.state;
        const btn = document.getElementById('zsAutoAuto');
        if (!btn) return;
        
        if (state.autoMode) {
            btn.classList.add('bg-green-500/20', 'text-green-400', 'border-green-500/50');
            btn.classList.remove('bg-discord-gray-800', 'text-discord-gray-400', 'border-white/5');
            btn.innerHTML = `<i data-feather="zap" class="w-4 h-4 mr-1"></i> Auto: ON`;
        } else {
            btn.classList.remove('bg-green-500/20', 'text-green-400', 'border-green-500/50');
            btn.classList.add('bg-discord-gray-800', 'text-discord-gray-400', 'border-white/5');
            btn.innerHTML = `<i data-feather="zap-off" class="w-4 h-4 mr-1"></i> Auto: OFF`;
        }
        if (window.feather) window.feather.replace();
    },
    
    pushLog: function(msg, colorClass = "text-gray-300") {
        const logEl = document.getElementById('rpgLog');
        if (!logEl) return;
        const line = document.createElement('div');
        line.className = `${colorClass} text-[11px] leading-tight`;
        line.innerHTML = msg;
        logEl.appendChild(line);
        logEl.scrollTop = logEl.scrollHeight;
    },
    
    // Detailed Tab Renders
    renderStatsTab: function() {
        let state = window.ZyloSlayer.state;
        const map = ['atk', 'hp', 'regen', 'crit'];
        const format = { 'atk': 'Attack', 'hp': 'Max HP', 'regen': 'Regen', 'crit': 'Crit %' };
        
        map.forEach(k => {
             const statEl = document.getElementById(`rpgStat${k.charAt(0).toUpperCase() + k.slice(1)}`);
             const costEl = document.getElementById(`rpgCost${k.charAt(0).toUpperCase() + k.slice(1)}`);
             if (statEl) statEl.textContent = state.stats[k === 'hp' ? 'maxHp' : k];
             if (costEl) costEl.textContent = state.costs[k];
        });
    },
    
    renderEquipTab: function(lazy = false) {
        let state = window.ZyloSlayer.state;
        const list = document.getElementById('rpgInventoryList');
        if (!list) return;
        
        const filterStr = window.currentInvFilter || 'weapon';
        
        // Update slot names visually
        ['weapon', 'accessory', 'relic', 'class'].forEach(slot => {
            const el = document.getElementById(`eqSlot${slot.charAt(0).toUpperCase() + slot.slice(1)}`);
            if (el) {
                 const eqId = state.equipped[slot];
                 if (eqId) {
                      const item = state.inventory.find(i => i.id === eqId);
                      el.textContent = item ? `+${item.upgrades || 0} ${item.name}` : 'None';
                 } else el.textContent = 'None';
            }
        });
        
        // Show resources tab additionally
        let items = state.inventory.filter(i => filterStr === 'resource' ? i.type === 'resource' : i.type === filterStr);
        // group identicals
        let groups = {};
        items.forEach(i => {
           let upgrades = i.upgrades || 0;
           let key = i.name + '_' + i.tier + '_' + upgrades;
           if (!groups[key]) groups[key] = [];
           groups[key].push(i);
        });

        let html = '';
        Object.values(groups).forEach(group => {
            const i = group[0];
            const c = group.length;
            const upg = i.upgrades ? `+${i.upgrades}` : '';
            
            let actionBtn = '';
            if (i.type === 'resource') {
                 actionBtn = `<span class="text-xs text-gray-500">Resource</span>`;
            } else {
                 const isEquipped = state.equipped[i.type] === i.id;
                 if (c >= 5) {
                      actionBtn += `<button onclick="window.ZS_Craft.craftEquipment('${i.id}')" class="text-[10px] bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">Merge 5</button> `;
                 }
                 actionBtn += `<button onclick="window.ZS_Upgrades.upgradeEquipment('${i.id}')" class="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-1 rounded mr-1">Up</button>`;
                 
                 if (isEquipped) {
                      actionBtn += `<button onclick="window.ZS_Skills.unequipEquip('${i.type}')" class="text-[10px] bg-red-500/20 text-red-400 px-2 py-1 rounded">Unequip</button>`;
                 } else {
                      actionBtn += `<button onclick="window.ZS_Skills.equipItem('${i.type}', '${i.id}')" class="text-[10px] bg-white/10 text-white px-2 py-1 rounded">Equip</button>`;
                 }
            }
            
            html += `
            <div class="flex justify-between items-center bg-discord-gray-800 p-2 rounded text-xs border border-white/5">
                <div><span class="font-bold text-gray-300">T${i.tier} ${upg} ${i.name}</span> ${c > 1 ? `x${c}` : ''}</div>
                <div class="flex gap-1">${actionBtn}</div>
            </div>`;
        });
        
        list.innerHTML = html || `<div class="text-xs text-gray-500 text-center py-4">No items here.</div>`;
    },

    renderSkillsTab: function() {
        let state = window.ZyloSlayer.state;
        const list = document.getElementById('zsSkillList');
        if (!list) return;

        let html = '';
        state.skillInventory.forEach(skillId => {
             const skill = window.ZS_Data.SKILL_DATABASE.find(s => s.id === skillId);
             if (!skill) return;
             
             // Check if it's equipped
             const slotIdx = state.skillSlots.indexOf(skillId);
             const isEquipped = slotIdx > -1;
             
             let actionBtn = `<button onclick="window.ZS_Craft.evolveSkill('${skill.id}')" class="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-1 rounded mr-1">Evolve</button>`;
             if (isEquipped) {
                  actionBtn += `<button onclick="window.ZS_Skills.unequipSkill(${slotIdx})" class="text-[10px] bg-red-500/20 text-red-500 px-2 py-1 rounded">Unequip</button>`;
             } else {
                  // Find first open slot
                  const openSlot = state.skillSlots.indexOf(null);
                  if (openSlot > -1) {
                        actionBtn += `<button onclick="window.ZS_Skills.equipSkill(${openSlot}, '${skill.id}')" class="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded">Equip</button>`;
                  } else {
                        actionBtn += `<span class="text-[10px] text-gray-500 px-1">Slots Full</span>`;
                  }
             }

             html += `
             <div class="flex justify-between items-center bg-discord-gray-800 p-2 rounded text-xs border ${isEquipped ? 'border-purple-500' : 'border-white/5'}">
                 <div>
                     <div class="font-bold text-${skill.rarity === 'Legendary' ? 'yellow' : 'gray'}-300">${skill.name}</div>
                     <div class="text-[10px] text-gray-400">${skill.type.toUpperCase()} | Cost: ${skill.manaCost} | CD: ${skill.cooldown}</div>
                 </div>
                 <div class="flex">${actionBtn}</div>
             </div>`;
        });
        
        list.innerHTML = html || `<div class="text-xs text-gray-500 text-center py-4">No skills unlocked. Roll the gacha!</div>`;
    },

    renderSpiritsTab: function() {
        let state = window.ZyloSlayer.state;
        const list = document.getElementById('zsSpiritList');
        if (!list) return;

        let html = '';
        Object.keys(window.ZS_Data.SPIRIT_DATABASE).forEach(spiritId => {
             const data = window.ZS_Data.SPIRIT_DATABASE[spiritId];
             const sState = state.spirits[spiritId];
             
             if (!sState.unlocked) {
                  html += `<div class="bg-black/50 p-2 rounded border border-red-500/20 text-xs text-center text-gray-600">Locked: ${data.name} (Requires higher stage)</div>`;
                  return;
             }
             
             const isActive = state.activeSpirit === spiritId;
             
             html += `
             <div class="bg-discord-gray-800 p-3 rounded border ${isActive ? 'border-orange-500 bg-orange-500/10' : 'border-white/5'} flex justify-between items-center text-xs">
                 <div>
                     <div class="font-bold text-gray-200">${data.name} <span class="text-orange-400 ml-1">Lv. ${sState.level}</span></div>
                     <div class="text-[10px] text-gray-400">Role: ${data.role} | Elements: ${data.element}</div>
                 </div>
                 <div class="flex gap-2">
                     <button onclick="window.ZS_Upgrades.upgradeSpirit('${spiritId}')" class="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Up</button>
                     ${isActive ? 
                         `<button class="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded cursor-default border border-green-500/50">Active</button>` :
                         `<button onclick="window.ZS_Spirits.switchSpirit('${spiritId}')" class="text-[10px] bg-white/10 text-white px-2 py-1 rounded">Summon</button>`
                     }
                 </div>
             </div>`;
        });
        list.innerHTML = html;
    },

    renderQuestsTab: function() {
        let state = window.ZyloSlayer.state;
        const list = document.getElementById('zsQuestList');
        if (!list) return;

        let html = '';
        ['daily', 'weekly', 'repeated', 'achievements'].forEach(cat => {
            if(!state.quests[cat] || state.quests[cat].length === 0) return;
            html += `<div class="text-xs text-white font-bold my-2 uppercase border-b border-white/10 pb-1">${cat}</div>`;
            state.quests[cat].forEach((q, idx) => {
                 const pct = Math.min(100, (q.progress / q.target) * 100);
                 let btnHtml = '';
                 
                 if (q.claimed) {
                      btnHtml = `<span class="text-[10px] text-gray-600">Claimed</span>`;
                 } else if (q.completed) {
                      btnHtml = `<button onclick="window.ZS_Quests.claimReward('${cat}', ${idx})" class="text-[10px] bg-teal-500 text-black font-bold px-2 py-1 rounded shadow-md animate-pulse">Claim ${q.gemReward} Gems</button>`;
                 } else {
                      btnHtml = `<span class="text-[10px] text-gray-400">${q.progress}/${q.target}</span>`;
                 }
                 
                 html += `
                 <div class="bg-discord-gray-800 p-2 rounded mb-1 border border-white/5 text-xs flex flex-col gap-1">
                     <div class="flex justify-between items-center text-gray-300">
                         <div>${q.name}</div>
                         <div>${btnHtml}</div>
                     </div>
                     <div class="w-full bg-black/50 rounded-full h-1 mt-1">
                         <div class="bg-blue-500 h-1 rounded-full" style="width: ${pct}%"></div>
                     </div>
                 </div>`;
            });
        });
        list.innerHTML = html;
    },

    renderStagesTab: function() {
        let state = window.ZyloSlayer.state;
        const list = document.getElementById('zsStageList');
        if (!list) return;
        
        let html = `<div class="text-xs text-gray-400 mb-2">Highest Cleared: Stage ${state.highestStage}</div>
                    <div class="text-xs text-blue-400 mb-4 bg-blue-500/10 p-2 rounded border border-blue-500/20">Recommended Farming: Stage ${window.ZS_Stages.getRecommendedStage()}</div>
                    <div class="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin">`;
                    
        for (let i = 1; i <= state.highestStage + 1; i++) {
             const isCurrent = i === state.stage;
             if (isCurrent) {
                  html += `<button class="bg-purple-500 text-white border border-purple-400 text-xs py-2 rounded shadow-md cursor-default flex flex-col items-center"><div>${i}</div><div class="text-[8px]">Active</div></button>`;
             } else {
                  html += `<button onclick="window.ZS_Stages.playStage(${i})" class="bg-discord-gray-800 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5 text-xs py-2 rounded transition flex flex-col items-center"><div>${i}</div><div class="text-[8px]">Play</div></button>`;
             }
        }
        html += `</div>`;
        list.innerHTML = html;
    },

    showSummonResults: function(results, type) {
        const area = document.getElementById('summonResultArea');
        if (!area) return;
        if (results.length === 0) return;
        
        // Find highest rarity
        const rarityOrder = ['Common','Uncommon','Rare','Epic','Legendary','Mythical','Immortal','Ancient'];
        results.sort((a,b) => rarityOrder.indexOf(b.rarity) - rarityOrder.indexOf(a.rarity));
        const best = results[0];
        
        let rColor = 'text-gray-300';
        if(best.rarity === 'Epic') rColor = 'text-purple-400 shadow-purple max-w-fit shadow-md';
        if(best.rarity === 'Legendary') rColor = 'text-yellow-400 font-bold max-w-fit shadow-yellow shadow-lg';
        
        area.innerHTML = `<span class="${rColor} text-sm font-bold animate-pulse">Got: ${best.rarity} ${best.name}!</span>`;
    }
};

window.ZS_Skills.equipItem = function(type, id) {
     window.ZyloSlayer.state.equipped[type] = id;
     window.ZS_Combat.currentHp = window.ZyloSlayer.state.stats.maxHp + window.ZS_Combat.getEquipStats().maxHp + window.ZS_Combat.getPassiveStats().maxHp;
     window.ZyloSlayer.saveGame();
     if (window.ZS_UI) window.ZS_UI.renderEquipTab(true);
};
window.ZS_Skills.unequipEquip = function(type) {
     this.equipItem(type, null);
};
