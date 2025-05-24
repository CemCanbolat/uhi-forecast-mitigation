export default function ProjectOverviewPage() {
    return (
        <div className="max-w-none">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Project Overview</h1>
                <div className="h-1 w-full bg-emerald-500 rounded"></div>
            </div>

            <section className="mb-10">
                <h2 id="abstract" className="text-2xl font-semibold text-slate-800 mb-4">Abstract</h2>
                <p className="text-slate-700 mb-4 leading-relaxed">
                    Densely built urban areas experience significantly higher temperatures than surrounding rural areas, a phenomenon known as the Urban Heat Island (UHI) effect. This exacerbates heat stress, negatively impacts public health, increases energy consumption, and contributes to broader climate change challenges. Current efforts often focus on UHI detection rather than proactive prediction. This project proposes an AI-powered system to predict UHIs 5 days in advance, analyze satellite imagery and climate data to generate heat risk maps, and recommend actionable mitigation strategies. The system aims to empower individuals, communities, and city planners with tools for informed decision-making, fostering energy conservation, enhancing urban livability, and supporting climate adaptation, aligning with SDG 11 (Sustainable Cities and Communities), SDG 3 (Good Health and Well-Being), and SDG 13 (Climate Action).
                </p>
            </section>

            <section className="mb-10">
                <h2 id="goals" className="text-2xl font-semibold text-slate-800 mb-4">Goals and Objectives</h2>
                <p className="text-slate-700 mb-4">Our project aims to achieve the following specific goals:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                    <li>Develop an AI model to predict Urban Heat Islands (UHIs) using CNN-LSTM hybrid architecture</li>
                    <li>Design an AI system to propose context-specific mitigation actions for reducing UHIs</li>
                    <li>Create an accessible web application for visualizing UHI predictions and mitigation measures</li>
                    <li>Provide data-driven insights to increase awareness of UHI effects</li>
                </ul>
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
