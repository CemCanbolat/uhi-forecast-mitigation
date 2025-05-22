export default function LicensingContributionPage() {
    return (
        <div className="max-w-none">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Licensing and Contribution</h1>
                <div className="h-1 w-full bg-emerald-500 rounded"></div>
            </div>

            <section className="mb-10">
                <h2 id="licensing" className="text-2xl font-semibold text-slate-800 mb-4">Licensing</h2>
                <p className="text-slate-700 mb-6 leading-relaxed">
                    Our Urban Heat Island Prediction and Mitigation project is committed to open science and knowledge sharing. Our licensing approach is designed to encourage collaboration while ensuring proper attribution and responsible use of our work.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-medium text-slate-800 mb-4">Software License</h3>
                    <div className="mb-4">
                        <p className="text-slate-700 mb-2">
                            All code developed as part of this project is released under the MIT License.
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