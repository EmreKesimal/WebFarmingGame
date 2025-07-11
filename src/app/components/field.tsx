"use client"
import styles from "./field.module.css"

type FlowerStage = "T" | "F" | "B" | "Ç" | "K" | null;

type Props = {
  state: FlowerStage;
  onClick: () => void;
};

export default function Field({state, onClick} : Props){
    return(
        <button onClick={onClick} className={styles.field}>
            {state ?? ""}
        </button>
    );
}