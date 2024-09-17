import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import ErrorModal from '../components/ErrorModal';
import '../styles/index.css';

export default function BookPage() {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchBooks();
        fetchAuthors();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/books', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setBooks(response.data);
        } catch (error) {
            handleError(error);
        }
    };

    const fetchAuthors = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/authors', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setAuthors(response.data);
        } catch (error) {
            handleError(error);
        }
    };

    const handleOpenModal = (book = null) => {
        setSelectedBook(book);
        setModalType(book ? 'edit' : 'create');
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedBook(null);
        setModalOpen(false);
    };

    const handleSaveBook = async (book) => {
        // Convertir publishedYear en entier
        if (typeof book.publishedYear === 'string') {
            book.publishedYear = parseInt(book.publishedYear, 10);
        }
    
        // Validation des champs requis
        if (!book.title || !book.description || isNaN(book.publishedYear) || !book.authorId) {
            console.error('Données du livre invalides', book);
            alert('Veuillez remplir tous les champs requis correctement.');
            return;
        }
    
        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            if (modalType === 'edit' && selectedBook) {
                if (!selectedBook.id) {
                    throw new Error("ID du livre est manquant.");
                }
                await axios.put(`http://localhost:3000/api/books/${selectedBook.id}`, book, { headers });
            } else {
                await axios.post('http://localhost:3000/api/books', book, { headers });
            }
            fetchBooks();
            handleCloseModal();
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement du livre :', error);
            alert('Erreur lors de l\'enregistrement du livre.');
        }
    };
    
    const handleDeleteBook = async (bookId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/api/books/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchBooks();
        } catch (error) {
            handleError(error);
        }
    };

    const handleError = (error) => {
        setErrorMessage(error.response?.data?.message || 'Une erreur est survenue.');
        setErrorModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-blue-800 mb-6">Liste des Livres</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Ajouter un Livre
                </button>
                <ul className="space-y-4">
                    {books.map(book => (
                        <li
                            key={book.id}
                            className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 cursor-pointer transition duration-300 ease-in-out"
                            onClick={() => handleOpenModal(book)}
                        >
                            <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                            <p className="text-gray-600">
                                {book.author ? book.author.name : 'Auteur inconnu'}
                            </p>
                        </li>
                    ))}
                </ul>
                {modalOpen && (
                    <Modal
                        isOpen={modalOpen}
                        onClose={handleCloseModal}
                        item={selectedBook}
                        onSave={handleSaveBook}
                        onDelete={handleDeleteBook}
                        type="Livre"
                        modalType={modalType}
                        authors={authors}  // Pass the list of authors to the Modal
                    />
                )}
                {errorModalOpen && (
                    <ErrorModal
                        isOpen={errorModalOpen}
                        onClose={() => setErrorModalOpen(false)}
                        errorMessage={errorMessage}
                    />
                )}
            </div>
        </div>
    );
}
