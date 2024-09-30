import { SeatMapService } from "@/services/seatMapService";

export async function GET() {
  const service = SeatMapService.getInstance();
  const data = service.getData();

  if (!data) {
    return new Response("Data not found", { status: 404 });
  }

  return Response.json(data);
}

// TEST PUBLISH - DEV ONLY
// export async function POST(request: Request) {
//   const service = SeatMapService.getInstance();
//   const data = await request.json();
//   try {
//     const json = JSON.parse(data.message);
//     service.send(json);
//     return new Response("Message published", { status: 200 });
//   } catch (e) {
//     return new Response("Invalid", { status: 400 });
//   }
// }
