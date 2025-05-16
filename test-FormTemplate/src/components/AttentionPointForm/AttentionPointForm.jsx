import { useRef, useMemo } from 'react';
// import { useTranslation } from 'react-i18next';

import FormTemplate from '../FormTemplate/FormTemplate';
import { AttentionPointFormSchematic } from './AttentionPointFormSchematic';
// import { useAttentionPointForm } from './useAttentionPointForm';

import styles from './AttentionPointForm.module.scss';

const AttentionPointForm = () => {
  //   const { t } = useTranslation();

  // const [formErrorMessages, apFormTranslations] = useMemo(() => {
  //   return [
  //     t('common.FormTemplate.errorMessages', { returnObjects: true }),
  //     t('common.UseCaseRenderer.UC3.AttentionPointForm', { returnObjects: true })
  //   ];
  // }, [t]);

  const [formErrorMessages, apFormTranslations] = useMemo(() => {
    return [
      {
        "AtLeastOneChoiceRequired": "Au moins un choix est requis.",
        "ThisFieldIsRequired": "Ce champ est requis."
      },
      {
        "closeText": "Fermer",
        "newAttentionPoint": {
          "addAttentionPoint": "Ajouter un point d'attention",
          "addButtonContent": "+ Ajouter un point d'attention",
          "name": {
            "alreadyExists": "Le nom du point d'attention existe déjà.",
            "differentFromOthers": "Les noms des points d'attention doivent être différents.",
            "placeholder": "ex : Désamiantage",
            "title": "Nouveau point d'attention {index}"
          },
          "question": {
            "placeholder": "ex : Le désamiantage est-il traité ?",
            "title": "Transformer votre point d'attention en question"
          },
          "removeButtonContent": "- Supprimer le dernier point d'attention"
        },
        "submitText": "Valider",
        "title": "Ajouter des points d'attention"
      }
    ];
  }, []);

  const apFormDialogRef = useRef(null);

  // const { handleFormSubmit, attentionPoints } = useAttentionPointForm();

  const handleFormSubmit = (formData) => {
    console.log('Form submitted: ', formData);
  };

  const attentionPoints = useMemo(() => {
    return [];
  }, []);

  const attentionPointFormProps = useMemo(() => {
    return AttentionPointFormSchematic({
      existingAttentionPoints: attentionPoints,
      translations: apFormTranslations
    });
  }, [attentionPoints, apFormTranslations]);

  const handleAPFormSubmitModal = (formData) => {
    handleFormSubmit(formData);
    apFormDialogRef?.current.close();
  };

  return (
    <>
      <button
        className={styles['apdialog-open-btn']}
        data-testid="apdialog-open-btn"
        onClick={() => {
          apFormDialogRef?.current.showModal();
        }}>
        <span className={styles['icon']}>+</span>
        <span className={styles['text']}>
          {/* {t('common.UseCaseRenderer.UC3.AttentionPointForm.newAttentionPoint.addAttentionPoint')} */}
          Ajouter un point d'attention
        </span>
      </button>

      <dialog className={styles['attention-points-dialog']} ref={apFormDialogRef}>
        <div className={styles['ap-form-container']}>
          <FormTemplate
            key="UC3-add-attention-points"
            title={apFormTranslations.title}
            errorMessages={formErrorMessages}
            {...attentionPointFormProps}
            onSubmit={handleAPFormSubmitModal}
            onCancel={() => {
              apFormDialogRef?.current.close();
            }}
            onClose={() => {
              apFormDialogRef?.current.close();
            }}
            submitText={apFormTranslations.submitText}
            cancelText={'Annuler'}
            closeText={''}
            resetAfterSubmit={true}
            maxHeight={'74vh'}
            scrollbarClass={'main-scrollbar'}
          />
        </div>
      </dialog>
    </>
  );
};

export default AttentionPointForm;
