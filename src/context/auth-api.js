"use client";

import { useContext, createContext, useState, useEffect, useMemo } from "react";
import { useRouter } from 'next/navigation';

import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { createUser, getUser } from "@/lib/db.js";
import { auth } from '../lib/firebase';

import cookie from 'js-cookie';

// LOGIN PROVIDERS
const GithubProvider = new GithubAuthProvider();
const GoogleProvider = new GoogleAuthProvider();

const AuthDataContext = createContext({ user: null, loading: false });
const AuthAPIContext = createContext({
    loginWithGithub: () => { },
    loginWithGoogle: () => { },
    signout: () => { }
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    function formatUserData(data) {
        return {
            uid: data.uid,
            email: data?.email,
            name: data?.displayName,
            photoUrl: data?.photoURL,
            provider: data.providerData[0].providerId
        };
    }
    async function handleToken() {
        try {
            const idToken = await auth.currentUser.getIdToken(true);
            cookie.set('userToken', idToken, {
                path: '/',
                expires: 1,
                secure: true,
                sameSite: true,
            });
        } catch (err) {
            console.log(err.message);
        }
    }
    async function handleLogin(res) {
        const { result, error } = await createUser(formatUserData(res.user));
        handleToken();
        if (error) {
            console.log(`Success Login, but Faild to save user data in firestore: ${error.message}`);
            return;
        }
        setUser(result);
        setLoading(false);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user && cookie.get('userToken')) {
                const { result, error } = await getUser(user.uid);
                if (error) console.log(`Failed to retrive user data from firestore:${error.message}`);
                setUser(result);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const api = useMemo(() => {
        const loginWithGithub = () => {
            setLoading(true);
            signInWithPopup(auth, GithubProvider)
                .then((res) => handleLogin(res))
                .catch((err) => {
                    console.log(`Faild login:${err.message}`);
                });
        };

        const loginWithGoogle = () => {
            setLoading(true);
            signInWithPopup(auth, GoogleProvider)
                .then((res) => handleLogin(res))
                .catch((err) => {
                    console.log(`Faild login:${err.message}`);
                });
        };

        const signout = () => {
            signOut(auth).then(() => {
                router.replace("/");
                cookie.remove('userToken');
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