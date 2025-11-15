"use client";

export default function FilterBar({ onFilter, profissionais, filters, onClear }) {
    const areas = [...new Set(profissionais.map((p) => p.area).filter(Boolean))];

    // Todas as capitais brasileiras
    const capitais = [
        "Aracaju/SE", "Belém/PA", "Belo Horizonte/MG", "Boa Vista/RR", "Brasília/DF",
        "Campo Grande/MS", "Cuiabá/MT", "Curitiba/PR", "Florianópolis/SC", "Fortaleza/CE",
        "Goiânia/GO", "João Pessoa/PB", "Macapá/AP", "Maceió/AL", "Manaus/AM",
        "Natal/RN", "Palmas/TO", "Porto Alegre/RS", "Porto Velho/RO", "Recife/PE",
        "Rio Branco/AC", "Rio de Janeiro/RJ", "Salvador/BA", "São Luís/MA", "São Paulo/SP",
        "Teresina/PI", "Vitória/ES"
    ];

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        onFilter(newFilters);
    };

    const isFilterActive = Object.values(filters).some(value => value !== '');

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Filtrar Profissionais
                </h3>

                {isFilterActive && (
                    <button
                        onClick={onClear}
                        className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-semibold transition-colors"
                    >
                        Limpar todos
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Área
                    </label>
                    <select
                        value={filters.area}
                        onChange={(e) => handleFilterChange("area", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="">Todas as áreas</option>
                        {areas.map((area) => (
                            <option key={area} value={area}>
                                {area}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Localização
                    </label>
                    <select
                        value={filters.localizacao}
                        onChange={(e) => handleFilterChange("localizacao", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="">Todas as localizações</option>
                        {capitais.map((capital) => (
                            <option key={capital} value={capital}>
                                {capital}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Tecnologia
                    </label>
                    <input
                        type="text"
                        placeholder="Ex: React, Python..."
                        value={filters.tecnologia}
                        onChange={(e) => handleFilterChange("tecnologia", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                </div>
            </div>

            {/* Mostrar filtros ativos */}
            {isFilterActive && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {filters.area && (
                        <span className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full border border-blue-200 dark:border-blue-700">
                            Área: {filters.area}
                            <button
                                onClick={() => handleFilterChange('area', '')}
                                className="ml-2 hover:text-blue-900 dark:hover:text-blue-100 font-bold"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {filters.localizacao && (
                        <span className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-sm font-medium rounded-full border border-green-200 dark:border-green-700">
                            Local: {filters.localizacao}
                            <button
                                onClick={() => handleFilterChange('localizacao', '')}
                                className="ml-2 hover:text-green-900 dark:hover:text-green-100 font-bold"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {filters.tecnologia && (
                        <span className="inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 text-sm font-medium rounded-full border border-purple-200 dark:border-purple-700">
                            Tech: {filters.tecnologia}
                            <button
                                onClick={() => handleFilterChange('tecnologia', '')}
                                className="ml-2 hover:text-purple-900 dark:hover:text-purple-100 font-bold"
                            >
                                ×
                            </button>
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}