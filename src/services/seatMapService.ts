import { MqttAdapter } from "@/lib/mqtt";

export class SeatMapService {
  private static instance: SeatMapService | null = null;
  private data: string | null = null;

  private constructor(private mqttAdapter: MqttAdapter) {}

  private subscribe(callback: (message: string) => void) {
    this.mqttAdapter.subscribeToTopic("seatmap", callback);
  }

  getData(): string | null {
    return this.data;
  }

  static getInstance(): SeatMapService {
    if (!this.instance) {
      this.instance = new SeatMapService(new MqttAdapter());
      this.instance.subscribe((msg) => {
        this.instance!.data = msg;
      });
    }
    return this.instance;
  }
}
