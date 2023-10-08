'use server';

import { db } from '../lib/firebase';
import { collection, deleteDoc, doc } from 'firebase/firestore';

import { revalidatePath } from 'next/cache';

const sitesCollectonRef = collection(db, 'sites');
export default async function deleteSite(siteId) {
    try {
        await deleteDoc(doc(sitesCollectonRef, siteId));
        revalidatePath('/sites');
    } catch {
        return false;
    }

    return true;
}   