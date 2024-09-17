// src/pages/Home.jsx
import React from 'react';
import BooksAndAuthors from '../components/BooksAndAuthors';
import Header from '../components/Header';

function Home() {
    return (
        <>
            <h1>Page d'accueil</h1>
            <p>Voici la liste des livres et des auteurs:</p>
            <BooksAndAuthors />
        </>
    );
}

export default Home;
