import { NextResponse } from 'next/server'
import profiles from '../../../../data/profiles.json';

export async function POST(request, { params }) {
    try {
        const { id } = params
        const body = await request.json()
        const { mensagem, remetente, email, assunto } = body

        // Verificar se profissional existe
        const profissional = profiles.find(p => p.id === parseInt(id))
        if (!profissional) {
            return NextResponse.json(
                { error: 'Profissional não encontrado' },
                { status: 404 }
            )
        }

        // Simular envio de mensagem
        console.log('Nova mensagem:', {
            para: profissional.nome,
            de: remetente,
            email,
            assunto,
            mensagem,
            data: new Date().toISOString()
        })

        return NextResponse.json({
            success: true,
            message: 'Mensagem enviada com sucesso!',
            data: {
                profissionalId: id,
                profissionalNome: profissional.nome,
                remetente,
                email,
                assunto,
                mensagem,
                data: new Date().toISOString()
            }
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao enviar mensagem' },
            { status: 500 }
        )
    }
}