import { FaTemperatureHigh, FaCity, FaHospital } from 'react-icons/fa';
import Image from 'next/image';

const What = () => {
    return (
        <section className="py-16 ">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        What Is the Urban Heat Island Effect?
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <p className="text-lg text-gray-300 leading-relaxed">
                            The Urban Heat Island (UHI) effect is a phenomenon where urban areas experience significantly
                            <span className="font-semibold text-red-500"> higher temperatures </span>
                            than their rural surroundings. This is due to human activities, dense buildings, asphalt roads,
                            and a lack of greenery—all of which
                            <span className="font-semibold text-red-500"> absorb and retain more heat</span>.
                        </p>

                        <div className="grid gap-6 mt-8">
                            <div className="flex items-start space-x-4 sm:space-x-6 p-4 sm:p-6 bg-gray-800 rounded-lg border-solid border-gray-700 hover:shadow-md transition-all duration-200">
                                <div className="text-red-500 text-2xl mt-1 flex-shrink-0">
                                    <FaTemperatureHigh />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-200">Temperature Difference</h3>
                                    <p className="text-gray-400">Cities can be up to <span className="font-medium text-red-500">7°C (13°F)</span> hotter than nearby rural areas</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4 sm:space-x-6 p-4 sm:p-6 bg-gray-800 rounded-lg border-solid border-gray-700 hover:shadow-md transition-all duration-200">
                                <div className="text-red-500 text-2xl mt-1 flex-shrink-0">
                                    <FaCity />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-200">Urban Population</h3>
                                    <p className="text-gray-400">Over <span className="font-medium text-red-500">55%</span> of the global population lives in cities—projected to reach <span className="font-medium text-red-500">68%</span> by 2050</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4 sm:space-x-6 p-4 sm:p-6 bg-gray-800 rounded-lg border-solid border-gray-700 hover:shadow-md transition-all duration-200">
                                <div className="text-red-500 text-2xl mt-1 flex-shrink-0">
                                    <FaHospital />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-200">Health & Energy Impact</h3>
                                    <p className="text-gray-400">Increased urban heat leads to higher energy demand, heat-related illnesses, and reduced air quality</p>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="relative h-full flex items-center justify-center">
                        <div className="w-full h-[400px] bg-[#31465f] rounded-2xl overflow-hidden shadow-2xl relative border-solid border-gray-700">
                            <Image
                                src="/images/uhi-img-2.png"
                                alt="Urban Heat Island Effect Illustration"
                                fill
                                className="object-contain opacity-90"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default What;
