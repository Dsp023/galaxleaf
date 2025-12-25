"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Leaf, Github, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ParticlesBackground } from "@/components/ParticlesBackground";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/resources");
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground flex flex-col relative">
      {/* Particle Animation Background */}
      <ParticlesBackground />

      {/* Navbar */}
      <div className="border-b sticky top-0 z-50 bg-background/30 backdrop-blur-xl supports-[backdrop-filter]:bg-background/30 relative">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2 text-2xl font-bold" href="/">
              <Leaf className="h-6 w-6 text-primary" />
              <span>Galaxleaf</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-2">
              <a href="https://github.com/Dsp023/galaxleaf" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5" />
                </Button>
              </a>
              <ModeToggle />
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center relative z-10">
        <section className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8 pb-32">

          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
            <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
              🚀 The Ultimate Tech Stack Explorer
            </div>
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Build your <br /> <span className="text-primary">next big thing</span>.
            </h1>
            <p className="max-w-[700px] text-xl text-muted-foreground md:text-2xl leading-relaxed">
              A curated, comprehensive catalog of the world's best engineering tools. From AI to DevOps, find exactly what you need.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg" className="h-12 px-8 text-lg gap-2" onClick={handleGetStarted}>
              Get Started <ArrowRight className="h-5 w-5" />
            </Button>
            <a href="https://github.com/Dsp023/galaxleaf" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
                View on GitHub
              </Button>
            </a>
          </div>

        </section>
      </main>
    </div >
  );
}
