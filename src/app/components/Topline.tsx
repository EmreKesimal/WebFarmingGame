"use client"
import { useContext } from "react";
import  BalanceContext  from "../balanceContext"; 
import styles from "./topline.module.css"

export default function Topline() {
  const context = useContext(BalanceContext);
  if (!context) return null;

  const { balance } = context;

  return( 
    <div className={styles.container}>
  <p className={styles.balanceTag }>Balance: {balance}</p>
  <button className={styles.storeButton}> Store</button>
  </div>

);
}
