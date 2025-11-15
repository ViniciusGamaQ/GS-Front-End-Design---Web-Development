"use client";

import { useState } from "react";
import { useUser } from "../context/UserContext";

export default function ProfileModal({ profissional, isOpen, onClose }) {
    const { user } = useUser();
    const [mensagem, setMensagem] = useState("");
    const [mensagemEnviada, setMensagemEnviada] = useState(false);

    if (!isOpen || !profissional) return null;

    const handleEnviarMensagem = (e) => {
        e.preventDefault();
        if (mensagem.trim()) {
            console.log(`Mensagem para ${profissional.nome}: ${mensagem}`);
            setMensagemEnviada(true);
            setMensagem("");
            
            setTimeout(() => {
                setMensagemEnviada(false);
                onClose();
            }, 2000);
        }
    };

    const canSendMessage = user && user.tipo === "empresa";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-blue text-white p-6 rounded-t-2xl">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center text-2xl font-bold">
                                {profissional.nome.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{profissional.nome}</h2>
                                <p className="text-blue-100 opacity-90">{profissional.cargo}</p>
                                <div className="flex items-center space-x-4 mt-2 text-sm">
                                    <span className="flex items-center space-x-1">
                                        {profissional.localizacao}
                                    </span>
                                    <span className="flex items-center space-x-1">
                                        {profissional.area}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-blue-200 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Conteúdo */}
                <div className="p-6 space-y-6">
                    {/* Resumo */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Sobre
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {profissional.resumo}
                        </p>
                    </div>

                    {/* Habilidades Técnicas */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Habilidades Técnicas
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {profissional.habilidadesTecnicas.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-sm font-medium rounded-full border border-blue-200 dark:border-blue-700"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Soft Skills */}
                    {profissional.softSkills && profissional.softSkills.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                Soft Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {profissional.softSkills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-amber-50 dark:bg-amber-900 text-amber-700 dark:text-amber-200 text-sm font-medium rounded-full border border-amber-200 dark:border-amber-700"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Sistema de Mensagens */}
                    {canSendMessage ? (
                        <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Enviar Mensagem
                            </h3>
                            
                            {mensagemEnviada ? (
                                <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4 text-center">
                                    <p className="text-green-800 dark:text-green-200 font-medium">
                                        Mensagem enviada para {profissional.nome}!
                                    </p>
                                    <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                                        Eles entrarão em contato em breve.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleEnviarMensagem} className="space-y-4">
                                    <div>
                                        <textarea
                                            value={mensagem}
                                            onChange={(e) => setMensagem(e.target.value)}
                                            placeholder={`Escreva uma mensagem para ${profissional.nome}...`}
                                            rows="4"
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white resize-none"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                                    >
                                        Enviar Mensagem
                                    </button>
                                </form>
                            )}
                        </div>
                    ) : (
                        user && user.tipo === "profissional" && (
                            <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4 text-center">
                                <p className="text-blue-800 dark:text-blue-200">
                                    Conecte-se com empresas para receber mensagens!
                                </p>
                            </div>
                        )
                    )}

                    {!user && (
                        <div className="bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-700 rounded-lg p-4 text-center">
                            <p className="text-amber-800 dark:text-amber-200">
                                Faça login como empresa para enviar mensagens!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}