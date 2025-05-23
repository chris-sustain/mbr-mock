import { useEffect, useState } from 'react';
import {
  Select,
  Label,
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  SelectValue,
} from 'react-aria-components';

type Language = {
  code: string;
  name: string;
};

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' },
  { code: 'zh', name: '中文' },
];

export function LanguageSelector({
  defaultLanguage,
  onLanguageChange,
}: {
  defaultLanguage: string;
  onLanguageChange: (lang: string) => void;
}) {

  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage)

  useEffect(() => {
    let newSelectedLanguage = languages[0].code
    let defaultSelectedLanguage = languages.filter((language) => language.code === defaultLanguage)

    if (defaultLanguage)
      newSelectedLanguage = defaultSelectedLanguage[0].code

    setSelectedLanguage(newSelectedLanguage)
  }, [])
  
  return (
    <Select
      aria-label='language-selector'
      defaultSelectedKey={defaultLanguage}
      selectedKey={selectedLanguage}
      onSelectionChange={(key) => {
        console.log('key', key)
          // setSelectedLanguage(key)
          onLanguageChange(key);
      }}
    >
      <Button>
        {/* {({ selectedItem }) => selectedItem?.rendered ?? 'Select a language'} */}
        <SelectValue>
          {({defaultChildren, isPlaceholder}) => {
            return isPlaceholder ? <><b>Animal</b> selection</> : defaultChildren;
          }}
        </SelectValue>
        {/* {selectedLanguage} */}
      </Button>
      <Popover>
        <ListBox>
          {languages.map((lang) => (
            <ListBoxItem key={lang.code} textValue={lang.name}>{lang.name}</ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
}
