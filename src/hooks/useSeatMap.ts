import { useEffect, useState, useRef } from "react";

export const useSeatMap = () => {
  const [seatData, setSeatData] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await fetch("/api/seatmap");
      const data = await response.json();
      if (response.ok) {
        setSeatData(data.message);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return seatData;
};
