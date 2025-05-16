import styles from './RootLayout.module.scss';
import { Outlet } from 'react-router';
import { NavBar } from '@components/NavBar';

export const RootLayout = () => {
  // wait for back const isLogged = !!JSON.parse(localStorage.getItem('mbr-user'));
  const isLogged = true;

  return (
    <div className={styles['root']}>
      {isLogged ? (
        <>
          <NavBar />
        </>
      ) : null}
      <Outlet />
    </div>
  );
};
