'use client';

import React from 'react';
import Link from 'next/link';
import cities from '../../../../data/cities';
import { IoArrowBack } from 'react-icons/io5';

export default function NotFound() {
  return (
    <div className="bg-gray-900 flex flex-col h-full w-full p-6">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-4">City Not Found</h1>
        <p className="text-gray-300 mb-6">The requested city is not available. Please select from the available cities:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {cities.map((city) => (
            <Link 
              key={city.id} 
              href={`/app/${city.id}`}
              className="block p-4 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <h3 className="font-medium text-white">{city.name}</h3>
              <p className="text-sm text-gray-300">{city.country}</p>
            </Link>
          ))}
        </div>
        
        <Link href="/app" className="flex items-center text-blue-500 hover:text-blue-400">
          <IoArrowBack className="mr-1" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
