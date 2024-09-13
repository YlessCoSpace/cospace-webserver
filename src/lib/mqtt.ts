import mqtt, { MqttClient, IClientOptions } from "mqtt";

export class MqttAdapter {
  private client: MqttClient;

  constructor() {
    const brokerUrl = process.env.MQTT_BROKER_URL ?? "";
    const options: IClientOptions = {
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
    };

    console.log("Connecting to MQTT broker:", brokerUrl);
    this.client = mqtt.connect(brokerUrl, options);

    this.client.on("connect", () => {
      console.log("Connected to MQTT broker");
    });

    this.client.on("error", (err) => {
      console.error("MQTT Connection Error:", err);
    });
  }

  publishMessage(topic: string, message: string) {
    this.client.publish(topic, message);
  }

  subscribeToTopic(topic: string, callback: (message: string) => void) {
    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error(`Failed to subscribe to topic ${topic}:`, err);
      }
    });

    this.client.on("message", (receivedTopic, message) => {
      if (receivedTopic === topic) {
        callback(message.toString());
      }
    });
  }

  disconnect() {
    if (this.client) {
      this.client.end(() => {
        console.log("Disconnected from MQTT broker");
      });
    }
  }
}
