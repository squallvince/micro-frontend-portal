import React from 'react';
import { connect } from 'react-redux';
// import classNames from 'classnames';
import { Layout, Select, Input, Icon, Tooltip, AutoComplete } from 'antd';
import IconFont from '../IconFont';
import Logo from '../Logo';
import UserMenu from './UserMenu';
// import ProtalMenu from './ProtalMenu';
import ModeMenu from './ModeMenu';
import { MANAGE_PORTAL } from '../../constants/header';
import './index.less';

const { Header } = Layout;
const { Option } = Select;
@connect(
  state => ({
    showSearch: false
    // siteData: state.siteData
  }),
  dispatch => {}
)

class HeaderLayout extends React.Component {
  constructor(props) {
    super(props);
    // 搜索数据源，所有子菜单项
    this.searchResource = this.formatMenuData(props.menu);
    this.state = {
      currentMenu: undefined,
      searchData: [],
      searchValue: ''
    };
  }

  // 扁平化菜单, 添加父级菜单描述
  formatMenuData = (data) => {
    const result = [];
    const queue = [];
    data.forEach(item => {
      if (item.subMenus !== null) {
        queue.push({
          items: item.subMenus,
          parentDesc: item.name,
          rootParent: item.id // 用于判断跳转是否加云环境后缀
        });
      } else {
        result.push({ ...item, parentDesc: item.name });
      }
    });
    while(queue.length) {
      const subs = queue.shift();
      subs.items.forEach(sub => {
        if (sub.subMenus !== null) {
          queue.push({
            items: sub.subMenus,
            parentDesc: `${subs.parentDesc}/${sub.name}`,
            rootParent: subs.rootParent
          });
        } else {
          result.push({ ...sub, parentDesc: subs.parentDesc, rootParent: subs.rootParent });
        }
      });
    }
    return result;
  };

  handleMenuSelect = (value) => {
    this.setState({
      currentMenu: value
    });
    this.props.currentMenu(value);
  };

  handleSearchShow = () => {
    this.setState(prevState => ({ showSearch: !prevState.showSearch }));
  };

  // 菜单搜索结果变化
  handleSearch = searchText => {
    const result = this.searchResource.filter(item => item.name.indexOf(searchText) !== -1);
    this.setState({
      searchData: !searchText ? [] : result
    });
  };

  // 菜单搜索input框变化
  onChange = value => {
    this.setState({ searchValue: value });
  };

  // 菜单搜索结果选中跳转
  onSelect = value => {
    // 跳转&&更新侧边栏菜单选中&&添加环境信息;
    const target = this.searchResource.find(item => item.id === value);
    this.props.currentMenu(target.rootParent, target);
    // 关闭搜索，清空
    this.setState(prevState => ({
      searchValue: '',
      showSearch: !prevState.showSearch
    }));
  };

  render() {
    const { siteData, menu, changeMode, mode } = this.props;
    const { searchData, searchValue, showSearch, currentMenu } = this.state;
    // 搜索菜单结果
    const searchChildren = searchData.map(item => (
      <AutoComplete.Option key={item.id} text={item.name} value={item.id}>
        <div className="menu-search-item">
          <span>{item.name}</span><span>{item.parentDesc}</span>
        </div>
      </AutoComplete.Option>
    ));
    const OperationAlert = () => (
      <div className="hy-header-alert"><IconFont type="icon-message" /></div>
    );
    return (
        <Header className="hy-header">
          <div className="hy-header-left">
            <Logo
              collapsed={false}
              prefixCls="hy"
              src={siteData.platformLogo}
              srcMini={siteData.miniLogo}
              to="/"
            />
            {
              mode === MANAGE_PORTAL ? (
                <div className="hy-menu-manage-use">
                  <Select
                    firstActiveValue="default"
                    defaultActiveFirstOption
                    value={currentMenu}
                    suffixIcon={<Icon type="caret-down" />}
                    className="hy-menu-manage-select"
                    dropdownClassName="hy-menu-manage-dropdown"
                    // notFoundContent={'暂无数据'}
                    placeholder={<div className="hy-fake-menu"><IconFont type="icon-stencil"/>菜单</div>}
                    onChange={this.handleMenuSelect}>
                    {
                      menu.map(item => (<Option key={item.id} value={item.id}>
                        <IconFont type={`icon-${item.icon}`}/>
                        {item.name}
                      </Option>))
                    }
                  </Select>
                  <AutoComplete
                    className="hy-menu-manage-search-box"
                    dropdownClassName="hy-menu-manage-dropdown"
                    style={{ width: 220 }}
                    value={searchValue}
                    dataSource={searchChildren}
                    onSearch={this.handleSearch}
                    onChange={this.onChange}
                    onSelect={this.onSelect}
                    optionLabelProp="text"
                  >
                    <Input
                      className={`hy-menu-manage-search ${showSearch ? 'show' : ''}`}
                      prefix={<IconFont onClick={this.handleSearchShow} type="icon-search" />}
                      suffix=""
                    />
                  </AutoComplete>
                </div>
              ) : undefined
            }
          </div>
          <div className="hy-header-right">
            <ModeMenu
              changeMode={changeMode}
            />
            {
              mode === MANAGE_PORTAL ? (
                <Tooltip placement="bottom" title="点击查看使用手册">
                  <div className="hy-header-question">
                    <a href="http://10.192.13.14/files/book/" target="_blank" rel="noopener noreferrer"><Icon type="question-circle" theme="filled" />&nbsp;</a>
                  </div>
                </Tooltip>
              ) : <OperationAlert />
            }
            <UserMenu />
          </div>
        </Header>
    );
  }
}

export default HeaderLayout;
