import { FaHandHoldingHeart } from 'react-icons/fa';
import Link from "next/link";
import { FaRocket, FaFileAlt } from 'react-icons/fa';

const Mission = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-8">
                            <FaHandHoldingHeart className="text-8xl text-emerald-500" />
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Built by Students, for the Planet
                        </h2>

                        <p className="text-lg text-gray-300 leading-relaxed">
                            This project is a non-profit initiative developed by a team of software engineering students.
                            Our goal is to <span className="text-emerald-500 font-semibold">empower technology</span> to
                            support climate resilience in urban areas.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/app"
                            className="px-8 py-4 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                            <FaRocket /> Launch the App
                        </Link>
                        <Link

                            href="/docs"
                            className="px-8 py-4 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                            <FaFileAlt /> View Documentation
                        </Link>
                    </div>


                </div>
            </div>
        </section>
    );
};


export default Mission;