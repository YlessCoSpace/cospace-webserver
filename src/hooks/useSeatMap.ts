import { useEffect, useState } from "react";

export const useSeatMap = () => {
  const [seatData, setSeatData] = useState<TableMessage | null>(null);

  useEffect(() => {
    const fetchSeatMapData = async () => {
      try {
        const response = await fetch("/api/seatmap");
        if (response.ok) {
          const data = await response.json();
          setSeatData(data);
        } else {
          console.error("Failed to fetch seatmap data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching seatmap data:", error);
      }
    };

    // Fetch data immediately after mount
    fetchSeatMapData();

    const interval = setInterval(fetchSeatMapData, 15000);

    return () => clearInterval(interval);
  }, []);

  return seatData;
};
