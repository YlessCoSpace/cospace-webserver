"use client";
import { useSeatMap } from "@/hooks/useSeatMap";
import React from "react";
import SeatMapStage from "@/components/SeatMapStage";

export default function Home() {
  const tables = useSeatMap();

  return (
    <div className="w-full h-full px-32 py-4 flex flex-col gap-4 items-center">
      <p className="text-slate-900 font-bold text-[40px]">Room 502</p>
        <SeatMapStage tables={tables?.tables || []} max_x={tables?.max_x || 13.5} max_y={tables?.max_y || 11.5} />
    </div>
  );
}
