"use client";
import { useSeatMap } from "@/hooks/useSeatMap";
import React from "react";
import SeatMapStage from "@/components/SeatMapStage";

export default function Home() {
  const tables = useSeatMap();

  return (
    <div className="w-full px-32 py-16 flex flex-col gap-8">
      <p className="text-slate-900 font-bold text-[40px]">Room 502</p>
      <div className="flex flex-row justify-center">
        <SeatMapStage tables={tables?.tables || []} max_x={tables?.max_x || 13.5} max_y={tables?.max_y || 11.5} />
      </div>
    </div>
  );
}
