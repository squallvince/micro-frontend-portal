/*
 * @Author: Squall Sha 
 * @Date: 2020-10-15 17:25:00 
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-10-21 14:43:23
 */

import App from 'pages/App';
import List from 'pages/App/List';

let prefix = '/';
if (process.env.mode !== 'independent') {
  prefix = '/demo/';
}

const routes = [
  {
    path: `${prefix}`,
    exact: true,
    component: App as any
  },
  {
    path: `${prefix}list`,
    component: List as any
  }
];

export default routes;