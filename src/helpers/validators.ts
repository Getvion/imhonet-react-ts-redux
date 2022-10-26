export const emailValidator = (email: string): string => {
  if (!email) return 'Почта обязательна';

  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(email)) return 'Неверный формат почты';

  return '';
};

export const passwordValidator = (password: string): string => {
  if (!password) return 'Пароль обязателен';

  if (password.length <= 8) return 'Пароль должен содержать минимум 8 символов';

  return '';
};

export const nicknameValidator = (nickname: string): string => {
  if (!nickname) return 'Имя обязательно';

  if (nickname.length <= 3) return 'Имя должно быть длинее трех символов';

  return '';
};
