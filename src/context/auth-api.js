"use client";

import { useContext, createContext, useState, useEffect, useMemo } from "react";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../lib/firebase.js';

const AuthDataContext = createContext({ user: null });
const AuthAPIContext = createContext({
    loginWithGithub: () => { },
    loginWithGoogle: () => { }
});

// LOGIN PROVIDERS
const GithubProvider = new GithubAuthProvider();
const GoogleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const api = useMemo(() => {
        const loginWithGithub = () => {
            signInWithPopup(auth, GithubProvider).then((res) => {
                const user = res.user;
                setUser(user);
            }).catch((err) => {
                console.log(err.message);
            });
        };

        const loginWithGoogle = () => {
            signInWithPopup(auth, GoogleProvider).then((res) => {
                const user = res.user;
                setUser(user);
            }).catch((err) => {
                console.log(err.message);
            });
        };

        return { loginWithGithub, loginWithGoogle };
    }, []);

    return <AuthAPIContext.Provider value={api}>
        <AuthDataContext.Provider value={user}>
            {!loading && children}
        </AuthDataContext.Provider>
    </AuthAPIContext.Provider>;
};

export const useAuthData = () => useContext(AuthDataContext);
export const useAuthAPI = () => useContext(AuthAPIContext);