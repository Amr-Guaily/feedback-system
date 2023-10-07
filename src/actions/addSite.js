'use server';

import { db } from '../lib/firebase';
import { collection, setDoc, doc } from 'firebase/firestore';

import { revalidatePath } from 'next/cache';

import verifyUserToken from '@/utils/veriftUserToken';

export default async function addSite(formData) {
    const sitesCollectonRef = collection(db, 'sites');

    const { uid, error } = await verifyUserToken();

    if (error) console.log("Invalid Token..");

    const newSite = {
        authorId: uid,
        createdAt: new Date().toDateString(),
        name: formData.get('name'),
        url: formData.get('url')
    };

    try {
        await setDoc(doc(sitesCollectonRef), newSite, { merge: true });
        revalidatePath('/sites');
    } catch (err) {
        console.log(`Faild to save site in database: ${err.message}`);
    }
}