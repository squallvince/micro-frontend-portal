import React, { Component } from 'react';
import Cookies from 'js-cookie';
import getBase64String from './util';
import { LoginErrors, AuthErrors } from './constants';
import Loading from './Loading';
import './index.less';

const UserIcon = require('./images/user.png');
const PwdIcon = require('./images/password.png');
const LogoImg = require('./images/logo.png');

const resetLocaleCookies = ({ userName, loginName, userId, departmentId, departmentName, portals, passwordIsExpireSoon, ...others }) => {
  Cookies.set('loginName', loginName);
  Cookies.set('userName', userName);
  Cookies.set('userId', userId);
  Cookies.set('departmentId', departmentId);
  Cookies.set('departmentName', departmentName);
  Cookies.set('portals', portals);
  Cookies.set('passwordIsExpireSoon', passwordIsExpireSoon);
  localStorage.currentUser = JSON.stringify({
    name: userName, userName, loginName, userId, departmentId, departmentName, ...others
  });
};

const getLoginErrorTimesExceedErrorMessage = ({ errorTimes, remainingSeconds, remainingTime }) => {
  const intRemainingSeconds = parseInt(remainingSeconds, 10);
  if (!isNaN(intRemainingSeconds)) {
    const minute = Math.floor(intRemainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    if (minute) {
      remainingTime = `${minute}分`;
    }
    if (seconds) {
      remainingTime = minute ? `${remainingTime}${seconds}秒` : `${seconds}秒`;
    }
    return `当前用户已连续登录错误${errorTimes}次，请于${remainingTime}后重试`;
  }
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      userError: '',
      password: '',
      passwordError: '',
      isSubmitting: false,
      authError: '',
      loading: true
    };
  }

  _navigator() {
    if (window.prevHref) {
      this.props.singleSpa.navigateToUrl(window.prevHref);
    } else {
      this.props.singleSpa.navigateToUrl('/');
    }
  }

  UNSAFE_componentWillMount() {
    // 使用Permission接口测试用户是否已登录，若已登录则不渲染页面
    window.PromiseFetch('/api/identity/getUserPermission', {}, 'post')
      .then((data) => {
        this._navigator();
        this.setState({
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });
  }

  handleInputChange(key, e) {
    const value = e.target.value;
    this.setState({
      [`${key}`]: value
    });
    // 检查是否有相应的error
    if (value && this.state[`${key}Error`]) {
      this.setState({
        [`${key}Error`]: ''
      });
    } else if (!value && !this.state[`${key}Error`]) {
      this.setState({
        [`${key}Error`]: LoginErrors[key]
      });
    }
    if (key === 'password' && this.state.authError) {
      this.setState({
        authError: ''
      });
    }
  }

  // set errors
  _setError(error) {
    const { errorCode, data } = error;
    let errorMessage = '';
    if (errorCode === 'LoginErrorTimesExceed') {
      errorMessage = getLoginErrorTimesExceedErrorMessage(data);
    } else {
      errorMessage = AuthErrors[errorCode] || '';
    }
    this.setState({
      authError: errorMessage
    });
  }
  // set errors

  _getLicenseStatus() {
    window.PromiseFetch('/api/identity/getLicenseStatus', {}, 'post')
      .then(({ data }) => {
        localStorage.setItem('licenseData', JSON.stringify(data));
        this.setState({
          isSubmitting: false
        });
        this._navigator();
      })
      .catch(() => {
        this.setState({
          isSubmitting: false
        });
      });
  }

  _getUserPermission() {
    window.PromiseFetch('/api/identity/getUserPermission', {}, 'post')
      .then(() => {
        this._getLicenseStatus();
      })
      .catch(() => {
        this.setState({
          isSubmitting: false
        });
      });
  }

  _login() {
    const { user, password } = this.state;
    this.setState({
      isSubmitting: true
    });
    window.PromiseFetch(
      '/api/identity/login',
      {
        loginName: user,
        password: getBase64String(`donottellyou${password}_${new Date().getTime()}`)
      },
      'POST')
      .then(({ data }) => {
        resetLocaleCookies(data);
        this._getUserPermission();
      })
      .catch((error) => {
        this._setError(error);
        this.setState({
          isSubmitting: false
        });
      });
  }

  _checkLoginValid() {
    const { user, password } = this.state;
    if (!user || !password) {
      if (!user) {
        this.setState({
          userError: LoginErrors.user
        });
      }
      if (!password) {
        this.setState({
          passwordError: LoginErrors.password
        });
      }
      return false;
    }
    return true;
  }

  handleLogin(e) {
    e.preventDefault();
    if (this._checkLoginValid()) {
      this.setState({
        isSubmitting: true
      });
      this._login();
    }
  }

  _checkUpdatePasswordValid() {
    const { oldPassword, newPassword, confirmPassword } = this.state;
    if (!oldPassword || !newPassword || !confirmPassword) {
      if (!oldPassword) {
        this.setState({
          oldPasswordError: LoginErrors.oldPassword
        });
      }
      if (!newPassword) {
        this.setState({
          newPasswordError: LoginErrors.newPassword
        });
      }
      if (!confirmPassword) {
        this.setState({
          confirmPasswordError: LoginErrors.confirmPassword
        });
      }
      return false;
    }
    return true;
  }

  handleUpdatePassword(e) {
    e.preventDefault();
    if (this._checkUpdatePasswordValid()) {
      this._updatePassword();
    }
  }

  renderLoginForm() {
    const { user, password, userError, passwordError, isSubmitting } = this.state;
    return (
      <form className="login-form">
        <div className="input-wrapper name">
          <img src={UserIcon} alt="user" className="icon" />
          <input
            className={`input${userError && ' invalid'}`}
            value={user}
            onChange={this.handleInputChange.bind(this, 'user')}
            placeholder="请输入用户名"
          />
          <p className="input-error">
            {userError}
          </p>
        </div>
        <div className="input-wrapper password">
          <img src={PwdIcon} alt="password" className="icon" />
          <input
            className={`input${passwordError && ' invalid'}`}
            type="password"
            value={password}
            onChange={this.handleInputChange.bind(this, 'password')}
            placeholder="请输入密码"
          />
          <p className="input-error">
            {passwordError}
          </p>
        </div>
        <button className={`btn-login${isSubmitting ? ' disabled' : ''}`} type="submit" onClick={this.handleLogin.bind(this)} disabled={isSubmitting}>
          登录
        </button>
      </form>
    );
  }

  render() {
    const { authError, loading } = this.state;
    if (loading) {
      return <Loading />;
    }

    return (
      <div className="login-wrapper">
        <div className="login-body">
          <div className="logo_title">
            <div className="lm_logo"><img src={LogoImg} alt="Huayun" /></div>
          </div>
          <div className="login-form-wrapper">
            {
              authError
                ? <div className="auth-error-wrapper">
                  {authError}
                </div>
                : null
            }
            {this.renderLoginForm()}
            <p style={{ color: 'rgba(0,0,0,0.65)', fontSize: 12, padding: '0 16px' }}>
              为避免兼容性问题，请使用Chrome、Firefox、Safari或IE11及以上版本浏览器
            </p>
          </div>
        </div>
        <footer className="main-footer">Copyright © 2008-2019 华云数据版权所有</footer>
      </div>
    );
  }
}
