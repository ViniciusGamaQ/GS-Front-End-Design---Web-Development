"use client";
import { useEffect, useState } from "react";

export default function ProfessionalList() {
    const [professionals, setProfessionals] = useState([]);

    useEffect(() => {
        async function loadData() {
            const res = await fetch("/api/profissionais");
            const data = await res.json();
            setProfessionals(data);
        }
        loadData();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Lista de Profissionais</h1>

            {professionals.length === 0 && <p>Carregando...</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {professionals.map((prof) => (
                    <div key={prof.id} className="p-4 border rounded-lg shadow">
                        <h2 className="text-xl font-semibold">{prof.nome}</h2>
                        <p className="text-gray-600">{prof.cargo}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
