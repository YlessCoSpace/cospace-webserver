import { SeatMapService } from "@/services/seatMapService";

export async function GET(request: Request) {
  const service = SeatMapService.getInstance();
  const data = service.getData();

  if (!data) {
    return new Response("No data available", { status: 404 });
  }

  return new Response(JSON.stringify({ message: data }), {
    headers: { "Content-Type": "application/json" },
  });
}
