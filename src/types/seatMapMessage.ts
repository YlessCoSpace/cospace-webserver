interface TableNode {
  id: number;
  x: number;
  y: number;
  people: number;
  item: boolean;
  time: number;
}

interface TableMessage {
  tables: TableNode[];
}