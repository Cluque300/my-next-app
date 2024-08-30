// app/components/SearchBar.tsx

'use client'; // Esto marca el archivo como un componente de cliente

import React, { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Searching for:', query);
    // Aquí podrías redirigir a una página de resultados o hacer una búsqueda
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

