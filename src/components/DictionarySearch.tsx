'use client';

import { useEffect, useState } from 'react';
import dictionary from '../data/web3_dictionary.json';

export default function DictionarySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState<{ [term: string]: string }>({});

  useEffect(() => {
    if (searchTerm.length < 2) {
      setFilteredResults({});
      return;
    }

    const results: { [term: string]: string } = {};
    for (const term in dictionary) {
      if (term.toLowerCase().includes(searchTerm.toLowerCase())) {
        results[term] = dictionary[term];
      }
    }
    setFilteredResults(results);
  }, [searchTerm]);

  return (
    <div className="bg-zinc-900 text-white p-4 rounded-lg mt-8">
      <h2 className="text-xl font-bold mb-2">Web3 Dictionary</h2>
      <input
        type="text"
        placeholder="Search terms like NFT, DAO, wallet..."
        className="w-full p-2 mb-4 rounded bg-brand-light text-brand-dark border border-brand-dark focus:outline-none focus:ring focus:ring-brand"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="space-y-2">
        {Object.entries(filteredResults).map(([term, def]) => (
          <li key={term}>
            <strong className="text-yellow-400 cursor-help" title={def}>{term}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
