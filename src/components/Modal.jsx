import React, { useState, useEffect } from 'react';
import '../styles/Modal.css'; // Assurez-vous que le chemin est correct

const Modal = ({ isOpen, onClose, item, onSave, onDelete, type, modalType }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isbn: '',
    publishedYear: '',
    name: '',
    birthDate: ''
  });

  useEffect(() => {
    if (item) {
      if (type === 'Livre') {
        setFormData({
          title: item.title || '',
          description: item.description || '',
          isbn: item.isbn || '',
          publishedYear: item.publishedYear || '',
        });
      } else if (type === 'Auteur') {
        setFormData({
          name: item.name || '',
          birthDate: item.birthDate ? new Date(item.birthDate).toISOString().split('T')[0] : '',
        });
      }
    }
  }, [item, type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleDelete = () => {
    if (item) {
      onDelete(item.id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{modalType === 'create' ? `Ajouter un ${type}` : `Éditer ${type}`}</h2>
        <form onSubmit={handleSubmit}>
          {type === 'Livre' && (
            <>
              <label>
                Titre:
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                ISBN:
                <input
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                />
              </label>
              <label>
                Année de Publication:
                <input
                  type="number"
                  name="publishedYear"
                  value={formData.publishedYear}
                  onChange={handleChange}
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          )}
          {type === 'Auteur' && (
            <>
              <label>
                Nom:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Date de Naissance:
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
              </label>
            </>
          )}
          <div className="modal-actions">
            {modalType === 'edit' && (
              <button type="button" onClick={handleDelete} className="delete-button">
                Supprimer
              </button>
            )}
            <button type="submit" className="save-button">
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
