"use client"
import Field from "../components/field"
import styles from "./page.module.css"
import { useContext, useState } from "react";
import Topline from "../components/Topline";
import BalanceContext from "../balanceContext";

type FlowerStage = "T" | "F" | "B" | "Ç" | "K" | null;
type FlowerType = "Papatya" | "Lale";
const stages: FlowerStage[] = ["T", "F", "B", "Ç", "K"];

export default function Home() {
  const context = useContext(BalanceContext);
  const flowerRewards: Record<string, number> = {
  Papatya: 20,
  Lale: 25
  };

  const [flowerStates, setFlowerStates] = useState<FlowerStage[]>(
    Array(16).fill(null)
  );
  const [selectedField, setSelectedField] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [flowerTypes, setFlowerTypes] = useState<(string | null)[]>(Array(16).fill(null));


  if (!context) return null;
  const { balance, setBalance, flowerInventory, setFlowerInventory } = context;

  function handleClick(index: number) {
    const current = flowerStates[index];

    if (flowerStates[index] === "Ç") {
      const flower = flowerTypes[index];
      const reward = flower ? flowerRewards[flower] || 0 : 0;
      setBalance((balance) => balance + reward);
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

  function plantFlower(flower: FlowerType) {
  if (!selectedField && selectedField !== 0) return;

  if (flowerInventory[flower] <= 0) {
    alert("You don't have this flower!");
    setShowPopup(false);
    return;
  }

  setFlowerInventory((prev) => ({
    ...prev,
    [flower]: prev[flower] - 1,
  }));

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
  }, 10000);
}


  return (
    <div className={styles.container}>
      <Topline />
      <div className={styles.fields}>
        {flowerStates.map((state, i) => (
          <Field key={i} state={state} onClick={() => handleClick(i)} />
        ))}
      </div>
      {showPopup && (
      <div className={styles.popup}>
        <p>Which Flower Would You Like to Put?</p>
        <button onClick={() => plantFlower("Papatya")}>
          Papatya ({flowerInventory["Papatya"]})
        </button>
        <button onClick={() => plantFlower("Lale")}>
          Lale ({flowerInventory["Lale"]})
        </button>
      </div>
    )}

    </div>
  );
}
