/* eslint-disable @typescript-eslint/no-unused-vars */
interface TableNode {
  id: number;
  x: number;
  y: number;
  people: number;
  item: boolean;
  time: number;
  startTime: Date;
}

interface TableMessage {
  tables: TableNode[];
  max_x: number;
  max_y: number;
}
