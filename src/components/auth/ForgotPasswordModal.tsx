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

interface ForgotPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

export function ForgotPasswordModal({ isOpen, onClose, onSwitchToLogin }: ForgotPasswordModalProps) {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            await resetPassword(email);
            setMessage("Password reset email sent! Check your inbox.");
        } catch (err: any) {
            console.error("Reset password error:", err);
            if (err.code === 'auth/user-not-found') {
                setError("No account found with this email.");
            } else {
                setError("Failed to send reset email. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] duration-500 data-[state=open]:duration-500">
                <DialogHeader>
                    <DialogTitle>Reset Password</DialogTitle>
                    <DialogDescription>
                        Enter your email to receive a password reset link.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                    {error && (
                        <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="p-3 text-sm text-green-600 bg-green-50 rounded-md dark:bg-green-900/20 dark:text-green-400">
                            {message}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="reset-email">Email</Label>
                        <Input
                            id="reset-email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading || !!message}
                            autoComplete="email"
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading || !!message}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </Button>

                    <div className="text-center text-sm">
                        Remembered it?{" "}
                        <button
                            type="button"
                            onClick={onSwitchToLogin}
                            className="text-primary hover:underline"
                            disabled={loading}
                        >
                            Back to Sign In
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
