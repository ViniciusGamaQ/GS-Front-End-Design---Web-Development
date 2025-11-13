import profiles from "@/app/data/profiles.json";

export async function GET() {
  return Response.json(profiles);
}