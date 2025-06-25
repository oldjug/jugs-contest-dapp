'use client';

import { useEffect, useState } from 'react';

export default function DictionarySearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) return;

    const fetchTerms = async () => {
      const request = indexedDB.open('Web3DictionaryDB', 1);

      request.onupgradeneeded = (event) => {
        const db = request.result;
        if (!db.objectStoreNames.contains('terms')) {
          db.createObjectStore('terms', { keyPath: 'term' });
        }
      };

      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction('terms', 'readonly');
        const store = tx.objectStore('terms');

        const getAll = store.getAll();
        getAll.onsuccess = () => {
          const allTerms = getAll.result;
          const filtered = allTerms
            .filter((entry: any) =>
              entry.term.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((entry: any) => entry.term);
          setResults(filtered);
        };
      };

      request.onerror = () => {
        console.error('IndexedDB error:', request.error);
      };
    };

    fetchTerms();
  }, [searchTerm]);

  return (
    <div className="mt-2">
      <input
        type="text"
        placeholder="Search terms like NFT, DAO"
        className="w-full p-2 text-black rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {results.length > 0 && (
        <ul className="mt-2 space-y-1">
          {results.map((term, idx) => (
            <li key={idx} className="text-sm text-white">
              {term}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
