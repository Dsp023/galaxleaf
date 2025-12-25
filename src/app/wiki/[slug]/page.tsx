import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { Metadata } from "next";
import { WikiContent } from "@/components/WikiContent";
import { TableOfContents } from "@/components/TableOfContents";
import { ReadingProgress } from "@/components/ReadingProgress";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

// Get the doc content directory
const docsDirectory = path.join(process.cwd(), "src/content/docs");

// Function to get doc data
async function getDocData(slug: string) {
    try {
        const fullPath = path.join(docsDirectory, `${slug}.md`);

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        // Convert markdown to HTML with enhanced features
        const processedContent = await unified()
            .use(remarkParse)
            .use(remarkGfm) // GitHub Flavored Markdown (tables, task lists, etc.)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeSlug)
            .use(rehypeAutolinkHeadings, {
                behavior: "wrap",
                properties: { className: ["anchor"] },
            })
            .use(rehypePrism, {
                showLineNumbers: true,
                ignoreMissing: true,
            })
            .use(rehypeStringify, { allowDangerousHtml: true })
            .process(content);

        const contentHtml = processedContent.toString();

        // Calculate reading time (average 200 words per minute)
        const wordCount = content.split(/\s+/).length;
        const readingTimeMinutes = Math.ceil(wordCount / 200);

        return {
            slug,
            contentHtml,
            title: data.title || slug,
            readingTime: readingTimeMinutes,
            ...data,
        };
    } catch (error) {
        console.error("Error reading doc:", error);
        return null;
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const doc = await getDocData(slug);

    if (!doc) {
        return {
            title: "Not Found",
        };
    }

    return {
        title: `${doc.title} | Galaxleaf`,
        description: `Learn about ${doc.title}`,
    };
}

export default async function WikiPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const doc = await getDocData(slug);

    if (!doc) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Reading Progress Bar */}
            <ReadingProgress />

            {/* Navbar */}
            <div className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-xl">
                <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-6xl mx-auto">
                    <div className="flex items-center gap-2">
                        <a href="/" className="text-xl font-bold hover:text-primary transition-colors">
                            Galaxleaf
                        </a>
                        <span className="text-muted-foreground">/</span>
                        <a href="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
                            resources
                        </a>
                        <span className="text-muted-foreground">/</span>
                        <span className="text-foreground font-medium">{doc.title}</span>
                    </div>

                </div>
            </div>

            {/* Table of Contents */}
            <TableOfContents content={doc.contentHtml} />

            {/* Content - adjusted for TOC sidebar */}
            <main className="container px-4 py-8 md:px-6 max-w-4xl mx-auto lg:pr-72">
                <div className="bg-background text-foreground">
                    <WikiContent html={doc.contentHtml} />
                </div>
            </main>
        </div>
    );
}
