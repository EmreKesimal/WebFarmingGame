"use client";
import styles from "./card.module.css";
import Image from "next/image";

type Props = {
  name: string;
  price: number;
  onBuy: () => void;
};

export default function Card({ name, price, onBuy }: Props) {
  const imageSrc = name === "Lale" ? "/assets/Tulip.png" : "/assets/Daisy.png";

  return (
    <div className={styles.container}>
      <Image src={imageSrc} alt={name} width={100} height={100} />
      <p>{name}</p>
      <p>Price: {price}</p>
      <button className={styles.buyButton} onClick={onBuy}>
        Buy
      </button>
    </div>
  );
}
