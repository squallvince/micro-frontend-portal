/*
 * @Author: Squall Sha
 * @Date: 2019-12-25 10:36:28
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2019-12-27 16:35:43
 */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import { IUserInfo } from 'store/auth/types';
// import { checkAuth } from 'store/auth/actions';

@connect(
  null,
  dispatch => checkAuth,
)

interface IFormSubmitProps {
  checkAuth: typeof checkAuth;
}

const formSubmit: React.FC<IFormSubmitProps> = (props) => {
  const { checkAuth } = props;

  const dataUser = {
    login: '',
    password: '',
  };

  const dataError = {
    login: 'Login error',
    password: 'Password error',
  };

  const [user, setUser] = React.useState<IUserInfo>(dataUser);
  const [error, setError] = React.useState<IUserInfo>(dataError);
  const [redirect, setRedirect] = React.useState<boolean>(false);

  const renderRedirect = (): object | void => {
    if (redirect) {
      return <Redirect to='/tasks/' />;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!error.login && !error.password) {
      checkAuth({
        login: user.login,
        password: user.password,
      });
      setRedirect(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (value !== 'admin') {
      switch (name) {
        case 'login':
          setError((prevState: any) => ({
            ...prevState,
            login: 'Login error',
          }));
          break;
        case 'password':
          setError((prevState: any) => ({
            ...prevState,
            password: 'Password error',
          }));
          break;
        default:
          break;
      }
    } else {
      name === 'login'
        ? setError((prevState: any) => ({ ...prevState, login: '' }))
        : setError((prevState: any) => ({ ...prevState, password: '' }));
    }
    name === 'login'
      ? setUser((prevState: any) => ({ ...prevState, login: value }))
      : setUser((prevState: any) => ({ ...prevState, password: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Wrapper>
        <InputText
          type='text'
          placeholder='Your login'
          name='login'
          onChange={handleChange}
          value={user.login}
        />
        <InputLabel>{error.login ? 'Error, your login: admin' : ''}</InputLabel>
      </Wrapper>
      <Wrapper>
        <InputText
          type='password'
          placeholder='Your password'
          name='password'
          onChange={handleChange}
          value={user.password}
        />
        <InputLabel>
          {error.password ? 'Error, your password: admin' : ''}
        </InputLabel>
      </Wrapper>
      <InputSubmit
        type='submit'
        value='Sign in'
        disabled={error.login || error.password}
      />
      {renderRedirect()}
    </form>
  );
};
