import React from 'react';
import { Link } from 'react-router';
import styles from './UnstyledLink.module.scss';

interface UnstyledLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const UnstyledLink: React.FC<UnstyledLinkProps> = ({ to, children, className }) => {
  return (
    <Link to={to} className={`${styles.unstyledLink} ${className || ''}`}>
      {children}
    </Link>
  );
};
