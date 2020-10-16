/*
 * @Author: Squall Sha 
 * @Date: 2020-10-15 17:25:00 
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-10-16 18:08:50
 */

import { RouteProps } from 'react-router-dom';
import App from 'pages/App';

const routes: RouteProps[] = [
  {
    component: App as any,
    exact: true,
    path: '/demo'
    // routes: [{
    //   path: '/404',
    //   404: 
    // }]
  }

];

export default routes;