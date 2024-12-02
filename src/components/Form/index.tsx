'use client';

import { PropsWithChildren } from 'react';
import { FormProvider, useForm, type UseFormProps, type FieldValues } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ZodRawShape, ZodObject, ZodTypeAny } from 'zod';

import { PropsWithClassName } from '@/utils/PropsWithClassName';

export type FormProps<T extends FieldValues = FieldValues, C extends object = object, Z extends ZodRawShape = ZodRawShape> = UseFormProps<
    T,
    C
> &
    PropsWithClassName<{
        schema?: ZodObject<Z, 'strip' | 'strict', ZodTypeAny, T>;
        onSubmit: (values: T) => Promise<void> | void;
    }>;

const Form = <T extends FieldValues = FieldValues, C extends object = object, Z extends ZodRawShape = ZodRawShape>({
    children,
    className,
    schema,
    onSubmit,
    ...formProps
}: PropsWithChildren<FormProps<T, C, Z>>) => {
    const form = useForm<T, C>({
        ...formProps,
        ...(schema ? { resolver: zodResolver(schema) } : {}),
    });

    return (
        <FormProvider {...form}>
            <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    );
};

export default Form;
