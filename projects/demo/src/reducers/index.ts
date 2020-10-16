/*
 * @Author: Squall Sha 
 * @Date: 2020-10-16 10:29:13 
 * @Last Modified by: Squall Sha
 * @Last Modified time: 2020-10-16 10:36:33
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
// import { weatherReducer, WeatherState } from './WeatherReducer';
// import { mapReducer, MapState } from './MapReducer';

// export type RootState = {
//   weather: WeatherState;
//   map: MapState;
// };

const reducers = (history: History) => combineReducers({
  router: connectRouter(history)
})

export default reducers;
