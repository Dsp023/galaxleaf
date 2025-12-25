"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, User, Lock, LogOut, ArrowLeft } from "lucide-react";

export default function ProfilePage() {
    const { user, loading, logout, updateUserProfile, updateUserPassword, updateUserAvatar, userAvatar } = useAuth();
    const router = useRouter();

    // State for Profile Update
    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [profileMessage, setProfileMessage] = useState("");

    // State for Password Update
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState("");

    // Initialize state with user data
    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || "");
            setPhotoURL(userAvatar || user.photoURL || "");
        }
    }, [user, userAvatar]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdatingProfile(true);
        setProfileMessage("");
        try {
            // Update Display Name in Firebase
            await updateUserProfile({ displayName });

            // Update Avatar in Local Storage (via Context)
            if (photoURL && photoURL.startsWith("data:")) {
                updateUserAvatar(photoURL);
            } else if (!photoURL) {
                updateUserAvatar(null);
            }

            setProfileMessage("Profile updated successfully!");
        } catch (error: any) {
            setProfileMessage(`Error: ${error.message}`);
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setPasswordMessage("Passwords do not match");
            return;
        }
        if (newPassword.length < 6) {
            setPasswordMessage("Password must be at least 6 characters");
            return;
        }

        setIsUpdatingPassword(true);
        setPasswordMessage("");
        try {
            await updateUserPassword(newPassword);
            setPasswordMessage("Password updated successfully!");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            setPasswordMessage(`Error: ${error.message}`);
            // Note: Firebase requires recent login for password changes.
            if (error.code === 'auth/requires-recent-login') {
                setPasswordMessage("Security: Please log out and sign in again to change password.");
            }
        } finally {
            setIsUpdatingPassword(false);
        }
    };

    if (loading) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    if (!user) return null;

    return (
        <div className="container max-w-4xl mx-auto py-10 px-4 space-y-8">
            <Button variant="ghost" onClick={() => router.push("/resources")} className="mb-4 pl-0 hover:pl-2 transition-all">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>

            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
                    <p className="text-muted-foreground">Manage your profile and security preferences.</p>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">

                {/* User Card */}
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center text-center space-y-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user.photoURL || undefined} />
                            <AvatarFallback className="text-2xl">{user.displayName?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium text-lg">{user.displayName || "User"}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <Button variant="destructive" className="w-full" onClick={logout}>
                            <LogOut className="mr-2 h-4 w-4" /> Log Out
                        </Button>
                    </CardContent>
                </Card>

                {/* Settings Forms */}
                <div className="md:col-span-2 space-y-6">

                    {/* Public Profile Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Public Profile</CardTitle>
                            <CardDescription>Update how others see you on the platform.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                <div className="flex flex-col items-center gap-4 mb-4">
                                    <Avatar className="h-24 w-24 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => document.getElementById('avatar-upload')?.click()}>
                                        <AvatarImage src={photoURL || user.photoURL || undefined} />
                                        <AvatarFallback className="text-2xl">{displayName?.charAt(0) || user.displayName?.charAt(0) || "U"}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col items-center">
                                        <Label htmlFor="avatar-upload" className="cursor-pointer text-sm text-primary hover:underline">
                                            Change Avatar
                                        </Label>
                                        <Input
                                            id="avatar-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setPhotoURL(reader.result as string);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">Click image to upload (max 1MB recommended)</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="displayName">Display Name</Label>
                                    <Input
                                        id="displayName"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        placeholder="Your Name"
                                    />
                                </div>

                                {profileMessage && (
                                    <p className={`text-sm ${profileMessage.includes("Error") ? "text-destructive" : "text-green-500"}`}>
                                        {profileMessage}
                                    </p>
                                )}
                                <Button type="submit" disabled={isUpdatingProfile}>
                                    {isUpdatingProfile && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Changes
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Security Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Security</CardTitle>
                            <CardDescription>Secure your account with a strong password.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleUpdatePassword} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        autoComplete="new-password"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        autoComplete="new-password"
                                    />
                                </div>
                                {passwordMessage && (
                                    <p className={`text-sm ${passwordMessage.includes("Error") || passwordMessage.includes("Security:") ? "text-destructive" : "text-green-500"}`}>
                                        {passwordMessage}
                                    </p>
                                )}
                                <Button type="submit" disabled={isUpdatingPassword}>
                                    {isUpdatingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Update Password
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}
