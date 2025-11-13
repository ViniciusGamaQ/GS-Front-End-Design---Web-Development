import profiles from "@/app/data/profiles.json";

export async function GET(_, { params }) {
    const id = Number(params.id);
    const profile = profiles.find(p => p.id === id);

    if (!profile) {
        return Response.json({ error: "Profissional não encontrado" }, { status: 404 });
    }

    return Response.json(profile);
}
