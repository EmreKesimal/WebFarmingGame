"use client";
import { useContext } from "react";
import BalanceContext from "../balanceContext";
import styles from "./topline.module.css";
import { useRouter } from "next/navigation";

export default function Topline() {
  const context = useContext(BalanceContext);
  const router = useRouter();

  if (!context) return null;

  const { balance, setBalance, setFlowerInventory } = context;

  function handleStoreNavigation() {
    router.push("../game/store");
  }

  function handleLogout() {
    localStorage.clear();
    setBalance(100);
    setFlowerInventory({ Papatya: 0, Lale: 0 });
    router.push("/"); 
  }

  return (
    <div className={styles.container}>
      <p className={styles.balanceTag}>Balance: {balance}</p>
      <div className={styles.buttonGroup}>
        <button onClick={handleStoreNavigation} className={styles.storeButton}>
          Store
        </button>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Log Out
        </button>
      </div>
    </div>
  );
}
