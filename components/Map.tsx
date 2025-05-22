'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Map, { Source, Layer, ViewStateChangeEvent, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { heatmapLayer, pointLayer } from '../data/mapLayers';
import cities from '../data/cities';

// Types
interface MitigationSuggestion {
  icon: string;
  action: string;
  impact: string;
}

interface HeatIslandFeature {
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    id: string;
    mitigation_suggestions: MitigationSuggestion[];
  };
}

interface HeatIslandData {
  features: HeatIslandFeature[];
}

// City configuration interface
interface CityInfo {
  id: string;
  name: string;
  country: string;
  longitude: number;
  latitude: number;
  zoom: number;
  minZoom: number;
}

// Constants
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
const MAX_ZOOM = 14;
const MIN_POPUP_ZOOM = MAX_ZOOM - 1;

interface UHIMapProps {
  predictedDate?: string;
  onZoomChange?: (zoom: number, maxZoom: number) => void;
  selectedCityId?: string;
  cityData: {
    id: string;
    data: {
      type: string;
      features: HeatIslandFeature[];
    };
  };
}

interface PopupInfo {
  longitude: number;
  latitude: number;
  id: string;
  mitigation_suggestions: MitigationSuggestion[];
}

/**
 * Urban Heat Island Map component that displays heat data for selected cities
 */
export default function UHIMap({
  predictedDate,
  onZoomChange,
  selectedCityId = 'istanbul',
  cityData
}: UHIMapProps) {
  // Find the selected city from predefined list
  const selectedCity = cities.find((city: CityInfo) => city.id === selectedCityId) || cities[0];

  // Map view state with zoom constraints
  const [viewState, setViewState] = useState(() => {
    const zoom = Math.min(Math.max(selectedCity.zoom, selectedCity.minZoom), MAX_ZOOM);
    return {
      longitude: selectedCity.longitude,
      latitude: selectedCity.latitude,
      zoom
    };
  });

  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  const [heatIslandData, setHeatIslandData] = useState<HeatIslandData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [featureIndex, setFeatureIndex] = useState<Record<string, HeatIslandFeature>>({});

  // Update heat island data when cityData changes
  useEffect(() => {
    if (!cityData || !cityData.data) return;

    // Reset states
    setPopupInfo(null);
    setFeatureIndex({});
    setError(null);

    setHeatIslandData(cityData.data);

    // Build feature index for O(1) lookups
    const index: Record<string, HeatIslandFeature> = {};
    cityData.data.features.forEach((feature: HeatIslandFeature) => {
      if (feature.geometry.type === 'Point') {
        const [x, y] = feature.geometry.coordinates;
        index[`${x},${y}`] = feature as HeatIslandFeature;
      }
    });
    setFeatureIndex(index);
  }, [cityData]);

  // Notify parent component about zoom changes
  useEffect(() => {
    if (onZoomChange) {
      onZoomChange(viewState.zoom, MAX_ZOOM);
    }
  }, [viewState.zoom, onZoomChange]);

  // Handle map view state changes with constraints
  const handleViewStateChange = (evt: ViewStateChangeEvent) => {
    const newViewState = { ...evt.viewState };
    newViewState.zoom = Math.min(Math.max(newViewState.zoom, selectedCity.minZoom), MAX_ZOOM);

    if (newViewState.zoom < MIN_POPUP_ZOOM) {
      setPopupInfo(null);
    }

    setViewState(newViewState);
  };

  // Display popup for a given feature
  const showPopupForFeature = (feature: HeatIslandFeature) => {
    if (viewState.zoom < MIN_POPUP_ZOOM) return;

    const [longitude, latitude] = feature.geometry.coordinates;
    const { id, mitigation_suggestions } = feature.properties;

    setPopupInfo({ longitude, latitude, id, mitigation_suggestions });
  };

  // Handle map click events
  const handleMapClick = (event: any) => {
    if (viewState.zoom < MIN_POPUP_ZOOM || !heatIslandData) {
      setPopupInfo(null);
      return;
    }

    const features = event.features || [];

    if (features.length > 0) {
      const feature = features[0];

      if ((feature.source === 'heatmap-data' || feature.layer.id === 'points') && feature.properties) {
        const coords = feature.geometry.coordinates as [number, number];
        const [x, y] = coords;

        // Use feature index for O(1) lookup
        const fullFeature = featureIndex[`${x},${y}`];

        if (fullFeature) {
          showPopupForFeature(fullFeature);
        }
      }
    } else {
      setPopupInfo(null);
    }
  };

  // Zoom level indicator component
  const ZoomIndicator = () => (
    <div className="absolute top-3 left-3 z-10">
      <div className="bg-white/90 dark:bg-gray-700/90 p-1 sm:p-2 rounded-md shadow-sm text-[10px] sm:text-xs">
        {viewState.zoom < MIN_POPUP_ZOOM ? (
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden sm:inline">Zoom in fully to see mitigation actions</span>
            <span className="inline sm:hidden">Zoom in</span>
          </div>
        ) : (
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="hidden sm:inline">Click on hotspots to see actions</span>
            <span className="inline sm:hidden">Click hotspots</span>
          </div>
        )}
      </div>
    </div>
  );

  // Render heat island markers with zoom-dependent display
  const renderMarkers = useCallback(() => {
    if (!heatIslandData) return null;

    return heatIslandData.features.map((feature, index) => {
      if (feature.geometry.type !== 'Point') return null;

      const [longitude, latitude] = feature.geometry.coordinates;
      const { id } = feature.properties;

      return (
        <Marker
          key={`marker-${index}`}
          longitude={longitude}
          latitude={latitude}
          onClick={e => {
            e.originalEvent.stopPropagation();
            if (viewState.zoom >= MIN_POPUP_ZOOM) {
              showPopupForFeature(feature);
            }
          }}
        >
          {viewState.zoom >= MAX_ZOOM ? (
            <div
              className="cursor-pointer bg-red-500 hover:bg-red-600 w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-white flex items-center justify-center text-white text-[8px] sm:text-xs font-bold"
              title={id}
            >
              {index + 1}
            </div>
          ) : (
            <div
              className={`cursor-pointer rounded-full ${viewState.zoom >= MIN_POPUP_ZOOM ? 'bg-red-500 w-4 h-4 sm:w-6 sm:h-6 border-2 border-white' : 'bg-transparent w-0 h-0'}`}
              title={id}
            />
          )}
        </Marker>
      );
    });
  }, [heatIslandData, viewState.zoom]);

  // Render popup with mitigation actions
  const PopupContent = () => {
    if (!popupInfo || viewState.zoom < MIN_POPUP_ZOOM) return null;

    return (
      <Popup
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        anchor="left"
        onClose={() => setPopupInfo(null)}
        closeOnClick={false}
        className="z-50"
        closeButton={true}
        maxWidth="300px"
      >
        <div className="p-1 sm:p-2 md:p-4 w-full sm:w-64 md:w-80 bg-white rounded-lg shadow-lg">
          <h3 className="text-xs sm:text-sm md:text-lg font-bold mb-1 sm:mb-2 md:mb-3 text-black border-b pb-1 md:pb-2">{popupInfo.id}</h3>
          <h4 className="text-[10px] sm:text-xs md:text-sm font-semibold mb-1 sm:mb-2 md:mb-3 text-black">Mitigation Actions:</h4>
          <ul className="space-y-1 sm:space-y-2 md:space-y-3">
            {popupInfo.mitigation_suggestions.map((action: MitigationSuggestion, index: number) => (
              <li key={index} className="flex items-start bg-gray-50 p-1 sm:p-1.5 md:p-2 rounded-md">
                <span className="text-lg sm:text-xl md:text-2xl mr-1 sm:mr-2 md:mr-3">{action.icon}</span>
                <div>
                  <p className="text-[10px] sm:text-xs md:text-sm font-medium text-black">{action.action}</p>
                  <p className="text-[8px] sm:text-[10px] md:text-xs text-black">{action.impact}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-2 md:mt-3 pt-1 md:pt-2 border-t text-[8px] sm:text-[10px] md:text-xs text-black text-right">
            <span>Tap anywhere to close</span>
          </div>
        </div>
      </Popup>
    );
  };

  // Error state
  if (error) {
    return (
      <div className="w-full h-[65vh] sm:h-[60vh] md:h-[70vh] flex flex-col items-center justify-center bg-gray-900 rounded-lg p-4">
        <div className="text-red-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="text-white text-center mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const NoDataOverlay = () => {
    if (!heatIslandData || heatIslandData.features?.length > 0) return null;
    
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="bg-gray-900/80 rounded-lg p-4 backdrop-blur-sm max-w-md mx-4">
          <div className="text-blue-400 mb-3 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-white text-center text-sm mb-1">No heat islands detected</div>
          <div className="text-gray-400 text-xs text-center">There are no urban heat islands predicted for {selectedCity.name} on this date.</div>
        </div>
      </div>
    );
  };

  // Loading state
  if (!heatIslandData) {
    return (
      <div className="w-full h-[65vh] sm:h-[60vh] md:h-[70vh] flex flex-col items-center justify-center bg-gray-900 rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <div className="text-white">Loading map data for {selectedCity.name}...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[65vh] sm:h-[60vh] md:h-[70vh] rounded-lg overflow-hidden shadow-lg relative">
      <ZoomIndicator />
      <NoDataOverlay />
      <Map
        {...viewState}
        onMove={handleViewStateChange}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        minZoom={selectedCity.minZoom}
        maxZoom={MAX_ZOOM}
        interactiveLayerIds={['points']}
        onClick={handleMapClick}
        doubleClickZoom={false}
      >
        <Source id="heatmap-data" type="geojson" data={heatIslandData}>
          <Layer {...heatmapLayer} />
          <Layer {...pointLayer} />
        </Source>

        {renderMarkers()}
        <PopupContent />
      </Map>
    </div>
  );
}