import { usePathname } from 'next/navigation';
import React from 'react';

const NavLink = ({ label, href }) => {
  const pathName = usePathname();

  return (
    <li className={`${pathName === href ? 'text-primary' : ''} font-mono`}>
      <a href={href}>{label}</a>
    </li>
  );
};

export default NavLink;
