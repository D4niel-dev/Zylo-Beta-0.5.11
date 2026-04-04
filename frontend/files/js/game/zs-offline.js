// frontend/files/js/game/zs-offline.js
window.ZS_Offline = {
    calculate: function() {
        if (!window.ZyloSlayer || !window.ZS_Data) return;
        let state = window.ZyloSlayer.state;
        
        const now = Date.now();
        if (!state.lastSaveTimestamp) {
             state.lastSaveTimestamp = now;
             return;
        }
        
        const elapsedMs = now - state.lastSaveTimestamp;
        const elapsedMinutes = Math.floor(elapsedMs / (1000 * 60));
        
        // At least 5 minutes offline required
        if (elapsedMinutes < 5) {
             state.lastSaveTimestamp = now;
             return;
        }
        
        const maxOfflineMinutes = 10 * 60; // 10 hours
        const cappedMinutes = Math.min(elapsedMinutes, maxOfflineMinutes);
        
        // Grab stage base rewards (assumes ~10 kills per minute on auto for estimate)
        // StageData returns per-kill value
        const stageInfo = window.ZS_Data.getStageData(state.stage);
        
        const estimatedKillsPerMinute = 8; 
        const goldPerMin = stageInfo.goldReward * estimatedKillsPerMinute;
        const xpPerMin = stageInfo.xpReward * estimatedKillsPerMinute;
        
        // Boss gives gems, say 1 boss every 1.5 minutes
        const gemPerMin = Math.floor((stageInfo.gemReward || 20) / 1.5);
        
        const totalGold = Math.floor(goldPerMin * cappedMinutes);
        const totalXp = Math.floor(xpPerMin * cappedMinutes);
        const rawGems = Math.floor(gemPerMin * cappedMinutes);
        
        const maxGems = 5000;
        const totalGems = Math.min(rawGems, maxGems);
        
        // Apply rewards
        state.gold += totalGold;
        state.xp += totalXp;
        state.gems += totalGems;
        
        // Auto Level-Up Resolution
        const getNextXp = () => Math.floor(100 * Math.pow(1.5, state.level - 1));
        let levelsGained = 0;
        while (state.xp >= getNextXp()) {
            state.xp -= getNextXp();
            state.level++;
            state.stats.atk += 2;
            state.stats.maxHp += 20;
            levelsGained++;
            if (window.ZS_Combat) {
                window.ZS_Combat.currentHp = state.stats.maxHp + window.ZS_Combat.getEquipStats().maxHp + window.ZS_Combat.getPassiveStats().maxHp;
            }
        }
        
        state.lastSaveTimestamp = now;
        window.ZyloSlayer.saveGame();
        
        // Show Welcome Back Popup
        const hrs = Math.floor(elapsedMinutes / 60);
        const mins = elapsedMinutes % 60;
        let timeStr = "";
        if (hrs > 0) timeStr += `${hrs}h `;
        timeStr += `${mins}m`;
        
        const cappedHrs = Math.floor(cappedMinutes/60);
        const cappedMins = cappedMinutes % 60;
        
        let msg = `You were offline for <span class="text-white font-bold">${timeStr}</span>.<br>`;
        if (elapsedMinutes > maxOfflineMinutes) {
             msg += `<span class="text-red-400 text-[10px]">(Rewards capped at ${cappedHrs}h ${cappedMins}m)</span><br><br>`;
        } else {
             msg += `<br>`;
        }
        
        msg += `<div class="flex justify-around text-xs text-discord-gray-300 bg-black/40 p-2 rounded">
                 <div class="text-yellow-400"><i data-feather="database" class="w-3 h-3 inline"></i> ${totalGold}</div>
                 <div class="text-blue-400"><i data-feather="arrow-up" class="w-3 h-3 inline"></i> ${totalXp} XP</div>
                 <div class="text-teal-400"><i data-feather="hexagon" class="w-3 h-3 inline"></i> ${totalGems}</div>
               </div>`;
               
        if (totalGems >= maxGems) {
             msg += `<div class="text-orange-400 text-[10px] text-center mt-1">Gem cap reached (5,000)!</div>`;
        }
        if (levelsGained > 0) {
             msg += `<div class="text-pink-400 text-xs font-bold text-center mt-2 animate-pulse">You leveled up ${levelsGained} times!</div>`;
        }
        
        if (window.showCustomModal) {
             window.showCustomModal('Welcome Back, Slayer!', msg);
        } else {
             setTimeout(() => {
                 if (window.ZyloSlayer.log) window.ZyloSlayer.log(`OFFLINE GRIND: Earned ${totalGold}g, ${totalXp}xp, ${totalGems}gems!`, 'text-blue-300 font-bold bg-blue-500/10 p-1');
             }, 1000);
        }
    }
};
