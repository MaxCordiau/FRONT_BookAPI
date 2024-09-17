    import React from 'react';
    import BooksAndAuthors from '../components/BooksAndAuthors';
    import Header from '../components/Header';
    import '../styles/index.css';

    export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">Bienvenue dans notre bibliothèque</h1>
            <p className="text-xl text-center text-gray-600 mb-12">Découvrez notre collection de livres et d'auteurs :</p>
            <div className="bg-white shadow-lg rounded-lg p-6">
            <BooksAndAuthors />
            </div>
        </main>
        </div>
    );
    }