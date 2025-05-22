import { notFound } from "next/navigation";
import ClientMapWrapper from "../../../../components/ClientMapWrapper";
import cities from "../../../../data/cities";
import { getCityData } from "../../../../services/api";

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.id,
  }));
}

export const revalidate = 3; // 1 hour

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
    throw error;
  }
}
