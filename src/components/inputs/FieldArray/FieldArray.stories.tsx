import type { StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Form } from 'react-aria-components';
import { TextInput } from '../Text';
import { FieldArray } from './FieldArray';

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

  const defaultValues = {
    titre: '',
    flatArray: ['flat default value 1', 'flat default value 2'],
    nestedArray: [
      {
        name: 'nested default value 1',
        address: 'address default value 1'
      }
    ]
  };

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
          <FieldArray addButtonLabel="Add item" defaultValues={defaultValues.flatArray}>
            {(field, index) => (
              <TextInput
                key={field.id}
                label={`Item ${index + 1}`}
                name="flatArray"
                aria-label={`flatArray.${index}`}
                defaultValue={field?.defaultValue}
              />
            )}
          </FieldArray>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <FieldArray addButtonLabel="Add nested item" defaultValues={defaultValues.nestedArray}>
            {(field, index) => (
              <div
                key={field.id}
                aria-label={`nestedArray.${index}`}
                style={{ background: 'lightgrey', padding: '6px', marginBottom: '16px' }}>
                <TextInput
                  label="name"
                  name="nestedArray.name"
                  defaultValue={field?.defaultValue?.name} //
                />
                <TextInput
                  label="address"
                  name="nestedArray.address"
                  defaultValue={field?.defaultValue?.name} //
                />
              </div>
            )}
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
