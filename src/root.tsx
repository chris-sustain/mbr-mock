import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { store } from '@src/store';
import { Provider } from 'react-redux';
import { i18nextMiddleware } from '@translation/i18next';
import './index.scss';

export const unstable_clientMiddleware = [i18nextMiddleware];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My App</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
}
