export async function POST(request, { params }) {
    const body = await request.json();

    console.log(`📩 Mensagem enviada para o ID ${params.id}`);
    console.log("Conteúdo:", body);

    return Response.json({
        message: `Mensagem enviada para ID ${params.id}`,
        conteudo: body
    });
}
