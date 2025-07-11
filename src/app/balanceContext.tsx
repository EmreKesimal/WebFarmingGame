// balanceContext.ts (veya layout içinden export ediyorsan orada tanımla)
"use client";

import { createContext } from "react";

export type FlowerName = "Papatya" | "Lale";

export type FlowerInventory = Record<FlowerName, number>;

const BalanceContext = createContext<{
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  flowerInventory: FlowerInventory;
  setFlowerInventory: React.Dispatch<React.SetStateAction<FlowerInventory>>;
} | null>(null);

export default BalanceContext;
