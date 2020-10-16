/*
 * @Author: Squall Sha
 * @Date: 2020-02-21 16:04:55
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-10-16 17:43:51
 */

/* eslint react/no-unused-state: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// 大组件可以用loadable来分离
// import loadable from '@loadable/component';
import { Layout } from 'antd';
import { fetchRequest } from './actions';
import Header from './layout/header';

@connect(
  state => ({ ...state }),
  dispatch => (bindActionCreators({ fetchRequest }, dispatch))
)

class Root extends React.Component {

  constructor(props) {
    super(props);
    // console.log(props.globalEventDistributor);
    this.state = {
      // token: cookies.get('token') || ''
      // collapsed: false
    };
  }

  render() {
    return (
      <Layout>
        <Header
          className="header"
          onClick={this.handleClickLogo}
        />
      </Layout>
    );
  }
}

export default Root;
