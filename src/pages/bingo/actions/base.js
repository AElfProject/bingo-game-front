/**
 * @file base info actions
 * @author atom-yang
 */
import store from 'store2';
import { STORE_KEY } from '../../../common/constants';

export const BASE_INFO = {
  GET_WALLET_START: 'GET_BASE_INFO_START',
  GET_WALLET_SUCCESS: 'GET_BASE_INFO_SUCCESS',
  GET_WALLET_FAIL: 'GET_BASE_INFO_FAIL',
  SET_WALLET_INFO: 'SET_WALLET_INFO'
};

export const getBaseInfo = () => async dispatch => {
  dispatch({
    type: BASE_INFO.GET_WALLET_START,
    payload: {}
  });
  try {
    const hasRegistered = store.has(STORE_KEY.ADDRESS) && store.has(STORE_KEY.KEY_STORE);
    if (hasRegistered) {

    }
  } catch (e) {
    dispatch({
      type: BASE_INFO.GET_WALLET_FAIL,
      payload: {}
    });
  }
};

export const setWalletInfo = params => ({
  type: BASE_INFO.SET_WALLET_INFO,
  payload: params
});
