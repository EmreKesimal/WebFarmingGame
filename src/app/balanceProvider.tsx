// BalanceProvider.tsx
"use client";
import React, { useState } from "react";
import BalanceContext, { FlowerInventory } from "./balanceContext";

export default function BalanceProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(100);
  const [flowerInventory, setFlowerInventory] = useState<FlowerInventory>({
    Papatya: 0,
    Lale: 0
  });

  return (
    <BalanceContext.Provider value={{ balance, setBalance, flowerInventory, setFlowerInventory }}>
      {children}
    </BalanceContext.Provider>
  );
}
