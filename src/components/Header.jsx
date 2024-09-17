import React from "react";
import { NavLink, useLocation } from "react-router-dom"; // Import de useLocation
import '../styles/Header.css'; // Import du CSS pour Header

export default function Header() {
    const location = useLocation(); // Utilisation de useLocation pour obtenir l'objet location

    const isActive = (pathname) => location.pathname === pathname; // Vérification du chemin actif

    return (
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-md">
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-between h-16">
                    <NavLink
                        to="/" // Utilisation de to au lieu de href
                        className="text-white text-2xl font-bold"
                    >
                        BiblioTech
                    </NavLink>
                    <ul className="flex space-x-4">
                        <li>
                            <NavLink
                                to="/" // Utilisation de to au lieu de href
                                className={`text-white hover:text-blue-200 transition-colors duration-200 ${
                                    isActive("/") ? "font-bold" : ""
                                }`}
                            >
                                Accueil
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/books" // Utilisation de to au lieu de href
                                className={`text-white hover:text-blue-200 transition-colors duration-200 ${
                                    isActive("/books") ? "font-bold" : ""
                                }`}
                            >
                                Livres
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/authors" // Utilisation de to au lieu de href
                                className={`text-white hover:text-blue-200 transition-colors duration-200 ${
                                    isActive("/authors") ? "font-bold" : ""
                                }`}
                            >
                                Auteurs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/AuthPage"
                                className={`text-white hover:text-blue-200 transition-colors duration-200 ${
                                isActive("/auth") ? "font-bold" : ""
                                }`}
                            >
                                Connexion / Inscription
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
