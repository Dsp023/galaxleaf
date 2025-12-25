"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { AuthButton } from "@/components/auth/AuthButton";
import { Leaf, Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/auth/LoginModal";
import { SignupModal } from "@/components/auth/SignupModal";
import { useRouter } from "next/navigation";
import { ParticlesBackground } from "@/components/ParticlesBackground";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Strict Redirect: If user is logged in, they should arguably be at /resources already,
  // but if they land here, "Get Started" takes them to dashboard.
  const handleGetStarted = () => {
    if (user) {
      router.push("/resources");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground flex flex-col relative">
      {/* Particle Animation Background */}
      <ParticlesBackground />

      {/* Auth Modals */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />

      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />

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
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
              <ModeToggle />
              <AuthButton />
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
            <Button variant="outline" size="lg" className="h-12 px-8 text-lg" onClick={() => window.open('https://github.com', '_blank')}>
              View on GitHub
            </Button>
          </div>

        </section>
      </main>
    </div>
  );
}
