'use client';

import React from 'react';
import MapSection from './MapSection';

interface CityData {
  id: string;
  data: {
    type: string;
    features: any[];
  };
}

interface ClientMapWrapperProps {
  initialCityId: string;
  initialCityData: CityData;
}

export default function ClientMapWrapper({ initialCityId, initialCityData }: ClientMapWrapperProps) {
  // Handle zoom changes from the map component
  const handleZoomChange = (zoom: number, maxZoomLevel: number) => {
    console.log(`Zoom changed: ${zoom}/${maxZoomLevel}`);
  };

  return (
    <MapSection
      onZoomChange={handleZoomChange}
      initialCityId={initialCityId}
      initialCityData={initialCityData}
    />
  );
}
