import { useEffect, useState } from "react";
import { MqttAdapter } from "@/lib/mqtt";
import { SeatMapService } from "@/services/seatMapService";

export const useSeatMap = () => {
  const [seatData, setSeatData] = useState<string | null>(null);

  useEffect(() => {
    const mqttAdapter = new MqttAdapter();
    const seatMapService = new SeatMapService(mqttAdapter);

    seatMapService.subscribe((message: string) => {
      setSeatData(message);
    });

    return () => {
      mqttAdapter.disconnect();
    };
  }, []);

  return seatData;
};
