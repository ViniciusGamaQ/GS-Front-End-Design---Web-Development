"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "../context/UserContext";

// Componentes de campo MOVIDOS para fora do componente principal
const InputField = ({ label, value, field, type = "text", placeholder = "", editMode, onChange }) => (
    <div className="mb-4">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
            {label}
        </label>
        {editMode ? (
            <input
                type={type}
                value={value || ""}
                onChange={(e) => onChange(field, e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white transition-colors"
                placeholder={placeholder}
            />
        ) : (
            <p className="text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 transition-colors">
                {value || <span className="text-slate-400 dark:text-slate-500">Não informado</span>}
            </p>
        )}
    </div>
);

const TextAreaField = ({ label, value, field, placeholder = "", editMode, onChange }) => (
    <div className="mb-4">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
            {label}
        </label>
        {editMode ? (
            <textarea
                value={value || ""}
                onChange={(e) => onChange(field, e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white resize-none transition-colors"
                placeholder={placeholder}
                rows="3"
            />
        ) : (
            <p className="text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 min-h-[60px] whitespace-pre-wrap transition-colors">
                {value || <span className="text-slate-400 dark:text-slate-500">Não informado</span>}
            </p>
        )}
    </div>
);

const ArrayField = ({ label, values = [], field, placeholder = "", editMode, onAdd, onChange, onRemove }) => (
    <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                {label}
            </label>
            {editMode && (
                <button
                    type="button"
                    onClick={() => onAdd(field, "")}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                >
                    + Adicionar
                </button>
            )}
        </div>
        <div className="space-y-2">
            {values.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    {editMode ? (
                        <>
                            <input
                                type="text"
                                value={item}
                                onChange={(e) => onChange(field, index, e.target.value)}
                                className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder={placeholder}
                            />
                            <button
                                type="button"
                                onClick={() => onRemove(field, index)}
                                className="text-red-500 hover:text-red-700 p-2 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700 transition-colors">
                            {item}
                        </span>
                    )}
                </div>
            ))}
            {values.length === 0 && !editMode && (
                <p className="text-slate-500 dark:text-slate-400 text-sm">Nenhum item adicionado</p>
            )}
        </div>
    </div>
);

export default function OwnProfileModal({ isOpen, onClose }) {
    const { user, updateUser } = useUser();
    const [editMode, setEditMode] = useState(false);
    const [activeTab, setActiveTab] = useState("basico");

    // Estado inicial baseado no user atual
    const [formData, setFormData] = useState(() => ({
        nome: user?.nome || "",
        email: user?.email || "",
        cargo: user?.cargo || "",
        resumo: user?.resumo || "",
        localizacao: user?.localizacao || "",
        area: user?.area || "",
        segmento: user?.segmento || "",
        site: user?.site || "",
        telefone: user?.telefone || "",
        habilidadesTecnicas: user?.habilidadesTecnicas || [],
        softSkills: user?.softSkills || [],
        tecnologiasBuscadas: user?.tecnologiasBuscadas || [],
        foto: user?.foto || "",
    }));

    // Todas as funções useCallback DEVEM vir ANTES de qualquer condicional
    const handleInputChange = useCallback((field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleArrayChange = useCallback((field, index, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    }, []);

    const handleAddArrayItem = useCallback((field, defaultValue = "") => {
        setFormData(prev => ({
            ...prev,
            [field]: [...(prev[field] || []), defaultValue]
        }));
    }, []);

    const handleRemoveArrayItem = useCallback((field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    }, []);

    const handleSave = useCallback(() => {
        updateUser(formData);
        setEditMode(false);
    }, [formData, updateUser]);

    const handleCancel = useCallback(() => {
        if (user) {
            setFormData({
                nome: user.nome || "",
                email: user.email || "",
                cargo: user.cargo || "",
                resumo: user.resumo || "",
                localizacao: user.localizacao || "",
                area: user.area || "",
                segmento: user.segmento || "",
                site: user.site || "",
                telefone: user.telefone || "",
                habilidadesTecnicas: user.habilidadesTecnicas || [],
                softSkills: user.softSkills || [],
                tecnologiasBuscadas: user.tecnologiasBuscadas || [],
                foto: user.foto || "",
            });
        }
        setEditMode(false);
    }, [user]);

    // Sincronizar com user - CORRIGIDO
    useEffect(() => {
        if (isOpen && user) {
            setFormData({
                nome: user.nome || "",
                email: user.email || "",
                cargo: user.cargo || "",
                resumo: user.resumo || "",
                localizacao: user.localizacao || "",
                area: user.area || "",
                segmento: user.segmento || "",
                site: user.site || "",
                telefone: user.telefone || "",
                habilidadesTecnicas: user.habilidadesTecnicas || [],
                softSkills: user.softSkills || [],
                tecnologiasBuscadas: user.tecnologiasBuscadas || [],
                foto: user.foto || "",
            });
        }
    }, [isOpen, user]); // Dependências corretas

    if (!isOpen || !user) return null;

    // Conteúdo diferente para Empresa vs Profissional
    const renderEmpresaContent = () => (
        <div className="space-y-6">
            {/* Abas */}
            <div className="flex space-x-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg mb-8">
                {["basico", "tecnologias"].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-3 text-center font-medium rounded-md transition-all duration-200 ${activeTab === tab
                                ? "bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm"
                                : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                            }`}
                    >
                        {tab === "basico" ? "Informações da Empresa" : "Tecnologias Buscadas"}
                    </button>
                ))}
            </div>

            {/* Conteúdo Empresa - Aba Básico */}
            {activeTab === "basico" && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            label="Nome da Empresa"
                            value={formData.nome}
                            field="nome"
                            placeholder="Nome da sua empresa"
                            editMode={editMode}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="Segmento"
                            value={formData.segmento}
                            field="segmento"
                            placeholder="Tecnologia, Consultoria..."
                            editMode={editMode}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            label="E-mail"
                            value={formData.email}
                            field="email"
                            type="email"
                            placeholder="contato@empresa.com"
                            editMode={editMode}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="Telefone"
                            value={formData.telefone}
                            field="telefone"
                            placeholder="(11) 99999-9999"
                            editMode={editMode}
                            onChange={handleInputChange}
                        />
                    </div>

                    <InputField
                        label="Site"
                        value={formData.site}
                        field="site"
                        placeholder="https://empresa.com"
                        editMode={editMode}
                        onChange={handleInputChange}
                    />

                    <InputField
                        label="Localização"
                        value={formData.localizacao}
                        field="localizacao"
                        placeholder="Cidade/Estado"
                        editMode={editMode}
                        onChange={handleInputChange}
                    />

                    <TextAreaField
                        label="Sobre a Empresa"
                        value={formData.resumo}
                        field="resumo"
                        placeholder="Descreva sua empresa, missão, valores..."
                        editMode={editMode}
                        onChange={handleInputChange}
                    />
                </div>
            )}

            {/* Conteúdo Empresa - Aba Tecnologias */}
            {activeTab === "tecnologias" && (
                <div className="space-y-6">
                    <ArrayField
                        label="Tecnologias que Buscamos"
                        values={formData.tecnologiasBuscadas}
                        field="tecnologiasBuscadas"
                        placeholder="Ex: React, Python, Node.js..."
                        editMode={editMode}
                        onAdd={handleAddArrayItem}
                        onChange={handleArrayChange}
                        onRemove={handleRemoveArrayItem}
                    />
                </div>
            )}
        </div>
    );

    const renderProfissionalContent = () => (
        <div className="space-y-6">
            {/* Abas */}
            <div className="flex space-x-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg mb-8">
                {["basico", "habilidades"].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-3 text-center font-medium rounded-md transition-all duration-200 ${activeTab === tab
                                ? "bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm"
                                : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                            }`}
                    >
                        {tab === "basico" ? "Informações Pessoais" : "Habilidades"}
                    </button>
                ))}
            </div>

            {/* Conteúdo Profissional - Aba Básico */}
            {activeTab === "basico" && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            label="Nome"
                            value={formData.nome}
                            field="nome"
                            placeholder="Seu nome completo"
                            editMode={editMode}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="Cargo"
                            value={formData.cargo}
                            field="cargo"
                            placeholder="Seu cargo atual"
                            editMode={editMode}
                            onChange={handleInputChange}
                        />
                    </div>
                    <InputField
                        label="E-mail"
                        value={formData.email}
                        field="email"
                        type="email"
                        placeholder="seu@email.com"
                        editMode={editMode}
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Localização"
                        value={formData.localizacao}
                        field="localizacao"
                        placeholder="Cidade/Estado"
                        editMode={editMode}
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Área"
                        value={formData.area}
                        field="area"
                        placeholder="Sua área de atuação"
                        editMode={editMode}
                        onChange={handleInputChange}
                    />
                    <TextAreaField
                        label="Resumo Profissional"
                        value={formData.resumo}
                        field="resumo"
                        placeholder="Descreva sua experiência, formação, objetivos..."
                        editMode={editMode}
                        onChange={handleInputChange}
                    />
                </div>
            )}

            {/* Conteúdo Profissional - Aba Habilidades */}
            {activeTab === "habilidades" && (
                <div className="space-y-6">
                    <ArrayField
                        label="Habilidades Técnicas"
                        values={formData.habilidadesTecnicas}
                        field="habilidadesTecnicas"
                        placeholder="Ex: React, Python, Figma..."
                        editMode={editMode}
                        onAdd={handleAddArrayItem}
                        onChange={handleArrayChange}
                        onRemove={handleRemoveArrayItem}
                    />
                    <ArrayField
                        label="Soft Skills"
                        values={formData.softSkills}
                        field="softSkills"
                        placeholder="Ex: Comunicação, Liderança..."
                        editMode={editMode}
                        onAdd={handleAddArrayItem}
                        onChange={handleArrayChange}
                        onRemove={handleRemoveArrayItem}
                    />
                </div>
            )}
        </div>
    );

    return (
        <div className="fixed inset-0 bg-white dark:bg-slate-900 z-50 overflow-y-auto">
            {/* Header */}
            <div className={`sticky top-0 z-10 ${user.tipo === "empresa"
                    ? "bg-linear-to-r from-amber-500 to-blue-600"
                    : "bg-linear-to-r from-blue-600 to-blue-500"
                } text-white shadow-lg`}>
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center text-xl font-bold">
                                {user.tipo === "empresa" ? "E" : "P"}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">
                                    {user.tipo === "empresa" ? "Perfil da Empresa" : "Meu Perfil Profissional"}
                                </h1>
                                <p className="text-blue-100 opacity-90">
                                    {user.tipo === "empresa"
                                        ? "Gerencie as informações da sua empresa"
                                        : "Gerencie sua presença profissional"
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            {editMode ? (
                                <>
                                    <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-md">
                                        Salvar
                                    </button>
                                    <button onClick={handleCancel} className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                                        Cancelar
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => setEditMode(true)} className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg font-semibold transition-colors shadow-md">
                                    Editar Perfil
                                </button>
                            )}
                            <button onClick={onClose} className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conteúdo */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 transition-colors">
                    {user.tipo === "empresa" ? renderEmpresaContent() : renderProfissionalContent()}
                </div>
            </div>
        </div>
    );
}