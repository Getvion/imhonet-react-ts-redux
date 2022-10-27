import { useState } from 'react';
import { emailValidator, nicknameValidator, passwordValidator } from '../helpers/validators';

interface IErrors {
  email: { error: boolean; dirty: boolean; message: string };
  nickname: { error: boolean; dirty: boolean; message: string };
  password: { error: boolean; dirty: boolean; message: string };
}

interface IForm {
  email: string;
  nickname: string;
  password: string;
}

export const useFormValidator = (form: IForm) => {
  type ErrorType = keyof typeof errors;

  const [errors, setErrors] = useState<IErrors>({
    email: { error: true, dirty: true, message: '' },
    nickname: { error: true, dirty: true, message: '' },
    password: { error: true, dirty: true, message: '' }
  });

  interface IValidateForm {
    form: IForm;
    fieldName?: ErrorType;
    error: IErrors;
    forceTouchErrors?: boolean;
  }

  const validateForm = ({ form, fieldName, error, forceTouchErrors = false }: IValidateForm) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(error));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = Object.entries(error).reduce((acc, [field, fieldError]) => {
        acc[field as ErrorType] = { ...fieldError, dirty: true };
        return acc;
      }, {} as IErrors);
    }

    const { email, password, nickname } = form;

    if (nextErrors.email.dirty && (fieldName ? fieldName === 'email' : true)) {
      const emailMessage = emailValidator(email);
      nextErrors.email.error = Boolean(emailMessage);
      nextErrors.email.message = emailMessage;
      if (emailMessage) isValid = false;
    }

    if (nextErrors.password.dirty && (fieldName ? fieldName === 'password' : true)) {
      const passwordMessage = passwordValidator(password);
      nextErrors.password.error = Boolean(passwordMessage);
      nextErrors.password.message = passwordMessage;
      if (passwordMessage) isValid = false;
    }

    if (nextErrors.nickname.dirty && (fieldName ? fieldName === 'nickname' : true)) {
      const nicknameMessage = nicknameValidator(nickname);
      nextErrors.nickname.error = Boolean(nicknameMessage);
      nextErrors.nickname.message = nicknameMessage;
      if (nicknameMessage) isValid = false;
    }

    setErrors(nextErrors);

    return { isValid, errors: nextErrors };
  };

  const onBlurField = (e: React.FocusEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as ErrorType;
    const fieldError = errors[fieldName as ErrorType];
    if (fieldError.dirty) return;

    const updatedErrors = {
      ...errors,
      [fieldName]: { ...errors[fieldName as ErrorType], dirty: true }
    };

    validateForm({ form, fieldName, error: updatedErrors });
  };
  return { validateForm, onBlurField, errors };
};
