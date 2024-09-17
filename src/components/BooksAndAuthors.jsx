// src/components/BooksAndAuthors.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BooksAndAuthors = () => {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fonction pour obtenir tous les livres avec leurs auteurs
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/books');
                setBooks(response.data);
            } catch (err) {
                setError('Erreur lors de la récupération des livres');
                console.error(err);
            }
        };

        // Fonction pour obtenir tous les auteurs avec leurs livres
        const fetchAuthors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/authors');
                setAuthors(response.data);
            } catch (err) {
                setError('Erreur lors de la récupération des auteurs');
                console.error(err);
            }
        };

        fetchBooks();
        fetchAuthors();
    }, []);

    return (
        <div>
            <h2>Livres</h2>
            {error && <p>{error}</p>}
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <h3>{book.title}</h3>
                        <p>{book.description}</p>
                        <p>ISBN: {book.isbn}</p>
                        <p>Publié en: {book.publishedYear}</p>
                        <p>Auteur: {book.author?.name || 'Non spécifié'}</p>
                    </li>
                ))}
            </ul>

            <h2>Auteurs</h2>
            <ul>
                {authors.map((author) => (
                    <li key={author.id}>
                        <h3>{author.name}</h3>
                        <p>Année de naissance: {author.birthyear}</p>
                        <h4>Livres de cet auteur:</h4>
                        <ul>
                            {author.books?.map((book) => (
                                <li key={book.id}>
                                    <h5>{book.title}</h5>
                                    <p>{book.description}</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BooksAndAuthors;
