/*
 * @Author: Squall Sha
 * @Date: 2020-02-21 16:04:55
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-03-11 11:02:53
 */

/* eslint react/no-unused-state: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
// 大组件可以用loadable来分离
// import loadable from '@loadable/component';
import { Layout } from 'antd';
import { fetchRequest } from './actions';
import Header from './layout/header';
import Sider from './layout/sider';
import Main from './layout/main';
import './style/index.less';

const { Footer } = Layout;

// const HeaderLayout = loadable(() => import('./components/Header'));

@connect(
  state => ({ ...state }),
  dispatch => (bindActionCreators({ fetchRequest }, dispatch))
)

class Frames extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    console.log(props.globalEventDistributor);
    this.state = {
      // token: cookies.get('token') || ''
      // collapsed: false
    };
    this.handleClickLogo = this.handleClickLogo.bind(this);
  }

  checkAuth() {
    const { cookies } = this.props;
    const token = cookies.get('token');
    if (!token) {
      window.singleSpaNavigate('login');
    }
  }

  handleClickLogo() {
    // console.log(123);
  }

  componentDidMount() {
    this.checkAuth();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('nextProps', nextProps);
    // console.log('nextProps', prevState);
    return null;
  }

  render() {
    return (
      <Layout>
        <Header
          className="header"
          onClick={this.handleClickLogo}
        />
        <Layout>
          <Sider
            className="sider"
          />
          <Main
            className="main"
          />
        </Layout>
        <Footer className="footer">Micro Frontend Portal ©2020 Created by Squall Sha</Footer>
      </Layout>
    );
  }
}

export default withCookies(Frames);
