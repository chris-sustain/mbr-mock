import type { StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
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

export const InteractiveTest: StoryObj<typeof FieldArray> = {
  render: () => (
    <FieldArray addButtonLabel="Add item" defaultValues={['Server value 1']}>
      {(field, index) => (
        <TextInput
          label={`Item ${index + 1}`}
          name={`item-${index}`}
          defaultValue={field?.defaultValue || `Client Default value`}
          data-testid={`text-input-${index}`}
        />
      )}
    </FieldArray>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    // Initially, there should be one field and no visible remove button
    const initialInput = canvas.getByRole('textbox', { name: /item 1/i });
    expect(initialInput).toBeInTheDocument();
    expect(initialInput).toHaveValue('Server value 1');

    // Remove button should be invisible (aria-hidden)
    expect(canvas.getByRole('button', { name: /remove/i })).not.toBeVisible();

    // Add a second field
    const addButton = canvas.getByRole('button', { name: /add item/i });
    await user.click(addButton);

    // Now there should be two fields
    const secondInput = canvas.getByRole('textbox', { name: /item 2/i });
    expect(secondInput).toBeInTheDocument();

    // Second field's remove button should be visible and functional
    const allRemoveButtons = canvas.getAllByRole('button', { name: /remove/i });
    expect(allRemoveButtons).toHaveLength(2);

    // Add a third field and set values
    await user.click(addButton);
    const thirdInput = canvas.getByRole('textbox', { name: /item 3/i });
    expect(thirdInput).toBeInTheDocument();

    // Set different values in each field
    await user.clear(initialInput);
    await user.type(initialInput, 'First field value');

    await user.clear(secondInput);
    await user.type(secondInput, 'Second field value');

    await user.clear(thirdInput);
    await user.type(thirdInput, 'Third field value');

    // Remove the second field (middle one)
    const updatedRemoveButtons = canvas.getAllByRole('button', { name: /remove/i });
    await user.click(updatedRemoveButtons[1]); // Remove second field

    // Should now have 2 fields again
    const remainingInputs = canvas.getAllByRole('textbox');
    expect(remainingInputs).toHaveLength(2);

    // Check that the first and third field values are preserved
    expect(remainingInputs[0]).toHaveValue('First field value');
    expect(remainingInputs[1]).toHaveValue('Third field value'); // This was the third field, now second

    // Remove the last field to get back to single field
    const finalRemoveButtons = canvas.getAllByRole('button', { name: /remove/i });
    await user.click(finalRemoveButtons[1]); // Remove the second field

    // Back to single field - remove button should be invisible again
    const finalInputs = canvas.getAllByRole('textbox');
    expect(finalInputs).toHaveLength(1);
    expect(finalInputs[0]).toHaveValue('First field value');

    expect(canvas.getByRole('button', { name: /remove/i })).not.toBeVisible();
  }
};
