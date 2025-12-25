"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setProgress(scrollPercent);
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress();

        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div
            className="fixed top-16 left-0 h-1 bg-primary transition-all duration-150 z-50"
            style={{ width: `${progress}%` }}
        />
    );
}
