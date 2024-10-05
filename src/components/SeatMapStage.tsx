import React, { useEffect, useState } from "react";
import { Stage, Layer, Circle, Text, Rect } from "react-konva";

// Helper function to generate mini circles for people
const getPeopleCircles = (t: TableNode, scale: number) => {
  const peopleCount = Math.min(t.people, 8); // Show maximum of 8 people
  const angleStep = (2 * Math.PI) / peopleCount; // Divide circle into equal angles
  const radius = 70; // Distance from the table to the mini circles

  return [...Array(peopleCount)].map((_, index) => {
    const angle = index * angleStep;
    const x = t.x * scale + radius * Math.cos(angle);
    const y = t.y * scale + radius * Math.sin(angle);

    return <Circle key={index} x={x} y={y} radius={10} fill="blue" />;
  });
};

export default function SeatMapStage({ tables, max_x, max_y }: { tables: TableNode[], max_x: number, max_y: number }) {
  const scale = 1000 / max_x
  
  return (
    <Stage width={max_x * scale} height={max_y * scale}>
      <Layer>
        {/* Border rectangle */}
        <Rect
          x={0}
          y={0}
          width={max_x * scale}
          height={max_y * scale}
          stroke="black"
          strokeWidth={4}
          fill="transparent"
        />

        {tables.map((t) => (
          <React.Fragment key={t.id}>
            {/* Main table circle */}
            <Circle
              x={t.x * scale}
              y={t.y * scale}
              radius={50}
              fill={t.people > 0 ? "red" : t.item ? "yellow" : "green"}
              stroke="black"
              strokeWidth={2}
            />

            {/* Mini circles for people */}
            {t.people > 0 && getPeopleCircles(t, scale)}

            {/* Show bag icon if people <= 0 and item is true */}
            {t.people <= 0 && t.item && (
              <Text x={t.x * scale - 25} y={t.y * scale - 15} text="👜" fontSize={40} />
            )}
          </React.Fragment>
        ))}
      </Layer>
    </Stage>
  );
}
