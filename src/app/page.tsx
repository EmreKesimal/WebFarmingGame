"use client"
import Image from "next/image";
import Field from "./components/field"
import styles from "./page.module.css"
import { useState } from "react";


type FlowerStage = "T" | "F" | "B" | "Ç" | "K" | null;

const stages: FlowerStage[] = ["T", "F", "B", "Ç", "K"];

export default function Home() {
const [flowerStates, setFlowerStates] = useState<FlowerStage[]>(
    Array(16).fill(null)
  );
 function handleFieldManually(index: number) {
    const newStates = [...flowerStates];
    const current = newStates[index];

    if (current === null) {
      newStates[index] = "T";
    } else {
      const currentIndex = stages.indexOf(current);
      if (currentIndex < stages.length - 1) {
        newStates[index] = stages[currentIndex + 1];
      }else{
        newStates[index] = null;
      }
    }

    setFlowerStates(newStates);
  }

  return(
    <div className={styles.container}>
    <div className={styles.fields}>
      {flowerStates.map((state, i) => (
        <Field key={i} state={state} onClick={() => handleFieldManually(i)} />
      ))}
    </div>
    </div>
  );

}
