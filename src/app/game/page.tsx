"use client"
import Image from "next/image";
import Field from "../components/field"
import styles from "./page.module.css"
import { useState } from "react";


type FlowerStage = "T" | "F" | "B" | "Ç" | "K" | null;

const stages: FlowerStage[] = ["T", "F", "B", "Ç", "K"];

export default function Home() {
const [flowerStates, setFlowerStates] = useState<FlowerStage[]>(
    Array(16).fill(null)
  );
function grow(index: number) {
  if (flowerStates[index] !== null) return;

  const newStates = [...flowerStates];
  newStates[index] = "T";
  setFlowerStates(newStates);

  setTimeout(() => {
    const s = [...flowerStates];
    s[index] = "F";
    setFlowerStates(s);
  }, 2000);

  setTimeout(() => {
    const s = [...flowerStates];
    s[index] = "B";
    setFlowerStates(s);
  }, 4000);

  setTimeout(() => {
    const s = [...flowerStates];
    s[index] = "Ç";
    setFlowerStates(s);
  }, 6000);

  setTimeout(() => {
    const s = [...flowerStates];
    s[index] = "K";
    setFlowerStates(s);
  }, 10000);
}


  return(
    <div className={styles.container}>
    <div className={styles.fields}>
      {flowerStates.map((state, i) => (
        <Field key={i} state={state} onClick={() => grow(i)} />
      ))}
    </div>
    </div>
  );

}
