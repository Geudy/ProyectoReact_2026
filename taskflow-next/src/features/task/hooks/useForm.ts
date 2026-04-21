"use client";
import { useState } from 'react';

export interface FormField {
  value: string;
  error?: string;
}

export interface UseFormFields<T> {
  [K: string]: FormField;
}

export type UseFormTouched<T> = {
  [K in keyof T]?: boolean;
};

export type UseFormErrors<T> = {
  [K in keyof T]?: string;
};

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validate: (fields: T) => Partial<Record<keyof T, string>>
) {
  const [fields, setFields] = useState<UseFormFields<T>>(() => {
    const obj: UseFormFields<T> = {};
    for (const key in initialValues) {
      obj[key] = { value: initialValues[key] || '' };
    }
    return obj;
  });
  const [touched, setTouched] = useState<UseFormTouched<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const values = Object.fromEntries(
    Object.entries(fields).map(([k, v]) => [k, v.value])
  ) as T;
  const errors: UseFormErrors<T> = {};
  const validationErrors = validate(values);
  for (const key in validationErrors) {
    if (validationErrors[key]) {
      errors[key] = validationErrors[key];
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields(prev => ({
      ...prev,
      [name]: { value }
    }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const validateFields = () => {
    let valid = true;
    setFields(prev => {
      const updated: UseFormFields<T> = { ...prev };
      for (const key in validationErrors) {
        if (validationErrors[key]) {
          updated[key].error = validationErrors[key];
          valid = false;
        } else {
          delete updated[key].error;
        }
      }
      return updated;
    });
    setTouched(() => {
      const allTouched: Record<string, boolean> = {};
      for (const key in fields) {
        allTouched[key] = true;
      }
      return allTouched as UseFormTouched<T>;
    });
    return valid;
  };

  const getValues = () => {
    return values;
  };

  const submit = async (onSubmit: (values: T) => Promise<void> | void) => {
    setIsSubmitting(true);
    const valid = validateFields();
    if (valid) {
      await onSubmit(getValues());
    }
    setIsSubmitting(false);
  };

  return {
    fields,
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    validateFields,
    getValues,
    submit,
  };
}
