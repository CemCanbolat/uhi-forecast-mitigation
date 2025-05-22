interface MitigationSuggestion {
  icon: string;
  action: string;
  impact: string;
}

interface UHIZone {
  UHI_ID: string;
  UHI_Intensity: number;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  mitigation_suggestions: MitigationSuggestion[];
}

interface CityData {
  id: string;
  name: string;
  date: string;
  data: {
    city_name: string;
    date: string;
    uhizones: UHIZone[];
  };
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

const cacheOptions = {
  next: { revalidate: 300 } // 5m 
};

export const getCityData = async (cityName: string) => {
  try {
    // Use fetch with cache options for ISR
    const response = await fetch(`${BASE_URL}?city=${cityName.toLowerCase()}`, cacheOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Transform the data structure to match expected format
    return {
      id: data.id,
      name: data.name,
      date: data.date,
      data: {
        type: 'FeatureCollection',
        features: data.data.uhizones.map((zone: UHIZone) => ({
          geometry: zone.geometry,
          properties: {
            id: zone.UHI_ID,
            intensity: zone.UHI_Intensity,
            mitigation_suggestions: zone.mitigation_suggestions
          }
        }))
      }
    };
  } catch (error) {
    console.error('Error fetching city data:', error);
    throw error;
  }
};