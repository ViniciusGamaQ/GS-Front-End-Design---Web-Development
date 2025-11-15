"use client";

import { useState } from "react";
import { useUser } from "../context/UserContext";

export default function LoginModal({ isOpen, onClose, onLogin }) {
    const [activeTab, setActiveTab] = useState("profissional");
    const [formData, setFormData] = useState({
        profissional: { email: "", senha: "" },
        empresa: { email: "", senha: "" }
    });

    const { openSignup } = useUser();

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = formData[activeTab];
        onLogin({
            tipo: activeTab,
            email: data.email,
            senha: data.senha
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

    const handleSwitchToSignup = () => {
        onClose();
        openSignup();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Acessar Plataforma
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
                                placeholder="Sua senha"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                    >
                        {activeTab === "profissional" ? "Entrar como Profissional" : "Entrar como Empresa"}
                    </button>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            onClick={handleSwitchToSignup}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                        >
                            Não tem conta? Cadastre-se aqui
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}