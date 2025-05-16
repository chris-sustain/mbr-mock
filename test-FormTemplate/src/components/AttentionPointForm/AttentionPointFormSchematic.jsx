export const AttentionPointFormSchematic = ({ existingAttentionPoints = [], translations }) => {
  return {
    fields: [
      {
        type: 'array',
        name: 'newAttentionPoint',
        maxItems: 6,
        addButtonContent: translations.newAttentionPoint.addButtonContent,
        removeButtonContent: translations.newAttentionPoint.removeButtonContent,
        fields: [
          {
            type: 'text',
            name: 'attentionPointName',
            title: translations.newAttentionPoint.name.title,
            placeholder: translations.newAttentionPoint.name.placeholder,
            required: true,
            wrapperInlineStyle: {
              marginBottom: '0.5rem'
            },
            validations: [
              {
                name: 'attentionPointNameAlreadyExists',
                message: translations.newAttentionPoint.name.alreadyExists,
                test: (value) => {
                  return existingAttentionPoints.find((ap) => ap.name === value) ? false : true;
                }
              },
              {
                name: 'attentionPointNameDifferentFromOthers',
                message: translations.newAttentionPoint.name.differentFromOthers,
                test: (value, context) => {
                  if (value === '') return true;

                  let newAttentionPoint = context.from[1].value.newAttentionPoint;
                  return (
                    newAttentionPoint
                      .map((ap) => ap.attentionPointName)
                      .filter((apName) => apName === value).length <= 1
                  );
                }
              }
            ]
          },
          {
            type: 'textarea',
            name: 'attentionPointQuestion',
            title: translations.newAttentionPoint.question.title,
            placeholder: translations.newAttentionPoint.question.placeholder,
            required: true,
            wrapperInlineStyle: {
              marginBottom: '0.5rem'
            }
          }
        ]
      }
    ]
  };
};
