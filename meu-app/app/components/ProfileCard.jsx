"use client";

export default function ProfileCard({ profile, onClick }) {
    return (
        <div
            onClick={onClick}
            className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 cursor-pointer hover:scale-105 transition"
        >
            <img
                src={profile.foto}
                className="w-24 h-24 mx-auto rounded-full"
                alt="Foto"
            />

            <h2 className="text-center font-bold text-lg mt-3 dark:text-white">
                {profile.nome}
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-300">
                {profile.cargo}
            </p>

            <div className="flex flex-wrap gap-2 justify-center mt-3">
                {profile.habilidadesTecnicas.slice(0, 3).map((s, i) => (
                    <span
                        key={i}
                        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-700 dark:text-white rounded-full"
                    >
                        {s}
                    </span>
                ))}
            </div>
        </div>
    );
}
