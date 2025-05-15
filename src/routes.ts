import type { RouteConfig } from '@react-router/dev/routes';

export default [
  {
    path: '/',
    file: './routes/layout.tsx',
    children: [
      {
        index: true,
        file: './routes/search.tsx'
      },
      {
        path: 'edit',
        file: './routes/edit.tsx'
      },
      {
        path: 'counter',
        file: './routes/counter.tsx'
      }
    ]
  }
] satisfies RouteConfig;