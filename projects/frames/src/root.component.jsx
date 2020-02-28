/*
 * @Author: Squall Sha
 * @Date: 2020-02-21 16:04:55
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-02-27 14:34:07
 */

/* eslint react/no-unused-state: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
// 大组件可以用loadable来分离
// import loadable from '@loadable/component';
import { Layout, Breadcrumb } from 'antd';
import { fetchRequest } from './actions';
import Header from './layout/header';
import Sider from './layout/sider';
import './style/index.less';

const { Content, Footer } = Layout;

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
    console.log(props);
    this.state = {
      // token: cookies.get('token') || ''
      // collapsed: false
    };
  }

  checkAuth() {
    const { cookies } = this.props;
    const token = cookies.get('token');
    if (!token) {
      window.singleSpaNavigate('login');
    }
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
        <Header className="header" />
        <Layout>
          <Sider className="sider" />
          <Layout style={{ padding: '0 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Overview</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
        <Footer className="footer">Micro Frontend Portal ©2020 Created by Squall Sha</Footer>
      </Layout>
    );
  }
}

export default withCookies(Frames);
