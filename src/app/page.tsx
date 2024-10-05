"use client";
import { useSeatMap } from "@/hooks/useSeatMap";
import React from "react";
import SeatMapStage from "@/components/SeatMapStage";

const availableColor = "#82c493";
const occupiedColor = "#d1d1d1";
const reservedColor = "#fce3a4";

const Label = ({ color, text }: { color: string; text: string }) => {
  return (
    <div className="flex flex-row gap-2 items-center text-[20px]">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        {text === "Reserved" && <span>👜</span>}
      </div>
      <p className="text-sm">{text}</p>
    </div>
  );
};

export default function Home() {
  const tables = useSeatMap();

  return (
    <div className="w-full h-full px-4 py-4 flex flex-col gap-4 items-center">
      <p className="text-slate-900 font-bold text-[40px]">Room 502</p>
      <SeatMapStage
        tables={tables?.tables || []}
        max_x={tables?.max_x || 13.5}
        max_y={tables?.max_y || 11.5}
      />
      <div className="flex flex-row gap-2">
        <Label color={availableColor} text="Available" />
        <Label color={occupiedColor} text="Occupied" />
        <Label color={reservedColor} text="Reserved" />
      </div>
    </div>
  );
}
