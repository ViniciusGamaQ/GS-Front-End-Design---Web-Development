"use client";

import { useState } from "react";
import { useUser } from "./context/UserContext";
import ProfessionalList from "./components/ProfessionalList";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import profiles from './data/profiles.json';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    area: "",
    localizacao: "",
    tecnologia: "",
  });
  
  const { user, profissionais } = useUser();

  // Combinar profissionais do JSON com profissionais do contexto
  const todosProfissionais = [...profissionais, ...profiles];

  // Filtrar profissionais
  const filteredProfissionais = todosProfissionais.filter(profissional => {
    const matchesSearch = searchTerm === "" || 
      profissional.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profissional.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profissional.resumo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profissional.habilidadesTecnicas.some(skill => 
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesArea = filters.area === "" || profissional.area === filters.area;
    const matchesLocalizacao = filters.localizacao === "" || 
      profissional.localizacao === filters.localizacao;
    const matchesTecnologia = filters.tecnologia === "" ||
      profissional.habilidadesTecnicas.some(skill => 
        skill.toLowerCase().includes(filters.tecnologia.toLowerCase())
      );

    return matchesSearch && matchesArea && matchesLocalizacao && matchesTecnologia;
  });

  const handleSearch = (term) => setSearchTerm(term);
  const handleFilter = (newFilters) => setFilters(newFilters);

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({ area: "", localizacao: "", tecnologia: "" });
  };

  return (
    <main className="min-h-screen bg-lienar-to-br from-blue-50 to-amber-50 dark:from-slate-900 dark:to-slate-800 py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-blue-500 to-amber-500 rounded-2xl mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            FutureWork Connect
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Conecte-se com os melhores talentos do mercado e construa o futuro do trabalho.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { number: todosProfissionais.length, label: "Profissionais", color: "blue" },
            { number: new Set(todosProfissionais.map(p => p.area)).size, label: "Áreas", color: "amber" },
            { number: new Set(todosProfissionais.map(p => p.localizacao?.split('/')[0])).size, label: "Cidades", color: "blue" }
          ].map((stat, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 text-center border border-slate-200 dark:border-slate-700 transition-all duration-200 hover:shadow-xl">
              <div className={`text-2xl font-bold ${
                stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                'text-amber-600 dark:text-amber-400'
              } mb-2`}>
                {stat.number}
              </div>
              <div className="text-slate-600 dark:text-slate-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Banner Informativo */}
        {user && (
          <div className={`mb-6 p-4 rounded-lg ${
            user.tipo === "empresa" 
              ? "bg-amber-50 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800" 
              : "bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
          }`}>
            <p className="text-center font-medium text-slate-800 dark:text-slate-200">
              {user.tipo === "empresa" 
                ? "Como empresa, você pode enviar mensagens para os profissionais!"
                : "Como profissional, seu perfil está visível para empresas!"
              }
            </p>
          </div>
        )}

        {/* Busca e Filtros */}
        <div className="space-y-6 mb-8">
          <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
          <FilterBar 
            onFilter={handleFilter} 
            profissionais={todosProfissionais}
            filters={filters}
            onClear={clearFilters}
          />
        </div>

        {/* Resultados */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Talentos Encontrados
            <span className="text-slate-600 dark:text-slate-400 text-lg ml-2">
              ({filteredProfissionais.length})
            </span>
          </h2>
          
          {(searchTerm || Object.values(filters).some(filter => filter !== "")) && (
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* Lista de Profissionais */}
        <ProfessionalList profissionais={filteredProfissionais} />
        
      </div>
    </main>
  );
}