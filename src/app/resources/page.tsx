"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

import { ResourceCard } from "@/components/ResourceCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { AuthButton } from "@/components/auth/AuthButton";
import { Search, ExternalLink, Leaf, Github } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ResourcesPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    // STRICT PROTECTION: Redirect to home If not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.push("/");
        }
    }, [user, loading, router]);

    if (loading) return null; // or a loading spinner
    if (!user) return null; // Prevent flash of content

    const [resources, setResources] = useState<any[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/resources');
                const data = await res.json();
                setResources(data);
            } catch (error) {
                console.error("Failed to fetch resources:", error);
            } finally {
                setIsLoadingData(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    // Group flat resources back into Domain -> Category hierarchy
    const groupedStack = resources.reduce((acc: any[], resource: any) => {
        let domain = acc.find(d => d.name === resource.domain);
        if (!domain) {
            domain = { name: resource.domain, description: "", categories: [] };
            acc.push(domain);
        }

        let category = domain.categories.find((c: any) => c.name === resource.category);
        if (!category) {
            category = { name: resource.category, tools: [] };
            domain.categories.push(category);
        }

        category.tools.push(resource);
        return acc;
    }, []);

    // Filter logic for deep hierarchy (Client-side for now to preserve UI structure)
    const filteredStack = groupedStack.map(domain => {
        const matchingCategories = domain.categories.map((cat: any) => {
            const matchingTools = cat.tools.filter((tool: any) =>
                tool.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return { ...cat, tools: matchingTools };
        }).filter((cat: any) => cat.tools.length > 0);

        return { ...domain, categories: matchingCategories };
    }).filter(domain => domain.categories.length > 0);

    return (
        <div className="min-h-screen bg-background font-sans antialiased text-foreground">
            <div className="border-b sticky top-0 z-50 bg-background/30 backdrop-blur-xl supports-[backdrop-filter]:bg-background/30">
                <div className="container flex h-16 items-center px-4 md:px-6">
                    <div className="mr-4 hidden md:flex">
                        <a className="mr-6 flex items-center space-x-2 text-2xl font-bold" href="/">
                            <Leaf className="h-6 w-6 text-primary" />
                            <span>Galaxleaf</span>
                        </a>
                    </div>
                    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                        <div className="w-full flex-1 md:w-auto md:flex-none">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    className="pl-9 h-9 w-[200px] lg:w-[300px]"
                                    placeholder="Search tools..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <div className="absolute top-full mt-2 w-[300px] lg:w-[400px] -right-0 md:right-0 md:left-auto bg-popover text-popover-foreground rounded-md border shadow-md p-2 z-50 max-h-[400px] overflow-y-auto">
                                        {filteredStack.some(d => d.categories.length > 0) ? (
                                            <div className="space-y-4">
                                                {filteredStack.map((domain: any) => (
                                                    domain.categories.map((category: any) => (
                                                        category.tools.map((tool: any) => {
                                                            const isInternal = tool.url?.startsWith("/");
                                                            const isConcept = tool.type === "Concept";
                                                            const ItemContent = (
                                                                <>
                                                                    <div className={cn(
                                                                        "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-md border p-1",
                                                                        isConcept ? "bg-primary/10 text-primary border-primary/20" : "bg-background"
                                                                    )}>
                                                                        {tool.icon ? (
                                                                            <span className="text-sm">{tool.icon}</span>
                                                                        ) : isConcept ? (
                                                                            <Leaf className="h-4 w-4" />
                                                                        ) : tool.url && tool.url.startsWith('http') ? (
                                                                            <img
                                                                                src={`https://www.google.com/s2/favicons?domain=${new URL(tool.url).hostname}&sz=64`}
                                                                                alt={tool.name}
                                                                                className="h-4 w-4 object-contain"
                                                                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                                            />
                                                                        ) : <span className="text-[10px] font-bold">{tool.name.substring(0, 2)}</span>}
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <span className="text-sm font-medium">{tool.name}</span>
                                                                        <span className="text-xs text-muted-foreground line-clamp-1">{tool.description}</span>
                                                                    </div>
                                                                </>
                                                            );

                                                            return isInternal ? (
                                                                <Link
                                                                    key={tool.name}
                                                                    href={tool.url}
                                                                    className="flex items-center gap-3 p-2 rounded-sm hover:bg-muted transition-colors w-full"
                                                                >
                                                                    {ItemContent}
                                                                </Link>
                                                            ) : (
                                                                <a
                                                                    key={tool.name}
                                                                    href={tool.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center gap-3 p-2 rounded-sm hover:bg-muted transition-colors w-full"
                                                                >
                                                                    {ItemContent}
                                                                </a>
                                                            );
                                                        })
                                                    ))
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="p-4 text-center text-sm text-muted-foreground">
                                                No results found.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <nav className="flex items-center space-x-4">
                            <Button variant="ghost" size="icon">
                                <Github className="h-5 w-5" />
                            </Button>
                            <ModeToggle />
                            <AuthButton />
                        </nav>
                    </div>
                </div>
            </div>

            <main className="container px-4 py-12 md:px-6 max-w-6xl mx-auto space-y-24">

                {/* Header */}
                <section className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">

                    <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                        Explore the <span className="text-primary">Ultimate Tech Stack</span>
                    </h1>
                    <p className="max-w-[700px] text-lg text-muted-foreground">
                        Browse our curated collection of tools across AI, Frontend, Backend, and more.
                    </p>
                </section>

                {/* Tech Stack Grid - ALWAYS SHOW ALL */}
                <div className="grid gap-12">
                    {filteredStack.map((domain: any) => (
                        <section key={domain.name} id={domain.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}>
                            <div className="flex flex-col gap-2 mb-8 border-b pb-4">
                                <h2 className="text-3xl font-bold tracking-tight">{domain.name}</h2>
                                <p className="text-muted-foreground text-lg">{domain.description}</p>
                            </div>

                            <div className="space-y-12">
                                {domain.categories.map((category: any) => (
                                    <div key={category.name}>
                                        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-primary/80">
                                            {category.name}
                                        </h3>
                                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                            {category.tools.map((tool: any) => (
                                                <ResourceCard
                                                    key={tool.name}
                                                    resource={tool}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

            </main>
        </div>
    );
}
