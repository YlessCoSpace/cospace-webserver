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

export default function SeatMapStage({ tables }: { tables: TableNode[] }) {
  return (
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
          fill="transparent"
        />

        {tables.map((t) => (
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
  );
}
