"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
}

export function ParticlesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Create particles (lightweight - only 30 particles)
        const particleCount = 30;
        const particles: Particle[] = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5, // Slow movement
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1, // Small particles (1-3px)
                opacity: Math.random() * 0.3 + 0.1, // Subtle (0.1-0.4)
            });
        }

        // Get theme color
        const getParticleColor = () => {
            const isDark = document.documentElement.classList.contains("dark");
            return isDark ? "255, 255, 255" : "0, 0, 0";
        };

        // Animation loop
        let animationFrameId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const color = getParticleColor();

            particles.forEach((particle) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color}, ${particle.opacity})`;
                ctx.fill();
            });

            // Draw connections (only between nearby particles)
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach((p2) => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Only connect if close (max 150px)
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        // Fade line based on distance
                        const opacity = (1 - distance / 150) * 0.15;
                        ctx.strokeStyle = `rgba(${color}, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.6 }} // Subtle overall opacity
        />
    );
}
