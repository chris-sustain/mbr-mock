import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useNotify } from '@src/hooks';

function App() {
  const { t } = useTranslation();
  const { notify } = useNotify();

  useEffect(() => {
    notify({
      type: 'info',
      title: 'Hello',
      content: 'Hello',
      closable: true
    });
  }, [notify]);
  return (
    <>
      <div>
        <h1>{t('common.Hello')}</h1>
      </div>
    </>
  );
}

//eslint-disable-next-line import/no-default-export
export default App;
