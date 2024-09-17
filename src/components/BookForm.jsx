import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/BookForm.css'; // Import du CSS pour Header

const BookForm = ({ bookId, onSuccess }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isbn, setIsbn] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (bookId) {
            axios.get(`http://localhost:3000/api/books/${bookId}`)
                .then(response => {
                    const book = response.data;
                    setTitle(book.title);
                    setDescription(book.description);
                    setIsbn(book.isbn);
                    setPublishedYear(book.publishedYear);
                    setAuthorId(book.authorId || '');
                    setAuthorName(book.author.name || '');
                    setIsEditing(true);
                })
                .catch(error => {
                    console.error("Il y a eu une erreur lors de la récupération du livre : ", error);
                });
        } else {
            setIsEditing(false);
        }
    }, [bookId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookData = { title, description, isbn, publishedYear, authorId, authorName };

        if (isEditing) {
            axios.put(`http://localhost:3000/api/books/${bookId}`, bookData)
                .then(response => {
                    onSuccess();
                    alert('Livre mis à jour avec succès!');
                })
                .catch(error => {
                    console.error("Il y a eu une erreur lors de la mise à jour du livre : ", error);
                });
        } else {
            axios.post('http://localhost:3000/api/books', bookData)
                .then(response => {
                    onSuccess();
                    alert('Livre créé avec succès!');
                })
                .catch(error => {
                    console.error("Il y a eu une erreur lors de la création du livre : ", error);
                });
        }
    };

    const handleDelete = () => {
        if (bookId && window.confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
            axios.delete(`http://localhost:3000/api/books/${bookId}`)
                .then(() => {
                    onSuccess();
                    alert('Livre supprimé avec succès!');
                })
                .catch(error => {
                    console.error("Il y a eu une erreur lors de la suppression du livre : ", error);
                });
        }
    };

    return (
        <div className="book-form">
            <h2>{isEditing ? 'Éditer Livre' : 'Créer Livre'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titre :</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description :</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>ISBN :</label>
                    <input
                        type="text"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                    />
                </div>
                <div>
                    <label>Année de publication :</label>
                    <input
                        type="number"
                        value={publishedYear}
                        onChange={(e) => setPublishedYear(e.target.value)}
                    />
                </div>
                <div>
                    <label>ID Auteur :</label>
                    <input
                        type="text"
                        value={authorId}
                        onChange={(e) => setAuthorId(e.target.value)}
                    />
                </div>
                <div>
                    <label>Nom de l'Auteur :</label>
                    <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                    />
                </div>
                <button type="submit">{isEditing ? 'Mettre à jour' : 'Créer'}</button>
                {isEditing && <button type="button" onClick={handleDelete}>Supprimer</button>}
            </form>
        </div>
    );
};

export default BookForm;
