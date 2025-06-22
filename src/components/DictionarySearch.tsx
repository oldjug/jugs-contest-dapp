'use client';

import { useEffect, useState } from 'react';
import dictionary from '../data/web3_dictionary.json';

export default function DictionarySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState<{ [term: string]: string }>({});

  useEffect(() => {
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
      <h2 className="text-xl font-bold mb-4">Web3 Dictionary</h2>
      <input
        type="text"
        aria-label="Search dictionary terms"
        placeholder="Search terms like NFT, DAO, wallet..."
        className="w-full p-2 mb-4 rounded bg-zinc-800 text-white border border-zinc-700 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="space-y-2">
        {Object.entries(filteredResults).map(([term, def]) => (
          <li key={term}>
            <span
              className="text-yellow-400 font-semibold cursor-help underline underline-offset-2 hover:text-yellow-300 transition"
              title={def}
            >
              {term}
            </span>
          </li>
        ))}
        {Object.keys(filteredResults).length === 0 && searchTerm.length > 0 && (
          <li className="text-zinc-400 italic">No matching terms found.</li>
        )}
      </ul>
    </div>
  );
}