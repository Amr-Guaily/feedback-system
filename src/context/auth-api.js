"use client";

import { useContext, createContext, useState, useEffect, useMemo } from "react";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../lib/firebase.js';

const AuthDataContext = createContext({ user: null, loading: true });
const AuthAPIContext = createContext({
    loginWithGithub: () => { },
    loginWithGoogle: () => { },
    signout: () => { }
});

// LOGIN PROVIDERS
const GithubProvider = new GithubAuthProvider();
const GoogleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function formatUserData(data) {
        return {
            uid: data.uid,
            email: data?.email,
            name: data?.displayName,
            photoUrl: data?.photoURL,
            provider: data.providerData[0].providerId
        };
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            user ? setUser(formatUserData(user)) : setUser(null);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const api = useMemo(() => {
        const loginWithGithub = () => {
            setLoading(true);
            signInWithPopup(auth, GithubProvider).then((res) => {
                const userData = formatUserData(res.user);
                setUser(userData);
            }).catch((err) => {
                console.log(err.message);
            });
        };

        const loginWithGoogle = () => {
            setLoading(true);
            signInWithPopup(auth, GoogleProvider).then((res) => {
                const userData = formatUserData(res.user);
                setUser(userData);
            }).catch((err) => {
                console.log(err.message);
            });
        };

        const signout = () => {
            signOut(auth).then(() => {
                console.log("Successed...");
            }).catch((err) => {
                console.log(err.message);
            });
        };

        return { loginWithGithub, loginWithGoogle, signout };
    }, []);

    return <AuthAPIContext.Provider value={api}>
        <AuthDataContext.Provider value={{ user, loading }}>
            {children}
        </AuthDataContext.Provider>
    </AuthAPIContext.Provider>;
};

export const useAuthData = () => useContext(AuthDataContext);
export const useAuthAPI = () => useContext(AuthAPIContext);