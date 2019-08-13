/**
 * @file root reducer
 * @author atom-yang
 */
import { combineReducers } from 'redux';

import { userInfo } from './userInfo';
import { baseInfo } from './base';
import { topRecords, personalRecords, recordsResult } from './recordInfo';

export const rootReducer = combineReducers({
  userInfo,
  base: baseInfo,
  recordInfo: combineReducers({ topRecords, personalRecords, recordsResult })
});
