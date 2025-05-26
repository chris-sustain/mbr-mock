import type { StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FieldArray } from './FieldArray';
import { TextInput } from '../Text';
import { Button, Form, type PressEvent } from 'react-aria-components';

export default {
  title: 'Inputs/FieldArray',
  component: TextInput
};

function FormTemplate() {
  const [serverData, setServerData] = useState({});

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
          const formdata = new FormData(e.currentTarget);
          setServerData(mapFormToData(formdata));
        }}>
        <TextInput label="Titre" name="titre" style={{ marginBottom: '24px' }} />
        <div style={{ marginBottom: '24px' }}>
          <FieldArray addButtonLabel="Add item">
            <TextInput label="test" name="flatArray" />
          </FieldArray>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <FieldArray addButtonLabel="Add nested item">
            <div style={{ background: 'lightgrey', padding: '6px', marginBottom: '16px' }}>
              <TextInput label="name" name="nestedArray.name" />
              <TextInput label="address" name="nestedArray.address" />
            </div>
          </FieldArray>
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
