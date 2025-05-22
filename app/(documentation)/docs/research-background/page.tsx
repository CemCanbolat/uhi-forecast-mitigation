export default function ResearchBackgroundPage() {
    return (
        <div className="max-w-none">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Research and Background</h1>
                <div className="h-1 w-full bg-emerald-500 rounded"></div>
            </div>

            <section className="mb-10">
                <h2 id="problem-statement" className="text-2xl font-semibold text-slate-800 mb-4">Problem Statement</h2>
                <ul className="list-disc pl-6 space-y-3 text-slate-700">
                    <li className="mb-4">
                        Urban areas experience significantly higher temperatures than their rural surroundings due to factors like heat-absorbing materials, building density, and reduced vegetation, creating Urban Heat Islands (UHIs). This phenomenon, amplified by global climate change and increasing urbanization, leads to more frequent and intense heatwaves, directly impacting urban dwellers' well-being, increasing energy consumption for cooling, and posing health risks.
                    </li>
                    <li className="mb-4">
                        While the impact of urban redevelopment on surface temperatures is an area of study, there's a pressing need for proactive prediction of potential future Urban Hot Spots (UHS)—localized high-temperature areas within UHIs directly related to heat stress.
                    </li>
                    <li>
                        Current LST prediction models are often based on isolated station data or limited pixel-based predictions, making continuous regional-scale UHS prediction challenging. This project aims to fill this gap by developing an AI-powered system to predict UHS formation on a broader scale before they occur, identify high-risk areas, and recommend effective cooling strategies.
                    </li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 id="literature-review" className="text-2xl font-semibold text-slate-800 mb-4">Literature Review</h2>
                
                <div className="mb-8">
                    <h3 className="text-xl font-medium text-slate-800 mb-3">Key Studies</h3>
                    <ul className="list-disc pl-6 space-y-3 text-slate-700">
                        <li>
                            <a 
                                href="https://www.mdpi.com/2072-4292/11/3/299" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="font-semibold text-emerald-700 hover:underline"
                            >
                                Evaluation of the Effect of Urban Redevelopment on Surface Urban Heat Islands
                            </a>
                            {" "}- Analyzes how different urban redevelopment projects impact land surface temperatures and spectral indices, emphasizing the role of vegetation.
                        </li>
                        <li>
                            <a 
                                href="https://isprs-annals.copernicus.org/articles/X-4-2024/195/2024/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="font-semibold text-emerald-700 hover:underline"
                            >
                                Prediction of Potential Urban Hot Spots in Urban Environments Using Convolutional Neural Networks and Remote Sensing Techniques
                            </a>
                            {" "}- Demonstrates the use of CNNs with satellite-derived data to predict the spatial occurrence of Urban Hot Spots.
                        </li>
                        <li>
                            <span className="font-semibold text-slate-800">General Literature</span>
                            {" "}on Urban Heat Island dynamics, Land Surface Temperature retrieval from satellite imagery, and the application of various spectral indices (NDVI, NDBI, etc.) in urban climate studies.
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-medium text-slate-800 mb-3">Research Gap</h3>
                    <ul className="list-disc pl-6 space-y-3 text-slate-700">
                        <li>
                            While past effects and broad future projections are studied, there's an opportunity for more dynamic, temporally sequenced UHI/UHS forecasting (e.g., 24-72 hours ahead) using AI.
                        </li>
                        <li>
                            A critical gap also exists in translating predictive insights into easily accessible and actionable mitigation recommendations for diverse urban stakeholders. Our project aims to address these by developing a predictive system with a focus on timely forecasts and actionable mitigation guidance.
                        </li>
                    </ul>
                </div>
            </section>

            <div className="mt-10 pt-6 border-solid border-slate-200">
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
