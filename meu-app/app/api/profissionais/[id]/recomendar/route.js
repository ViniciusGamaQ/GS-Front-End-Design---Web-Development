export async function POST(_, { params }) {
    console.log(`Recomendação recebida para o profissional ID ${params.id}`);

    return Response.json({
        message: `Recomendação enviada para ID ${params.id}`
    });
}