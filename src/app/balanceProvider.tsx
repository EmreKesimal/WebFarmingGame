"use client";
import { useState } from "react";
import BalanceContext from "./balanceContext";

export default function BalanceProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(100);

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
}
