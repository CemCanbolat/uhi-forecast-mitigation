"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiBook } from "react-icons/fi"

interface DocSection {
    title: string;
    href: string;
}

const SIDEBAR_CONTENT: DocSection[] = [
    {
        title: "Home",
        href: "/docs"
    },
    {
        title: "Project Overview",
        href: "/docs/project-overview"
    },
    {
        title: "Research and Background",
        href: "/docs/research-background"
    },
    {
        title: "Ethics and Responsibility",
        href: "/docs/ethics-responsibility"
    },
    {
        title: "Technical Documentation",
        href: "/docs/technical-documentation"
    },
    {
        title: "Licensing and Contribution",
        href: "/docs/licensing-contribution"
    },
    {
        title: "Team and Acknowledgments",
        href: "/docs/team-acknowledgments"
    },
    {
        title: "Appendices",
        href: "/docs/appendices"
    },
    {
        title: "Reflections",
        href: "/docs/reflections"
    }
];

export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
    const pathname = usePathname();

    return (
        <div className="h-full overflow-auto py-6 px-4 lg:py-8">
            <div className="mb-8 flex items-center">
                <FiBook className="mr-2 text-emerald-600" size={20} />
                <h3 className="text-lg font-semibold text-emerald-700">Documentation</h3>
            </div>
            <div className="flex flex-col gap-2">
                {SIDEBAR_CONTENT.map((section: DocSection, i: number) => {

                    const isActive = section.href === "/docs" 
                        ? pathname === "/docs" 
                        : pathname === section.href || pathname.startsWith(section.href + "/");
                    
                    return (
                        <Link
                            key={i}
                            href={section.href}
                            onClick={() => onNavigate?.()}
                            className={`flex items-center px-3 py-2.5 transition-colors ${isActive 
                                ? "text-emerald-700 font-medium border-l-2 border-emerald-600 pl-4 bg-emerald-50/50" 
                                : "text-slate-700 hover:text-emerald-600 hover:bg-slate-50"}`}
                        >
                            {section.title}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
