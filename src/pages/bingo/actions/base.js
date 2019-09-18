/**
 * @file base info actions
 * @author atom-yang
 */

export const BASE_INFO = {
  GET_WALLET_START: 'GET_BASE_INFO_START',
  GET_WALLET_SUCCESS: 'GET_BASE_INFO_SUCCESS',
  GET_WALLET_FAIL: 'GET_BASE_INFO_FAIL',
  REGISTER_INFO: 'REGISTER_INFO',
  LOG_IN_BINGO: 'LOG_IN_BINGO'
};

export const register = params => ({
  type: BASE_INFO.REGISTER_INFO,
  payload: params
});

export const login = params => ({
  type: BASE_INFO.LOG_IN_BINGO,
  payload: params
});
