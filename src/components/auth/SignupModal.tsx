"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chrome } from "lucide-react";
import { useRouter } from "next/navigation";

interface SignupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

export function SignupModal({ isOpen, onClose, onSwitchToLogin }: SignupModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { signUp, signInWithGoogle } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            await signUp(email, password, name);
            onClose();
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            router.push("/resources"); // Strict redirect to Dashboard
        } catch (err: any) {
            setError(err.message || "Failed to create account");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setError("");
        setLoading(true);

        try {
            await signInWithGoogle(); // Signup acts as login if user exists (standard behavior)
            onClose();
            router.push("/resources"); // Strict redirect to Dashboard
        } catch (err: any) {
            setError(err.message || "Failed to sign up with Google");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] duration-500 data-[state=open]:duration-500">
                <DialogHeader>
                    <DialogTitle>Create an account</DialogTitle>
                    <DialogDescription>
                        Join Galaxleaf to access premium features
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                    {error && (
                        <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={loading}
                            autoComplete="off"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                            id="signup-email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            autoComplete="off"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                            id="signup-password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={loading}
                            autoComplete="new-password"
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Creating account..." : "Create Account"}
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleGoogleSignUp}
                        disabled={loading}
                    >
                        <Chrome className="mr-2 h-4 w-4" />
                        Google
                    </Button>

                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={onSwitchToLogin}
                            className="text-primary hover:underline"
                            disabled={loading}
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
