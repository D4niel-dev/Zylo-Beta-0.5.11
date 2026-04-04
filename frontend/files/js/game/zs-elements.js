// frontend/files/js/game/zs-elements.js
window.ZS_Elements = {
    // Returns damage multiplier: 1.35 if advantage, 0.85 if disadvantage, 1.0 otherwise.
    getMultiplier: function(attackerElement, defenderElement) {
        if (!attackerElement || !defenderElement) return 1.0;
        
        attackerElement = attackerElement.toLowerCase();
        defenderElement = defenderElement.toLowerCase();
        
        if (attackerElement === 'physical' || defenderElement === 'physical') return 1.0;
        
        // Fire > Earth > Wind > Water > Fire
        const advantages = {
            'fire': 'earth',
            'earth': 'wind',
            'wind': 'water',
            'water': 'fire'
        };
        
        if (advantages[attackerElement] === defenderElement) {
            return 1.35; // Advantage
        }
        
        if (advantages[defenderElement] === attackerElement) {
            return 0.85; // Disadvantage
        }
        
        return 1.0; // Neutral
    }
};
