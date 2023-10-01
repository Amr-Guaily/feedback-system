import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { GetUsersResult, getAuth } from 'firebase-admin/auth';

if (!getApps().length) {
    initializeApp({
        credential: cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY
        }),
    });
}

getAuth()
    .getUser("Fm1tJrHkXuVoB8W51qBVN2TEASE3")
    .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log(userRecord.displayName);
    })
    .catch((error) => {
        console.log('Error fetching user data:', error);
    });