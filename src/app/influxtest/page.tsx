'use client';

import { useState } from 'react';
import { writeToInflux } from '@/services/influxService';

export default function Home() {
    const [value, setValue] = useState<number>(0);
    const [status, setStatus] = useState<string>('');

    const handleSubmit = async () => {
        const result = await writeToInflux({
            measurement: 'temperature',
            fields: { value },
            tags: { unit: 'celsius' },
        });

        if (result.error) {
            setStatus(`Error: ${result.error}`);
        } else {
            setStatus('Data sent successfully!');
        }
    };

    return (
        <div>
            <h1>InfluxDB Data Writer</h1>
            <input
                className='text-black'
                type="number"
                value={value}
                onChange={(e) => setValue(parseFloat(e.target.value))}
            />
            <button onClick={handleSubmit}>Send to InfluxDB</button>
            {status && <p>{status}</p>}
        </div>
    );
}
