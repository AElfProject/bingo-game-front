import { SERVICE_FETCH_LIST } from '../actions/recordinfo';

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

// action类型，可改为enum类型
export const recordInfo = (state = initialState, { type, payload }) => {
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
