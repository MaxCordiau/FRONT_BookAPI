import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Book, ChevronRight } from 'lucide-react';

export default function BooksAndAuthorsGrid() {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/books');
                setBooks(response.data);
            } catch (err) {
                setError('Erreur lors de la récupération des livres');
                console.error(err);
            }
        };

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

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Livres</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {books.map((book) => (
                    <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                            <p className="text-gray-600 mb-4">{book.description}</p>
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                <Book className="w-4 h-4 mr-2" />
                                <span>ISBN: {book.isbn}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                <ChevronRight className="w-4 h-4 mr-2" />
                                <span>Publié en: {book.publishedYear}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                                <ChevronRight className="w-4 h-4 mr-2" />
                                <span>Auteur: {book.author?.name || 'Non spécifié'}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="text-3xl font-bold mb-6">Auteurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {authors.map((author) => (
                    <div key={author.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{author.name}</h3>
                            <p className="text-gray-600 mb-4">Année de naissance: {author.birthyear}</p>
                            <h4 className="font-semibold mb-2">Livres de cet auteur:</h4>
                            <ul className="list-disc list-inside">
                                {author.books && author.books.length > 0 ? (
                                    author.books.map((book) => (
                                        <li key={book.id} className="text-gray-600">
                                            {book.title}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-600">Aucun livre disponible</li>
                                )}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
