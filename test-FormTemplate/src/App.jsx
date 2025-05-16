import './App.css'

import FormTemplate from './components/FormTemplate/FormTemplate.jsx'
import AttentionPointForm from './components/AttentionPointForm/AttentionPointForm.jsx'

function App() {

  const fields = [
    {
      name: 'username',
      title: 'Username',
      type: 'text',
      placeholder: 'Your username goes here',
      required: true,
      description: 'The username you use to log in.',
      helper: 'Type in your username.'
    },
    {
      name: 'age',
      title: 'Age',
      type: 'number',
      defaultValue: 27,
      description: 'Your age'
    },
    {
      name: 'preferences',
      title: 'Preferences',
      type: 'select',
      placeholder: 'Dropdown placeholder',
      defaultValue: 'pref2',
      options: [
        { label: 'Pref 1', value: 'pref1' },
        { label: 'Select me to show more preferences', value: 'pref2' }
      ]
    },
    {
      name: 'more-preferences',
      title: 'More preferences',
      type: 'checkboxes',
      options: [
        { label: 'Pref 3', value: 'pref3' },
        { label: 'Pref 4', value: 'pref4' }
      ],
      shouldDisplay: (formData) => formData['preferences'] === 'pref2'
    },
    {
      name: 'even-more-preferences',
      title: 'Preferences that are displayed and required if more-preferences are all selected.',
      type: 'radios',
      options: [
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

  return (
    <div className='App-root'>
      <div className='simple-formtemplate'>
        <FormTemplate
          title="User Form"
          subtitle="Please fill out the form"
          fields={fields}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onClose={handleClose}
          submitText="Submit"
          cancelText="Cancel"
          closeText="Close" />
      </div>

      <br /><br /><br /><br /><br /><br />
      <AttentionPointForm />
    </div>
  )
}

export default App
