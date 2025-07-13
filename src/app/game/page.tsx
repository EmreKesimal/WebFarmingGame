"use client"
import Field from "../components/field";
import styles from "./page.module.css";
import { useContext, useEffect, useState } from "react";
import Topline from "../components/Topline";
import BalanceContext from "../balanceContext";

type FlowerStage = "T" | "F" | "B" | "Ç" | "K" | null;
type FlowerType = "Papatya" | "Lale";

export default function Home() {
  const context = useContext(BalanceContext);
  if (!context) return null;

  const { balance, setBalance, flowerInventory, setFlowerInventory } = context;

  const flowerRewards: Record<string, number> = {
    Papatya: 20,
    Lale: 30
  };

  const [flowerStates, setFlowerStates] = useState<FlowerStage[]>(Array(16).fill(null));
  const [flowerTypes, setFlowerTypes] = useState<(string | null)[]>(Array(16).fill(null));
  const [selectedField, setSelectedField] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [remainingTime, setRemainingTime] = useState(30);
  const [dayStarted, setDayStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [recordTime, setRecordTime] = useState<number | null>(null);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [dayOver, setDayOver] = useState(false);

  useEffect(() => {
    if (!dayStarted || gameOver) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (startTime) {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            setTotalElapsedTime((prevTime) => prevTime + elapsed);
          }
          setDayStarted(false);
          setDayOver(true);
          handleHarvest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [dayStarted, gameOver, startTime]);

  useEffect(() => {
    if (!dayStarted || gameOver || !startTime) return;

    if (balance >= 400) {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const stored = localStorage.getItem("elapsedTime");
      const total = (stored ? parseInt(stored) : 0) + elapsed;
      localStorage.setItem("elapsedTime", total.toString());
      setRecordTime(total);
      setGameOver(true);
      setDayStarted(false);
    }
    
    if (balance < 0) {
      setGameOver(true);
      setDayStarted(false);
    }
  }, [balance, dayStarted, gameOver, startTime, totalElapsedTime]);

  function handleClick(index: number) {
    if (!dayStarted || gameOver) return;

    const current = flowerStates[index];

    if (current === "Ç") {
      const flower = flowerTypes[index];
      const reward = flower ? flowerRewards[flower] || 0 : 0;
      setBalance((prev) => prev + reward);
      setFlowerStates((prev) => {
        const copy = [...prev];
        copy[index] = null;
        return copy;
      });
      return;
    }

    if (current !== null) {
      setFlowerStates((prev) => {
        const copy = [...prev];
        copy[index] = null;
        return copy;
      });
      return;
    }

    setFlowerTypes((prev) => {
      const copy = [...prev];
      copy[index] = null;
      return copy;
    });

    setSelectedField(index);
    setShowPopup(true);
  }

  function handleEndDay() {
    if (!startTime) return;
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const stored = localStorage.getItem("elapsedTime");
    const total = (stored ? parseInt(stored) : 0) + elapsed;
    localStorage.setItem("elapsedTime", total.toString());
  
    setDayStarted(false);
    setDayOver(true);
    setRemainingTime(0);
    handleHarvest();
  }
  

  function handleRestartGame() {
    setBalance(100);
    setFlowerStates(Array(16).fill(null));
    setFlowerTypes(Array(16).fill(null));
    setDayStarted(false);
    setGameOver(false);
    setStartTime(null);
    setRecordTime(null);
    setRemainingTime(30);
    setFlowerInventory({ Papatya: 0, Lale: 0 });
    setDayOver(false);
    localStorage.removeItem("elapsedTime");
  }
  

  function plantFlower(flower: FlowerType) {
    if (selectedField === null) return;
    if (flowerInventory[flower] <= 0) {
      alert("You don't have this flower!");
      setShowPopup(false);
      return;
    }

    setFlowerInventory((prev) => ({ ...prev, [flower]: prev[flower] - 1 }));

    setFlowerTypes((prev) => {
      const copy = [...prev];
      copy[selectedField] = flower;
      return copy;
    });

    setFlowerStates((prev) => {
      const copy = [...prev];
      copy[selectedField] = "T";
      return copy;
    });

    setShowPopup(false);

    setTimeout(() => {
      setFlowerStates((prev) => {
        const copy = [...prev];
        if (copy[selectedField] === "T") copy[selectedField] = "F";
        return copy;
      });
    }, 2000);

    setTimeout(() => {
      setFlowerStates((prev) => {
        const copy = [...prev];
        if (copy[selectedField] === "F") copy[selectedField] = "B";
        return copy;
      });
    }, 4000);

    setTimeout(() => {
      setFlowerStates((prev) => {
        const copy = [...prev];
        if (copy[selectedField] === "B") copy[selectedField] = "Ç";
        return copy;
      });
    }, 6000);

    setTimeout(() => {
      setFlowerStates((prev) => {
        const copy = [...prev];
        if (copy[selectedField] === "Ç") copy[selectedField] = "K";
        return copy;
      });
    }, 7500);
  }

  function handleHarvest() {
    let totalReward = 0;
    flowerStates.forEach((state, index) => {
      if (state === "Ç") {
        const flower = flowerTypes[index];
        const reward = flower ? flowerRewards[flower] || 0 : 0;
        totalReward += reward;
      }
    });
    setBalance((prev) => prev + totalReward);
    setFlowerStates(Array(16).fill(null));
    setFlowerTypes(Array(16).fill(null));
  }

  function handleStartDay() {
    setDayStarted(true);
    setGameOver(false);
    setRemainingTime(30);
    setStartTime(Date.now());
    setRecordTime(null);
    setDayOver(false);
  }

  return (
    <div className={styles.container}>
      <Topline />
      <div className={styles.infoBox}>
        <p>🎯 Reach 400 coins to win the game.</p>
        <p>❌ If your balance drops below 0, you lose.</p>
      </div>
      {!dayStarted && !gameOver && (
        <button className={styles.btn} onClick={handleStartDay}>
          Start a New Day
        </button>
      )}
      {dayStarted && !gameOver && (
        <button className={styles.btn} onClick={handleEndDay}>
          End the Day
        </button>
      )}
      {dayStarted && !gameOver && (
        <p className={styles.timer}>Time Remaining: {remainingTime} seconds</p>
      )}
      <div className={styles.fields}>
        {flowerStates.map((state, i) => (
          <Field key={i} state={state} onClick={() => handleClick(i)} />
        ))}
      </div>
      {showPopup && (
        <div className={styles.popup}>
          <p>Select a Flower to Plant:</p>
          <button onClick={() => plantFlower("Papatya")}>Papatya ({flowerInventory["Papatya"]})</button>
          <button onClick={() => plantFlower("Lale")}>Lale ({flowerInventory["Lale"]})</button>
        </div>
      )}
      {gameOver && (
        <div className={styles.popup}>
          {recordTime !== null ? (
            <p>You reached 400 coins in {recordTime} seconds! 🎉</p>
          ) : balance < 0 ? (
            <p>You lost the game. Balance dropped below zero. 😢</p>
          ) : null}
          <button onClick={handleRestartGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}
