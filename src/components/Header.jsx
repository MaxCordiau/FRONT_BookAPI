    import React from "react";
    import { NavLink } from "react-router-dom";
    import '../styles/Header.css'; // Import du CSS pour Header

    const Header = () => {
    return (
        <header className="header">
            <nav>
                <ul className="nav-list">
                    <li>
                        <NavLink to="/" className="nav-link">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className="nav-link">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/books" className="nav-link">Books</NavLink>
                    </li>
                    <li>
                        <NavLink to="/authors" className="nav-link">Authors</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
    };

    export default Header;
