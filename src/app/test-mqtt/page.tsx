"use client";
import { useSeatMap } from "@/hooks/useSeatMap";

const SeatMap = () => {
  const seatData = useSeatMap();

  return (
    <div>
      <h1>Seat Map Updates</h1>
      {seatData ? <pre>{seatData}</pre> : <p>No seat map data received yet.</p>}
    </div>
  );
};

export default SeatMap;
