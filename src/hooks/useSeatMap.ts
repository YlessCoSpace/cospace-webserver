import { useEffect, useState } from "react";

export const useSeatMap = () => {
  const [seatData, setSeatData] = useState<TableMessage | null>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await fetch("/api/seatmap");
      if (response.ok) {
        const data = await response.json();
        try {
          setSeatData(data);
        } catch (e) {
          console.error("Failed to parse seatmap data:", e);
        }
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return seatData;
};
