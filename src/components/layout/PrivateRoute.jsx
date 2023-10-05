import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const PrivateRoute = async ({ children }) => {
  const nextCookies = cookies();
  const token = nextCookies.get('userToken');

  if (!token) redirect('/');

  return <>{children}</>;
};

export default PrivateRoute;
