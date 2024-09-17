    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import Modal from '../components/Modal';
    import '../styles/index.css';

    export default function BookPage() {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
        const response = await axios.get('http://localhost:3000/api/books');
        setBooks(response.data);
        } catch (error) {
        console.error("Erreur lors de la récupération des livres :", error);
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

    const handleSaveBook = async (bookData) => {
        try {
        if (modalType === 'edit' && selectedBook) {
            await axios.put(`http://localhost:3000/api/books/${selectedBook.id}`, bookData);
        } else {
            await axios.post('http://localhost:3000/api/books', bookData);
        }
        fetchBooks();
        handleCloseModal();
        } catch (error) {
        console.error("Erreur lors de l'enregistrement du livre :", error);
        }
    };

    const handleDeleteBook = async (bookId) => {
        try {
        await axios.delete(`http://localhost:3000/api/books/${bookId}`);
        fetchBooks();
        } catch (error) {
        console.error("Erreur lors de la suppression du livre :", error);
        }
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
                <p className="text-gray-600">{typeof book.author === 'string' ? book.author : 'Auteur inconnu'}</p>
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
            />
            )}
        </div>
        </div>
    );
    }
