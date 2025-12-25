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
import { getAdditionalUserInfo } from "firebase/auth";
import { useRouter } from "next/navigation";

import { ForgotPasswordModal } from "./ForgotPasswordModal";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToSignup: () => void;
}

export function LoginModal({ isOpen, onClose, onSwitchToSignup }: LoginModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const { signIn, signInWithGoogle } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signIn(email, password);
            onClose();
            setEmail("");
            setPassword("");
            router.push("/resources"); // Strict redirect to Dashboard
        } catch (err: any) {
            console.error("Login error:", err);
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError("Invalid email or password. If you don't have an account, please sign up.");
            } else if (err.code === 'auth/too-many-requests') {
                setError("Too many failed attempts. Please try again later.");
            } else {
                setError("Failed to sign in. Please check your connection.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError("");
        setLoading(true);

        try {
            const result = await signInWithGoogle();
            const additionalUserInfo = getAdditionalUserInfo(result);

            // STRICT CHECK: Reject new users on Login form
            if (additionalUserInfo?.isNewUser) {
                await result.user.delete(); // Delete the just-created account
                setError("Account does not exist. Please sign up first.");
                setEmail("");
                setPassword("");
            } else {
                onClose();
                router.push("/resources"); // Strict redirect to Dashboard
            }
        } catch (err: any) {
            if (err.code === 'auth/popup-closed-by-user') {
                setError("Sign in cancelled");
            } else {
                setError(err.message || "Failed to sign in with Google");
            }
        } finally {
            setLoading(false);
        }
    };

    // ...
    // ...

    if (showForgotPassword) {
        return (
            <ForgotPasswordModal
                isOpen={true}
                onClose={onClose}
                onSwitchToLogin={() => setShowForgotPassword(false)}
            />
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] duration-500 data-[state=open]:duration-500">
                <DialogHeader>
                    <DialogTitle>Welcome back</DialogTitle>
                    <DialogDescription>
                        Sign in to your Galaxleaf account
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                    {/* ... (error display) ... */}
                    {error && (
                        <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
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
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <button
                                type="button"
                                onClick={() => setShowForgotPassword(true)}
                                className="text-xs text-primary hover:underline"
                                tabIndex={-1}
                            >
                                Forgot password?
                            </button>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            autoComplete="new-password"
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
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
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                    >
                        <Chrome className="mr-2 h-4 w-4" />
                        Google
                    </Button>

                    <div className="text-center text-sm">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={onSwitchToSignup}
                            className="text-primary hover:underline"
                            disabled={loading}
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
