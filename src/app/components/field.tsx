"use client";
import Image from "next/image";

type Props = {
  state: "T" | "F" | "B" | "Ç" | "K" | null;
  onClick: () => void;
};

export default function Field({ state, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        width: 80,
        height: 80,
        border: "1px solid gray",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "brown",
        cursor: "pointer"
      }}
    >
      {state ? (
        <Image
          src={`/assets/${state === "Ç" ? "C" : state}.png`}
          alt={state}
          width={50}
          height={50}
        />
      ) : null}
    </div>
  );
}
