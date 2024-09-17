// src/components/AuthorForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AuthorForm = ({ onAuthorCreated }) => {
    const [author, setAuthor] = useState({ name: '', birthyear: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/authors', author)
            .then(response => {
                onAuthorCreated(response.data);
                setAuthor({ name: '', birthyear: '' });
            })
            .catch(error => console.error('Error creating author:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={author.name} onChange={e => setAuthor({ ...author, name: e.target.value })} placeholder="Name" required />
            <input type="number" value={author.birthyear} onChange={e => setAuthor({ ...author, birthyear: e.target.value })} placeholder="Birthyear" />
            <button type="submit">Add Author</button>
        </form>
    );
};

export default AuthorForm;
