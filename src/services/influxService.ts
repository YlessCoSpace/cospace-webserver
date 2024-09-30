// src/services/influxService.ts
import type { InfluxPoint, InfluxResponse } from '../types/influx';

export const writeToInflux = async (point: InfluxPoint): Promise<InfluxResponse> => {
  try {
    const response = await fetch('/api/influx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(point),
    });

    if (!response.ok) {
      throw new Error('Failed to write data to InfluxDB');
    }

    return await response.json() as InfluxResponse;
  } catch (error) {
    return { error: (error as Error).message };
  }
};
