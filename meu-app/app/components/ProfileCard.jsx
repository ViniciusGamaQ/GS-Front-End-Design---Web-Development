export default function ProfileCard({ profissional, onClick }) {
    return (
        <div
            className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transform hover:-translate-y-1"
            onClick={onClick}
        >
            <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-blue rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                            {profissional.nome.charAt(0)}
                        </span>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {profissional.nome}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                            {profissional.cargo}
                        </p>
                    </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {profissional.resumo}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {profissional.habilidadesTecnicas.slice(0, 3).map((skill, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-700"
                        >
                            {skill}
                        </span>
                    ))}
                    {profissional.habilidadesTecnicas.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full border border-gray-200 dark:border-slate-600">
                            +{profissional.habilidadesTecnicas.length - 3}
                        </span>
                    )}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                    <span>{profissional.localizacao}</span>
                    <span className="bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-medium border border-amber-200 dark:border-amber-700">
                        {profissional.area}
                    </span>
                </div>
            </div>
        </div>
    );
}