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

  setFlowerStates((prev) => {
    const copy = [...prev];
    copy[index] = "T";
    return copy;
  });

  setTimeout(() => {
    setFlowerStates((prev) => {
      const copy = [...prev];
      copy[index] = "F";
      return copy;
    });
  }, 2000);

  setTimeout(() => {
    setFlowerStates((prev) => {
      const copy = [...prev];
      copy[index] = "B";
      return copy;
    });
  }, 4000);

  setTimeout(() => {
    setFlowerStates((prev) => {
      const copy = [...prev];
      copy[index] = "Ç";
      return copy;
    });
  }, 6000);

  setTimeout(() => {
    setFlowerStates((prev) => {
      const copy = [...prev];
      copy[index] = "K";
      return copy;
    });
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
