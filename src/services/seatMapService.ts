import { MqttAdapter } from "@/lib/mqtt";

export class SeatMapService {
  private static instance: SeatMapService | null = null;
  private data: string | null = null;

  private constructor(private mqttAdapter: MqttAdapter) {}

  private subscribe(callback: (message: string) => void) {
    try {
      this.mqttAdapter.subscribeToTopic("seatmap", callback);
    } catch (e) {
      console.error("Failed to subscribe to MQTT topic:", e);
    }
  }

  getData(): TableMessage | null {
    try {
      return JSON.parse(this.data!);
    } catch (e) {
      return null;
    }
  }

  send(data: TableMessage) {
    this.mqttAdapter.publishMessage("seatmap", JSON.stringify(data));
  }

  static getInstance(): SeatMapService {
    if (!this.instance) {
      this.instance = new SeatMapService(new MqttAdapter());
      this.instance.subscribe((msg) => {
        this.instance!.data = msg;

        // TODO: Save to database
      });
    }
    return this.instance;
  }
}
