'use server';

import { db } from '../lib/firebase';
import { collection, setDoc, doc, Timestamp } from 'firebase/firestore';

import { revalidatePath } from 'next/cache';

import verifyUserToken from '@/utils/veriftUserToken';

const sitesCollectonRef = collection(db, 'sites');
export default async function addSite(formData) {
    const { uid, error } = await verifyUserToken();
    if (error) console.log("Invalid Token..");

    const name = formData.get('name'),
        url = formData.get('url');

    if (isExistUrl) {
        console.log("Site already exist");
        return;
    }

    const newSite = {
        authorId: uid,
        createdAt: Timestamp.now().toMillis(),
        name,
        url
    };

    try {
        await setDoc(doc(sitesCollectonRef), newSite, { merge: true });
        revalidatePath('/sites');
    } catch (err) {
        console.log(`Faild to save site in database: ${err.message}`);
    }
}
