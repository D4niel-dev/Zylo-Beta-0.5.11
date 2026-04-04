// frontend/files/js/game/zs-data.js
window.ZS_Data = {
    SKILL_DATABASE: [],
    SPIRIT_DATABASE: {},
    QUEST_POOL: {},
    STAGE_DATA: {},

    init: function() {
        this.populateElements();
    },
    populateElements: function() {
        // Initialization if needed
    }
};

window.ZS_Data.SKILL_DATABASE = [
    {
        "id": "strike_common_0",
        "name": "Common Fire Strike",
        "rarity": "Common",
        "type": "strike",
        "element": "fire",
        "manaCost": 12,
        "cooldown": 3,
        "hits": 1,
        "multiplier": 1.2,
        "description": "A rapid fire attack hitting 1 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_common_1",
        "name": "Common Water Strike",
        "rarity": "Common",
        "type": "strike",
        "element": "water",
        "manaCost": 12,
        "cooldown": 4,
        "hits": 2,
        "multiplier": 1.2,
        "description": "A rapid water attack hitting 2 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_common_2",
        "name": "Common Earth Strike",
        "rarity": "Common",
        "type": "strike",
        "element": "earth",
        "manaCost": 12,
        "cooldown": 5,
        "hits": 3,
        "multiplier": 1.2,
        "description": "A rapid earth attack hitting 3 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_common_3",
        "name": "Common Wind Strike",
        "rarity": "Common",
        "type": "strike",
        "element": "wind",
        "manaCost": 12,
        "cooldown": 3,
        "hits": 4,
        "multiplier": 1.2,
        "description": "A rapid wind attack hitting 4 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_common_0",
        "name": "Common Earth Aura",
        "rarity": "Common",
        "type": "passive",
        "element": "earth",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 1.1,
        "description": "Passively increases earth effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_common_1",
        "name": "Common Wind Aura",
        "rarity": "Common",
        "type": "passive",
        "element": "wind",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 1.1,
        "description": "Passively increases wind effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_common_2",
        "name": "Common Physical Aura",
        "rarity": "Common",
        "type": "passive",
        "element": "physical",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 1.1,
        "description": "Passively increases physical effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_common_3",
        "name": "Common Fire Aura",
        "rarity": "Common",
        "type": "passive",
        "element": "fire",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 1.1,
        "description": "Passively increases fire effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "timed_common_0",
        "name": "Common Fire Burst",
        "rarity": "Common",
        "type": "timed",
        "element": "fire",
        "manaCost": 30,
        "cooldown": 15,
        "hits": 1,
        "multiplier": 3.5,
        "description": "Unleashes a massive fire burst. Long cooldown.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "timed_common_1",
        "name": "Common Water Burst",
        "rarity": "Common",
        "type": "timed",
        "element": "water",
        "manaCost": 30,
        "cooldown": 20,
        "hits": 1,
        "multiplier": 3.5,
        "description": "Unleashes a massive water burst. Long cooldown.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_uncommon_0",
        "name": "Uncommon Fire Strike",
        "rarity": "Uncommon",
        "type": "strike",
        "element": "fire",
        "manaCost": 30,
        "cooldown": 3,
        "hits": 1,
        "multiplier": 3.0,
        "description": "A rapid fire attack hitting 1 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_uncommon_1",
        "name": "Uncommon Water Strike",
        "rarity": "Uncommon",
        "type": "strike",
        "element": "water",
        "manaCost": 30,
        "cooldown": 4,
        "hits": 2,
        "multiplier": 3.0,
        "description": "A rapid water attack hitting 2 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_uncommon_2",
        "name": "Uncommon Earth Strike",
        "rarity": "Uncommon",
        "type": "strike",
        "element": "earth",
        "manaCost": 30,
        "cooldown": 5,
        "hits": 3,
        "multiplier": 3.0,
        "description": "A rapid earth attack hitting 3 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_uncommon_3",
        "name": "Uncommon Wind Strike",
        "rarity": "Uncommon",
        "type": "strike",
        "element": "wind",
        "manaCost": 30,
        "cooldown": 3,
        "hits": 4,
        "multiplier": 3.0,
        "description": "A rapid wind attack hitting 4 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_uncommon_0",
        "name": "Uncommon Earth Aura",
        "rarity": "Uncommon",
        "type": "passive",
        "element": "earth",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 2.75,
        "description": "Passively increases earth effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_uncommon_1",
        "name": "Uncommon Wind Aura",
        "rarity": "Uncommon",
        "type": "passive",
        "element": "wind",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 2.75,
        "description": "Passively increases wind effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_uncommon_2",
        "name": "Uncommon Physical Aura",
        "rarity": "Uncommon",
        "type": "passive",
        "element": "physical",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 2.75,
        "description": "Passively increases physical effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_uncommon_3",
        "name": "Uncommon Fire Aura",
        "rarity": "Uncommon",
        "type": "passive",
        "element": "fire",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 2.75,
        "description": "Passively increases fire effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "timed_uncommon_0",
        "name": "Uncommon Water Burst",
        "rarity": "Uncommon",
        "type": "timed",
        "element": "water",
        "manaCost": 75,
        "cooldown": 15,
        "hits": 1,
        "multiplier": 8.75,
        "description": "Unleashes a massive water burst. Long cooldown.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "timed_uncommon_1",
        "name": "Uncommon Earth Burst",
        "rarity": "Uncommon",
        "type": "timed",
        "element": "earth",
        "manaCost": 75,
        "cooldown": 20,
        "hits": 1,
        "multiplier": 8.75,
        "description": "Unleashes a massive earth burst. Long cooldown.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_rare_0",
        "name": "Rare Fire Strike",
        "rarity": "Rare",
        "type": "strike",
        "element": "fire",
        "manaCost": 48,
        "cooldown": 3,
        "hits": 1,
        "multiplier": 4.8,
        "description": "A rapid fire attack hitting 1 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_rare_1",
        "name": "Rare Water Strike",
        "rarity": "Rare",
        "type": "strike",
        "element": "water",
        "manaCost": 48,
        "cooldown": 4,
        "hits": 2,
        "multiplier": 4.8,
        "description": "A rapid water attack hitting 2 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_rare_2",
        "name": "Rare Earth Strike",
        "rarity": "Rare",
        "type": "strike",
        "element": "earth",
        "manaCost": 48,
        "cooldown": 5,
        "hits": 3,
        "multiplier": 4.8,
        "description": "A rapid earth attack hitting 3 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_rare_3",
        "name": "Rare Wind Strike",
        "rarity": "Rare",
        "type": "strike",
        "element": "wind",
        "manaCost": 48,
        "cooldown": 3,
        "hits": 4,
        "multiplier": 4.8,
        "description": "A rapid wind attack hitting 4 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_rare_0",
        "name": "Rare Earth Aura",
        "rarity": "Rare",
        "type": "passive",
        "element": "earth",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 4.4,
        "description": "Passively increases earth effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_rare_1",
        "name": "Rare Wind Aura",
        "rarity": "Rare",
        "type": "passive",
        "element": "wind",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 4.4,
        "description": "Passively increases wind effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_rare_2",
        "name": "Rare Physical Aura",
        "rarity": "Rare",
        "type": "passive",
        "element": "physical",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 4.4,
        "description": "Passively increases physical effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_rare_3",
        "name": "Rare Fire Aura",
        "rarity": "Rare",
        "type": "passive",
        "element": "fire",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 4.4,
        "description": "Passively increases fire effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "timed_rare_0",
        "name": "Rare Earth Burst",
        "rarity": "Rare",
        "type": "timed",
        "element": "earth",
        "manaCost": 120,
        "cooldown": 15,
        "hits": 1,
        "multiplier": 14.0,
        "description": "Unleashes a massive earth burst. Long cooldown.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "timed_rare_1",
        "name": "Rare Wind Burst",
        "rarity": "Rare",
        "type": "timed",
        "element": "wind",
        "manaCost": 120,
        "cooldown": 20,
        "hits": 1,
        "multiplier": 14.0,
        "description": "Unleashes a massive wind burst. Long cooldown.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_epic_0",
        "name": "Epic Fire Strike",
        "rarity": "Epic",
        "type": "strike",
        "element": "fire",
        "manaCost": 66,
        "cooldown": 3,
        "hits": 1,
        "multiplier": 6.6,
        "description": "A rapid fire attack hitting 1 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_epic_1",
        "name": "Epic Water Strike",
        "rarity": "Epic",
        "type": "strike",
        "element": "water",
        "manaCost": 66,
        "cooldown": 4,
        "hits": 2,
        "multiplier": 6.6,
        "description": "A rapid water attack hitting 2 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_epic_2",
        "name": "Epic Earth Strike",
        "rarity": "Epic",
        "type": "strike",
        "element": "earth",
        "manaCost": 66,
        "cooldown": 5,
        "hits": 3,
        "multiplier": 6.6,
        "description": "A rapid earth attack hitting 3 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_epic_3",
        "name": "Epic Wind Strike",
        "rarity": "Epic",
        "type": "strike",
        "element": "wind",
        "manaCost": 66,
        "cooldown": 3,
        "hits": 4,
        "multiplier": 6.6,
        "description": "A rapid wind attack hitting 4 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_epic_0",
        "name": "Epic Earth Aura",
        "rarity": "Epic",
        "type": "passive",
        "element": "earth",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 6.05,
        "description": "Passively increases earth effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_epic_1",
        "name": "Epic Wind Aura",
        "rarity": "Epic",
        "type": "passive",
        "element": "wind",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 6.05,
        "description": "Passively increases wind effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_epic_2",
        "name": "Epic Physical Aura",
        "rarity": "Epic",
        "type": "passive",
        "element": "physical",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 6.05,
        "description": "Passively increases physical effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_epic_3",
        "name": "Epic Fire Aura",
        "rarity": "Epic",
        "type": "passive",
        "element": "fire",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 6.05,
        "description": "Passively increases fire effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "timed_epic_0",
        "name": "Epic Wind Burst",
        "rarity": "Epic",
        "type": "timed",
        "element": "wind",
        "manaCost": 165,
        "cooldown": 15,
        "hits": 1,
        "multiplier": 19.25,
        "description": "Unleashes a massive wind burst. Long cooldown.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "timed_epic_1",
        "name": "Epic Physical Burst",
        "rarity": "Epic",
        "type": "timed",
        "element": "physical",
        "manaCost": 165,
        "cooldown": 20,
        "hits": 1,
        "multiplier": 19.25,
        "description": "Unleashes a massive physical burst. Long cooldown.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_legendary_0",
        "name": "Legendary Fire Strike",
        "rarity": "Legendary",
        "type": "strike",
        "element": "fire",
        "manaCost": 84,
        "cooldown": 3,
        "hits": 1,
        "multiplier": 8.4,
        "description": "A rapid fire attack hitting 1 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_legendary_1",
        "name": "Legendary Water Strike",
        "rarity": "Legendary",
        "type": "strike",
        "element": "water",
        "manaCost": 84,
        "cooldown": 4,
        "hits": 2,
        "multiplier": 8.4,
        "description": "A rapid water attack hitting 2 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_legendary_2",
        "name": "Legendary Earth Strike",
        "rarity": "Legendary",
        "type": "strike",
        "element": "earth",
        "manaCost": 84,
        "cooldown": 5,
        "hits": 3,
        "multiplier": 8.4,
        "description": "A rapid earth attack hitting 3 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_legendary_3",
        "name": "Legendary Wind Strike",
        "rarity": "Legendary",
        "type": "strike",
        "element": "wind",
        "manaCost": 84,
        "cooldown": 3,
        "hits": 4,
        "multiplier": 8.4,
        "description": "A rapid wind attack hitting 4 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_legendary_0",
        "name": "Legendary Earth Aura",
        "rarity": "Legendary",
        "type": "passive",
        "element": "earth",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 7.7,
        "description": "Passively increases earth effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_legendary_1",
        "name": "Legendary Wind Aura",
        "rarity": "Legendary",
        "type": "passive",
        "element": "wind",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 7.7,
        "description": "Passively increases wind effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_legendary_2",
        "name": "Legendary Physical Aura",
        "rarity": "Legendary",
        "type": "passive",
        "element": "physical",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 7.7,
        "description": "Passively increases physical effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_legendary_3",
        "name": "Legendary Fire Aura",
        "rarity": "Legendary",
        "type": "passive",
        "element": "fire",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 7.7,
        "description": "Passively increases fire effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "timed_legendary_0",
        "name": "Legendary Physical Burst",
        "rarity": "Legendary",
        "type": "timed",
        "element": "physical",
        "manaCost": 210,
        "cooldown": 15,
        "hits": 1,
        "multiplier": 24.5,
        "description": "Unleashes a massive physical burst. Long cooldown.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "timed_legendary_1",
        "name": "Legendary Fire Burst",
        "rarity": "Legendary",
        "type": "timed",
        "element": "fire",
        "manaCost": 210,
        "cooldown": 20,
        "hits": 1,
        "multiplier": 24.5,
        "description": "Unleashes a massive fire burst. Long cooldown.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_mythical_0",
        "name": "Mythical Fire Strike",
        "rarity": "Mythical",
        "type": "strike",
        "element": "fire",
        "manaCost": 102,
        "cooldown": 3,
        "hits": 1,
        "multiplier": 10.2,
        "description": "A rapid fire attack hitting 1 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_mythical_1",
        "name": "Mythical Water Strike",
        "rarity": "Mythical",
        "type": "strike",
        "element": "water",
        "manaCost": 102,
        "cooldown": 4,
        "hits": 2,
        "multiplier": 10.2,
        "description": "A rapid water attack hitting 2 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_mythical_2",
        "name": "Mythical Earth Strike",
        "rarity": "Mythical",
        "type": "strike",
        "element": "earth",
        "manaCost": 102,
        "cooldown": 5,
        "hits": 3,
        "multiplier": 10.2,
        "description": "A rapid earth attack hitting 3 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_mythical_3",
        "name": "Mythical Wind Strike",
        "rarity": "Mythical",
        "type": "strike",
        "element": "wind",
        "manaCost": 102,
        "cooldown": 3,
        "hits": 4,
        "multiplier": 10.2,
        "description": "A rapid wind attack hitting 4 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_mythical_0",
        "name": "Mythical Earth Aura",
        "rarity": "Mythical",
        "type": "passive",
        "element": "earth",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 9.35,
        "description": "Passively increases earth effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_mythical_1",
        "name": "Mythical Wind Aura",
        "rarity": "Mythical",
        "type": "passive",
        "element": "wind",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 9.35,
        "description": "Passively increases wind effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_mythical_2",
        "name": "Mythical Physical Aura",
        "rarity": "Mythical",
        "type": "passive",
        "element": "physical",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 9.35,
        "description": "Passively increases physical effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_mythical_3",
        "name": "Mythical Fire Aura",
        "rarity": "Mythical",
        "type": "passive",
        "element": "fire",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 9.35,
        "description": "Passively increases fire effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "timed_mythical_0",
        "name": "Mythical Fire Burst",
        "rarity": "Mythical",
        "type": "timed",
        "element": "fire",
        "manaCost": 255,
        "cooldown": 15,
        "hits": 1,
        "multiplier": 29.75,
        "description": "Unleashes a massive fire burst. Long cooldown.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "timed_mythical_1",
        "name": "Mythical Water Burst",
        "rarity": "Mythical",
        "type": "timed",
        "element": "water",
        "manaCost": 255,
        "cooldown": 20,
        "hits": 1,
        "multiplier": 29.75,
        "description": "Unleashes a massive water burst. Long cooldown.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_immortal_0",
        "name": "Immortal Fire Strike",
        "rarity": "Immortal",
        "type": "strike",
        "element": "fire",
        "manaCost": 120,
        "cooldown": 3,
        "hits": 1,
        "multiplier": 12.0,
        "description": "A rapid fire attack hitting 1 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_immortal_1",
        "name": "Immortal Water Strike",
        "rarity": "Immortal",
        "type": "strike",
        "element": "water",
        "manaCost": 120,
        "cooldown": 4,
        "hits": 2,
        "multiplier": 12.0,
        "description": "A rapid water attack hitting 2 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_immortal_2",
        "name": "Immortal Earth Strike",
        "rarity": "Immortal",
        "type": "strike",
        "element": "earth",
        "manaCost": 120,
        "cooldown": 5,
        "hits": 3,
        "multiplier": 12.0,
        "description": "A rapid earth attack hitting 3 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_immortal_3",
        "name": "Immortal Wind Strike",
        "rarity": "Immortal",
        "type": "strike",
        "element": "wind",
        "manaCost": 120,
        "cooldown": 3,
        "hits": 4,
        "multiplier": 12.0,
        "description": "A rapid wind attack hitting 4 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_immortal_0",
        "name": "Immortal Earth Aura",
        "rarity": "Immortal",
        "type": "passive",
        "element": "earth",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 11.0,
        "description": "Passively increases earth effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_immortal_1",
        "name": "Immortal Wind Aura",
        "rarity": "Immortal",
        "type": "passive",
        "element": "wind",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 11.0,
        "description": "Passively increases wind effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_immortal_2",
        "name": "Immortal Physical Aura",
        "rarity": "Immortal",
        "type": "passive",
        "element": "physical",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 11.0,
        "description": "Passively increases physical effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_immortal_3",
        "name": "Immortal Fire Aura",
        "rarity": "Immortal",
        "type": "passive",
        "element": "fire",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 11.0,
        "description": "Passively increases fire effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "timed_immortal_0",
        "name": "Immortal Water Burst",
        "rarity": "Immortal",
        "type": "timed",
        "element": "water",
        "manaCost": 300,
        "cooldown": 15,
        "hits": 1,
        "multiplier": 35.0,
        "description": "Unleashes a massive water burst. Long cooldown.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "timed_immortal_1",
        "name": "Immortal Earth Burst",
        "rarity": "Immortal",
        "type": "timed",
        "element": "earth",
        "manaCost": 300,
        "cooldown": 20,
        "hits": 1,
        "multiplier": 35.0,
        "description": "Unleashes a massive earth burst. Long cooldown.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_ancient_0",
        "name": "Ancient Fire Strike",
        "rarity": "Ancient",
        "type": "strike",
        "element": "fire",
        "manaCost": 138,
        "cooldown": 3,
        "hits": 1,
        "multiplier": 13.8,
        "description": "A rapid fire attack hitting 1 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_ancient_1",
        "name": "Ancient Water Strike",
        "rarity": "Ancient",
        "type": "strike",
        "element": "water",
        "manaCost": 138,
        "cooldown": 4,
        "hits": 2,
        "multiplier": 13.8,
        "description": "A rapid water attack hitting 2 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_ancient_2",
        "name": "Ancient Earth Strike",
        "rarity": "Ancient",
        "type": "strike",
        "element": "earth",
        "manaCost": 138,
        "cooldown": 5,
        "hits": 3,
        "multiplier": 13.8,
        "description": "A rapid earth attack hitting 3 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "strike_ancient_3",
        "name": "Ancient Wind Strike",
        "rarity": "Ancient",
        "type": "strike",
        "element": "wind",
        "manaCost": 138,
        "cooldown": 3,
        "hits": 4,
        "multiplier": 13.8,
        "description": "A rapid wind attack hitting 4 times.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_ancient_0",
        "name": "Ancient Earth Aura",
        "rarity": "Ancient",
        "type": "passive",
        "element": "earth",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 12.65,
        "description": "Passively increases earth effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_ancient_1",
        "name": "Ancient Wind Aura",
        "rarity": "Ancient",
        "type": "passive",
        "element": "wind",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 12.65,
        "description": "Passively increases wind effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_ancient_2",
        "name": "Ancient Physical Aura",
        "rarity": "Ancient",
        "type": "passive",
        "element": "physical",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 12.65,
        "description": "Passively increases physical effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "passive_ancient_3",
        "name": "Ancient Fire Aura",
        "rarity": "Ancient",
        "type": "passive",
        "element": "fire",
        "manaCost": 0,
        "cooldown": 0,
        "hits": 0,
        "multiplier": 12.65,
        "description": "Passively increases fire effectiveness and base stats.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "timed_ancient_0",
        "name": "Ancient Earth Burst",
        "rarity": "Ancient",
        "type": "timed",
        "element": "earth",
        "manaCost": 345,
        "cooldown": 15,
        "hits": 1,
        "multiplier": 40.25,
        "description": "Unleashes a massive earth burst. Long cooldown.",
        "unlockRequirements": {
            "skillCard": 1
        }
    },
    {
        "id": "timed_ancient_1",
        "name": "Ancient Wind Burst",
        "rarity": "Ancient",
        "type": "timed",
        "element": "wind",
        "manaCost": 345,
        "cooldown": 20,
        "hits": 1,
        "multiplier": 40.25,
        "description": "Unleashes a massive wind burst. Long cooldown.",
        "unlockRequirements": {
            "skillCard": 1
        }
    }
];

window.ZS_Data.SPIRIT_DATABASE = {
    "fire_wolf": {
        "id": "fire_wolf",
        "name": "Fire Wolf",
        "role": "DPS",
        "element": "fire",
        "stats": {
            "atk": 20,
            "hp": 100
        },
        "skill": {
            "name": "Flame Bite",
            "multiplier": 1.5,
            "cooldown": 4
        }
    },
    "aqua_sprite": {
        "id": "aqua_sprite",
        "name": "Aqua Sprite",
        "role": "Support",
        "element": "water",
        "stats": {
            "atk": 10,
            "regen": 20
        },
        "skill": {
            "name": "Healing Wave",
            "multiplier": 2.0,
            "cooldown": 8
        }
    },
    "stone_golem": {
        "id": "stone_golem",
        "name": "Stone Golem",
        "role": "Control",
        "element": "earth",
        "stats": {
            "atk": 5,
            "hp": 500
        },
        "skill": {
            "name": "Earthquake",
            "multiplier": 1.0,
            "cooldown": 10,
            "effect": "stun"
        }
    }
};

window.ZS_Data.QUEST_POOL = {
    "daily": [
        {
            "id": "d1",
            "name": "Defeat 100 Monsters",
            "type": "kill",
            "target": 100,
            "gemReward": 50
        },
        {
            "id": "d2",
            "name": "Beat 5 Bosses",
            "type": "boss",
            "target": 5,
            "gemReward": 100
        },
        {
            "id": "d3",
            "name": "Summon 3 Times",
            "type": "summon",
            "target": 3,
            "gemReward": 50
        }
    ],
    "weekly": [
        {
            "id": "w1",
            "name": "Defeat 1000 Monsters",
            "type": "kill",
            "target": 1000,
            "gemReward": 500
        },
        {
            "id": "w2",
            "name": "Beat 50 Bosses",
            "type": "boss",
            "target": 50,
            "gemReward": 1000
        }
    ],
    "repeated": [
        {
            "id": "r1",
            "name": "Clear Stage 10",
            "type": "stage",
            "target": 10,
            "gemReward": 10
        },
        {
            "id": "r2",
            "name": "Craft an Item",
            "type": "craft",
            "target": 1,
            "gemReward": 10
        }
    ],
    "achievements": [
        {
            "id": "a1",
            "name": "Level 10 reached",
            "type": "level",
            "target": 10,
            "gemReward": 500
        },
        {
            "id": "a2",
            "name": "Level 50 reached",
            "type": "level",
            "target": 50,
            "gemReward": 2500
        }
    ]
};


window.ZS_Data.getStageData = function(stageLevel) {
    const isBoss = (stageLevel % 5 === 0);
    const elements = ['fire', 'water', 'earth', 'wind', 'physical'];
    const elem = elements[stageLevel % elements.length];
    
    const baseHp = 40 * Math.pow(1.2, stageLevel - 1);
    const eHp = isBoss ? baseHp * 5 : baseHp;
    const baseAtk = 2 * Math.pow(1.15, stageLevel - 1);
    const eAtk = isBoss ? baseAtk * 3 : baseAtk;
    
    return {
        stage: stageLevel,
        name: isBoss ? `Stage ${stageLevel} Boss` : `Stage ${stageLevel} Monster`,
        element: elem,
        isBoss: isBoss,
        maxHp: Math.floor(eHp),
        atk: Math.floor(eAtk),
        goldReward: Math.floor((isBoss ? 50 : 5) * Math.pow(1.1, stageLevel - 1)),
        xpReward: Math.floor((isBoss ? 50 : 10) * Math.pow(1.1, stageLevel - 1)),
        gemReward: isBoss ? Math.floor(20 * Math.pow(1.1, stageLevel - 1)) : 0,
        stoneDropChance: isBoss ? 0.5 : 0.05
    };
};
