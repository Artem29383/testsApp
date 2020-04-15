import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import ButtonRipple from 'components/ButtonRipple';
import useSelector from 'hooks/useSelector';
import { getErrorSelector } from 'models/user/selectors';
import useAction from 'hooks/useAction';
import { loginUserFailure } from 'models/user/reducer';
import { LOGIN_USER } from 'models/user/actions';
import Input from 'components/Input';
import S from './AuthPage.styled';

const AuthPage = () => {
  const loginSchema = yup.object().shape({
    login: yup.string().required('Введите логин'),
    password: yup.string().required('Введите пароль'),
  });

  const { register, handleSubmit, errors, watch } = useForm({
    mode: 'onChange',
    validationSchema: loginSchema,
  });
  const login = useAction(LOGIN_USER);
  const setError = useAction(loginUserFailure);
  const error = useSelector(getErrorSelector);
  const watchLogin = watch('login');
  const watchPassword = watch('password');

  const authHandler = data => {
    login(data);
  };

  useEffect(() => {
    if (error.trim()) {
      setError('');
    }
  }, [watchLogin, watchPassword]);

  return (
    <S.AuthForm onSubmit={handleSubmit(authHandler)}>
      <S.WrapInput>
        <Input
          label="Логин"
          name="login"
          register={register}
          errors={errors.login}
          className="noText"
        />
      </S.WrapInput>
      <S.WrapInput>
        <Input
          label="Пароль"
          name="password"
          register={register}
          errors={errors.password}
          className="noText"
        />
      </S.WrapInput>
      <S.WrapInput>
        <ButtonRipple className="center">Авторизация</ButtonRipple>
        <S.Error>{error}</S.Error>
      </S.WrapInput>
    </S.AuthForm>
  );
};

export default AuthPage;
