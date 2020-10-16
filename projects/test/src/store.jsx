/*
 * @Author: Squall Sha
 * @Date: 2019-11-20 15:30:00
 */

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers';
import epics from './epics';

const history = createBrowserHistory();
const epicMiddleware = createEpicMiddleware();

export const storeInstance = createStore(combineReducers({ namespace: () => 'frames', rootReducer }), applyMiddleware(epicMiddleware));
epicMiddleware.run(epics);
export { history };
