/*
 * @Author: Squall Sha
 * @Date: 2019-11-14 11:00:00
 */
import React, { Component } from 'react';
// import classnames from 'classnames';
import { Menu } from 'antd';
// import { Link } from '@reach/router';
import IconFont from '../IconFont';
import { PATH_PREFIX } from '../../constants/header';

class Menus extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderSubMenu = (item, inlineCollapsed) => (
    // 为了兼容样式折叠时使用 menu.SubMenu, 展示时使用 menu.ItemGroup
    <Menu.SubMenu
      className="hy-sider-menu-submenu"
      title={
        <span>
          {inlineCollapsed ? <IconFont type={`icon-${item.icon}`}/> : undefined}
          <span className="hy-sider-menu-title">{item.name}</span>
        </span>
      }
      key={item.id}
    >
      {
        item.subMenus.map((last) => {
          return (
            <Menu.Item key={last.id} style={{ paddingLeft: '16px' }} path={last.path}>
              {!inlineCollapsed ? <IconFont type={`icon-${last.icon}`}/> : undefined}
              <span>{last.name}</span>
            </Menu.Item>
          );
        })
      }
    </Menu.SubMenu>
  );

  onSelect = (item) => {
    const path = `${PATH_PREFIX}${item.item.props.path}${this.props.pathSuffix || ''}`;
    window.singleSpaNavigate(path);
  };

  render() {
    const { menu, inlineCollapsed } = this.props;
    return (
      <Menu
        className="hy-sider-menu"
        defaultSelectedKeys={['People']}
        defaultOpenKeys={['9ee8bc17-6b31-4993-9cf3-50a3c4c6f741']}
        mode="inline"
        onSelect={this.onSelect}
        inlineIndent={16}
      >
        {
          menu && menu.map(item => {
            if (item.subMenus !== null) {
              return inlineCollapsed ? this.renderSubMenu(item, inlineCollapsed) : (
                <Menu.ItemGroup
                  className="hy-sider-menu-itemGroup"
                  title={
                    <span>
                      {inlineCollapsed ? <IconFont type={`icon-${item.icon}`}/> : undefined}
                      <span className="hy-sider-menu-title">{item.name}</span>
                    </span>
                  }
                  key={item.id}
                >
                  {
                    item.subMenus.map((last) => {
                      return (
                        <Menu.Item key={last.id} path={last.path} style={{ paddingLeft: '16px' }}>
                          {!inlineCollapsed ? <IconFont type={`icon-${last.icon}`}/> : undefined}
                          <span>{last.name}</span>
                        </Menu.Item>
                      );
                    })
                  }
                </Menu.ItemGroup>
              );
            }
            return (
              <Menu.Item key={item.id} path={item.path}>
                <span>
                  <IconFont type={`icon-${item.icon}`}/>
                  <span>{item.name}</span>
                </span>
              </Menu.Item>
            );
          })
        }
      </Menu>
    );
  }
}

export default Menus;
