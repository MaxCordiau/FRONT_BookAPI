import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import '../styles/index.css';

export default function AuthorPage() {
    const [authors, setAuthors] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/authors', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setAuthors(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des auteurs :", error);
        }
    };

    const handleOpenModal = (author = null) => {
        setSelectedAuthor(author);
        setModalType(author ? 'edit' : 'create');
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedAuthor(null);
        setModalOpen(false);
    };

    const handleSaveAuthor = async (authorData) => {
        try {
            const token = localStorage.getItem('token');
            if (modalType === 'edit' && selectedAuthor) {
                await axios.put(`http://localhost:3000/api/authors/${selectedAuthor.id}`, authorData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                await axios.post('http://localhost:3000/api/authors', authorData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
            fetchAuthors();
            handleCloseModal();
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'auteur :", error);
        }
    };

    const handleDeleteAuthor = async (authorId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/api/authors/${authorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchAuthors();
        } catch (error) {
            console.error("Erreur lors de la suppression de l'auteur :", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-100 to-white p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-green-800 mb-6">Liste des Auteurs</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="mb-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Ajouter un Auteur
                </button>
                <ul className="space-y-4">
                    {authors.map(author => (
                        <li
                            key={author.id}
                            className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 cursor-pointer transition duration-300 ease-in-out"
                            onClick={() => handleOpenModal(author)}
                        >
                            <h3 className="text-lg font-semibold text-gray-800">{typeof author.name === 'string' ? author.name : 'Nom inconnu'}</h3>
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
        </div>
    );
}
