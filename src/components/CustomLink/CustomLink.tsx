import { PATHS } from '@src/router';
import styles from './CustomLink.module.scss';
import { NavLink, Link } from 'react-router';
import classNames from 'classnames';
import type { ReactNode } from 'react';

type LinkType = 'nav' | 'regular';
type PathFunction = (..._: string[] | number[]) => string;

type StaticPathProps = {
  pathType: 'static';
  path: keyof typeof PATHS;
  pathParams?: never;
};

type DynamicPathProps = {
  pathType: 'dynamic';
  path: PathFunction;
  pathParams: string[] | number[];
};

type CustomLinkProps = (StaticPathProps | DynamicPathProps) & {
  type: LinkType;
  children: ReactNode;
  className?: string;
};

export const CustomLink = ({
  pathType,
  path,
  type,
  children,
  className,
  pathParams = []
}: CustomLinkProps) => {
  const linkPath = pathType === 'dynamic' ? path(...pathParams) : PATHS[path];

  if (type === 'nav') {
    return (
      <NavLink
        to={linkPath}
        className={({ isActive, isPending }) =>
          classNames(styles['link'], className, {
            [styles['active']]: isActive,
            [styles['pending']]: isPending
          })
        }>
        {children}
      </NavLink>
    );
  }

  return (
    <Link to={linkPath} className={classNames(styles['link'], className)}>
      {children}
    </Link>
  );
};
