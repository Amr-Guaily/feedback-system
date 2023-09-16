'use client';
import { useAuthData } from '@/context/auth-api';
import { useAuthAPI } from '@/context/auth-api';

const Navbar = () => {
  const user = useAuthData();
  const { loginWithGithub, loginWithGoogle } = useAuthAPI();
  console.log(user);
  return (
    <div>
      <button onClick={loginWithGithub}>Github</button>
      <button onClick={loginWithGoogle}>Google</button>
      <h1>Hello {user?.displayName}</h1>
    </div>
  );
};

export default Navbar;
