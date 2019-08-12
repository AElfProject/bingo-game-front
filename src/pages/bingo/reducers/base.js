/**
 * @file base info
 * @author atom-yang
 */
import { BASE_INFO } from '../actions/base';

const initialState = {
  hasRegistered: false, // have registered or not
  isLogin: false,
  wallet: {},
  username: '',
  count: 0
};

export const baseInfo = (state = initialState, { type, payload }) => {
  switch (type) {
    case BASE_INFO.REGISTER_INFO:
      return {
        ...state,
        hasRegistered: true,
        isLogin: true,
        wallet: payload.wallet,
        username: payload.name,
        count: payload.count
      };
    case BASE_INFO.LOG_IN_BINGO:
      return {
        ...state,
        hasRegistered: true,
        isLogin: true,
        wallet: payload
      };
    default:
      return state;
  }
};
