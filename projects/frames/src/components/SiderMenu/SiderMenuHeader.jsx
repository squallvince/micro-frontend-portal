import React from 'react';
import { Popover, Tabs, Button, Radio } from 'antd';
import IconFont from '../IconFont';
import './index.less';

const { TabPane } = Tabs;


class SiderMenuHeader extends React.Component {
  constructor(props) {
    super(props);
    const envNow = props.envData.find(item => item.id === props.env);
    const zoneNow = envNow ? envNow.zones.find(zone => zone.id === props.zoneId) : null;
    this.state = {
      env: props.env,
      zoneId: props.zoneId,
      zoneName: zoneNow ? zoneNow.name : ''
    };
  }

  handleEnv = (activeKey) => {
    const { envData } = this.props;
    const envNow = envData.find(item => item.id === activeKey);
    this.setState({
      env: activeKey,
      zoneId: envNow && envNow.zones[0].id,
      zoneName: envNow && envNow.zones[0].name
    });
    // 更新外层环境信息
    this.props.updateEnvZone('env', activeKey);
  };

  handleZone = (event) => {
    const target = event.target;
    this.setState({
      zoneId: target.value,
      zoneName: target.title
    });
    // 更新外层区域信息
    this.props.updateEnvZone('zoneId', target.value);
  };

  render() {
    const { env, zoneId, zoneName } = this.state;
    const { collapsed, envData } = this.props;
    return (
      <div style={{ width: '100%' }}>
        <Popover
          placement="bottomLeft"
          trigger="click"
          content={
            <div className="hy-sider-search-box">
              <Tabs
                defaultActiveKey={env}
                activeKey={env}
                onChange={this.handleEnv}
                tabPosition="left"
                style={{ height: 220 }}
                tabBarGutter={8}
                type="card"
              >
                {
                  envData.map(item => (
                  <TabPane
                    className="hy-sider-search-tabPane"
                    tab={item.name}
                    key={item.id}
                  >
                    <div className="hy-sider-search-zone-title">可选区域</div>
                    <div className="hy-sider-search-zone">
                      <Radio.Group
                        onChange={this.handleZone}
                        defaultValue={zoneId}
                        value={zoneId}
                        size="large"
                      >
                        {
                          item.zones.map(zone => (
                            <Radio.Button
                              key={zone.id}
                              value={zone.id}
                              title={zone.name}
                            >
                              {zone.name}
                              <IconFont className="hy-sider-icon" type="icon-correct" />
                            </Radio.Button>
                          ))
                        }
                      </Radio.Group>
                    </div>
                  </TabPane>
                  ))
                }
              </Tabs>
            </div>
          }
        >
          <Button className="hy-sider-search-button">
            {!collapsed ? zoneName : undefined}
            <IconFont type="icon-down_t" />
          </Button>
        </Popover>
      </div>
    );
  }
}

export default SiderMenuHeader;
