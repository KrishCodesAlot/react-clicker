// Upgrade definitions
export const upgradeData = [
  // Click upgrades
  {
    id: 'click_power_1',
    name: 'Reinforced Clicking',
    description: 'Doubles your clicking power',
    cost: 100,
    type: 'click',
    effect: { multiplier: 2 },
    unlockCondition: { type: 'totalClicks', value: 50 },
    purchased: false
  },
  {
    id: 'click_power_2',
    name: 'Golden Touch',
    description: 'Clicking power x5',
    cost: 5000,
    type: 'click',
    effect: { multiplier: 5 },
    unlockCondition: { type: 'totalClicks', value: 500 },
    purchased: false
  },
  {
    id: 'click_power_3',
    name: 'Diamond Fingers',
    description: 'Clicking power x10',
    cost: 50000,
    type: 'click',
    effect: { multiplier: 10 },
    unlockCondition: { type: 'totalClicks', value: 2000 },
    purchased: false
  },
  
  // Cursor upgrades
  {
    id: 'cursor_upgrade_1',
    name: 'Ambidextrous',
    description: 'Cursors are twice as efficient',
    cost: 500,
    type: 'building',
    buildingId: 'cursor',
    effect: { multiplier: 2 },
    unlockCondition: { type: 'buildingCount', buildingId: 'cursor', value: 1 },
    purchased: false
  },
  {
    id: 'cursor_upgrade_2',
    name: 'Thousand Fingers',
    description: 'Cursors gain +0.2 production for each non-cursor building',
    cost: 5000,
    type: 'building',
    buildingId: 'cursor',
    effect: { special: 'thousandFingers' },
    unlockCondition: { type: 'buildingCount', buildingId: 'cursor', value: 5 },
    purchased: false
  },
  
  // Auto-clicker upgrades
  {
    id: 'autoclicker_upgrade_1',
    name: 'Faster Clicking',
    description: 'Auto-clickers are twice as efficient',
    cost: 2000,
    type: 'building',
    buildingId: 'autoclicker',
    effect: { multiplier: 2 },
    unlockCondition: { type: 'buildingCount', buildingId: 'autoclicker', value: 1 },
    purchased: false
  },
  {
    id: 'autoclicker_upgrade_2',
    name: 'Turbo Mode',
    description: 'Auto-clickers are 3x more efficient',
    cost: 20000,
    type: 'building',
    buildingId: 'autoclicker',
    effect: { multiplier: 3 },
    unlockCondition: { type: 'buildingCount', buildingId: 'autoclicker', value: 5 },
    purchased: false
  },
  
  // Notepad upgrades
  {
    id: 'notepad_upgrade_1',
    name: 'Better Algorithms',
    description: 'Notepads are twice as efficient',
    cost: 15000,
    type: 'building',
    buildingId: 'notepad',
    effect: { multiplier: 2 },
    unlockCondition: { type: 'buildingCount', buildingId: 'notepad', value: 1 },
    purchased: false
  },
  {
    id: 'notepad_upgrade_2',
    name: 'Code Optimization',
    description: 'Notepads produce 3x more',
    cost: 150000,
    type: 'building',
    buildingId: 'notepad',
    effect: { multiplier: 3 },
    unlockCondition: { type: 'buildingCount', buildingId: 'notepad', value: 5 },
    purchased: false
  },
  
  // Cassette upgrades
  {
    id: 'cassette_upgrade_1',
    name: 'High Fidelity',
    description: 'Cassette Players are twice as efficient',
    cost: 160000,
    type: 'building',
    buildingId: 'cassette',
    effect: { multiplier: 2 },
    unlockCondition: { type: 'buildingCount', buildingId: 'cassette', value: 1 },
    purchased: false
  },
  {
    id: 'cassette_upgrade_2',
    name: 'Stereo Sound',
    description: 'Cassette Players are 3x more efficient',
    cost: 1600000,
    type: 'building',
    buildingId: 'cassette',
    effect: { multiplier: 3 },
    unlockCondition: { type: 'buildingCount', buildingId: 'cassette', value: 5 },
    purchased: false
  },
  
  // Arcade Machine upgrades
  {
    id: 'arcade_upgrade_1',
    name: 'Extra Lives',
    description: 'Arcade Machines are twice as efficient',
    cost: 1800000,
    type: 'building',
    buildingId: 'arcademachine',
    effect: { multiplier: 2 },
    unlockCondition: { type: 'buildingCount', buildingId: 'arcademachine', value: 1 },
    purchased: false
  },
  {
    id: 'arcade_upgrade_2',
    name: 'High Score Mode',
    description: 'Arcade Machines are 3x more efficient',
    cost: 18000000,
    type: 'building',
    buildingId: 'arcademachine',
    effect: { multiplier: 3 },
    unlockCondition: { type: 'buildingCount', buildingId: 'arcademachine', value: 5 },
    purchased: false
  },
  
  // Global upgrades
  {
    id: 'global_production_1',
    name: 'Productivity Boost',
    description: 'All buildings produce 10% more',
    cost: 10000,
    type: 'global',
    effect: { globalMultiplier: 1.1 },
    unlockCondition: { type: 'totalScore', value: 5000 },
    purchased: false
  },
  {
    id: 'global_production_2',
    name: 'Efficiency Expert',
    description: 'All buildings produce 15% more',
    cost: 100000,
    type: 'global',
    effect: { globalMultiplier: 1.15 },
    unlockCondition: { type: 'totalScore', value: 50000 },
    purchased: false
  },
  {
    id: 'global_production_3',
    name: 'Industrial Revolution',
    description: 'All buildings produce 20% more',
    cost: 1000000,
    type: 'global',
    effect: { globalMultiplier: 1.2 },
    unlockCondition: { type: 'totalScore', value: 500000 },
    purchased: false
  },
  
  // Synergy upgrades
  {
    id: 'synergy_1',
    name: 'Building Synergy',
    description: 'Each building type boosts the others by 1%',
    cost: 50000,
    type: 'synergy',
    effect: { synergyBonus: 0.01 },
    unlockCondition: { type: 'totalBuildings', value: 5 },
    purchased: false
  },
  {
    id: 'synergy_2',
    name: 'Perfect Harmony',
    description: 'Each building type boosts the others by 2%',
    cost: 500000,
    type: 'synergy',
    effect: { synergyBonus: 0.02 },
    unlockCondition: { type: 'totalBuildings', value: 10 },
    purchased: false
  }
];

// Helper function to check if an upgrade should be unlocked
export function checkUpgradeUnlock(upgrade, gameState) {
  const condition = upgrade.unlockCondition;
  
  switch (condition.type) {
    case 'totalScore':
      return gameState.totalScore >= condition.value;
    
    case 'totalClicks':
      return gameState.totalClicks >= condition.value;
    
    case 'buildingCount':
      const building = gameState.buildings.find(b => b.id === condition.buildingId);
      return building && building.count >= condition.value;
    
    case 'totalBuildings':
      const totalBuildings = gameState.buildings.reduce((sum, b) => sum + b.count, 0);
      return totalBuildings >= condition.value;
    
    default:
      return false;
  }
}

// Helper function to apply upgrade effects
export function applyUpgradeEffects(upgrades, buildings, baseClickValue) {
  let clickMultiplier = 1;
  let globalMultiplier = 1;
  let buildingMultipliers = {};
  let synergyBonus = 0;
  let specialEffects = [];
  
  // Process purchased upgrades
  upgrades.filter(u => u.purchased).forEach(upgrade => {
    if (upgrade.type === 'click') {
      clickMultiplier *= upgrade.effect.multiplier || 1;
    } else if (upgrade.type === 'global') {
      globalMultiplier *= upgrade.effect.globalMultiplier || 1;
    } else if (upgrade.type === 'building') {
      if (!buildingMultipliers[upgrade.buildingId]) {
        buildingMultipliers[upgrade.buildingId] = 1;
      }
      if (upgrade.effect.multiplier) {
        buildingMultipliers[upgrade.buildingId] *= upgrade.effect.multiplier;
      }
      if (upgrade.effect.special) {
        specialEffects.push({ type: upgrade.effect.special, buildingId: upgrade.buildingId });
      }
    } else if (upgrade.type === 'synergy') {
      synergyBonus += upgrade.effect.synergyBonus || 0;
    }
  });
  
  // Calculate final click value
  const finalClickValue = baseClickValue * clickMultiplier;
  
  // Calculate building incomes with all multipliers
  const enhancedBuildings = buildings.map(building => {
    let income = building.income;
    
    // Apply building-specific multiplier
    if (buildingMultipliers[building.id]) {
      income *= buildingMultipliers[building.id];
    }
    
    // Apply global multiplier
    income *= globalMultiplier;
    
    // Apply synergy bonus
    if (synergyBonus > 0) {
      const otherBuildingTypes = buildings.filter(b => b.id !== building.id && b.count > 0).length;
      income *= (1 + synergyBonus * otherBuildingTypes);
    }
    
    // Apply special effects
    specialEffects.forEach(effect => {
      if (effect.type === 'thousandFingers' && effect.buildingId === building.id) {
        const nonCursorBuildings = buildings.filter(b => b.id !== 'cursor').reduce((sum, b) => sum + b.count, 0);
        income += 0.2 * nonCursorBuildings;
      }
    });
    
    return {
      ...building,
      enhancedIncome: income
    };
  });
  
  return {
    clickValue: finalClickValue,
    buildings: enhancedBuildings
  };
}