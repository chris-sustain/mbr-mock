import { useTranslation } from 'react-i18next';
import { useNotify } from '@src/hooks';
import { useEffect } from 'react';

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

export default App;
