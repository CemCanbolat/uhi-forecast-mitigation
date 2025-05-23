"use client"

import type { ReactNode } from "react"
import { useState, Suspense } from "react"
import { FiMenu, FiX, FiGithub, FiHome } from "react-icons/fi"
import Image from "next/image"
import Link from "next/link"
import { DocsSidebar } from "@/components/docs/sidebar"
import { useMobile } from "@/hooks/use-mobile"

export default function DocsLayout({
    children,
}: {
    children: ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const isMobile = useMobile()

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <header className="sticky top-0 z-40 w-full border-solid border-slate-200 bg-white shadow-sm">
                <div className="container flex h-22 items-center justify-between mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <button
                            className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 md:hidden"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                            <span className="sr-only">Toggle Menu</span>
                        </button>
                        <Link href="/docs" className="flex items-center space-x-2">
                            <Image 
                                src="/logo-black.png" 
                                alt="UHI Logo" 
                                width={45} 
                                height={45}
                            />
                            <span className="font-semibold text-lg text-slate-800">Documentation</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                            <FiHome size={20} />
                            <span className="hidden md:inline">Back to Home</span>
                        </Link>
                        <Link
                            href="https://github.com/CemCanbolat/uhi-forecast-mitigation"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 border-solid border-slate-300 rounded-md hover:bg-slate-100 transition-colors"
                        >
                            <FiGithub size={16} />
                            <span className="hidden sm:inline">GitHub</span>
                        </Link>
                    </div>
                </div>
            </header>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1 pt-6 pb-16">
                <div className="flex flex-col md:flex-row gap-8">
                    <aside
                        className={`
                            md:w-64 lg:w-72 flex-shrink-0
                            ${sidebarOpen
                                ? "fixed inset-0 z-40 bg-white p-4 overflow-y-auto"
                                : "hidden md:block"}
                        `}
                    >
                        <div className="md:sticky md:top-20">
                            {sidebarOpen && (
                                <div className="flex justify-end md:hidden mb-4">
                                    <button
                                        onClick={() => setSidebarOpen(false)}
                                        className="p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                                    >
                                        <FiX size={20} />
                                        <span className="sr-only">Close menu</span>
                                    </button>
                                </div>
                            )}
                            <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
                                <DocsSidebar onNavigate={() => setSidebarOpen(false)} />
                            </Suspense>
                        </div>
                    </aside>

                    <main className="flex-1 min-w-0">
                        <div className="bg-white rounded-xl shadow-sm border-solid border-slate-200 overflow-hidden">
                            <div className="px-6 py-6 sm:p-8 md:p-10">
                                <Suspense fallback={<div className="p-4 text-center">Loading content...</div>}>
                                    {children}
                                </Suspense>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <footer className="border-t border-solid border-slate-200 bg-white py-4 sm:py-6">
                <div className="container mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-3 md:flex-row">
                        <div className="flex items-center justify-center gap-2 w-full">
                            <Image 
                                src="/logo-black.png" 
                                alt="UHI Logo" 
                                width={32}
                                height={32}
                                className="w-6 h-6 sm:w-8 sm:h-8"
                            />
                            <p className="text-xs sm:text-sm font-medium text-slate-700 text-center sm:text-left">
                                <span className="block sm:inline">AI-Powered Urban Heat Island Prediction & Mitigation System</span>
                                <span className="hidden sm:inline"> | </span>
                                <span className="block sm:inline">Prototype Version</span>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
