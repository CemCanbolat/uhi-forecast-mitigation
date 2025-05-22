import { notFound } from "next/navigation";
import ClientMapWrapper from "../../../../components/ClientMapWrapper";
import cities from "../../../../data/cities";
import { getCityData } from "../../../../services/api";

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.id,
  }));
}

export const revalidate = 300; // 5m

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const cityParams = await params;
  const { city: cityId } = cityParams;

  const cityExists = cities.some(city => city.id === cityId);

  if (!cityExists) {
    notFound();
  }

  // Fetch city data on the server
  try {
    const cityData = await getCityData(cityId);

    // Validate the response structure
    if (!cityData || typeof cityData !== 'object') {
      throw new Error('Invalid response format from API');
    }

    // Even if uhizones/features is empty, we still render the component
    // The Map component will handle the empty state display
    return (
      <div className="bg-gray-900 flex flex-col h-full w-full">
        <main className="flex-1 flex items-center justify-center px-3 sm:px-6 lg:px-8 py-4 sm:py-3">
          <div className="w-full max-w-8xl">
            <ClientMapWrapper
              initialCityId={cityId}
              initialCityData={cityData}
            />
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error(`Error fetching data for city ${cityId}:`, error);
    
    // Return a user-friendly error page instead of throwing
    return (
      <div className="bg-gray-900 flex flex-col h-full w-full">
        <main className="flex-1 flex items-center justify-center px-3 sm:px-6 lg:px-8 py-4 sm:py-3">
          <div className="w-full max-w-8xl bg-gray-800 rounded-lg p-6 text-center">
            <h2 className="text-xl text-white mb-4">Unable to load data</h2>
            <p className="text-gray-400 mb-4">We couldn't load the forecast data for this city. Please try again later.</p>
            <a href="/" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Return to Home
            </a>
          </div>
        </main>
      </div>
    );
  }
}
