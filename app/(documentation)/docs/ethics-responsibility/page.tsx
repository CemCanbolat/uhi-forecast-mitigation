export default function EthicsResponsibilityPage() {
    return (
        <div className="max-w-none">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Ethics and Responsibility</h1>
                <div className="h-1 w-full bg-emerald-500 rounded"></div>
            </div>

            <section className="mb-10">
                <h2 id="ethical-consideration" className="text-2xl font-semibold text-slate-800 mb-4">Ethical Consideration</h2>
                
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">Transparency</h3>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                        <li>
                            <span className="font-semibold">Data Sources:</span> We exclusively use publicly available and open-source datasets (e.g., MODIS, Landsat, VIIRS, ESA WorldCover, city polygon assets) for UHI analysis and model training. All data sources and preprocessing steps are clearly documented.
                        </li>
                        <li>
                            <span className="font-semibold">Methodologies & Algorithms:</span> Our data processing pipeline (using Google Earth Engine) and the architecture of our CNN-ConvLSTM model (developed in TensorFlow/Keras) are disclosed. We aim for clarity in how predictions are generated.
                        </li>
                    </ul>
                </div>
                
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">Fairness & Inclusivity</h3>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                        <li>
                            <span className="font-semibold">Mitigating Bias:</span> We acknowledge that UHI effects can disproportionately impact vulnerable populations. While our current model focuses on physical prediction, future work aims to integrate socio-economic factors to ensure mitigation strategies are equitable and address potential biases in data or impact.
                        </li>
                        <li>
                            <span className="font-semibold">Accessibility:</span> The long-term vision includes a web platform designed to be accessible to a diverse range of users, from individuals and community groups to city planners.
                        </li>
                    </ul>
                </div>
                
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">Accountability</h3>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                        <li>
                            <span className="font-semibold">Decision Support, Not Replacement:</span> The AI system is designed as a tool to support human decision-making. Predictions and mitigation suggestions are for informational and planning purposes, with final actions resting with users.
                        </li>
                        <li>
                            <span className="font-semibold">Performance Monitoring:</span> Model performance is rigorously evaluated using standard metrics (accuracy, F1-score, precision, recall) and continuously monitored. Limitations are acknowledged.
                        </li>
                    </ul>
                </div>
                
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">Privacy and Security</h3>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                        <li>
                            <span className="font-semibold">Aggregated Data Focus:</span> The project primarily analyzes aggregated environmental and geospatial data. No Personally Identifiable Information (PII) is collected, processed, or stored for the core UHI prediction model.
                        </li>
                        <li>
                            <span className="font-semibold">Data Handling:</span> All data, especially during the TFRecord generation and model training phases, is handled with respect for its source and intended use.
                        </li>
                    </ul>
                </div>
                
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">Sustainability & Environmental Responsibility</h3>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                        <li>
                            <span className="font-semibold">Core Project Goal:</span> The fundamental aim of the project is to contribute to environmental sustainability by enabling proactive UHI mitigation, promoting energy conservation, and supporting climate-resilient urban planning.
                        </li>
                        <li>
                            <span className="font-semibold">Computational Resources:</span> We strive for efficient data processing (leveraging Google Earth Engine for large-scale tasks) and model training to be mindful of computational energy consumption.
                        </li>
                    </ul>
                </div>
                
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">Openness and Collaboration</h3>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                        <li>
                            <span className="font-semibold">Open Source Commitment:</span> The project intends to make its code and methodologies available under open-source licenses to foster collaboration, reproducibility, and further innovation in the field.
                        </li>
                    </ul>
                </div>
            </section>

            <div className="mt-10 pt-6 border-t border-slate-200">
                <a
                    href="/docs"
                    className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition-colors"
                >
                    Back to Documentation Home
                </a>
            </div>
        </div>
    )
}