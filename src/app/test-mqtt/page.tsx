"use client";
import { useSeatMap } from "@/hooks/useSeatMap";
import { useState } from "react";

const SeatMap = () => {
  const seatData = useSeatMap();
  const [input, setInput] = useState("");

  return (
    <div>
      <h1>Seat Map Updates</h1>
      {seatData ? (
        <p>{JSON.stringify(seatData)}</p>
      ) : (
        <p>No seat map data received yet.</p>
      )}
      <input
        className="text-slate-800"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></input>
      <button
        onClick={async () => {
          const result = await fetch("/api/seatmap", {
            method: "POST",
            body: JSON.stringify({ message: input }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(result);
        }}
      >
        Send
      </button>
    </div>
  );
};

export default SeatMap;
