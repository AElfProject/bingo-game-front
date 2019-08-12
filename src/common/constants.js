/**
 * @file constants
 * @author atom-yang
 */

// request path
export const API_PATH = {
  INIT_CSRF_TOKEN: '/bingo/initToken',
  REGISTER: '/bingo/register'
};

export const STORE_KEY = {
  KEY_STORE: 'bingo_keystore',
  ADDRESS: 'bingo_wallet_address',
  IS_LOGIN: 'bingo_is_login',
  WALLET_INFO: 'bingo_wallet'
};

export const REG_COLLECTION = {
  NAME_VALID: /^[\u4e00-\u9fa5a-zA-Z0-9]{2,15}$/,
  PASSWORD_VALID: /^[\x20-\xff]{8,16}$/
};
