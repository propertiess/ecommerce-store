import { FormEvent } from 'react';
import { Button, Group, TextInput } from '@mantine/core';

type Props<T> = {
  labels: (keyof T)[];
  body: T | null;
  onSave: (changedBody: T) => void;
  onCancel: () => void;
};

export const CrudForm = <T,>({ labels, body, onSave, onCancel }: Props<T>) => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const action = (e.nativeEvent as Event & { submitter: HTMLButtonElement })
      .submitter.name;

    switch (action) {
      case 'close': {
        onCancel();
        break;
      }
      case 'save': {
        const formBody: any = { id: (body as { id: number })?.id };

        for (const [key, value] of formData.entries() as any) {
          formBody[key] = value;
        }

        if (formBody.id === undefined) {
          delete formBody.id;
        }

        onSave(formBody);
        onCancel();

        break;
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {labels.map(label => {
        if (label === 'id') {
          return null;
        }

        return (
          <TextInput
            key={label as string}
            label={label as string}
            defaultValue={body?.[label] as string}
            name={label as string}
          />
        );
      })}
      <Group mt='md' className='flex justify-end'>
        <Button name='save' type='submit'>
          Сохранить
        </Button>
        <Button name='close' type='submit'>
          Отменить изменения
        </Button>
      </Group>
    </form>
  );
};
