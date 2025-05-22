import type { Metadata } from "next"
import "../globals.css"

export const metadata: Metadata = {
  title: "Project Documentation",
  description: "Documentation for the Urban Heat Island Prediction and Mitigation Project",

}

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/src/app/logo.png" sizes="64x64" />
      <body className="min-h-screen antialiased text-gray-900">
        <div className="w-full">
          {children}
        </div>
      </body>
    </html>
  )
}
