'use client';

import { FC, useState, useCallback, memo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UHIMap from './Map';
import CitySelector from './CitySelector';

interface CityData {
  id: string;
  data: {
    type: string;
    features: any[];
  };
}

interface MapSectionProps {
  onZoomChange: (zoom: number, maxZoomLevel: number) => void;
  initialCityId: string;
  initialCityData: CityData;
}

const MapSection: FC<MapSectionProps> = memo(({ onZoomChange, initialCityId, initialCityData }) => {
  const router = useRouter();
  const [selectedCityId, setSelectedCityId] = useState<string>(initialCityId);
  const [cityData, setCityData] = useState<CityData>(initialCityData);

  // Update URL when city changes
  const handleCitySelect = useCallback((cityId: string) => {
    console.log(`MapSection: City selected: ${cityId}`);
    setSelectedCityId(cityId);
    router.push(`/app/${cityId}`, { scroll: false });
  }, [router]);

  // Update local state when props change
  useEffect(() => {
    if (initialCityId !== selectedCityId) {
      setSelectedCityId(initialCityId);
    }
    setCityData(initialCityData);
  }, [initialCityId, initialCityData]);

  console.log(`MapSection rendering with city: ${selectedCityId}`);

  return (
    <div className="bg-gray-800 rounded-lg shadow p-3 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-0">Heat Island Prediction Map</h2>
        <div className="flex flex-wrap items-center space-x-2 sm:space-x-4">
          <CitySelector onCitySelect={handleCitySelect} initialCityId={selectedCityId} />
          <span className="text-xs sm:text-sm text-gray-400 font-medium mt-1 sm:mt-0">
            Predicted map for the next 5 days
          </span>
        </div>
      </div>
      <UHIMap
        key={`map-${selectedCityId}`}
        onZoomChange={onZoomChange}
        selectedCityId={selectedCityId}
        cityData={cityData}
      />
    </div>
  );
});

MapSection.displayName = 'MapSection';

export default MapSection;
