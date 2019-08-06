/**
 * @file root reducer
 * @author atom-yang
 */
import { combineReducers } from 'redux';

import { userInfo } from './userInfo';

export const rootReducer = combineReducers({
  userInfo,
});
