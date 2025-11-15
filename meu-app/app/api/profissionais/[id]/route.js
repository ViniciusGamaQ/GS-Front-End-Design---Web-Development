import { NextResponse } from 'next/server'
import profiles from '../../data/profiles.json';

export async function GET(request, { params }) {
    try {
        const profissional = profiles.find(p => p.id === parseInt(params.id))

        if (!profissional) {
            return NextResponse.json(
                { error: 'Profissional não encontrado' },
                { status: 404 }
            )
        }

        return NextResponse.json(profissional)
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao carregar profissional' },
            { status: 500 }
        )
    }
}