export default function ReflectionsPage() {
    return (
        <div className="max-w-none">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Reflections</h1>
                <div className="h-1 w-full bg-emerald-500 rounded"></div>
            </div>

            <section className="mb-10">
                <h2 id="team-reflection" className="text-2xl font-semibold text-slate-800 mb-4">Team Reflection</h2>
                <p className="text-slate-700 mb-4 leading-relaxed">
                    The journey of developing our Urban Heat Island Prediction and Mitigation project has been both challenging and rewarding. As a team, we've grown significantly in our understanding of AI applications for environmental challenges.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-medium text-slate-800 mb-3">Key Challenges</h3>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                        <li>
                            <span className="font-semibold">Data Integration</span> - Combining satellite imagery, climate data, and urban infrastructure data required significant preprocessing and normalization.
                        </li>
                        <li>
                            <span className="font-semibold">Model Development</span> - Balancing model complexity with prediction accuracy was challenging, especially when working with limited training data.
                        </li>
                        <li>
                            <span className="font-semibold">Technical Integration</span> - Integrating the AI model with the web application required careful consideration of performance and user experience.
                        </li>
                    </ul>
                </div>

                <h3 className="text-xl font-medium text-slate-800 mb-3">Lessons Learned</h3>
                <p className="text-slate-700 mb-4">
                    Throughout this project, we've gained valuable insights:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
                    <li>The importance of thorough data preprocessing for accurate predictions</li>
                    <li>The value of iterative development and testing</li>
                    <li>The need for clear documentation and code organization</li>
                    <li>The significance of user-friendly visualization for complex data</li>
                </ul>

                <h3 className="text-xl font-medium text-slate-800 mb-3">Technical Growth</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white border border-slate-200 rounded-lg p-5">
                        <h4 className="text-lg font-medium text-emerald-700 mb-2">AI Development</h4>
                        <p className="text-slate-700">
                            Team members developed expertise in deep learning model development, particularly in CNN-LSTM architectures and their application to environmental data.
                        </p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-5">
                        <h4 className="text-lg font-medium text-emerald-700 mb-2">Web Development</h4>
                        <p className="text-slate-700">
                            gained experience in building interactive web applications that effectively present complex data and predictions to users.
                        </p>
                    </div>
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