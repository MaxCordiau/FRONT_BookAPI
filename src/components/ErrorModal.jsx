import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/index.css';

const ErrorModal = ({ isOpen, onClose, errorMessage }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4 text-red-600">Erreur</h2>
                <p className="text-red-600 mb-4">
                    {/* {errorMessage} */}
                    Vous devez vous identifier pour modifier se contenu
                </p>
                <button
                    onClick={onClose}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                    Fermer
                </button>
            </div>
        </div>,
        document.body
    );
};

export default ErrorModal;
