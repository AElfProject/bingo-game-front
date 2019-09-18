import { SERVICE_TOP_RECORDS, SERVICE_PERSONAL_RECORDS, SERVICE_RECORDS_RESULT } from '../actions/recordinfo';

const initialTopRecordsState = {
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
  total: 0
};

// action类型，可改为enum类型
export const topRecords = (state = initialTopRecordsState, { type, payload }) => {
  switch (type) {
    case SERVICE_TOP_RECORDS.SERVICE_TOP_RECORDS_REQUEST:
      return {
        ...state,
        isFetching: true,
        hasError: false,
        params: {
          ...state.params,
          ...payload
        }
      };
    case SERVICE_TOP_RECORDS.SERVICE_TOP_RECORDS_SUCCESS:
      return {
        ...state,
        ...payload.data,
        isFetching: false,
        hasError: false,
      };
    case SERVICE_TOP_RECORDS.SERVICE_TOP_RECORDS_FAIL:
      return {
        ...state,
        isFetching: false,
        hasError: true,
        list: [],
        total: 0
      };
    default:
      return state;
  }
};

const initialPersonalRecordsState = {
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
  total: 0
};

export const personalRecords = (state = initialPersonalRecordsState, { type, payload }) => {
  switch (type) {
    case SERVICE_PERSONAL_RECORDS.SERVICE_PERSONAL_RECORDS_REQUEST:
      return {
        ...state,
        isFetching: true,
        hasError: false,
        params: {
          ...state.params,
          ...payload
        }
      };
    case SERVICE_PERSONAL_RECORDS.SERVICE_PERSONAL_RECORDS_SUCCESS:
      return {
        ...state,
        ...payload.data,
        isFetching: false,
        hasError: false,
      };
    case SERVICE_PERSONAL_RECORDS.SERVICE_PERSONAL_RECORDS_FAIL:
      return {
        ...state,
        isFetching: false,
        hasError: true,
        list: [],
        total: 0
      };
    default:
      return state;
  }
};

const initialRecordsResultState = {
  params: {
    phone: undefined,
    address: undefined
  },
  isFetching: true,
  hasError: false,
};

export const recordsResult = (state = initialRecordsResultState, { type, payload }) => {
  switch (type) {
    case SERVICE_RECORDS_RESULT.SERVICE_RECORDS_RESULT_REQUEST:
      return {
        ...state,
        isFetching: true,
        hasError: false,
        params: {
          ...state.params,
          ...payload
        }
      };
    case SERVICE_RECORDS_RESULT.SERVICE_RECORDS_RESULT_SUCCESS:
      return {
        ...state,
        ...payload,
        isFetching: false,
        hasError: false,
      };
    case SERVICE_RECORDS_RESULT.SERVICE_RECORDS_RESULT_FAIL:
      return {
        ...state,
        isFetching: false,
        hasError: true
      };
    default:
      return state;
  }
};
