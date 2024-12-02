'use client';

import { useCallback } from 'react';

import { NavItem, NavItemSchema } from '@/types/NavItem';

import Form from '@/components/Form';
import Card, { CardBody } from '@/components/Card';
import TextField from '@/components/Form/TextField';
import Button from '@/components/Button';

export type NavFormProps<A extends 'CREATE' | 'EDIT' = 'CREATE'> = {
    action: A;
    item: A extends 'EDIT' ? NavItem : null;
    onSubmit?: (item: NavItem) => void;
    onCancel?: () => void;
    onDelete?: () => void;
};

const NavForm = <A extends 'CREATE' | 'EDIT' = 'CREATE'>({ action, item, onSubmit, onCancel, onDelete }: NavFormProps<A>) => {
    const handleSubmit = useCallback(
        (formData: NavItem) => {
            onSubmit?.(formData);
        },
        [onSubmit],
    );

    const handleCancel = useCallback(() => {
        onCancel?.();
    }, [onCancel]);

    const handleDelete = useCallback(() => {
        onDelete?.();
    }, [onDelete]);

    return (
        <Form
            onSubmit={handleSubmit}
            schema={NavItemSchema}
            values={
                {
                    label: item?.label ?? '',
                    url: item?.url ?? '',
                } as NavItem
            }
        >
            <Card>
                <CardBody variant="primary" className="flex gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <TextField
                            name="label"
                            label={'Nazwa'}
                            inputProps={{
                                placeholder: 'np. Promocje',
                            }}
                        />
                        <TextField
                            name="url"
                            label={'Link'}
                            inputProps={{
                                placeholder: 'Adres url...',
                            }}
                        />
                    </div>
                    {action == 'EDIT' && (
                        <Button variant="teritary" leadingIcon={'TrashIcon'} className="self-start flex-none" onClick={handleDelete} />
                    )}
                </CardBody>
                <CardBody variant="primary" type="action" className="pt-0">
                    <Button variant="secondary" type="button" onClick={handleCancel}>
                        Anuluj
                    </Button>
                    <Button variant="secondary-colored" type="submit">
                        {action === 'CREATE' ? 'Dodaj' : 'Zapisz'}
                    </Button>
                </CardBody>
            </Card>
        </Form>
    );
};

export default NavForm;
