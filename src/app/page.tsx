"use client";
import { useSeatMap } from "@/hooks/useSeatMap";
import React from "react";
import { Stage, Layer, Circle, Text, Rect } from "react-konva";

// Helper function to generate mini circles for people
const getPeopleCircles = (t: TableNode) => {
  const peopleCount = Math.min(t.people, 8); // Show maximum of 8 people
  const angleStep = (2 * Math.PI) / peopleCount; // Divide circle into equal angles
  const radius = 70; // Distance from the table to the mini circles

  return [...Array(peopleCount)].map((_, index) => {
    const angle = index * angleStep;
    const x = t.x + radius * Math.cos(angle);
    const y = t.y + radius * Math.sin(angle);

    return <Circle key={index} x={x} y={y} radius={10} fill="blue" />;
  });
};

export default function Home() {
  const tables = useSeatMap();
  // const tables = {
  //   tables: [
  //     { id: 1, x: 100, y: 100, people: 1, item: false, time: 0 },
  //     { id: 2, x: 300, y: 100, people: 0, item: false, time: 0 },
  //     { id: 3, x: 500, y: 100, people: 0, item: true, time: 10 },
  //     { id: 4, x: 100, y: 250, people: 10, item: false, time: 0 },
  //     { id: 5, x: 300, y: 250, people: 5, item: false, time: 0 },
  //     { id: 6, x: 500, y: 250, people: 0, item: true, time: 10 },
  //   ],
  // };

  return (
    <div className="w-full px-32 py-16 flex flex-col gap-8">
      <p className="text-slate-900 font-bold text-[40px]">Room 502</p>
      <div className="px-24 flex flex-row justify-between">
        <Stage width={1000} height={500}>
          <Layer>
            {/* Border rectangle */}
            <Rect
              x={0}
              y={0}
              width={1000}
              height={500}
              stroke="black"
              strokeWidth={4}
              fill="transparent" // Transparent fill
            />

            {tables?.tables.map((t) => (
              <React.Fragment key={t.id}>
                {/* Main table circle */}
                <Circle
                  x={t.x}
                  y={t.y}
                  radius={50}
                  fill={t.people > 0 ? "red" : t.item ? "yellow" : "green"}
                  stroke="black"
                  strokeWidth={2}
                />

                {/* Mini circles for people */}
                {t.people > 0 && getPeopleCircles(t)}

                {/* Show bag icon if people <= 0 and item is true */}
                {t.people <= 0 && t.item && (
                  <Text x={t.x - 25} y={t.y - 15} text="👜" fontSize={40} />
                )}
              </React.Fragment>
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
