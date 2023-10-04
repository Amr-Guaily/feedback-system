import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { auth } from '../lib/firebase-admin';
import { signOut } from 'firebase/auth';

import cookie from 'js-cookie';

const PrivateRoute = async ({ children }) => {
  const nextCookies = cookies();
  const token = nextCookies.get('userToken');

  if (!token) redirect('/');

  try {
    await auth.verifyIdToken(token?.value);
    return <>{children}</>;
  } catch (err) {
    redirect('/');
  }
};

export default PrivateRoute;
