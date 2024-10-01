"use client";
import { useSeatMap } from "@/hooks/useSeatMap";
import React from "react";
import SeatMapStage from "@/components/SeatMapStage";

export default function Home() {
  const tables = useSeatMap();

  return (
    <div className="w-full px-32 py-16 flex flex-col gap-8">
      <p className="text-slate-900 font-bold text-[40px]">Room 502</p>
      <div className="px-24 flex flex-row justify-between">
        <SeatMapStage tables={tables?.tables || []} />
      </div>
    </div>
  );
}
