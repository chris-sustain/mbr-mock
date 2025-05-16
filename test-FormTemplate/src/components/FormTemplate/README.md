TODO: update

# Form Component

The `Form` component is a dynamic form generator for React applications. It uses `react-hook-form` for form state management and validation, `yup` for schema validation, and `react-i18next` for internationalization support.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Field Types](#field-types)
- [Utilities](#utilities)
- [Styling](#styling)
- [License](#license)

## Features

- Dynamic form field generation based on configuration.
- Schema-based validation using Yup.
- Internationalization support with react-i18next.
- Supports multiple input types: text, number, checkboxes, dropdowns, and radio buttons.
- Customizable form actions (submit, cancel, close).

## Installation

To use this component in your project, you need to install the following dependencies:

```bash
npm install react-hook-form yup @hookform/resolvers react-i18next @mui/icons-material
```

## Usage

Here's a basic example of how to use the Form component:

```jsx
import Form from './Form';

const fields = [
  {
    name: 'username',
    title: 'Username',
    inputType: 'str',
    placeholder: 'Your username goes here',
    required: true,
    description: 'The username you use to log in.',
    helper: 'Type in your username.'
  },
  {
    name: 'age',
    title: 'Age',
    inputType: 'float',
    defaultValue: 27,
    description: 'Your age'
  },
  {
    name: 'preferences',
    title: 'Preferences',
    inputType: 'dropdown',
    placeholder: 'Dropdown placeholder',
    defaultValue: 'pref2',
    choices: [
      { label: 'Pref 1', value: 'pref1' },
      { label: 'Pref 2', value: 'pref2' }
    ]
  },
  {
    name: 'more-preferences',
    title: 'More preferences',
    inputType: 'checkboxes',
    choices: [
      { label: 'Pref 3', value: 'pref3' },
      { label: 'Pref 4', value: 'pref4' }
    ],
    shouldDisplay: (formData) => formData['preferences'] === 'pref2'
  },
  {
    name: 'even-more-preferences',
    title: 'Preferences that are displayed and required if more-preferences are all selected.',
    inputType: 'radio',
    choices: [
      { label: 'option 1', value: 'option1' },
      { label: 'option 2', value: 'option2' }
    ],
    shouldDisplay: (formData) => {
      const values = ['pref3', 'pref4'];
      const selectedValues = formData['more-preferences'];
      return values.every((v) => selectedValues?.includes(v));
    },
    validation: {
      name: 'even-more-preferences-validation',
      message: 'Cochez au moins une option',
      test: (value, testContext) => {
        // First, check that the condition from shouldDisplay is true.
        const values = ['pref3', 'pref4'];
        const selectedValues = testContext.parent['more-preferences'];
        if (values.every((v) => selectedValues?.includes(v))) {
          // If true, it is visible. Do further validation, such as to simulate "required".
          if (value.length === 0) {
            return false;
          } else {
            return true;
          }
        }
        return true;
      }
    }
  }
];

const handleSubmit = (data) => {
  console.log('Form submitted: ', data);
};

const handleCancel = () => {
  console.log('Form cancelled');
};

const handleClose = () => {
  console.log('Form closed');
};

const App = () => (
  <Form
    title="User Form"
    subtitle="Please fill out the form"
    fields={fields}
    onSubmit={handleSubmit}
    onCancel={handleCancel}
    onClose={handleClose}
    submitText="Submit"
    cancelText="Cancel"
    closeText="Close"
  />
);

export default App;
```

Using an object and spread syntax:

```jsx
// File: ./myProps.js
export const myProps = {
  title: "Title of the form",
  subtitle: "Subtitle",
  fields: [
    ...
  ],
  onSubmit= (data) => console.log(data)
  onCancel= () => {}
  onClose= () => {}
  submitText="Submit"
  cancelText="Cancel"
  closeText="Close"
}

// File: ./App.jsx
import { myProps } from './myProps.js'

const App = () => (
  <Form
    {...myProps}
  />
);

export default App;
```

## Props

### `Form` Props

| Name         | Type     | Description                                  | Required |
| ------------ | -------- | -------------------------------------------- | -------- |
| `title`      | `string` | Title of the form.                           | No       |
| `subtitle`   | `string` | Subtitle of the form.                        | No       |
| `fields`     | `array`  | Configuration for form fields.               | Yes      |
| `onSubmit`   | `func`   | Function to call when the form is submitted. | Yes      |
| `onCancel`   | `func`   | Function to call when the form is cancelled. | No       |
| `onClose`    | `func`   | Function to call when the form is closed.    | No       |
| `submitText` | `string` | Text for the submit button.                  | No       |
| `cancelText` | `string` | Text for the cancel button.                  | No       |
| `closeText`  | `string` | Text for the close button.                   | No       |

## Field Types

The `fields` prop should be an array of objects, each representing a field in the form. Each field object can have the following properties:

| Property        | Type              | Description                                                                                                | Required |
| --------------- | ----------------- | ---------------------------------------------------------------------------------------------------------- | -------- |
| `title`         | `string`          | Label of the field.                                                                                        | No       |
| `inputType`     | `string`          | Type of the input (`str`, `float`, `checkboxes`, `dropdown`, `radio`).                                     | Yes      |
| `name`          | `string`          | Name of the field.                                                                                         | No       |
| `placeholder`   | `string`          | Placeholder for the field. For `dropdown`, it will be displayed as an unselectable field as first choice.  | No       |
| `defaultValue`  | `string \| array` | Value from the `choices`. Array of values if `inputType` is `checkboxes`, even if there is a single value. | No       |
| `required`      | `boolean`         | Whether the field is required.                                                                             | No       |
| `description`   | `string`          | Description or placeholder for the field.                                                                  | No       |
| `helper`        | `string`          | Helper text for the field.                                                                                 | No       |
| `choices`       | `array`           | Options for `checkboxes`, `dropdown`, and `radio` input types.                                             | No       |
| `shouldDisplay` | `func`            | Function to conditionally display the field.                                                               | No       |
| `validation`    | `object`          | Used to manually validate the field. If provided, do not pass a `required` value.                          | No       |

**Important**: in case you display a field conditionally and want to make it required, do not set "required" to "true", and use custom validation instead, [as shown in this example.](#usage) Otherwise, the field will be hidden and required at the same time, and the form will not be able to be submitted.

### The `choices` array structure

```javascript
choices: [
  { value: 'dev', label: 'Développeur' },
  { value: 'manager', label: 'Manager' },
  { value: 'designer', label: 'Designer' }
];
```

### The `shouldDisplay` function

This function determines whether the field should be displayed based on the form data. Returns `true` if not hidden and `false` if it should be hidden.  
It is used to render the fields conditionally based on the values of the form.
The `formData` is an array of objects { fieldName: valueOfField }

```javascript
shouldDisplay: (formData) => {
  // Use the formData argument to determine if the field should be displayed or not.
  // The following example will display the field only if the selected value for the input with name='position' is 'manager'.
  return formData['position'] === 'manager';
  // return formData.position === 'manager'
};

shouldDisplay: (formData) => formData['position'] === 'manager';
```

### The `validation` object

The `validation` property allows you to define custom validation for the field. It should be an object containing the following properties:

| Property | Type             | Description                                                                                                                                                            | Required |
| -------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `name`   | `string`         | Unique identifier of the test.                                                                                                                                         | No       |
| `mesage` | `string \| func` | The error message to display it validation fails.                                                                                                                      | Yes      |
| `test`   | `func`           | A function that performs the validation. It receives the field value and a validation context as arguments. Returns true if validation is successful, false otherwise. | No       |

The second parameter of the `test` function is an object provided by the yup validation library, that allows you to access the current values of the form fields.

```javascript
validation: {
  name: 'customValidation',
  message: 'You have to choose at least one option.',
  test: (value, testContext) => {
    if (testContext.parent['checkbox-favorite-animals'].includes('cat')) {
      return value.length > 0;
    } else {
      return true;
    }
  }
}

```

## Utilities

### `generateValidationSchema(fields, translations)`

Generates a Yup validation schema based on the fields configuration and translations.

### `generateDefaultValues(fields)`

Generates default values for the form fields.

## Styling

The component uses CSS modules for styling. The styles are defined in the Form.module.scss file.

## License

This project is licensed under the (TODO: licence?) License.
