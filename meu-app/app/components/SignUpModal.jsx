"use client";

import { useState } from "react";
import { useUser } from "../context/UserContext";

export default function SignupModal({ isOpen, onClose, onSignup }) {
    const [activeTab, setActiveTab] = useState("profissional");
    const [formData, setFormData] = useState({
        profissional: { 
            email: "", 
            senha: "", 
            confirmarSenha: "",
            nome: "", 
            area: "",
            localizacao: "" 
        },
        empresa: { 
            email: "", 
            senha: "", 
            confirmarSenha: "",
            nome: "", 
            segmento: "",
            localizacao: "" 
        }
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = formData[activeTab];
        
        // Validações
        if (data.senha !== data.confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }
        
        if (data.senha.length < 6) {
            alert("A senha deve ter pelo menos 6 caracteres!");
            return;
        }

        onSignup({
            tipo: activeTab,
            email: data.email,
            senha: data.senha,
            nome: data.nome,
            localizacao: data.localizacao,
            ...(activeTab === "profissional" ? { area: data.area } : { segmento: data.segmento })
        });
    };

    const handleInputChange = (tipo, field, value) => {
        setFormData(prev => ({
            ...prev,
            [tipo]: { ...prev[tipo], [field]: value }
        }));
    };

    const getInputValue = (tipo, field) => {
        return formData[tipo][field] || "";
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Criar Conta
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 dark:border-slate-700">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab("profissional")}
                            className={`flex-1 py-4 text-center font-medium transition-colors ${
                                activeTab === "profissional"
                                    ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            }`}
                        >
                            Profissional
                        </button>
                        <button
                            onClick={() => setActiveTab("empresa")}
                            className={`flex-1 py-4 text-center font-medium transition-colors ${
                                activeTab === "empresa"
                                    ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            }`}
                        >
                            Empresa
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        {/* E-mail */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                E-mail
                            </label>
                            <input
                                type="email"
                                required
                                value={getInputValue(activeTab, "email")}
                                onChange={(e) => handleInputChange(activeTab, "email", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                placeholder="seu@email.com"
                            />
                        </div>

                        {/* Senha */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Senha
                            </label>
                            <input
                                type="password"
                                required
                                value={getInputValue(activeTab, "senha")}
                                onChange={(e) => handleInputChange(activeTab, "senha", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                placeholder="Mínimo 6 caracteres"
                                minLength="6"
                            />
                        </div>

                        {/* Confirmar Senha */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Confirmar Senha
                            </label>
                            <input
                                type="password"
                                required
                                value={getInputValue(activeTab, "confirmarSenha")}
                                onChange={(e) => handleInputChange(activeTab, "confirmarSenha", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                placeholder="Digite a senha novamente"
                            />
                        </div>

                        {/* Nome */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {activeTab === "profissional" ? "Seu Nome" : "Nome da Empresa"}
                            </label>
                            <input
                                type="text"
                                required
                                value={getInputValue(activeTab, "nome")}
                                onChange={(e) => handleInputChange(activeTab, "nome", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                placeholder={activeTab === "profissional" ? "João Silva" : "Tech Solutions Ltda"}
                            />
                        </div>

                        {/* Localização */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Localização
                            </label>
                            <input
                                type="text"
                                value={getInputValue(activeTab, "localizacao")}
                                onChange={(e) => handleInputChange(activeTab, "localizacao", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                placeholder="Cidade/Estado"
                            />
                        </div>

                        {/* Área ou Segmento */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {activeTab === "profissional" ? "Área de Atuação" : "Segmento da Empresa"}
                            </label>
                            <input
                                type="text"
                                value={getInputValue(activeTab, activeTab === "profissional" ? "area" : "segmento")}
                                onChange={(e) => handleInputChange(activeTab, activeTab === "profissional" ? "area" : "segmento", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                placeholder={activeTab === "profissional" ? "Tecnologia, Design..." : "Tecnologia, Consultoria..."}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                    >
                        {activeTab === "profissional" ? "Criar Conta Profissional" : "Criar Conta Empresa"}
                    </button>

                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                        Ao criar conta, você concorda com nossos{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
                            Termos de Uso
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}