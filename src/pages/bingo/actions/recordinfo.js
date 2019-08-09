import { request } from '../../../common/request';
import { API_PATH } from '../../../common/constants';

export const SERVICE_FETCH_LIST = {
  SERVICE_FETCH_LIST_REQUEST: 'SERVICE_FETCH_LIST_REQUEST',
  SERVICE_FETCH_LIST_SUCCESS: 'SERVICE_FETCH_LIST_SUCCESS',
  SERVICE_FETCH_LIST_FAIL: 'SERVICE_FETCH_LIST_FAIL'
};

export const getRecords = params => async dispatch => {
  dispatch({
    type: SERVICE_FETCH_LIST.SERVICE_FETCH_LIST_REQUEST,
    payload: params
  });
  try {
    const data = await request(API_PATH.TEST, params);
    dispatch({
      type: SERVICE_FETCH_LIST.SERVICE_FETCH_LIST_SUCCESS,
      payload: data
    });
  } catch (e) {
    dispatch({
      type: SERVICE_FETCH_LIST.SERVICE_FETCH_LIST_FAIL,
      payload: {}
    });
  }
};
