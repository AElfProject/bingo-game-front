/**
 * @file userInfo reducer
 * @author atom-yang
 */
import { SERVICE_FETCH_LIST } from '../actions/userInfo';

const initialState = {
  params: {
    pageSize: 20,
    pageNum: 1,
    orderId: undefined,
    orderStatus: undefined,
    phone: undefined,
    address: undefined
  },
  isFetching: true,
  hasError: false,
  list: [],
  totalNum: 0
};

export const userInfo = (state = initialState, { type, payload }) => {
  switch (type) {
    case SERVICE_FETCH_LIST.SERVICE_FETCH_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
        hasError: false,
        params: {
          ...state.params,
          ...payload
        }
      };
    case SERVICE_FETCH_LIST.SERVICE_FETCH_LIST_SUCCESS:
      return {
        ...state,
        ...payload,
        isFetching: false,
        hasError: false,
      };
    case SERVICE_FETCH_LIST.SERVICE_FETCH_LIST_FAIL:
      return {
        ...state,
        isFetching: false,
        hasError: true,
        list: [],
        totalNum: 0
      };
    default:
      return state;
  }
};
