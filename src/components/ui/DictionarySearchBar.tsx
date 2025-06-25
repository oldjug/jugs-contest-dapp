'use client';

import { useState } from 'react';

const mockDictionary = {
  nft: 'Non-Fungible Token: A unique digital asset on the blockchain.',
  blockchain: 'A decentralized ledger of transactions.',
  wallet: 'A tool for managing your crypto assets.',
};

export default function DictionarySearchBar() {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');

  const handleSearch = () => {
    const key = term.toLowerCase();
    setDefinition(mockDictionary[key] || 'No definition found.');
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg space-y-2">
      <input
        type="text"
        placeholder="Search Web3 terms..."
        className="w-full p-2 rounded bg-black text-white border border-gray-600"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
      >
        Search
      </button>
      {definition && (
        <div className="text-sm mt-2 text-left">{definition}</div>
      )}
    </div>
  );
}