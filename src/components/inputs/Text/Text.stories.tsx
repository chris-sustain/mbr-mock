import type { StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState, type FocusEvent } from 'react';
import { Form } from '../../Form/Form';
import { TextInput } from './Text';
export default {
  title: 'Inputs/TextInput',
  component: TextInput
};

export const Base: StoryObj<typeof TextInput> = {
  args: {
    type: 'text',
    label: 'Label',
    isRequired: true,
    isDisabled: false,
    isReadOnly: false,
    multiline: false,
    onChange: (val: string) => {
      console.log(val);
    },
    onBlur: (e: FocusEvent<HTMLInputElement, Element>) => {
      console.log('blur', e.target.value);
    }
  }
};

export const NativeValidation: StoryObj<typeof TextInput> = {
  args: {
    type: 'email',
    label: 'Email',
    isRequired: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    await user.type(canvas.getByRole('textbox'), 'hello');
    await user.tab();
    expect(canvas.getByText(/veuillez inclure "@"|please include an '@'/i)).toBeVisible();

    await user.type(canvas.getByRole('textbox'), '@domain.com');
    await user.tab();
    expect(
      canvas.queryByText(/veuillez inclure "@"|please include an '@'/i)
    ).not.toBeInTheDocument();
  }
};

export const CustomValidation: StoryObj<typeof TextInput> = {
  args: {
    ...Base.args,
    label: 'The answer is 42',
    validate: (val: string) => (val !== '42' ? 'not the answer' : null)
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    await user.type(canvas.getByRole('textbox'), 'La réponse D');
    await user.tab();
    expect(canvas.getByText('not the answer')).toBeVisible();

    await user.clear(canvas.getByRole('textbox'));
    await user.type(canvas.getByRole('textbox'), '42');
    await user.tab();
    expect(canvas.queryByText('not the answer')).not.toBeInTheDocument();
  }
};

export const AutoSaveForm: StoryObj<typeof TextInput> = {
  render: () => {
    const [submittedData, setSubmittedData] = useState<string | null>(null);
    return (
      <div style={{ maxWidth: '600px', padding: '20px' }}>
        <h3>Auto-Save Form</h3>
        <Form
          onSubmit={(data) => {
            setSubmittedData(JSON.stringify(data, null, 2));
          }}>
          <TextInput label="First Name" name="first" isRequired />
          <TextInput label="Last Name" name="second" />
          <TextInput label="Email" name="email" type="email" isRequired />
          <TextInput label="Phone Number" name="phone" />
        </Form>
        <div
          style={{
            marginTop: 16,
            padding: 12,
            background: '#f6f8fa',
            border: '1px solid #d0d7de',
            borderRadius: 4,
            fontFamily: 'monospace',
            fontSize: 14
          }}>
          <strong>Data sent to server:</strong>
          <pre style={{ margin: 0 }}>{submittedData || '—'}</pre>
        </div>
      </div>
    );
  }
};
