"use client";

import { useContext, createContext, useState, useEffect, useMemo } from "react";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

import { useRouter } from 'next/navigation';

import { auth } from '../lib/firebase.js';
import { createUser, getUser } from "@/lib/db.js";

// LOGIN PROVIDERS
const GithubProvider = new GithubAuthProvider();
const GoogleProvider = new GoogleAuthProvider();

const AuthDataContext = createContext({ user: null, loading: true });
const AuthAPIContext = createContext({
    loginWithGithub: () => { },
    loginWithGoogle: () => { },
    signout: () => { }
});

export const AuthProvider = ({ children }) => {
    const router = useRouter();
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
    async function loginHandler(res) {
        // Save user-data to firestore
        const { result, error } = await createUser(formatUserData(res.user));
        if (error) {
            console.log(`Success Login, but Faild to save user data in firestore: ${error.message}`);
            return;
        }
        setUser(result);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            const { result, error } = await getUser(user.uid);
            if (error) console.log(`Failed to retrive user data from firestore:${error.message}`);
            setUser(result || null);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const api = useMemo(() => {
        const loginWithGithub = () => {
            setLoading(true);
            signInWithPopup(auth, GithubProvider)
                .then((res) => loginHandler(res))
                .catch((err) => {
                    console.log(`Faild login:${err.message}`);
                });
        };

        const loginWithGoogle = () => {
            setLoading(true);
            signInWithPopup(auth, GoogleProvider)
                .then((res) => loginHandler(res))
                .catch((err) => {
                    console.log(`Faild login:${err.message}`);
                });
        };

        const signout = () => {
            signOut(auth).then(() => {
                router.replace("/");
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