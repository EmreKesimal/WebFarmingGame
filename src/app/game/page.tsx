"use client"
import Field from "../components/field"
import styles from "./page.module.css"
import { createContext, useContext, useState } from "react";
import Topline from "../components/Topline";
import BalanceContext from "../balanceContext";


type FlowerStage = "T" | "F" | "B" | "Ç" | "K" | null;

const stages: FlowerStage[] = ["T", "F", "B", "Ç", "K"];



export default function Home() {
  const context = useContext(BalanceContext);
const [flowerStates, setFlowerStates] = useState<FlowerStage[]>(
    Array(16).fill(null)
  );

  if (!context) return null;
  const { balance, setBalance } = context;


function handleClick(index: number) {
  if(flowerStates[index] == "Ç"){
    setBalance((balance) => balance + 10);
    setFlowerStates((prev) => {
      const copy = [...prev];
      copy[index] = null;
      return copy;
    });
    return;
  }

  if (flowerStates[index] !== null) {
    setFlowerStates((prev) => {
      const copy = [...prev];
      copy[index] = null;
      return copy;
    });
    return;
  }
  
  if (balance < 10) {
  alert("Insufficient Balance!"); 
  return;
  }
  setFlowerStates((prev) => {
    setBalance((balance) => balance - 10);
    const copy = [...prev];
    copy[index] = "T";
    return copy;
  });
  
  setTimeout(() => {
    setFlowerStates((prev) => {
      const copy = [...prev];
      if (copy[index] === "T") copy[index] = "F";
      return copy;
    });
  }, 2000);

  setTimeout(() => {
    setFlowerStates((prev) => {
      const copy = [...prev];
      if (copy[index] === "F") copy[index] = "B";
      return copy;
    });
  }, 4000);

  setTimeout(() => {
    setFlowerStates((prev) => {
      const copy = [...prev];
      if (copy[index] === "B") copy[index] = "Ç";
      return copy;
    });
  }, 6000);

  setTimeout(() => {
    setFlowerStates((prev) => {
      const copy = [...prev];
      if (copy[index] === "Ç") copy[index] = "K";
      return copy;
    });
  }, 10000);
}

  return(
    
      <div className={styles.container}>
        <Topline />
    <div className={styles.fields}>
      {flowerStates.map((state, i) => (
        <Field key={i} state={state} onClick={() => handleClick(i)} />
      ))}
    </div>
    </div>
      
    
  );

}

