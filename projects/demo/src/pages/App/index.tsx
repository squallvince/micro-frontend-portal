/*
 * @Author: Squall Sha 
 * @Date: 2020-10-14 15:48:50 
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-10-20 10:49:05
 */

// import React from 'react';
import React, { FC } from 'react';
import { Row, Col, Card } from 'antd';
import { Chart, LineAdvance, Interval } from 'bizcharts';
import 'antd/dist/antd.css';

// 数据源
const LineData = [
	{
		month: 'Jan',
		city: 'Tokyo',
		temperature: 7
	},
	{
		month: 'Jan',
		city: 'London',
		temperature: 3.9
	},
	{
		month: 'Feb',
		city: 'Tokyo',
		temperature: 13
	},
	{
		month: 'Feb',
		city: 'London',
		temperature: 4.2
	},
	{
		month: 'Mar',
		city: 'Tokyo',
		temperature: 16.5
	},
	{
		month: 'Mar',
		city: 'London',
		temperature: 5.7
	},
	{
		month: 'Apr',
		city: 'Tokyo',
		temperature: 14.5
	},
	{
		month: 'Apr',
		city: 'London',
		temperature: 8.5
	},
	{
		month: 'May',
		city: 'Tokyo',
		temperature: 10
	},
	{
		month: 'May',
		city: 'London',
		temperature: 11.9
	},
	{
		month: 'Jun',
		city: 'Tokyo',
		temperature: 7.5
	},
	{
		month: 'Jun',
		city: 'London',
		temperature: 15.2
	},
	{
		month: 'Jul',
		city: 'Tokyo',
		temperature: 9.2
	},
	{
		month: 'Jul',
		city: 'London',
		temperature: 17
	},
	{
		month: 'Aug',
		city: 'Tokyo',
		temperature: 14.5
	},
	{
		month: 'Aug',
		city: 'London',
		temperature: 16.6
	},
	{
		month: 'Sep',
		city: 'Tokyo',
		temperature: 9.3
	},
	{
		month: 'Sep',
		city: 'London',
		temperature: 14.2
	},
	{
		month: 'Oct',
		city: 'Tokyo',
		temperature: 8.3
	},
	{
		month: 'Oct',
		city: 'London',
		temperature: 10.3
	},
	{
		month: 'Nov',
		city: 'Tokyo',
		temperature: 8.9
	},
	{
		month: 'Nov',
		city: 'London',
		temperature: 5.6
	},
	{
		month: 'Dec',
		city: 'Tokyo',
		temperature: 5.6
	},
	{
		month: 'Dec',
		city: 'London',
		temperature: 9.8
	}
];

const BarData = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 45 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
];

const App: FC = () => {
  return (
    <>
      <Row>
        <Col span={12} order={1}>
          <Chart padding={[10, 20, 50, 40]} autoFit height={300} data={LineData} >
            <LineAdvance
              shape="smooth"
              point
              area
              position="month*temperature"
              color="city"
            />
          </Chart>
        </Col>
        <Col span={12} order={2}>
          <Chart height={300} autoFit data={BarData} >
            <Interval position="year*sales"  />
          </Chart>
        </Col>
      </Row>
      <Row>
      <Col span={12} order={1}>
        <Chart padding={[10, 20, 50, 40]} autoFit height={300} data={LineData} >
          <LineAdvance
            shape="smooth"
            point
            area
            position="month*temperature"
            color="city"
          />
        </Chart>
      </Col>
      <Col span={12} order={2}>
        <Chart height={300} autoFit data={BarData} >
          <Interval position="year*sales"  />
        </Chart>
      </Col>
    </Row>
	<Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </>
  );
};

// class AppComponent extends React.Component<any, any> {

//   render() {
//     return (
//       <div className='App'>
//         <Button type='primary'>Button</Button>
//       </div>
//     );
//   }
// }

export default App;
