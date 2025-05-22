interface MitigationAction {
  icon: string;
  action: string;
  impact: string;
}

interface CityDataItem {
  id: string;
  intensity: number;
  mitigationActions: MitigationAction[];
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}

interface CityData {
  id: string;
  name: string;
  country: string;
  createdAt: string;
  data: CityDataItem[];
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

const cacheOptions = {
  next: { revalidate: 3 } // 1 hour 
};

export const getCityData = async (cityName: string) => {
  try {
    // Use fetch with cache options for ISR
    const response = await fetch(`${BASE_URL}/${cityName.toLowerCase()}`, cacheOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // API returns an array, we need the first item
    if (Array.isArray(data) && data.length > 0) {
      const cityData = data[0];
      // Transform the data structure to match expected format
      return {
        id: cityData.id,
        data: {
          type: 'FeatureCollection',
          features: cityData.data.map((item: CityDataItem) => ({
            geometry: item.geometry,
            properties: {
              id: item.id,
              mitigationActions: item.mitigationActions
            }
          }))
        }
      };
    }
    throw new Error(`No data returned for ${cityName}`);
  } catch (error) {
    console.error('Error fetching city data:', error);
    throw error;
  }
};