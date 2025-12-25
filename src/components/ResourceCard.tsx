import { Tool } from "@/data/resources";
import { ExternalLink, Book, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ResourceCard({ resource }: { resource: Tool }) {
    const isInternal = resource.url?.startsWith("/");
    const isConcept = resource.type === "Concept";

    const CardContent = (
        <div className="group relative flex flex-col justify-between h-full rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/50">
            <div className="p-6">
                {!isInternal && (
                    <ExternalLink className="absolute top-6 right-6 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
                {isInternal && (
                    <ArrowRight className="absolute top-6 right-6 h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" />
                )}

                <div className="flex items-center gap-3 mt-2">
                    {/* Icon Logic */}
                    <div className={cn(
                        "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border p-2 transition-colors",
                        isConcept ? "bg-primary/10 border-primary/20 text-primary" : "bg-secondary/50"
                    )}>
                        {resource.icon ? (
                            <span className="text-xl">{resource.icon}</span>
                        ) : isConcept ? (
                            <Book className="h-5 w-5" />
                        ) : resource.iconUrl || (resource.url && resource.url.startsWith('http')) ? (
                            <img
                                src={`https://www.google.com/s2/favicons?domain=${new URL(resource.iconUrl || resource.url!).hostname}&sz=128`}
                                alt={resource.name}
                                className="h-5 w-5 object-contain"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        ) : (
                            <span className="text-xs font-bold">{resource.name.substring(0, 2)}</span>
                        )}
                    </div>

                    <h3 className="text-lg font-semibold tracking-tight text-foreground line-clamp-1">
                        {resource.name}
                    </h3>
                </div>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {resource.description}
                </p>
            </div>
        </div>
    );

    if (isInternal && resource.url) {
        return (
            <Link href={resource.url} className="block h-full">
                {CardContent}
            </Link>
        );
    }

    return (
        <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
        >
            {CardContent}
        </a>
    );
}
