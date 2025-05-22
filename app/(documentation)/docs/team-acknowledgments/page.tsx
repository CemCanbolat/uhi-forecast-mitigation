export default function TeamAcknowledgmentsPage() {
  return (
    <div className="max-w-none">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Team and Acknowledgments</h1>
        <div className="h-1 w-full bg-emerald-500 rounded"></div>
      </div>

      <section className="mb-10">
        <h2 id="team" className="text-2xl font-semibold text-slate-800 mb-4">Team Members</h2>
        <p className="text-slate-700 mb-6 leading-relaxed">
          Our Urban Heat Island Prediction and Mitigation project is the result of collaborative work. Each team member brought unique skills and perspectives that were essential to the project's success.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-emerald-600 h-3"></div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Cem Canbolat</h3>
              <p className="text-emerald-600 text-sm font-medium">Team Leader</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-emerald-600 h-3"></div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Hacire Harman</h3>
              <p className="text-emerald-600 text-sm font-medium">Data Scientist</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-emerald-600 h-3"></div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Muhanned Bugureen</h3>
              <p className="text-emerald-600 text-sm font-medium">Web Developer</p>
            </div>
          </div>


          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-emerald-600 h-3"></div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Gül Nihal Gür</h3>
              <p className="text-emerald-600 text-sm font-medium">AI Developer</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-emerald-600 h-3"></div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Elif Tuğçe Kesler</h3>
              <p className="text-emerald-600 text-sm font-medium">AI Developer</p>
            </div>
          </div>


        </div>
      </section>

      <section className="mb-10">
        <h2 id="acknowledgments" className="text-2xl font-semibold text-slate-800 mb-4">Acknowledgments</h2>
        <p className="text-slate-700 mb-6">
          We would like to express our gratitude to the many individuals and organizations that supported this project:
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>
              <span className="font-semibold">Prof. Dr. Ferdi SÖNMEZ</span> - For his guidance and mentorship
            </li>
            <li>
              <span className="font-semibold">Rotterdam University (GRAILS Organizers)</span> - For creating this opportunity to address global challenges through responsible AI
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-medium text-slate-800 mb-3">Data Sources</h3>
        <p className="text-slate-700 mb-4">
          We are grateful to the following organizations for providing valuable data and resources:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
          <li>USGS</li>
          <li>NOAA Climate Data</li>
          <li>NASA Earth Observation Data</li>
          <li>ESA</li>
          <li>OpenStreetMap Community</li>
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