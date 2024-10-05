import { InfluxDB, WriteApi } from "@influxdata/influxdb-client";

export class InfluxDBAdapter {
  private client: InfluxDB;
  public writeApi: WriteApi;

  constructor() {
    const org = process.env.INFLUXDB_ORG;
    const bucket = process.env.INFLUXDB_BUCKET;
    const url = process.env.INFLUXDB_URL;
    const token = process.env.INFLUXDB_TOKEN;

    if (!org || !bucket || !url || !token) {
      console.error("Missing InfluxDB environment variables.");
      throw new Error("InfluxDB environment variables not properly set.");
    }

    console.log(
      `Connecting to InfluxDB at ${url} with org: ${org} and bucket: ${bucket}`
    );

    try {
      this.client = new InfluxDB({ url, token });
      this.writeApi = this.client.getWriteApi(org, bucket, "ns");
      console.log("InfluxDB client and WriteApi initialized successfully.");
    } catch (error) {
      console.error("Error initializing InfluxDB client or WriteApi:", error);
      throw error;
    }
  }
}
