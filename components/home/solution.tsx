import { FaSatellite, FaBrain, FaTree, FaMap, FaFileAlt } from 'react-icons/fa';

const Solution = () => {
    const features = [
        {
            icon: <FaSatellite className="text-3xl text-emerald-500" />,
            title: 'Predicts UHI spots',
            description: 'using satellite data and urban variables'
        },
        {
            icon: <FaBrain className="text-3xl text-emerald-500" />,
            title: 'AI-driven analysis',
            description: 'of heat patterns and land use'
        },
        {
            icon: <FaTree className="text-3xl text-emerald-500" />,
            title: 'mitigation actions',
            description: 'suggests mitigation actions like tree planting, green roofs, and reflective materials'
        },
        {
            icon: <FaMap className="text-3xl text-emerald-500" />,
            title: 'Provides visual maps',
            description: 'to make data understandable and actionable'
        }
    ];

    return (
        <section className="py-12 sm:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
                    <span className="inline-block px-3 py-1 bg-emerald-500 text-white uppercase text-sm font-bold rounded-full mb-4 sm:mb-6">Our Solution</span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                        A Data-Driven Tool to Understand and Address Urban Heat
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 px-0 sm:px-4">
                        We have developed a platform that uses <span className="font-semibold">open data, geospatial analysis, and AI models</span> to predict UHI hotspots and inform urban heat mitigation strategies.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-0">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="max-w-3xl mx-auto mt-12 sm:mt-20 text-center px-0 sm:px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                        How the AI Prediction Works
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 pr-0 sm:pr-4 pl-0 sm:pl-4">
                        Our Urban Heat Island prediction uses a <span className="font-semibold">deep learning model (CNN-LSTM)</span> that we have developed and trained on satellite imagery (such as Land Surface Temperature and vegetation indices), weather forecasts, and urban structural data, processed using tools like Google Earth Engine. The model analyzes these complex spatial and temporal patterns to forecast UHI spots across selected cities.
                    </p>
                    <div className="flex justify-center">
                        <a
                            href="/docs/technical-documentation"
                            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-3 bg-white text-emerald-600 font-semibold rounded-lg border-2 border-solid border-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors duration-300"
                        >
                            <FaFileAlt />
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Solution;