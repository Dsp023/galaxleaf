"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "./LoginModal";
import { SignupModal } from "./SignupModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AuthButton() {
    const { user, logout, userAvatar } = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const router = useRouter();

    const getInitials = (name: string) => {
        return name
            ?.split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2) || "U";
    };

    const handleLogout = async () => {
        await logout();
        router.push("/"); // Ensure redirect to home
    };
    if (user) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={userAvatar || user.photoURL || undefined} alt={user.displayName || "User"} />
                            <AvatarFallback>{getInitials(user.displayName || "User")}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.displayName}</p>
                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/profile">
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/20">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <>
            <Button onClick={() => setShowLogin(true)} variant="default" size="sm">
                Sign In
            </Button>

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
        </>
    );
}
