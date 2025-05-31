import { useState, useRef, useEffect } from "react";
import { formatNumber } from "./utils/numberFormatter";
import { upgradeData, checkUpgradeUnlock, applyUpgradeEffects } from "./data/upgrades";

function App() {
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [buildings, setBuildings] = useState([
    {id:"cursor", name:"Cursor", baseCost: 20, costMult: 1.15, income: 0.1, count:0},
    {id:"autoclicker", name:"Auto-clicker", baseCost: 135, costMult: 1.15, income: 1, count:0},
    { id: "notepad", name: "Notepad", baseCost: 1500, costMult: 1.15, income: 12, count: 0 },
    { id: "cassette", name: "Cassette Player", baseCost: 16000, costMult: 1.15, income: 140, count: 0 },
    {id:"arcademachine", name:"Arcade Machine", baseCost: 180000, costMult: 1.15, income: 1350, count:0},
  ]);
  const [upgrades, setUpgrades] = useState(upgradeData);
  const [showUpgrades, setShowUpgrades] = useState(true);
  
  // Delta time tracking
  const lastUpdateTime = useRef(Date.now());
  const animationFrameId = useRef(null);
  
  // Calculate current cost of a building
  const getBuildingCost = (building) => {
    return Math.floor(building.baseCost * Math.pow(building.costMult, building.count));
  };
  
  // Calculate total income per second with upgrades
  const getTotalIncome = () => {
    const gameState = { totalScore, totalClicks, buildings };
    const { buildings: enhancedBuildings } = applyUpgradeEffects(upgrades, buildings, 1);
    
    return enhancedBuildings.reduce((total, building) => {
      return total + ((building.enhancedIncome || building.income) * building.count);
    }, 0);
  };
  
  // Get click value with upgrades
  const getClickValue = () => {
    const { clickValue } = applyUpgradeEffects(upgrades, buildings, 1);
    return clickValue;
  };
  
  // Get available upgrades
  const getAvailableUpgrades = () => {
    const gameState = { totalScore, totalClicks, buildings };
    return upgrades.filter(upgrade => 
      !upgrade.purchased && checkUpgradeUnlock(upgrade, gameState)
    );
  };
  
  // Handle upgrade purchase
  const purchaseUpgrade = (upgradeId) => {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (upgrade && score >= upgrade.cost && !upgrade.purchased) {
      setScore(prevScore => prevScore - upgrade.cost);
      setUpgrades(prevUpgrades => 
        prevUpgrades.map(u => 
          u.id === upgradeId ? { ...u, purchased: true } : u
        )
      );
    }
  };
  
  // Handle building purchase
  const purchaseBuilding = (buildingId) => {
    const buildingIndex = buildings.findIndex(b => b.id === buildingId);
    const building = buildings[buildingIndex];
    const cost = getBuildingCost(building);
    
    if (score >= cost) {
      setScore(prevScore => {
        const newScore = prevScore - cost;
        setTotalScore(prev => prev + cost);
        return newScore;
      });
      setBuildings(prevBuildings => {
        const newBuildings = [...prevBuildings];
        newBuildings[buildingIndex] = {
          ...newBuildings[buildingIndex],
          count: newBuildings[buildingIndex].count + 1
        };
        return newBuildings;
      });
    }
  };
  
  // Passive income generation with delta time
  useEffect(() => {
    const gameLoop = () => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastUpdateTime.current) / 1000; // Convert to seconds
      lastUpdateTime.current = currentTime;
      
      const incomePerSecond = getTotalIncome();
      if (incomePerSecond > 0) {
        const earned = incomePerSecond * deltaTime;
        setScore(prevScore => prevScore + earned);
        setTotalScore(prevTotal => prevTotal + earned);
      }
      
      animationFrameId.current = requestAnimationFrame(gameLoop);
    };
    
    // Start the game loop
    animationFrameId.current = requestAnimationFrame(gameLoop);
    
    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [buildings, upgrades]);
  
  // Handle click
  const handleClick = () => {
    const clickValue = getClickValue();
    setScore(prevScore => prevScore + clickValue);
    setTotalScore(prevTotal => prevTotal + clickValue);
    setTotalClicks(prevClicks => prevClicks + 1);
  };
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1>Score: {formatNumber(score)}</h1>
        <p>Income per second: {formatNumber(getTotalIncome())}/sec</p>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Total earned: {formatNumber(totalScore)} | Total clicks: {formatNumber(totalClicks)}
        </p>
        <button 
          onClick={handleClick}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Click for +{formatNumber(getClickValue())}
        </button>
      </div>
      
      {/* Upgrades Section */}
      {getAvailableUpgrades().length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ 
            cursor: 'pointer',
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
          onClick={() => setShowUpgrades(!showUpgrades)}
          >
            Upgrades {showUpgrades ? '▼' : '▶'} 
            <span style={{ 
              fontSize: '14px', 
              backgroundColor: '#ff4444', 
              color: 'white', 
              padding: '2px 8px', 
              borderRadius: '12px' 
            }}>
              {getAvailableUpgrades().length}
            </span>
          </h2>
          {showUpgrades && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '10px',
              marginTop: '10px'
            }}>
              {getAvailableUpgrades().map(upgrade => {
                const canAfford = score >= upgrade.cost;
                return (
                  <div
                    key={upgrade.id}
                    style={{
                      padding: '15px',
                      border: '2px solid #4CAF50',
                      borderRadius: '8px',
                      backgroundColor: canAfford ? '#f0f8f0' : '#f5f5f5',
                      opacity: canAfford ? 1 : 0.7,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{upgrade.name}</h4>
                    <p style={{ fontSize: '12px', color: '#666', margin: '0 0 10px 0' }}>
                      {upgrade.description}
                    </p>
                    <button
                      onClick={() => purchaseUpgrade(upgrade.id)}
                      disabled={!canAfford}
                      style={{
                        width: '100%',
                        padding: '8px',
                        backgroundColor: canAfford ? '#4CAF50' : '#ccc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: canAfford ? 'pointer' : 'not-allowed',
                        fontWeight: 'bold'
                      }}
                    >
                      Buy for {formatNumber(upgrade.cost)}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap:"10px",
      }}>
        <h2 style={{width:"100%"}}>Buildings</h2>
        {buildings.map(building => {
          const cost = getBuildingCost(building);
          const canAfford = score >= cost;
          const gameState = { totalScore, totalClicks, buildings };
          const { buildings: enhancedBuildings } = applyUpgradeEffects(upgrades, buildings, 1);
          const enhancedBuilding = enhancedBuildings.find(b => b.id === building.id);
          const enhancedIncome = enhancedBuilding?.enhancedIncome || building.income;
          
          return (
            <div 
              key={building.id} 
              style={{ 
                marginBottom: '10px',
                padding: '10px', 
                border: '1px solid #ccc',
                borderRadius: '5px',
                minWidth: "17%",
                flexGrow:"1",
                opacity: canAfford ? 1 : 0.6
              }}
            >
              <h3>{building.name}</h3>
              <p>Owned: {building.count}</p>
              <p>Income: +{formatNumber(enhancedIncome)}/sec each</p>
              <p>Total Income: +{formatNumber(enhancedIncome * building.count)}/sec</p>
              <button 
                onClick={() => purchaseBuilding(building.id)}
                disabled={!canAfford}
                style={{
                  padding: '10px 20px',
                   cursor: canAfford ? 'pointer' : 'not-allowed',
                  backgroundColor: canAfford ? '#4CAF50' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px'
                }}
              >
                Buy for {formatNumber(cost)}
              </button>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}

export default App;