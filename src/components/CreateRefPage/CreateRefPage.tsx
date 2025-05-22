import { type ReactNode } from 'react';
import { Form, Group, type GroupProps } from 'react-aria-components';
import { TextInput } from '@components/inputs/Text';
import { Checkbox } from '@components/inputs/Checkbox';
import styles from './CreateRefPage.module.scss';

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
  return (
    <>
      <TextInput label="Titre contractuel du projet" isRequired />
      <TextInput label="Titre commercial du projet" isRequired />
      <FieldRow>
        {'Select, rédacteur'}
        {'Select, validateur'}
      </FieldRow>
      <TextInput label="Mandataire en cas de groupement" isRequired />
      <TextInput label="N° offre CRM filiale" isRequired />
      <TextInput label="N° projet EARTH filiale" isRequired />
      <div>{'FieldArray -> select, filiales'}</div>
      <div>{'Select, caractéristiques'}</div>
      <div>{'Tags, tags'}</div>
    </>
  );
}

function Client() {
  return (
    <>
      <TextInput label="Client" isRequired />
      <div>{'Select, type de client'}</div>
      <TextInput label="Description du client direct" multiline />
      <TextInput label="Adresse du client direct" multiline />
      <FieldRow>
        <TextInput label="Client final (bénéficiaire)" />
        <TextInput label="Adresse du client final" />
      </FieldRow>
      <FieldRow>
        <TextInput label="Contact client : Prénom - NOM" />
        <TextInput label="Contact client : Fonction" />
      </FieldRow>
      <FieldRow>
        <TextInput label="Contact client : Téléphone" />
        <TextInput label="Contact client : Fax" />
      </FieldRow>
      <TextInput label="Contact client : Email" />
    </>
  );
}

function ProjectContext() {
  return (
    <>
      <TextInput label="Adresse du client direct" multiline isRequired />
      <TextInput
        label="Description des services fournis par la filiale Egis propriétaire de la référence"
        multiline
        isRequired
      />
      <TextInput label="Résumé du projet" multiline isRequired />
      <div>{'Select, Domaine'}</div>
      <div>{'Select, Géographie'}</div>
      <div>{'Array -> Select, mission'}</div>
      <div>{'Array -> Select, produit'}</div>
      <div>{'Array -> Select, produit'}</div>
      <TextInput label="Commentaire(s) (à usage interne)" multiline />
    </>
  );
}

function Provision() {
  return (
    <>
      <FieldRow>{'dates'}</FieldRow>
      <FieldRow>
        {'dates'}
        <span></span>
        <Checkbox>{'Prestation terminée'}</Checkbox>
      </FieldRow>
    </>
  );
}

function RefForm() {
  return (
    <Form>
      <FormSection title="Informations générales">
        <GeneralInfo />
      </FormSection>
      <FormSection title="Clients">
        <Client />
      </FormSection>
      <FormSection title="Contexte du projet">
        <ProjectContext />
      </FormSection>
      <FormSection title="Notre prestation">
        <Provision />
      </FormSection>
      <FormSection title="Intervanants">{'Form'}</FormSection>
      <FormSection title="Montants et financements">{'Form'}</FormSection>
      <FormSection title="Fichiers liés">{'Form'}</FormSection>
    </Form>
  );
}

export const CreateRefPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>{'Sidebar'}</div>
      <div className={styles.content}>
        <RefForm />
      </div>
    </div>
  );
};
