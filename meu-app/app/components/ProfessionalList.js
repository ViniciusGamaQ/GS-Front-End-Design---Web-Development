"use client";

import { useState } from "react";
import ProfileCard from "./ProfileCard";
import ProfileModal from "./ProfileModal";

export default function ProfessionalList({ profissionais }) {
    const [selectedProfissional, setSelectedProfissional] = useState(null);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {profissionais.map((profissional) => (
                    <ProfileCard
                        key={profissional.id}
                        profissional={profissional}
                        onClick={() => setSelectedProfissional(profissional)}
                    />
                ))}
            </div>

            {profissionais.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                        Nenhum profissional encontrado
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                        Tente ajustar seus filtros ou termos de busca
                    </p>
                </div>
            )}

            <ProfileModal
                profissional={selectedProfissional}
                isOpen={!!selectedProfissional}
                onClose={() => setSelectedProfissional(null)}
            />
        </>
    );
}