/*
 * @Author: Squall Sha
 * @Date: 2019-11-13 11:00:00
 */
/* eslint react/no-unused-state: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// 大组件可以用loadable来分离
// import loadable from '@loadable/component';
import { Layout } from 'antd';
import { SiderMenu } from './components';
import { fetchRequest } from './actions';
import HeaderLayout from './components/Header';
import SiderMenuHeader from './components/SiderMenu/SiderMenuHeader';
import IconFont from './components/IconFont';
import './style/index.less';
import { MANAGE_PORTAL, PATH_PREFIX, ResourceID, gotoLink } from './constants/header';
import Notification from './components/Notification';

const { Footer, Sider, Content } = Layout;

// const HeaderLayout = loadable(() => import('./components/Header'));
window.Notification = Notification;

@connect(
  state => ({ ...state }),
  dispatch => (bindActionCreators({ fetchRequest }, dispatch))
)

class Frames extends React.Component {
  constructor(props) {
    super(props);
    this.envObjData = {};
    this.state = {
      mode: MANAGE_PORTAL, // 当前展示模块，默认展示云管门户
      isLoading: false,
      collapsed: false,
      baseConfig: {}, // site数据
      envData: [], // 云环境数据
      zoneId: undefined,
      env: undefined,
      manageMenu: [], // 云管门户菜单
      operationMenu: [], // 运维门户菜单
      siderMenu: {}, // 云管左侧二级菜单展示
      currentMenuId: '', // 当前选中一级菜单ID
      menu: {} // 菜单原始数据
    };
  }

  componentDidMount() {
    this.getUserPermission();
    this.getSite();
    this.getUserEnv();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('nextProps', nextProps);
    // console.log('nextProps', prevState);
    return null;
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return true;
  // }

  getSite = () => {
    //  mock get web image
    window.PromiseFetch('/api/platform/getSite', {}, 'post').then((data) => {
      this.setState({
        baseConfig: data.data
      }, () => {
        if (data.data) {
          document.getElementById('icon-link').href = data.data.siteIcon;
          document.title = data.data.siteTitle;
        }
      });
    });
  };

  // 菜单分开处理, 返回 { manageMenu, operationMenu, siderMenu }
  formatMenus = (menus) => {
    const manageMenu = []; const operationMenu = []; const siderMenu = [];
    menus.forEach(item => {
      // 标记ResourceID
      window.ResourceID = item.routerKey === 'MenuOverview' ? item.id : '';
      if (item.authList && item.authList[0] === 'Operation') {
        operationMenu.push(item);
      } else {
        manageMenu.push(item);
        siderMenu[item.id] = item.subMenus;
      }
    });
    return {
      manageMenu,
      operationMenu,
      siderMenu
    };
  };

  getUserPermission = () => {
    //  mock get menu data
    this.setState({
      isLoading: true
    });
    window.PromiseFetch('/api/identity/getUserPermission', {}, 'post').then((data) => {
      const menuData = data.data;
      // menuData.menus.push({
      //   authList: [],
      //   cloudEnvironments: ['ArcherOS'],
      //   createTime: '2019-11-28 01:44:43',
      //   description: '',
      //   hidden: false,
      //   icon: 'done',
      //   id: '1c9aae77-333f-495c-ace4-1e1e581792eb',
      //   langCode: 'CS',
      //   name: 'CloudSuite',
      //   orderNo: 10,
      //   parentId: '0',
      //   path: '/front',
      //   permissions: [],
      //   routerKey: 'MenuResource',
      //   subMenus: [],
      //   updateTime: '2019-11-28 01:44:43'
      // });

      // const { manageMenu, operationMenu, siderMenu } = this.state;
      // menuData.menus.forEach(item => {
      //   if (item.authList && item.authList[0] === 'Operation') {
      //     operationMenu.push(item);
      //   } else {
      //     manageMenu.push(item);
      //     // 资源需要 url 后缀env&zoneId，需要云环境和区域
      //     siderMenu[item.id] = item.subMenus;
      //   }
      // });
      const { manageMenu, operationMenu, siderMenu } = this.formatMenus(menuData.menus);
      this.setState({
        menu: menuData || {},
        currentMenuId: manageMenu[1].id,
        manageMenu,
        operationMenu,
        siderMenu,
        isLoading: false
      });
    }).catch(() => {
      // console.log('error');
      this.setState({
        isLoading: false
      });
      // 请求出错可以在这里控制显示
      // window.Notification.error({
      //   message: '错误',
      //   duration: 0
      // });
    });
  };

  getUserEnv = () => {
    window.PromiseFetch('/api/resource/listEnvironment', {}, 'post').then((data) => {
      const envData = data.data;
      const firstEnv = data.data && data.data[0];
      const env = firstEnv.id;
      const zoneId = firstEnv.zones.length ? firstEnv.zones[0].id : undefined;
      // 初始化云环境数据，菜单后缀
      envData.forEach(item => this.envObjData[item.id] = { item, name: item.hypervisorType || item.name });
      this.setState({
        envData,
        env,
        zoneId
      });
    }).catch(() => {
      // 请求出错可以在这里控制显示
      // window.Notification.error({
      //   message: '错误',
      //   duration: 0
      // });
    });
  };

  handleCurrentMenu = (rootId, subMenu) => {
    this.setState({
      currentMenuId: rootId
    });
    const { env, zoneId, manageMenu } = this.state;
    // 顶层路由改变，跳转到相应路由，并选中侧边菜单
    const currentMenuItem = manageMenu.find(item => item.id === rootId);
    if (subMenu && subMenu.id) {
      // TODO: 更新侧边栏菜单选中
      gotoLink(subMenu.path, currentMenuItem.id, this.getPathSuffix(env, zoneId));
    } else {
      // 默认跳转到根目录下的路由
      gotoLink(currentMenuItem.path, currentMenuItem.id, this.getPathSuffix(env, zoneId));
    }
  };

  handleCollapsedToggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed
    });
  };

  getPathSuffix = (env, zoneId) => {
    const envName = this.envObjData[env] ? this.envObjData[env].name : env;
    return `?env=${envName}&zoneId=${zoneId}`;
  };

  handleUpdateEnvZone = (target, value) => {
    if (target === 'zoneId' || target === 'env') {
      this.setState({
        [`${target}`]: value
      }, () => {
        // 当前路由刷新, 到概览页面
        const { env, zoneId } = this.state;
        const path = `${PATH_PREFIX}/resource/overview`;
        const envName = this.envObjData[env] ? this.envObjData[env].name : env;
        window.singleSpaNavigate(`${path}?env=${envName}&zoneId=${zoneId}`);
      });

    } else {
      // console.error('非有效参数');
    }
  };

  renderMenuTitle = (data) => {
    data = data[0];
    const { envData, env, zoneId, collapsed } = this.state;
    const hasEnvContent = ResourceID === data.id;
    // console.log('====props', env, zoneId, envData);
    const HeaderTitle = () => (
      <div className="hy-sider-header-title">
          <span>
            <IconFont type={`icon-${data.icon}`}/>
            <span>{data.name}</span>
          </span>
      </div>
    );
    // 云环境组件
    const EnvContent = () => (
      <div className="hy-sider-header-search">
        <SiderMenuHeader
          collapsed={collapsed}
          envData={envData}
          zoneId={zoneId}
          env={env}
          updateEnvZone={this.handleUpdateEnvZone}
        />
      </div>
    );

    if (collapsed) {
      // 折叠菜单
      if (hasEnvContent) {
        return (
          <div className="hy-sider-header">
            <EnvContent />
          </div>
        );
      }
      return undefined;

    }
    // 未折叠菜单
    return (
        <div className="hy-sider-header">
          <HeaderTitle />
          {
            hasEnvContent ? (
              <EnvContent />
            ) : undefined
          }
        </div>
    );
  };

  // 运维/云管不同模式页面显示控制
  handleMode = (mode) => {
    this.setState({
      mode
    });
    // 切换模块后菜单跳转
    const path = mode === MANAGE_PORTAL ? `${PATH_PREFIX}/overview` : `${PATH_PREFIX}/operation/overview`;
    window.singleSpaNavigate(path);
  };

  render() {
    const { isLoading, collapsed, baseConfig, manageMenu, operationMenu, siderMenu, currentMenuId, mode, env, zoneId } = this.state;
    const isMangePortal = mode === MANAGE_PORTAL;
    const isResourceMenu = currentMenuId === ResourceID;
    const currentSiderMenus = isMangePortal ? siderMenu[currentMenuId] : operationMenu; // 当前侧边栏菜单
    const currentMenuItem = manageMenu.filter(item => item.id === currentMenuId); // 当前侧边栏标题、云环境（云管)
    const envName = this.envObjData[env] ? this.envObjData[env].name : env; // 时时刷新
    const pathSuffix = isMangePortal && isResourceMenu ? `?env=${envName}&zoneId=${zoneId}` : '';
    return (
      <div>
      {
        isLoading ? (
          'loading'
        ) : (
          <Layout className="hy-container">
            <HeaderLayout
              siteData={baseConfig}
              menu={manageMenu}
              pathSuffix={pathSuffix}
              mode={mode}
              currentMenu={this.handleCurrentMenu}
              changeMode={this.handleMode}
            />
            <Layout>
              {// 标题 + 菜单
                currentSiderMenus ? (
                  <Sider
                    width={216}
                    trigger={null}
                    collapsible
                    collapsedWidth={64}
                    collapsed={collapsed}
                  >
                    {isMangePortal ? this.renderMenuTitle(currentMenuItem) : undefined}
                    <SiderMenu
                      inlineCollapsed={collapsed}
                      menu={currentSiderMenus}
                      pathSuffix={pathSuffix}
                    />
                    <div className="hy-sider-menu-button" onClick={this.handleCollapsedToggle}>
                      <IconFont type={`${collapsed ? 'icon-right' : 'icon-left'}`} />
                    </div>
                  </Sider>
                ) : undefined
              }
              <Layout>
                <Content className="hy-content">
                  <div id="app">
                    front
                  </div>
                </Content>
                <Footer>{baseConfig.siteBottom}</Footer>
              </Layout>
            </Layout>
          </Layout>
        )
      }
    </div>
    );
  }
}

export default Frames;
