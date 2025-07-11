"use client"
import { useContext } from "react";
import  BalanceContext  from "../balanceContext"; 
import styles from "./topline.module.css"
import { useRouter } from "next/navigation";
export default function Topline() {
  const context = useContext(BalanceContext);
  if (!context) return null;

  const { balance } = context;
  const router = useRouter();

  function handleStoreNavigation(){
    router.push("../game/store");
}
  return( 
    <div className={styles.container}>
      <p className={styles.balanceTag }>Balance: {balance}</p>
      <button onClick={handleStoreNavigation} className={styles.storeButton}> Store</button>
  </div>

);
}
