
import "./globals.css";
import BalanceProvider from "./balanceProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flower Game",
  description: "Farming game with flowers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <BalanceProvider>
          {children}
        </BalanceProvider>
      </body>
    </html>
  );
}
