'use server';

import { cookies } from 'next/headers';

import { auth } from '../lib/firebase-admin';

export default async function verifyUserToken() {
    const userToken = cookies().get('userToken')?.value;

    let uid, error;
    try {
        uid = (await auth.verifyIdToken(userToken)).uid;
    } catch (err) {
        error = err.message;
    }

    return { uid, error };
}