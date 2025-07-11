"use client";
import { useContext } from "react";
import styles from "./page.module.css";
import Card from "./components/card";
import BalanceContext from "../../balanceContext";
import { useRouter } from "next/navigation";

export default function Store() {
  const context = useContext(BalanceContext);
  const router = useRouter();

  if (!context) return null;

  const { balance, setBalance, flowerInventory, setFlowerInventory } = context;

  function handleBuy(flowerName: "Papatya" | "Lale", price: number) {
    if (balance < price) {
      alert("Yetersiz bakiye!");
      return;
    }

    setBalance((prev) => prev - price);
    setFlowerInventory((prev) => ({
      ...prev,
      [flowerName]: prev[flowerName] + 1,
    }));
  }

  function handleNavigationBack() {
    router.push("../game");
  }

  return (
    <div className={styles.container}>
        <h2>Bakiye: {balance}</h2>

        <div className={styles.cards}>
            <Card name="Papatya" price={10} onBuy={() => handleBuy("Papatya", 10)} />
            <Card name="Lale" price={15} onBuy={() => handleBuy("Lale", 15)} />
        </div>

        <button onClick={handleNavigationBack} className={styles.exitButton}>
            Exit
        </button>
        </div>

  );
}
