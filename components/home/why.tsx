import { FaSun, FaTree, FaIndustry, FaBuilding, FaThermometerHalf, FaHospitalAlt } from 'react-icons/fa';
import { RiWindyFill } from 'react-icons/ri';
import { IoFlashSharp } from 'react-icons/io5';

const Why = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        What Causes UHI?
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        UHI is driven by multiple factors that combine to create warmer urban environments
                    </p>
                </div>

                {/* Factors */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:scale-101 transform transition-transform duration-200">
                        <div className="text-yellow-500 text-3xl mb-4">
                            <FaSun />
                        </div>
                        <h3 className="font-semibold text-gray-200 text-xl mb-3">Dark Surfaces</h3>
                        <p className="text-gray-400">Asphalt and concrete absorb more solar energy, increasing surface temperatures</p>
                    </div>

                    <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:scale-101 transform transition-transform duration-200">
                        <div className="text-green-500 text-3xl mb-4">
                            <FaTree />
                        </div>
                        <h3 className="font-semibold text-gray-200 text-xl mb-3">Limited Vegetation</h3>
                        <p className="text-gray-400">Reduced natural cooling from shade and evaporation in urban areas</p>
                    </div>

                    <div className="p-6 bg-gray-800 rounded-xl border border-gray-700   hover:scale-101 transform transition-transform duration-200">
                        <div className="text-red-400 text-3xl mb-4">
                            <FaIndustry />
                        </div>
                        <h3 className="font-semibold text-gray-200 text-xl mb-3">Waste Heat</h3>
                        <p className="text-gray-400">Heat generated from vehicles, air conditioning, and industrial activities</p>
                    </div>

                    <div className="p-6 bg-gray-800 rounded-xl border border-gray-700  hover:scale-101 transform transition-transform duration-200">
                        <div className="text-blue-400 text-3xl mb-4">
                            <FaBuilding />
                        </div>
                        <h3 className="font-semibold text-gray-200 text-xl mb-3">Urban Geometry</h3>
                        <p className="text-gray-400">Narrow streets and tall buildings trap heat and restrict air flow</p>
                    </div>
                </div>



                {/* Impact */}
                <div className="mt-20 mb-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white inline-block relative mb-4">
                            Environmental & Social Impacts
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                            Urban Heat Islands significantly affect our cities and communities in multiple ways, from environmental changes to public health concerns
                        </p>
                    </div>

                    <div className="relative overflow-hidden">
                        <div className="p-4 md:p-1">
                            <div className="grid md:grid-cols-2 gap-8 md:gap-x-16 md:gap-y-12">
                                <div className="flex items-start space-x-5 p-5 rounded-lg bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-red-500/20 rounded-full flex items-center justify-center">
                                        <FaThermometerHalf className="text-red-400 text-2xl" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-white mb-2">Extreme Heat</h4>
                                        <p className="text-gray-300">Urban areas experience significantly higher temperatures than surrounding regions, increasing heat risks.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-5 p-5 rounded-lg bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-blue-500/20 rounded-full flex items-center justify-center">
                                        <RiWindyFill className="text-blue-400 text-2xl" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-white mb-2">Air Quality Decline</h4>
                                        <p className="text-gray-300">Higher temperatures accelerate air pollution formation, worsening respiratory conditions.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-5 p-5 rounded-lg bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-yellow-500/20 rounded-full flex items-center justify-center">
                                        <IoFlashSharp className="text-yellow-400 text-2xl" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-white mb-2">Energy Consumption</h4>
                                        <p className="text-gray-300">Increased cooling demands drive higher energy use, creating a feedback loop that worsens climate impacts.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-5 p-5 rounded-lg bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-green-500/20 rounded-full flex items-center justify-center">
                                        <FaHospitalAlt className="text-green-400 text-2xl" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-white mb-2">Health Concerns</h4>
                                        <p className="text-gray-300">Heat-related illnesses increase significantly, particularly affecting vulnerable populations.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Why;
