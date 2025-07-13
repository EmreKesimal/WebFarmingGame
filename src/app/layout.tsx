
import "./globals.css";
import BalanceProvider from "./balanceProvider";
import type { Metadata } from "next";

export const metadata = {
  title: "Farming Garden",
  description: "Grow flowers and earn coins!",
  icons: {
    icon: "/Tulip.png"
  }
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
