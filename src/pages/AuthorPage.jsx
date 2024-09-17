// src/pages/AuthorPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import '../styles/AuthorPage.css';

const AuthorPage = () => {
    const [authors, setAuthors] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(''); // New state to determine modal type

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/authors');
            setAuthors(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des auteurs :", error);
        }
    };

    const handleOpenModal = (author = null) => {
        setSelectedAuthor(author);
        setModalType(author ? 'edit' : 'create'); // Determine if it's a new or edit modal
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedAuthor(null);
        setModalOpen(false);
    };

    const handleSaveAuthor = async (authorData) => {
        try {
            if (modalType === 'edit' && selectedAuthor) {
                await axios.put(`http://localhost:3000/api/authors/${selectedAuthor.id}`, authorData);
            } else {
                await axios.post('http://localhost:3000/api/authors', authorData);
            }
            fetchAuthors();
            handleCloseModal();
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'auteur :", error);
        }
    };

    const handleDeleteAuthor = async (authorId) => {
        try {
            await axios.delete(`http://localhost:3000/api/authors/${authorId}`);
            fetchAuthors();
        } catch (error) {
            console.error("Erreur lors de la suppression de l'auteur :", error);
        }
    };

    return (
        <div className="author-page">
            <h1>Liste des Auteurs</h1>
            <button onClick={() => handleOpenModal()} className="add-button">Ajouter un Auteur</button>
            <ul>
                {authors.map(author => (
                    <li key={author.id} className="author-item" onClick={() => handleOpenModal(author)}>
                        {author.name}
                    </li>
                ))}
            </ul>
            {modalOpen && (
                <Modal
                    isOpen={modalOpen}
                    onClose={handleCloseModal}
                    item={selectedAuthor}
                    onSave={handleSaveAuthor}
                    onDelete={handleDeleteAuthor}
                    type="Auteur"
                    modalType={modalType}
                />
            )}
        </div>
    );
};

export default AuthorPage;
