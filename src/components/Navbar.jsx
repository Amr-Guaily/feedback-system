'use client';
import { useAuthData } from '@/context/auth-api';
import { useAuthAPI } from '@/context/auth-api';

const Navbar = () => {
  const { user, loading } = useAuthData();
  const { loginWithGithub, loginWithGoogle, signout } = useAuthAPI();

  return (
    <div>
      <button onClick={loginWithGithub}>Github</button>
      <button onClick={loginWithGoogle}>Google</button>
      <button onClick={signout}>Signout</button>
      {loading ? <h1>Loading...</h1> : <h1>Hello {user?.name}</h1>}
    </div>
  );
};

export default Navbar;
