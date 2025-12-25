"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronRight } from "lucide-react";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents({ content }: { content: string }) {
    const [headings, setHeadings] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Extract headings from rendered content
        const article = document.querySelector('.wiki-content');
        if (!article) return;

        const headingElements = article.querySelectorAll('h2, h3');
        const tocItems: TocItem[] = [];

        headingElements.forEach((heading) => {
            const id = heading.id;
            const text = heading.textContent || '';
            const level = parseInt(heading.tagName.substring(1));

            if (id && text) {
                tocItems.push({ id, text, level });
            }
        });

        setHeadings(tocItems);

        // Intersection Observer for active section highlighting
        const observerOptions = {
            rootMargin: '-100px 0px -66%',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        headingElements.forEach((heading) => {
            observer.observe(heading);
        });

        return () => observer.disconnect();
    }, [content]);

    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -80;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    if (headings.length === 0) return null;

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
                aria-label="Toggle table of contents"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* TOC Sidebar */}
            <aside
                className={`
                    toc-scrollbar
                    fixed top-20 right-0 h-[calc(100vh-5rem)] w-64 
                    bg-background/95 backdrop-blur-sm border-l
                    overflow-y-auto z-40 transition-transform duration-300
                    ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
                `}
            >
                <div className="p-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                        On This Page
                    </h3>
                    <nav>
                        <ul className="space-y-2.5">
                            {headings.map((heading) => (
                                <li
                                    key={heading.id}
                                    style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
                                >
                                    <button
                                        onClick={() => handleClick(heading.id)}
                                        className={`
                                            text-sm text-left w-full transition-colors
                                            hover:text-primary
                                            ${activeId === heading.id
                                                ? 'text-primary font-medium border-l-2 border-primary pl-3 -ml-3'
                                                : 'text-muted-foreground'
                                            }
                                        `}
                                    >
                                        {heading.text}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
}
