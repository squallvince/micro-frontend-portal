import thunkMiddleware from 'redux-thunk';
import { auth } from 'store/auth/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';

const rootReducer = combineReducers({
  auth
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middleware = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middleware);
  return createStore(rootReducer, composeWithDevTools(middleWareEnhancer));
}
