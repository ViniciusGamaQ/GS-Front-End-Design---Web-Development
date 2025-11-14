import { NextResponse } from 'next/server'
import profiles from '../../../data/profiles.json'

export async function GET() {
  try {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500))
    return NextResponse.json(profiles)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao carregar profissionais' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const newProfile = {
      id: profiles.length + 1,
      ...body,
      createdAt: new Date().toISOString()
    }
    
    // Em produção, salvaria no banco de dados
    profiles.push(newProfile)
    
    return NextResponse.json(newProfile, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar perfil' },
      { status: 500 }
    )
  }
}