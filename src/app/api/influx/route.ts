// src/app/api/influx/route.ts
import { InfluxDB, Point } from '@influxdata/influxdb-client';
import { NextResponse } from 'next/server';
import type { InfluxPoint, InfluxResponse } from '../../../types/influx';

const token = process.env.INFLUXDB_TOKEN!;
const url = process.env.INFLUXDB_URL!;
const org = process.env.INFLUXDB_ORG!;
const bucket = process.env.INFLUXDB_BUCKET!;

const influxDB = new InfluxDB({ url, token });
const writeApi = influxDB.getWriteApi(org, bucket, 'ns');

export async function POST(req: Request): Promise<Response> {
    try {
        const { measurement, fields, tags }: InfluxPoint = await req.json();

        const point = new Point(measurement);
        Object.entries(fields).forEach(([key, value]) => point.floatField(key, value));
        if (tags) Object.entries(tags).forEach(([key, value]) => point.tag(key, value));

        writeApi.writePoint(point);
        await writeApi.flush();

        return NextResponse.json({ message: 'Data written successfully!' } as InfluxResponse);
    } catch (error) {
        console.error('Error writing to InfluxDB:', error);
        return NextResponse.json({ error: 'Error writing to InfluxDB' } as InfluxResponse, { status: 500 });
    }
}
