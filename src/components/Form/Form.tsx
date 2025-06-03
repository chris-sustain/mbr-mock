import {
  createContext,
  type FormEvent,
  type ReactNode,
  type RefObject,
  useCallback,
  useMemo,
  useRef
} from 'react';
import { Button, Form as ReactAriaForm, type FormProps } from 'react-aria-components';

export const LiveFormContext = createContext<{
  saveDraft: () => void;
}>({
  saveDraft: () => undefined
});

function LiveForm({
  draftRef,
  children
}: {
  draftRef: RefObject<HTMLButtonElement | null>;
  children: ReactNode;
}) {
  const saveDraft = useCallback(() => {
    if (!draftRef.current) return;
    draftRef.current.click();
  }, [draftRef]);

  const context = useMemo(
    () => ({
      saveDraft
    }),
    [saveDraft]
  );

  return <LiveFormContext.Provider value={context}>{children}</LiveFormContext.Provider>;
}

const isDraft = (event: React.FormEvent<HTMLFormElement>) => {
  return event?.nativeEvent?.submitter?.name === 'draft';
};

export function Form({
  children,
  onSubmit,
  ...props
}: FormProps & { children: ReactNode; onSubmit: (data: Record<string, unknown>) => void }) {
  const draftRef = useRef<HTMLButtonElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = {
      // simple mapping for example purposes see fieald array story for a more realistic one
      values: Object.fromEntries(formData.entries()),
      draft: isDraft(event)
    };

    // Use the data object as needed (replace with your logic)
    onSubmit(data);
  }

  /* eslint-disable */
  return (
    <ReactAriaForm {...props} onSubmit={handleSubmit}>
      <LiveForm draftRef={draftRef}>
        {children}
        <Button type="submit" name="draft" formNoValidate ref={draftRef}>
          Save Draft
        </Button>
        <Button type="submit" name="commit">
          Submit changes
        </Button>
      </LiveForm>
    </ReactAriaForm>
  );
}
/* eslint-enable */
