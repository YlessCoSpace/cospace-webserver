// /services/mqttService.ts
import { MqttAdapter } from "@/lib/mqtt";

export class SeatMapService {
  constructor(private mqttAdapter: MqttAdapter) {}

  subscribe(callback: (message: string) => void) {
    this.mqttAdapter.subscribeToTopic("seatmap", callback);
  }
}
