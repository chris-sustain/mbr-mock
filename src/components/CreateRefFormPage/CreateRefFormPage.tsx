import { type ReactNode } from 'react';
import { Form, Group, type GroupProps } from 'react-aria-components';
import { useTranslation } from 'react-i18next';

import { Checkbox } from '@components/inputs/Checkbox';
import { TextInput } from '@components/inputs/Text';

import styles from './CreateRefFormPage.module.scss';

function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>
  );
}

function FieldRow({ children, ...groupProps }: { children: ReactNode } & GroupProps) {
  return (
    <Group {...groupProps} className={styles.row}>
      {children}
    </Group>
  );
}

function GeneralInfo() {
  const { t } = useTranslation();

  return (
    <>
      <TextInput label={t('common.createRef.fields.contractualProjectTitle')} isRequired />
      <TextInput label={t('common.createRef.fields.commercialProjectTitle')} isRequired />
      <FieldRow>
        {'Select, rédacteur'}
        {'Select, validateur'}
      </FieldRow>
      <TextInput label={t('common.createRef.fields.groupingAgent')} isRequired />
      <TextInput label={t('common.createRef.fields.subsidiaryOfferNumber')} isRequired />
      <TextInput label={t('common.createRef.fields.subsidiaryEarthProjectNumber')} isRequired />
      <div>{'FieldArray -> select, filiales'}</div>
      <div>{'Select, caractéristiques'}</div>
      <div>{'Tags, tags'}</div>
    </>
  );
}

function Client() {
  const { t } = useTranslation();
  return (
    <>
      <TextInput label={t('common.createRef.fields.client')} isRequired />
      <div>{'Select, type de client'}</div>
      <TextInput label={t('common.createRef.fields.directClientDescription')} multiline />
      <TextInput label={t('common.createRef.fields.directClientAddress')} multiline />
      <FieldRow>
        <TextInput label={t('common.createRef.fields.finalClient')} />
        <TextInput label={t('common.createRef.fields.finalClientAddress')} />
      </FieldRow>
      <FieldRow>
        <TextInput label={t('common.createRef.fields.clientContactName')} />
        <TextInput label={t('common.createRef.fields.clientContactFunction')} />
      </FieldRow>
      <FieldRow>
        <TextInput label={t('common.createRef.fields.clientContactPhone')} />
        <TextInput label={t('common.createRef.fields.clientContactFax')} />
      </FieldRow>
      <TextInput label={t('common.createRef.fields.clientContactEmail')} />
    </>
  );
}

function ProjectContext() {
  const { t } = useTranslation();
  return (
    <>
      <TextInput label={t('common.createRef.fields.directClientAddress')} multiline isRequired />
      <TextInput label={t('common.createRef.fields.servicesDescription')} multiline isRequired />
      <TextInput label={t('common.createRef.fields.projectSummary')} multiline isRequired />
      <div>{'Select, Domaine'}</div>
      <div>{'Select, Géographie'}</div>
      <div>{'Array -> Select, mission'}</div>
      <div>{'Array -> Select, produit'}</div>
      <div>{'Array -> Select, produit'}</div>
      <TextInput label={t('common.createRef.fields.internalComments')} multiline />
    </>
  );
}

function Provision() {
  const { t } = useTranslation();
  return (
    <>
      <FieldRow>{'dates'}</FieldRow>
      <FieldRow>
        {'dates'}
        <span></span>
        <Checkbox>{t('common.createRef.fields.serviceCompleted')}</Checkbox>
      </FieldRow>
    </>
  );
}

function RefForm() {
  const { t } = useTranslation();
  return (
    <Form>
      <FormSection title={t('common.createRef.sections.generalInfo')}>
        <GeneralInfo />
      </FormSection>
      <FormSection title={t('common.createRef.sections.clients')}>
        <Client />
      </FormSection>
      <FormSection title={t('common.createRef.sections.projectContext')}>
        <ProjectContext />
      </FormSection>
      <FormSection title={t('common.createRef.sections.ourService')}>
        <Provision />
      </FormSection>
      <FormSection title={t('common.createRef.sections.participants')}>{'Form'}</FormSection>
      <FormSection title={t('common.createRef.sections.amountsAndFunding')}>{'Form'}</FormSection>
      <FormSection title={t('common.createRef.sections.relatedFiles')}>{'Form'}</FormSection>
    </Form>
  );
}

export const CreateRefFormPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>{'Sidebar'}</div>
      <div className={styles.content}>
        <RefForm />
      </div>
    </div>
  );
};
