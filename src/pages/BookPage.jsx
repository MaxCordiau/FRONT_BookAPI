// src/pages/BookPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import '../styles/BookPage.css';

const BookPage = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(''); // New state to determine modal type

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
        setModalType(book ? 'edit' : 'create'); // Determine if it's a new or edit modal
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
        <div className="book-page">
            <h1>Liste des Livres</h1>
            <button onClick={() => handleOpenModal()} className="add-button">Ajouter un Livre</button>
            <ul>
                {books.map(book => (
                    <li key={book.id} className="book-item" onClick={() => handleOpenModal(book)}>
                        {book.title}
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
    );
};

export default BookPage;
