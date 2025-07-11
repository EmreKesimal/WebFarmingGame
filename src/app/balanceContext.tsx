"use client";
import { createContext } from "react";

const BalanceContext = createContext<{
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export default BalanceContext;
