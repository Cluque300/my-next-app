// app/components/SearchBar.tsx

'use client'; // Asegúrate de que es un componente de cliente

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa useRouter para la redirección
import styles from './SearchBar.module.css';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const router = useRouter(); // Inicializa el enrutador

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (query.trim().toLowerCase() === 'about') {
      router.push('/about'); // Redirige a la página "about"
    } else {
      alert('Búsqueda no válida. Solo "about" es permitido.'); // Muestra un mensaje de error
    }
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchBar}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar..."
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Buscar</button>
    </form>
  );
};

export default SearchBar;




