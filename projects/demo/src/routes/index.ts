/*
 * @Author: Squall Sha 
 * @Date: 2020-10-15 17:25:00 
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-10-20 14:50:11
 */

import { RouteProps } from 'react-router-dom';
import App from 'pages/App';
import List from 'pages/App/List';

const routes: RouteProps[] = [
  {
    component: App as any,
    path: '/'
  },
  {
    path: '/list',
    component: List as any
  }
];

export default routes;