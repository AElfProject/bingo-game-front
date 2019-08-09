/**
 * @file root reducer
 * @author atom-yang
 */
import { combineReducers } from 'redux';

import { userInfo } from './userInfo';
import { baseInfo } from './base';

export const rootReducer = combineReducers({
  userInfo,
  base: baseInfo
});
