export default function DocsHomePage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">AI-Powered Urban Heat Island Prediction and Mitigation System</h1>
        <p className="text-lg text-slate-600 max-w-3xl">
          Welcome to the project documentation.
        </p>
      </div>

      <div className="bg-emerald-50 p-6 rounded-xl border border-solid border-emerald-100 mb-10">
        <h2 className="text-xl font-semibold text-emerald-800 mb-3">About This Project</h2>
        <p className="text-slate-700 mb-4">
          This project was developed as part of our participation in the GRAILS 2025 competition, organized by Rotterdam University of Applied Sciences.

          Our goal is to predict Urban Heat Islands and suggest effective mitigation actions using AI-powered analysis. By combining satellite imagery, weather data, and urban characteristics, our system provides valuable insights that can help improve the quality of life in cities.</p>
        <p className="text-slate-700">
          This documentation serves as a guide for understanding our project's goals, methodology, and implementation details for users interested in urban heat island prediction and mitigation.
        </p>
      </div>

      <div className="aspect-w-16 aspect-h-9 mb-10">
        <iframe
          className="w-full rounded-xl"
          height="500"
          src="https://www.youtube.com/embed/_btkrR04_h4?si=1dVR4qrOH7fuRB1e"
          title="Project Overview"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <h2 className="text-xl font-semibold text-slate-800 mb-5">Documentation Sections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <SectionCard
          title="Project Overview"
          description="A concise summary of our project, including its goals and objectives"
          href="/docs/project-overview"
          iconClass="bg-blue-50 text-blue-600"
        />
        <SectionCard
          title="Research and Background"
          description="information about the problem we're addressing and relevant literature"
          href="/docs/research-background"
          iconClass="bg-purple-50 text-purple-600"
        />
        <SectionCard
          title="Ethics and Responsibility"
          description="Our approach to responsible development and implementation"
          href="/docs/ethics-responsibility"
          iconClass="bg-amber-50 text-amber-600"
        />
        <SectionCard
          title="Technical Documentation"
          description="details about our methodology, implementation, and results"
          href="/docs/technical-documentation"
          iconClass="bg-emerald-50 text-emerald-600"
        />
      </div>

      <h2 className="text-xl font-semibold text-slate-800 mb-5">Additional Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SmallCard title="Licensing & Contribution" href="/docs/licensing-contribution" />
        <SmallCard title="Team & Acknowledgments" href="/docs/team-acknowledgments" />
        <SmallCard title="Appendices" href="/docs/appendices" />
        <SmallCard title="Reflections" href="/docs/reflections" />
      </div>

      <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-solid border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-3">Getting Started</h2>
        <p className="text-slate-600 mb-5">
          Use the navigation menu to explore different sections of our documentation. Each section provides detailed information about specific aspects of our Urban Heat Island Prediction and Mitigation project.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/docs/project-overview"
            className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition-colors"
          >
            Project Overview
          </a>
          <a
            href="/docs/technical-documentation"
            className="inline-flex items-center justify-center rounded-md border border-solid border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
          >
            Technical Documentation
          </a>
        </div>
      </div>
    </div>
  )
}

function SectionCard({ title, description, href, iconClass }: { title: string; description: string; href: string; iconClass: string }) {
  return (
    <a href={href} className="block p-6 bg-white rounded-xl border border-solid border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className={`w-10 h-10 rounded-lg ${iconClass} flex items-center justify-center mb-3`}>
        <span className="font-bold text-lg">{title.charAt(0)}</span>
      </div>
      <h3 className="text-lg font-medium text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm">{description}</p>
    </a>
  )
}

function SmallCard({ title, href }: { title: string; href: string }) {
  return (
    <a href={href} className="block p-4 bg-white rounded-lg border border-solid border-slate-200 shadow-sm hover:shadow-md hover:bg-slate-50 transition-all duration-300 text-center">
      <h3 className="text-sm font-medium text-slate-800">{title}</h3>
    </a>
  )
}
