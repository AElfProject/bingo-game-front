/**
 * @file base info
 * @author atom-yang
 */
import { BASE_INFO } from '../actions/base';

console.log(BASE_INFO);

const initialState = {
  hasRegistered: false, // have registered or not
  isLogin: false,
  wallet: null
};

export const baseInfo = (state = initialState, { type, payload }) => {
  console.log(payload);
  switch (type) {
    default:
      return state;
  }
};
