import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import cities, { CityInfo } from '../data/cities';
import { IoLocationOutline } from 'react-icons/io5';

interface CitySelectorProps {
  onCitySelect: (cityId: string) => void;
  initialCityId?: string;
}

const CitySelector: React.FC<CitySelectorProps> = ({ onCitySelect, initialCityId }) => {
  const router = useRouter();
  const [selectedCityId, setSelectedCityId] = useState<string>(initialCityId || cities[0]?.id || '');

  useEffect(() => {
    // Default to first city if available and none is selected
    if (cities.length > 0 && !selectedCityId) {
      const defaultCity = cities[0].id;
      console.log(`Setting default city to: ${defaultCity}`);
      setSelectedCityId(defaultCity);
      onCitySelect(defaultCity);
    }
  }, [selectedCityId, onCitySelect]);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = e.target.value;
    console.log(`City changed to: ${cityId}`);
    setSelectedCityId(cityId);
    onCitySelect(cityId);
    
    // Navigate to the city-specific page using the router
    router.push(`/app/${cityId}`);
  };

  return (
    <div className="relative flex items-center space-x-2">
      <label htmlFor="city-select" className="flex items-center space-x-1.5">
        <IoLocationOutline className="w-4 h-4 text-gray-300" />
        <span className="text-sm font-medium text-gray-300">City:</span>
      </label>
      <div className="relative">
        <select
          id="city-select"
          value={selectedCityId}
          onChange={handleCityChange}
          className="appearance-none bg-gray-700 text-white text-sm rounded-lg block w-48 px-3 py-2 pr-8
            border border-gray-600 hover:border-gray-500
            focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
            transition-all duration-200 ease-in-out
            cursor-pointer"
        >
          {cities.map((city) => (
            <option key={city.id} value={city.id} className="py-1">
              {city.name}, {city.country}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CitySelector; 