import { NextResponse } from 'next/server'
import profiles from '../../../../data/profiles.json';

export async function POST(request, { params }) {
    try {
        const { id } = params
        const body = await request.json()
        const { mensagem, recomendador, email } = body

        // Verificar se profissional existe
        const profissional = profiles.find(p => p.id === parseInt(id))
        if (!profissional) {
            return NextResponse.json(
                { error: 'Profissional não encontrado' },
                { status: 404 }
            )
        }

        // Simular salvamento da recomendação
        console.log('Nova recomendação:', {
            profissional: profissional.nome,
            recomendador,
            email,
            mensagem,
            data: new Date().toISOString()
        })

        return NextResponse.json({
            success: true,
            message: 'Recomendação enviada com sucesso!',
            data: {
                profissionalId: id,
                profissionalNome: profissional.nome,
                recomendador,
                mensagem,
                data: new Date().toISOString()
            }
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao enviar recomendação' },
            { status: 500 }
        )
    }
}