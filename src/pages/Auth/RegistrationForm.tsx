import React, { useEffect, useState } from 'react';

import { SubmitFormType } from '../../@types/intefaces';

import { Input } from '../../components';

import { useFormValidator } from '../../hooks';

import classes from './Auth.module.scss';

interface IProps {
  onMobileButtonClick: () => void;
  text: string;
  buttonText: string;
  isRegistration?: boolean;
  onSubmitForm: (nickname: string, email: string, password: string) => void;
}

export const RegistrationForm: React.FC<IProps> = ({
  onMobileButtonClick,
  text,
  buttonText,
  isRegistration,
  onSubmitForm
}) => {
  const [form, setForm] = useState({ email: '', nickname: '', password: '' });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { validateForm, onBlurField, errors } = useFormValidator(form);

  const onSubmitButtonClick = (e: SubmitFormType) => {
    e.preventDefault();
    const { isValid } = validateForm({ form, error: errors, forceTouchErrors: true });
    if (!isValid) return;

    const { nickname, email, password } = form;
    onSubmitForm(nickname, email, password);
  };

  const onUpdateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as keyof typeof errors;
    const fieldValue = e.target.value;

    const nextFormState = { ...form, [fieldName]: fieldValue };
    setForm(nextFormState);
    if (errors[fieldName as keyof typeof errors].dirty && errors) {
      validateForm({ form: nextFormState, error: errors, fieldName });
    }
  };

  useEffect(() => {
    const isDisabled = isRegistration
      ? errors.email.error || errors.nickname.error || errors.password.error
      : errors.email.error || errors.password.error;

    setIsButtonDisabled(isDisabled);

    return () => {};
  }, [form.email, form.password, form.nickname]);

  return (
    <form className={classes.form} onSubmit={(e) => onSubmitButtonClick(e)}>
      <fieldset className={classes.form__fieldset}>
        {isRegistration && (
          <div className={classes.form__field}>
            <Input
              placeholder='Имя'
              value={form.nickname}
              setValue={onUpdateField}
              name='nickname'
              onBlur={onBlurField}
            />
            {errors.nickname.dirty && errors.nickname.error ? (
              <p className={classes.form__field__error__message}>{errors.nickname.message}</p>
            ) : null}
          </div>
        )}
        <div className={classes.form__field}>
          <Input
            placeholder='Почта'
            type='email'
            value={form.email}
            setValue={onUpdateField}
            name='email'
            onBlur={onBlurField}
          />
          {errors.email.dirty && errors.email.error ? (
            <p className={classes.form__field__error__message}>{errors.email.message}</p>
          ) : null}
        </div>
        <div className={classes.form__field}>
          <Input
            placeholder='Пароль'
            type='password'
            value={form.password}
            setValue={onUpdateField}
            name='password'
            onBlur={onBlurField}
          />
          {errors.password.dirty && errors.password.error ? (
            <p className={classes.form__field__error__message}>{errors.password.message}</p>
          ) : null}
        </div>
      </fieldset>
      <div className={classes.forms__buttons}>
        <button
          type='submit'
          onClick={onSubmitButtonClick}
          className={classes.forms__buttons_action}
          disabled={isButtonDisabled}
        >
          {buttonText}
        </button>
        <button
          className={classes.forms__buttons_mb_button}
          onClick={onMobileButtonClick}
          type='button'
        >
          {text}
        </button>
      </div>
    </form>
  );
};
