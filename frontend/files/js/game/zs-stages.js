// frontend/files/js/game/zs-stages.js
window.ZS_Stages = {
    playStage: function(targetStage) {
        let state = window.ZyloSlayer.state;
        
        if (targetStage > state.highestStage + 1) {
             alert('You have not unlocked this stage yet.');
             return;
        }
        
        state.stage = targetStage;
        state.killsInStage = 0;
        
        if (window.ZS_Combat) {
             window.ZS_Combat.spawnEnemy(targetStage);
             // Heal to full on stage change
             window.ZS_Combat.currentHp = state.stats.maxHp + window.ZS_Combat.getEquipStats().maxHp + window.ZS_Combat.getPassiveStats().maxHp;
        }
        
        if (window.ZS_Quests) window.ZS_Quests.registerStage(targetStage);
        if (window.ZyloSlayer.log) window.ZyloSlayer.log(`Moved to Stage ${targetStage}!`, 'text-blue-300 font-bold');
        
        window.ZyloSlayer.saveGame();
        if (window.ZS_UI) window.ZS_UI.render();
    },
    
    getRecommendedStage: function() {
        let state = window.ZyloSlayer.state;
        // Simple heuristic: farm 5 stages below highest if highest > 5, to guarantee fast kills
        if (state.highestStage <= 5) return state.highestStage;
        return state.highestStage - 5;
    }
};
