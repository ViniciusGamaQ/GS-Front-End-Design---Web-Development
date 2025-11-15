import { NextResponse } from 'next/server';
import profiles from '../../data/profiles.json';

export async function GET() {
  try {
    // Simula um delay de rede
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return NextResponse.json(profiles);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao carregar profissionais' },
      { status: 500 }
    );
  }
}