import { InfluxDBAdapter } from "@/lib/influx";
import { MqttAdapter } from "@/lib/mqtt";
import { Point } from "@influxdata/influxdb-client";

export class SeatMapService {
  private static instance: SeatMapService | null = null;
  private data: TableMessage | null = null;
  private mqttAdapter: MqttAdapter;
  private influxDBAdapter: InfluxDBAdapter;

  private constructor(mqttAdapter: MqttAdapter, influxDBAdapter: InfluxDBAdapter) {
    this.mqttAdapter = mqttAdapter;
    this.influxDBAdapter = influxDBAdapter;
  }

  private subscribe(callback: (message: string) => void) {
    try {
      this.mqttAdapter.subscribeToTopic("seatmap", callback);
    } catch (e) {
      console.error("Failed to subscribe to MQTT topic:", e);
    }
  }

  getData(): TableMessage | null {
    return this.data
  }

  send(data: TableMessage) {
    this.mqttAdapter.publishMessage("seatmap", JSON.stringify(data));
  }

  static getInstance(): SeatMapService {
    if (!this.instance) {
      this.instance = new SeatMapService(new MqttAdapter(), new InfluxDBAdapter());
  
      // Subscribe to the message handler
      this.instance.subscribe(async (msg) => {
        try {
          // Parse the incoming message
          const json: TableMessage = JSON.parse(msg);
          this.instance!.data = json;
        } catch (e) {
          console.error("Error parsing JSON:", e);
          return; // Stop further execution if JSON parsing fails
        }
  
        try {
          // Iterate through each TableNode in the TableMessage
          for (const table of this.instance!.data.tables) {
            const point = new Point("seatmap")
              .tag('id', table.id.toString()) 
              .floatField('x', table.x) 
              .floatField('y', table.y) 
              .intField('people', table.people) 
              .booleanField('item', table.item) 
              .intField('itemtime', table.time); 
  
            // Write each point to InfluxDB
            this.instance!.influxDBAdapter.writeApi.writePoint(point);
          }
  
          // Flush to ensure all points are written
          this.instance!.influxDBAdapter.writeApi.flush();
          console.log("Data written successfully to InfluxDB");
  
        } catch (error) {
          console.error('Error writing to InfluxDB:', error);
        }
      });
    }
    return this.instance;
  }
}
