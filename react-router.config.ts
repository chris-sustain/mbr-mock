import type { Config } from '@react-router/dev/config';
import type { Future } from 'react-router';

declare module 'react-router' {
  interface Future {
    unstable_middleware: true; // 👈 Enable middleware types
  }
}

export default {
  appDirectory: 'src',
  ssr: false,
  future: {
    unstable_middleware: true // 👈 Enable middleware
  }
} satisfies Config;
