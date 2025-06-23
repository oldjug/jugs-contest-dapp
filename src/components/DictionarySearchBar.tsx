'use client';

import { useState } from 'react';

const dictionary = {
  nft: 'A digital asset that represents ownership of unique items.',
  blockchain: 'A decentralized digital ledger of transactions.',
  wallet: 'A software app that stores your crypto and allows transactions.',
  smartcontract: 'Self-executing code stored on the blockchain.',
  vitruveo: 'A blockchain focused on empowering creators and tokenized assets.',
  // Add more terms as needed
};

export default function DictionarySearchBar() {
  const [query, setQuery] = useState('');
  const [definition, setDefinition] = useState('');

  const handleSearch = (term: string) => {
    const key = term.toLowerCase().replace(/\s+/g, '');
    const result = dictionary[key];
    setDefinition(result || '❌ Term not found in the JugsDrive Web3 Dictionary.');
  };

  return (
    <div className="bg-gray-950 p-4 rounded-2xl shadow-lg mt-6">
      <h2 className="text-xl font-semibold mb-2">📖 Web3 Dictionary</h2>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search a term like NFT, Wallet..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 rounded-md bg-gray-800 text-white"
        />
        <button
          onClick={() => handleSearch(query)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
        >
          Search
        </button>
      </div>

      {definition && (
        <p className="mt-4 text-sm text-green-300">{definition}</p>
      )}
    </div>
  );
}
