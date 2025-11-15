"use client";

import { useUser } from "../context/UserContext";
import LoginModal from "./LoginModal";
import SignupModal from "./SignUpModal";
import OwnProfileModal from "./OwnProfileModal";

export default function Navbar() {
    const { 
        user, 
        logout, 
        showLoginModal, 
        showSignupModal,
        openLogin, 
        closeLogin, 
        openSignup,
        closeSignup,
        login,
        signup,
        showProfileModal,
        openProfile, 
        closeProfile,
        darkMode, 
        toggleDarkMode 
    } = useUser();

    return (
        <>
            <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-slate-800 transition-colors duration-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-blue-yellow rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">FW</span>
                            </div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                FutureWork Connect
                            </h1>
                        </div>

                        {/* Direita */}
                        <div className="flex items-center space-x-4">
                            {/* Dark Mode Toggle */}
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                                aria-label="Alternar tema"
                            >
                                {darkMode ? (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                    </svg>
                                )}
                            </button>

                            {user ? (
                                <div className="flex items-center space-x-3">
                                    {/* Badge do tipo */}
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        user.tipo === "empresa"
                                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                    }`}>
                                        {user.tipo === "empresa" ? "Empresa" : "Profissional"}
                                    </span>
                                    
                                    {/* Nome do usuário */}
                                    <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
                                        {user.nome}
                                    </span>
                                    
                                    {/* Botão Meu Perfil */}
                                    <button
                                        onClick={openProfile}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                                    >
                                        Meu Perfil
                                    </button>
                                    
                                    {/* Botão Sair */}
                                    <button
                                        onClick={logout}
                                        className="bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                                    >
                                        Sair
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
                                        Visitante
                                    </span>
                                    <button
                                        onClick={openSignup}
                                        className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                                    >
                                        Cadastrar
                                    </button>
                                    <button
                                        onClick={openLogin}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                                    >
                                        Entrar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Modais */}
            <LoginModal
                isOpen={showLoginModal}
                onClose={closeLogin}
                onLogin={login}
            />

            <SignupModal
                isOpen={showSignupModal}
                onClose={closeSignup}
                onSignup={signup}
            />

            <OwnProfileModal
                isOpen={showProfileModal}
                onClose={closeProfile}
            />
        </>
    );
}