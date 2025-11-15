"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profissionais, setProfissionais] = useState([]); // NOVO: lista de profissionais
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Carregar do localStorage
    useEffect(() => {
        const savedUser = localStorage.getItem('futurework_user');
        const savedDarkMode = localStorage.getItem('futurework_darkMode');
        const savedProfissionais = localStorage.getItem('futurework_profissionais'); // NOVO

        if (savedUser) setUser(JSON.parse(savedUser));
        if (savedDarkMode) {
            setDarkMode(JSON.parse(savedDarkMode));
            if (JSON.parse(savedDarkMode)) document.documentElement.classList.add('dark');
        }
        if (savedProfissionais) setProfissionais(JSON.parse(savedProfissionais)); // NOVO
    }, []);

    // Função para adicionar profissional à lista
    const addProfissional = (userData) => {
        const novoProfissional = {
            id: userData.id || Math.random().toString(36).substr(2, 9),
            nome: userData.nome,
            email: userData.email,
            cargo: userData.cargo || "Profissional",
            resumo: userData.resumo || `${userData.nome} é um profissional cadastrado no FutureWork Connect.`,
            localizacao: userData.localizacao || "Não informado",
            area: userData.area || userData.segmento || "Geral",
            habilidadesTecnicas: userData.habilidadesTecnicas || ["Habilidades em desenvolvimento"],
            softSkills: userData.softSkills || ["Comunicação", "Trabalho em equipe"],
            foto: userData.foto || "",
            tipo: userData.tipo,
            // Campos específicos de empresa
            segmento: userData.segmento || "",
            site: userData.site || "",
            telefone: userData.telefone || "",
            tecnologiasBuscadas: userData.tecnologiasBuscadas || []
        };

        setProfissionais(prev => {
            // Evitar duplicatas
            const exists = prev.find(p => p.id === novoProfissional.id || p.email === novoProfissional.email);
            if (exists) return prev;
            
            const novosProfissionais = [...prev, novoProfissional];
            localStorage.setItem('futurework_profissionais', JSON.stringify(novosProfissionais));
            return novosProfissionais;
        });
    };

    // Funções do usuário
    const login = (userData) => {
        const users = JSON.parse(localStorage.getItem('futurework_users') || '[]');
        const foundUser = users.find(u => u.email === userData.email && u.senha === userData.senha);
        
        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('futurework_user', JSON.stringify(foundUser));
            setShowLoginModal(false);
            
            // NOVO: Adicionar à lista de profissionais se for do tipo profissional
            if (foundUser.tipo === "profissional") {
                addProfissional(foundUser);
            }
            
            return true;
        } else {
            alert('E-mail ou senha incorretos!');
            return false;
        }
    };

    const signup = (userData) => {
        const users = JSON.parse(localStorage.getItem('futurework_users') || '[]');
        const userExists = users.find(u => u.email === userData.email);
        
        if (userExists) {
            alert('Este e-mail já está cadastrado!');
            return false;
        }

        const newUser = {
            id: Math.random().toString(36).substr(2, 9),
            tipo: userData.tipo,
            nome: userData.nome || (userData.tipo === 'empresa' ? 'Empresa' : 'Profissional'),
            email: userData.email,
            senha: userData.senha,
            cargo: userData.cargo || (userData.tipo === 'empresa' ? 'Empresa' : 'Profissional'),
            resumo: userData.resumo || "",
            localizacao: userData.localizacao || "",
            area: userData.area || userData.segmento || "",
            segmento: userData.segmento || "",
            site: userData.site || "",
            telefone: userData.telefone || "",
            habilidadesTecnicas: userData.habilidadesTecnicas || [],
            softSkills: userData.softSkills || [],
            tecnologiasBuscadas: userData.tecnologiasBuscadas || [],
            foto: userData.foto || "",
            ...userData
        };

        users.push(newUser);
        localStorage.setItem('futurework_users', JSON.stringify(users));
        
        setUser(newUser);
        localStorage.setItem('futurework_user', JSON.stringify(newUser));
        setShowSignupModal(false);
        
        // NOVO: Adicionar à lista de profissionais se for do tipo profissional
        if (newUser.tipo === "profissional") {
            addProfissional(newUser);
        }
        
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('futurework_user');
    };

    const updateUser = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem('futurework_user', JSON.stringify(updatedUser));
        
        // Atualizar também no "banco" de usuários
        const users = JSON.parse(localStorage.getItem('futurework_users') || '[]');
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
            users[userIndex] = updatedUser;
            localStorage.setItem('futurework_users', JSON.stringify(users));
        }

        // NOVO: Atualizar também na lista de profissionais se for profissional
        if (user.tipo === "profissional") {
            setProfissionais(prev => {
                const novosProfissionais = prev.map(p => 
                    p.id === user.id ? { ...p, ...updatedData } : p
                );
                localStorage.setItem('futurework_profissionais', JSON.stringify(novosProfissionais));
                return novosProfissionais;
            });
        }
    };

    // Funções dos modais
    const openLogin = () => setShowLoginModal(true);
    const closeLogin = () => setShowLoginModal(false);
    const openSignup = () => setShowSignupModal(true);
    const closeSignup = () => setShowSignupModal(false);
    const openProfile = () => setShowProfileModal(true);
    const closeProfile = () => setShowProfileModal(false);

    // Dark Mode
    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('futurework_darkMode', JSON.stringify(newDarkMode));
        document.documentElement.classList.toggle('dark', newDarkMode);
    };

    const value = {
        // Estado
        user,
        profissionais, // NOVO: exportar lista de profissionais
        showLoginModal,
        showSignupModal,
        showProfileModal,
        darkMode,
        
        // Ações do usuário
        login,
        signup,
        logout,
        updateUser,
        addProfissional, // NOVO: exportar função
        
        // Controles de modal
        openLogin,
        closeLogin,
        openSignup,
        closeSignup,
        openProfile,
        closeProfile,
        
        // Tema
        toggleDarkMode
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
}