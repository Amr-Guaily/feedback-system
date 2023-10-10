"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { createUser } from "@/utils/db.js";
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
    async function handleLogin(provider) {
        setLoading(true);
        try {
            const res = await signInWithPopup(auth, provider);
            const userData = formatUserData(res.user);
            setUser(userData);

            // Create user record in the background without waiting..
            createUser(userData).then(() => {
                console.log("User record created successfully.");
            });

        } catch (err) {
            console.log(`Faild login:${err.message}`);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const userData = formatUserData(user);
                setUser(userData);
                handleToken();
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const api = {
        loginWithGithub: () => {
            handleLogin(GithubProvider);
        },
        loginWithGoogle: () => {
            handleLogin(GoogleProvider);
        },
        signout: () => {
            signOut(auth).then(() => {
                router.replace("/");
                cookie.remove('userToken');
            }).catch((err) => {
                console.log(err.message);
            });
        }
    };

    return <AuthAPIContext.Provider value={api}>
        <AuthDataContext.Provider value={{ user, loading }}>
            {children}
        </AuthDataContext.Provider>
    </AuthAPIContext.Provider>;
};

export const useAuthData = () => useContext(AuthDataContext);
export const useAuthAPI = () => useContext(AuthAPIContext);