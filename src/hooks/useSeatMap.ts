import { useEffect, useState, useRef } from "react";
import { MqttAdapter } from "@/lib/mqtt";
import { SeatMapService } from "@/services/seatMapService";

export const useSeatMap = () => {
  const [seatData, setSeatData] = useState<string | null>(null);
  const mqttAdapterRef = useRef<MqttAdapter | null>(null);
  const seatMapServiceRef = useRef<SeatMapService | null>(null);

  useEffect(() => {
    mqttAdapterRef.current = new MqttAdapter();
    seatMapServiceRef.current = new SeatMapService(mqttAdapterRef.current);

    seatMapServiceRef.current.subscribe((message: string) => {
      setSeatData(message);
    });

    return () => {
      mqttAdapterRef.current?.disconnect();
    };
  }, []);

  return seatData;
};
