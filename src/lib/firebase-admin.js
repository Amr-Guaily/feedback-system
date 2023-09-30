import { initializeApp, applicationDefault } from 'firebase-admin/app';

initializeApp({
    credential: applicationDefault(),
    // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});