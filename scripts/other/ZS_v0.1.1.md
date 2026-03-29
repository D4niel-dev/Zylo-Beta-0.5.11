# Zylo Slayer — Major Upgrade

You are working on **Zylo**, specifically the **Zylo Slayer** game module inside the app.

Your task is to expand Zylo Slayer into a much deeper **idle RPG system** while keeping the current app stable, readable, and easy to maintain.

## Primary goal

Implement the new Zylo Slayer feature set in a **modular, data-driven, non-breaking** way.  
The system should support:

- Skills
- Skill slots
- Missions / quests
- Offline grind rewards
- Spirits / companions
- Element counters
- Craft / learn skills
- Skill summon
- Equipment / skill / spirit upgrades
- Stage select
- UI/UX rework for the game window and equipment tab

This is a gameplay + UI expansion, not a visual redesign from scratch.

---

## Hard constraints

- Preserve existing Zylo app structure unless a change is required for the new game systems.
- Do not break current game data, save data, or the existing UI flow.
- Keep the game approachable; the design should feel complex only where needed, not cluttered everywhere.
- Use modular code with clear boundaries between:
  - data definitions
  - gameplay logic
  - rendering/UI
  - persistence
- Avoid hardcoding large content blocks directly in the UI.
- Prefer configuration objects / JSON-like definitions / reusable helpers.
- Make the system extensible for future updates.

---

# 1) Skills system

Add a full skills system with the following rarity ladder:

- Common
- Uncommon
- Rare
- Epic
- Legendary
- Mythical
- Immortal
- Ancient

Each rarity tier should support at least:

- 4 strike-type attack skills
- 4 passive skills
- 2 timed / cooldown-based skills

That means the initial content target is **80 skills total** across all tiers.

## Skill requirements

Every skill should have:
- unique ID
- name
- rarity
- skill type (`strike`, `passive`, `timed`)
- element
- mana cost
- cooldown
- description
- effect values
- unlock / craft requirements
- scaling data for upgrades

## Strike skills
- Multi-hit or combo-style attack skills
- Must consume mana
- Must define hit count or attack structure
- Can scale with rarity

## Passive skills
- Provide persistent stat bonuses or conditional effects
- May alter mana, damage, defense, crit, elemental interactions, etc.
- Should be balanced so stacking passives does not break the game

## Timed skills
- Cooldown-based active skills
- Should feel stronger or more situational than strike skills
- Can trigger burst damage, buffs, shields, debuffs, or utility

## Element association
Each skill must have an element assigned where appropriate.

Use a clean element model with:
- Fire
- Water
- Earth
- Wind
- Physical

Physical is special:
- it should not be countered by any element

---

# 2) Skill slots

Add a **Skill Slots** system as a new tab in the game UI.

## Requirements
- Maximum of **8 equipped skill slots**
- User can manually assign any unlocked skills to slots
- Support manual casting
- Support Auto mode for automatic skill usage
- Prevent invalid loadouts
- Allow passive skills in slot logic if needed, but keep their behavior clear

## Auto mode
Auto mode should:
- evaluate skill priority
- respect mana costs
- respect cooldowns
- avoid spamming weaker skills when stronger ones are ready
- be configurable later

## Suggested rule
The auto system should not blindly fire everything.  
Use a priority system that can consider:
- cooldown remaining
- mana availability
- skill type
- combat state
- enemy stage difficulty

---

# 3) More missions / quests

Add a stronger quest system with these categories:

- Daily
- Weekly
- Repeated
- Achievements

## Reward logic
Quests should reward:
- EXP
- Gold
- Gems

Rewards should scale based on challenge level.

### Repeated missions
Repeated missions should:
- give fixed rewards
- stack completion progress
- remain low per completion
- become valuable through repetition

## Quest design goals
- Clear progress tracking
- Simple reward preview
- Easy completion conditions
- Easy reset logic for daily/weekly quests
- Achievement tracking with permanent milestones

---

# 4) Offline grind rewards

Add offline grind rewards because this is an idle game.

## Requirements
- Offline grind duration is capped at **10 hours**
- Rewards must be based on stage rewards and stage EXP / Gold per minute
- Offline grind can award up to **5,000 gems max**
- Rewards should decrease if the offline time is not full
- Stop accumulation at the 10-hour mark
- Do not let the system exceed the cap

## Important behavior
If offline time is shorter than the cap:
- reduce rewards proportionally
- make the reduction feel fair and readable

## Display
Show:
- elapsed offline time
- capped time
- expected reward summary
- stage used for offline grind
- any gem cap limitation

---

# 5) Spirits / companions

Add **3 companions / spirits** that help the user in combat and exploration.

## Requirements
Each spirit should have:
- unique identity
- role
- stats
- skill or active assistance
- upgrade path
- rarity or progression tier if needed

## Roles
Use role-based design such as:
- DPS
- Support
- Control

## Spirit behavior
Spirits should:
- contribute in battle
- use their own skills or actions
- be visually distinct in the UI
- be upgradable with Gold
- fit naturally into the battle loop

Keep the initial companion system lightweight and expandable.

---

# 6) Element counters

Implement a clean elemental interaction model.

## Counter rules
- Fire > Earth
- Fire < Water
- Wind > Water
- Wind > Earth
- If elements do not counter each other: **100% output**
- If attacker counters defender: **135% output**
- If attacker is countered by defender: **85% output**
- Physical is never countered

## Requirements
- The system must be deterministic
- It should be reusable for skills, enemies, companions, and stage design
- Keep the logic centralized in one place

## Suggestion
Use a single helper such as:
- `getElementMultiplier(attackerElement, defenderElement)`

---

# 7) Craft / learn skills

Add a system for learning or crafting skills.

## Requirements
Crafting / learning may require:
- Equipment
- Accessories
- Element Stones
- At least 1 skill card of the targeted skill

## Behavior
- Some skills are learned through crafting
- Some are unlocked through summon/gacha
- Some may evolve or upgrade through crafting
- Requirements should vary by rarity

## Design goal
Crafting should feel like a progression system, not just a menu checkbox.

---

# 8) Skill summon

Add a new **Skills Summon** button or tab in the summon / gacha system.

## Requirements
- Skills must have their own summon pool
- Do not mix skill summon logic with equipment summon logic
- Make it easy to expand with banners or special rate-up events later
- Include some kind of rarity distribution or pity system if appropriate

## Important
The skill summon system should be separate, visible, and understandable.

---

# 9) Upgrade system

Add upgrades for:
- Equipment
- Accessories
- Skills
- Spirits

## Requirements
- Upgrades use Gold
- Maximum upgrade level is **+200**
- Each next level should cost more than the last
- Scaling should be stable and not explode too quickly or remain too cheap too long

## Suggested cost model
Use a growth curve rather than a flat multiplication error.  
Keep the upgrade cost formula centralized so balancing can be adjusted later.

## Upgrades should improve:
- power
- stats
- elemental performance
- cooldowns or mana efficiency where applicable

---

# 10) Stage select

Add a **Stage Select** system.

## Requirements
- Users can select any stage they have already beaten
- They can grind on earlier stages without forcing progression to the next one
- The system should support farming optimization

## Helpful additions
- “Best farming stage” suggestion
- “Recommended stage” indicator
- Stage reward preview
- Stage difficulty marker

---

# UI / UX rework

The game interface should be improved to support the new systems without becoming confusing.

## 1) Rework the Equipments tab
Move equipment content into a separate tab or panel from the main game window.

- Add a `>` button on the right side of the game window
- Let the panel slide in/out or expand cleanly
- Keep the main gameplay area less crowded

## 2) Bigger game window
Increase the game window size for better accessibility and readability.

## 3) Add your own additional UI suggestion
Add at least one practical improvement that helps usability, such as:

- skill hotbar
- auto settings panel
- resource summary bar
- combat feedback layer
- reward preview panel
- stage efficiency panel
- companion panel

Choose something that improves clarity and does not make the UI noisy.

---

# Recommended additional UI suggestion

Implement a **Skill Hotbar + Auto Settings panel**.

## Skill hotbar
- Display 8 skill slots clearly
- Each slot shows cooldown and mana cost
- Ready skills should be easy to read
- Manual use should feel responsive

## Auto settings
- Toggle Auto mode on/off
- Show skill priority
- Show mana-related constraints
- Let the player understand why a skill did or did not trigger

This makes the game feel more strategic and less chaotic.

---

# Data model guidance

Design the system around structured data objects.

A skill may look like this:

```js
{
  id: "fire_strike_01",
  name: "Blazing Combo",
  rarity: "epic",
  type: "strike",
  element: "fire",
  manaCost: 30,
  cooldown: 5,
  hits: 4,
  multiplier: 1.25,
  description: "A fast 4-hit fire combo.",
  unlockRequirements: {
    equipment: ["sword_01"],
    accessories: ["ring_02"],
    elementStone: "fire_stone",
    skillCard: 1
  }
}
```

Companions, quests, upgrades, stages, and rewards should also be structured in a similar way.

---

# Balancing guidance

- Do not let one system trivialize the others
- Auto mode should not outperform active play in every situation
- Offline rewards should feel helpful but not replace normal progression
- Repeated quests should be rewarding but not abusable
- High rarity skills should feel strong without making lower tiers pointless
- Element counters should matter, but not dominate every outcome

---

# Implementation priorities

Implement in this order if needed:
1. Core data structures
2. Element system
3. Skills
4. Skill slots
5. Combat integration
6. Quests
7. Offline grind
8. Spirits
9. Crafting
10. Skill summon
11. Upgrades
12. Stage select
13. UI rework and polish

---

# Deliverables

Return:
1. Updated game data structures
2. New or updated gameplay logic
3. New UI components / tabs / panels
4. Any balancing notes
5. Any assumptions made
6. Any limitations or future work needed

---

# Acceptance criteria

The work is complete when:
- skills exist as structured content and are usable
- skill slots support 8 equipped skills
- Auto mode works safely
- quests have multiple categories
- offline rewards are capped and readable
- spirits/companions contribute meaningfully
- elemental counters work correctly
- skill crafting / learning is supported
- skill summon is separated from equipment summon
- upgrades work across equipment, skills, and spirits
- stage select allows replay of cleared stages
- the equipment tab is separated cleanly
- the game window is larger and more usable
- the system remains stable and extensible

---

# Final instruction

Build this like a real idle RPG system, not just a collection of features.  
Keep the code modular, balanced, and easy to extend in future Zylo updates.
