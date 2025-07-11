"use client";
import styles from "./card.module.css";

type Props = {
  name: string;
  price: number;
  onBuy: () => void;
};

export default function Card({ name, price, onBuy }: Props) {
  return (
    <div className={styles.container}>
      <p>{name}</p>
      <p>Fiyat: {price}</p>
      <button className={styles.buyButton} onClick={onBuy}>
        Satın Al
      </button>
    </div>
  );
}
