'use Client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navlink = ({ children, href }) => {
  const pathName = usePathname();

  return (
    <Link
      href={href}
      className={`nav-link ${pathName == href ? 'active-link' : ''}`}
    >
      {children}
    </Link>
  );
};

export default Navlink;
