"use client";

import { useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";
import { createRoot } from "react-dom/client";
import { useState } from "react";

// Separate component for the header to use React state/icons easily
const CodeBlockHeader = ({ language, code, preElement }: { language: string, code: string, preElement: HTMLPreElement }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] text-xs text-[#b4b4b4] select-none rounded-t-md font-sans border-b border-[#ffffff1a]">
            <span className="font-semibold uppercase tracking-wider text-[11px] font-mono">
                {language || 'text'}
            </span>
            <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 hover:text-white transition-colors focus:outline-none"
            >
                {copied ? (
                    <>
                        <Check size={14} className="text-emerald-400" />
                        <span>Copied!</span>
                    </>
                ) : (
                    <>
                        <Copy size={14} />
                        <span>Copy code</span>
                    </>
                )}
            </button>
        </div>
    );
};

export function WikiContent({ html }: { html: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const processedRef = useRef(new Set<HTMLPreElement>());

    useEffect(() => {
        if (!containerRef.current) return;

        const preElements = containerRef.current.querySelectorAll('pre');

        preElements.forEach((pre) => {
            if (processedRef.current.has(pre)) return;
            // Also check if already wrapped (double safety)
            if (pre.parentElement?.className.includes('code-wrapper-v2')) return;

            // Get language
            const codeClass = pre.querySelector('code')?.className || '';
            const languageMatch = codeClass.match(/language-(\w+)/);
            const language = languageMatch ? languageMatch[1] : '';

            // Get raw code content
            const codeContent = pre.querySelector('code')?.textContent || '';

            // Create container for the whole block
            const wrapper = document.createElement('div');
            wrapper.className = 'code-wrapper-v2 my-6 rounded-md overflow-hidden bg-[#1e1e1e] border border-[#ffffff1a] shadow-sm';

            // Create container for the React header
            const headerContainer = document.createElement('div');
            wrapper.appendChild(headerContainer);

            // Insert wrapper before pre
            pre.parentNode?.insertBefore(wrapper, pre);

            // Move pre inside wrapper
            wrapper.appendChild(pre);

            // Style the pre to fit perfectly
            pre.style.margin = '0';
            pre.style.borderRadius = '0 0 6px 6px'; // Rounded bottom only
            pre.style.background = '#1e1e1e'; // Match wrapper background

            // Render the React header
            const root = createRoot(headerContainer);
            root.render(<CodeBlockHeader language={language} code={codeContent} preElement={pre} />);

            processedRef.current.add(pre);
        });

    }, [html]);

    return (
        <div ref={containerRef} className="wiki-content">
            <style jsx global>{`
                .wiki-content {
                    font-family: Söhne, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif;
                }
                
                /* Headings */
                .wiki-content h1 {
                    font-size: 2.5rem;
                    font-weight: 700;
                    letter-spacing: -0.025em;
                    margin-top: 2.5rem;
                    margin-bottom: 1.5rem;
                    line-height: 1.2;
                }
                .wiki-content h2 {
                    font-size: 1.75rem;
                    font-weight: 600;
                    letter-spacing: -0.015em;
                    margin-top: 3rem;
                    margin-bottom: 1.25rem;
                    border-bottom: 1px solid hsl(var(--border) / 0.5);
                    padding-bottom: 0.5rem;
                }
                .wiki-content h3 {
                    font-size: 1.4rem;
                    font-weight: 600;
                    margin-top: 2.5rem;
                    margin-bottom: 1rem;
                }

                /* Text */
                .wiki-content p {
                    line-height: 1.75;
                    margin-bottom: 1.25rem;
                    color: hsl(var(--foreground) / 0.9);
                    font-size: 1rem;
                }

                /* Links */
                .wiki-content a {
                    color: hsl(var(--primary));
                    text-decoration: none;
                }
                .wiki-content a:hover {
                    text-decoration: underline;
                }

                /* Lists */
                .wiki-content ul {
                    list-style-type: disc;
                    padding-left: 1.5rem;
                    margin-bottom: 1.25rem;
                }
                .wiki-content ol {
                    list-style-type: decimal;
                    padding-left: 1.5rem;
                    margin-bottom: 1.25rem;
                }
                .wiki-content li {
                    margin-bottom: 0.5rem;
                    padding-left: 0.25rem;
                }

                /* Code Blocks (Prism overrides) */
                code[class*="language-"],
                pre[class*="language-"] {
                    color: #d4d4d4;
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
                    font-size: 14px;
                    line-height: 1.5;
                    direction: ltr;
                    text-align: left;
                    white-space: pre;
                    word-spacing: normal;
                    word-break: normal;
                    tab-size: 4;
                    hyphens: none;
                    background: transparent !important;
                    text-shadow: none !important;
                }

                /* Line numbers */
                .line-numbers .line-numbers-rows {
                    border-right: 1px solid #404040;
                }
                
                /* Inline Code */
                .wiki-content :not(pre) > code {
                    background-color: hsl(var(--muted));
                    color: hsl(var(--foreground));
                    padding: 0.2em 0.4em;
                    border-radius: 0.25rem;
                    font-size: 0.875em;
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                    font-weight: 500;
                }
                
                /* Tables */
                .wiki-content table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 2rem 0;
                    font-size: 0.95rem;
                }
                .wiki-content th {
                    text-align: left;
                    padding: 0.75rem 1rem;
                    border-bottom: 1px solid hsl(var(--border));
                    font-weight: 600;
                    background-color: hsl(var(--muted) / 0.4);
                }
                .wiki-content td {
                    padding: 0.75rem 1rem;
                    border-bottom: 1px solid hsl(var(--border) / 0.5);
                }
                
                /* Blockquotes */
                .wiki-content blockquote {
                    border-left: 4px solid hsl(var(--primary));
                    padding-left: 1rem;
                    margin: 1.5rem 0;
                    font-style: italic;
                    color: hsl(var(--muted-foreground));
                }
            `}</style>
            <div dangerouslySetInnerHTML={{ __html: html }} className="prose-none" />
        </div>
    );
}
