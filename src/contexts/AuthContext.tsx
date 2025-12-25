"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    updatePassword,
    getAdditionalUserInfo,
    sendPasswordResetEmail,
    UserCredential
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    userAvatar: string | null;
    loading: boolean;
    signUp: (email: string, password: string, displayName: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<UserCredential>;
    logout: () => Promise<void>;
    updateUserPassword: (password: string) => Promise<void>;
    updateUserProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
    updateUserAvatar: (base64: string | null) => void;
    resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userAvatar, setUserAvatar] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (user) {
                // Check local storage for custom avatar
                const storedAvatar = localStorage.getItem(`galaxleaf_avatar_${user.uid}`);
                if (storedAvatar) {
                    setUserAvatar(storedAvatar);
                } else {
                    setUserAvatar(user.photoURL);
                }
            } else {
                setUserAvatar(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const updateUserAvatar = (base64: string | null) => {
        if (user) {
            if (base64) {
                localStorage.setItem(`galaxleaf_avatar_${user.uid}`, base64);
                setUserAvatar(base64);
            } else {
                localStorage.removeItem(`galaxleaf_avatar_${user.uid}`);
                setUserAvatar(user.photoURL);
            }
        }
    };

    const signUp = async (email: string, password: string, displayName: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Update display name
        if (userCredential.user) {
            await updateProfile(userCredential.user, { displayName });
            setUser({ ...userCredential.user, displayName } as User);
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            console.log("AuthContext: Attempting sign in with:", { email, hasPassword: !!password, authInitialized: !!auth });
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            console.error("AuthContext: Sign In Failed", error);
            // Re-throw so UI can handle specific codes like 'auth/invalid-credential'
            throw error;
        }
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        return await signInWithPopup(auth, provider);
    };

    const logout = async () => {
        await signOut(auth);
        router.push('/'); // Strict redirect to home on logout
    };

    const updateUserPassword = async (password: string) => {
        if (auth.currentUser) {
            await updatePassword(auth.currentUser, password);
        }
    };

    const updateUserProfile = async (data: { displayName?: string; photoURL?: string }) => {
        if (auth.currentUser) {
            await updateProfile(auth.currentUser, data);
            setUser({ ...auth.currentUser } as User); // Force state update
        }
    };

    const resetPassword = async (email: string) => {
        await sendPasswordResetEmail(auth, email);
    };

    const value = {
        user,
        userAvatar,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        logout,
        updateUserPassword,
        updateUserProfile,
        updateUserAvatar,
        resetPassword
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
