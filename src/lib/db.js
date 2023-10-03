import { db } from "./firebase";
import { collection, setDoc, getDoc, doc } from "firebase/firestore";

// Collections Refs
export const usersCollectionRef = collection(db, 'users');

export async function createUser(data) {
    const userData = {
        ...data,
        stripRole: "free",
        stripeId: "54654",
        status: "active"
    };

    let result, error;
    try {
        await setDoc(doc(usersCollectionRef, data.uid), userData, { merge: true });
        result = userData;
    } catch (err) {
        error = err;
    }

    return { result, error };
}

export async function getUser(id) {
    const docRef = doc(usersCollectionRef, id);

    let result, error;
    try {
        const docSanp = await getDoc(docRef);
        if (docSanp.exists()) result = docSanp.data();
    } catch (err) {
        error = err;
    }

    return { result, error };
}