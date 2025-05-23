import type { StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import { useState } from 'react';
import { FieldArray } from './FieldArray';
import { TextInput } from '../Text';
import { Button, Form, type PressEvent } from 'react-aria-components';

export default {
  title: 'Inputs/FieldArray',
  component: TextInput
};

const addButton = (onPress: (e: PressEvent) => void) => (
  <Button onPress={onPress}>Add field</Button>
);
function FormTemplate() {
  const [serverData, setServerData] = useState();

  const buildNestedArray = (formdata: FormData) => {
    const names = formdata.getAll('nestedArray.name');
    const addresses = formdata.getAll('nestedArray.address');
    console.log(addresses[0]);
    return names.map((name, index) => ({
      name,
      address: addresses[index]
    }));
  };

  const mapFormToData = (formData: FormData) => ({
    titre: formData.get('titre'),
    flatArray: formData.getAll('flatArray'),
    nestedArray: buildNestedArray(formData)
  });

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const formdata = new FormData(e.target);
          setServerData(mapFormToData(formdata));
        }}>
        <TextInput label="Titre" name="titre" style={{ marginBottom: '24px' }} />
        <div style={{ marginBottom: '24px' }}>
          <FieldArray
            input={<TextInput label="test" name="flatArray" />}
            addButton={addButton}></FieldArray>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <FieldArray
            input={
              <>
                <TextInput label="name" name="nestedArray.name" />
                <TextInput label="address" name="nestedArray.address" />
              </>
            }
            addButton={addButton}></FieldArray>
        </div>
        <button type="submit">submit</button>
      </Form>

      <h2>Data sent to server</h2>
      <pre>{JSON.stringify(serverData, null, 2)}</pre>
    </>
  );
}

export const Base: StoryObj<typeof FormTemplate> = {
  render: () => <FormTemplate />
};
