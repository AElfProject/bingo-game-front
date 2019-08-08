/**
 * @file bingo utils
 * @author atom-yang
 */

import store from 'store2';
import { STORE_KEY } from '../../../common/constants';

export const hasRegistered = () => store.has(STORE_KEY.ADDRESS) && store.has(STORE_KEY.KEY_STORE);
