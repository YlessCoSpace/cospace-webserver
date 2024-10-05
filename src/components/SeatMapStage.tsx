import React, { useEffect, useState, useCallback } from "react";
import { Stage, Layer, Circle, Text, Rect } from "react-konva";

const availableColor = "#82c493";
const occupiedColor = "#d1d1d1";
const reservedColor = "#fce3a4";

// Helper function to generate mini circles for people
const getPeopleCircles = (t: TableNode, scale: number) => {
  const peopleCount = Math.min(t.people, 8); // Show maximum of 8 people
  const angleStep = (2 * Math.PI) / peopleCount; // Divide circle into equal angles
  const radius = 0.7 * scale; // Distance from the table to the mini circles

  return [...Array(peopleCount)].map((_, index) => {
    const angle = index * angleStep;
    const x = t.x * scale + radius * Math.cos(angle);
    const y = t.y * scale + radius * Math.sin(angle);

    return (
      <Circle
        key={index}
        x={x}
        y={y}
        radius={0.1 * scale}
        fill={occupiedColor}
      />
    );
  });
};

export default function SeatMapStage({
  tables,
  max_x,
  max_y,
}: {
  tables: TableNode[];
  max_x: number;
  max_y: number;
}) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  // Debounced resize handler
  const handleResize = useCallback(() => {
    const container = document.querySelector("#stage-container") as HTMLElement;
    if (container) {
      setContainerWidth(container.offsetWidth);
      setContainerHeight(container.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const container = document.querySelector("#stage-container");
    if (container) {
      handleResize();
    }

    // Handle window resize for responsiveness
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Calculate scale dynamically whenever containerWidth or containerHeight changes
  const scale = Math.min(containerWidth / max_x, containerHeight / max_y);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div
        id="stage-container"
        className="w-full h-full flex flex-row justify-center"
      >
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
                  radius={0.5 * scale}
                  fill={
                    t.people > 0
                      ? occupiedColor
                      : t.item
                      ? reservedColor
                      : availableColor
                  }
                  strokeWidth={2}
                />

                {/* Mini circles for people */}
                {t.people > 0 && getPeopleCircles(t, scale)}

                {/* Show bag icon if people <= 0 and item is true */}
                {t.people <= 0 && t.item && (
                  <Text
                    x={(t.x - 0.25) * scale}
                    y={(t.y - 0.15) * scale}
                    text="👜"
                    fontSize={0.4 * scale}
                  />
                )}
              </React.Fragment>
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
