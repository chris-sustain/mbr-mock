import { useTranslation } from 'react-i18next';
import { CustomIcon } from '@components/CustomIcon';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@src/store';
import { increment } from '@src/store';
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue
} from 'react-aria-components';
function App() {
  const { t } = useTranslation();
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <h1>{t('common.Hello')}</h1>
        <h2>{count}</h2>
        <button onClick={() => dispatch(increment())}>+</button>
        <CustomIcon name="add" />
        <Select>
          <Label>Favorite Animal</Label>
          <Button>
            <SelectValue />
            <span aria-hidden="true">▼</span>
          </Button>
          <Popover>
            <ListBox>
              <ListBoxItem>Cat</ListBoxItem>
              <ListBoxItem>Dog</ListBoxItem>
              <ListBoxItem>Kangaroo</ListBoxItem>
            </ListBox>
          </Popover>
        </Select>
      </div>
    </>
  );
}

export default App;
