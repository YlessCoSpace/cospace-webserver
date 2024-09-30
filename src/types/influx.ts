// src/types/influx.ts

export interface InfluxPoint {
    measurement: string;
    fields: { [key: string]: number | string };
    tags?: { [key: string]: string };
}

export interface InfluxResponse {
    message?: string;
    error?: string;
}
