/*
 * @Author: Squall Sha 
 * @Date: 2020-02-18 17:34:25 
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-02-19 16:26:28
 */

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { IUserInfo } from 'store/auth/types';
import { checkAuth } from 'store/auth/actions';

const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

const InputLabel = styled.label`
  position: absolute;
  top: 0;
  padding: 0 0 .1rem .3rem;
  transition: all 200ms;
  opacity: 0.5;
  color: #92929d;
`;

const InputText = styled.input`
  z-index: 1;
  width: 100%;
  height: 2.2rem;
  border: 1px solid #f1f1f5;
  border-width: 0 0 1px 0;
  resize: none;
  overflow-y: hidden;
  box-sizing: border-box;
  padding: 0 .3rem;
  margin-bottom: 1.1rem;
  font-size: .6rem;
  color: #92929d;
  :focus {
    outline: none;
    border-bottom: 2px solid #1473e6;
    ::placeholder {
      opacity: 0;
    }
  }
  :focus + ${InputLabel} {
    font-size: 75%;
    transform: translate3d(0, -100%, 0);
    opacity: 1;
    color: #fc5a5a;
  }
`;

const InputSubmit = styled.input`
  clear: both;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 2.6rem;
  background: #1473e6;
  border-radius: 3rem;
  border: none;
  color: white;
  font-size: .7rem;
  cursor: pointer;
  :focus {
    outline: none;
  }
  :disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

interface IFormSubmitProps {
  checkAuth: typeof checkAuth
}

const FormSubmit: React.FC<IFormSubmitProps> = props => {
  const { checkAuth } = props;

  let dataUser = {
    login: '',
    password: ''
  };

  let dataError = {
    login: 'Login error',
    password: 'Password error'
  };

  const [user, setUser] = React.useState<IUserInfo>(dataUser);
  const [error, setError] = React.useState<IUserInfo>(dataError);
  const [redirect, setRedirect] = React.useState<boolean>(false);

  const renderRedirect = (): object | void => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };

  const setCookie = (name: string, value: string): void => {
    const times = 5;
    let exp = new Date();
    exp.setTime(exp.getTime() + times * 60 * 1000);
    document.cookie = `${name}=${escape(value)};expires=${exp.toUTCString()}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!error.login && !error.password) {
      checkAuth({
        login: user.login,
        password: user.password
      });
      setCookie('token', 'accessed');
      setRedirect(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (value !== 'admin') {
      switch (name) {
        case 'login':
          setError(prevState => ({
            ...prevState,
            login: 'Login error'
          }));
          break;
        case 'password':
          setError(prevState => ({
            ...prevState,
            password: 'Password error'
          }));
          break;
        default:
          break;
      }
    } else {
      name === 'login'
        ? setError(prevState => ({
            ...prevState, 
            login: ''
          }))
        : setError(prevState => ({
            ...prevState,
            password: ''
          }));
    }
    name === 'login'
      ? setUser(prevState => ({
          ...prevState,
          login: value
        }))
      : setUser(prevState => ({
          ...prevState,
          password: value
        }));
  };

  const isDisabled = error.login || error.password;

  return (
    <form onSubmit={handleSubmit}>
      <Wrapper>
        <InputText
          type="text"
          placeholder="Your login"
          name="login"
          onChange={handleChange}
          value={user.login}
        />
        <InputLabel>{error.login ? 'Error, your login: admin' : ''}</InputLabel>
      </Wrapper>
      <Wrapper>
        <InputText
          type="password"
          placeholder="Your password"
          name="password"
          onChange={handleChange}
          value={user.password}
        />
        <InputLabel>
          {error.password ? 'Error, your password: admin' : ''}
        </InputLabel>
      </Wrapper>
      <InputSubmit
        type="submit"
        value="Sign in"
        disabled={isDisabled}
      />
      {renderRedirect()}
    </form>
  );
};

const mapDispatchToProps = {
  checkAuth
};

export default connect(
  null,
  mapDispatchToProps
)(FormSubmit);
