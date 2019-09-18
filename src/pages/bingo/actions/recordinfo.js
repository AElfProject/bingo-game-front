import { request } from '../../../common/request';
import { API_PATH } from '../../../common/constants';

export const SERVICE_TOP_RECORDS = {
  SERVICE_TOP_RECORDS_REQUEST: 'SERVICE_TOP_RECORDS_REQUEST',
  SERVICE_TOP_RECORDS_SUCCESS: 'SERVICE_TOP_RECORDS_SUCCESS',
  SERVICE_TOP_RECORDS_FAIL: 'SERVICE_TOP_RECORDS_FAIL'
};

export const getTopRecords = params => async dispatch => {
  dispatch({
    type: SERVICE_TOP_RECORDS.SERVICE_TOP_RECORDS_REQUEST,
    payload: params
  });
  try {
    const data = await request(API_PATH.TOP_RECORDS, params, { method: 'GET' });
    dispatch({
      type: SERVICE_TOP_RECORDS.SERVICE_TOP_RECORDS_SUCCESS,
      payload: data
    });
  } catch (e) {
    dispatch({
      type: SERVICE_TOP_RECORDS.SERVICE_TOP_RECORDS_FAIL,
      payload: {}
    });
  }
};


export const SERVICE_PERSONAL_RECORDS = {
  SERVICE_PERSONAL_RECORDS_REQUEST: 'SERVICE_PERSONAL_RECORDS_REQUEST',
  SERVICE_PERSONAL_RECORDS_SUCCESS: 'SERVICE_PERSONAL_RECORDS_SUCCESS',
  SERVICE_PERSONAL_RECORDS_FAIL: 'SERVICE_PERSONAL_RECORDS_FAIL'
};

export const getPersonalRecords = params => async dispatch => {
  dispatch({
    type: SERVICE_PERSONAL_RECORDS.SERVICE_PERSONAL_RECORDS_REQUEST,
    payload: params
  });
  try {
    const data = await request(API_PATH.PERSONAL_RECORDS, params, { method: 'GET' });
    dispatch({
      type: SERVICE_PERSONAL_RECORDS.SERVICE_PERSONAL_RECORDS_SUCCESS,
      payload: data
    });
  } catch (e) {
    dispatch({
      type: SERVICE_PERSONAL_RECORDS.SERVICE_PERSONAL_RECORDS_FAIL,
      payload: {}
    });
  }
};

export const SERVICE_RECORDS_RESULT = {
  SERVICE_RECORDS_RESULT_REQUEST: 'SERVICE_RECORDS_RESULT_REQUEST',
  SERVICE_RECORDS_RESULT_SUCCESS: 'SERVICE_RECORDS_RESULT_SUCCESS',
  SERVICE_RECORDS_RESULT_FAIL: 'SERVICE_RECORDS_RESULT_FAIL'
};

export const saveRecordsResult = params => async dispatch => {
  dispatch({
    type: SERVICE_RECORDS_RESULT.SERVICE_RECORDS_RESULT_REQUEST,
    payload: params
  });
  try {
    const data = await request(API_PATH.RECORD_RESULT, params);
    dispatch({
      type: SERVICE_RECORDS_RESULT.SERVICE_RECORDS_RESULT_SUCCESS,
      payload: data
    });
  } catch (e) {
    dispatch({
      type: SERVICE_RECORDS_RESULT.SERVICE_RECORDS_RESULT_FAIL,
      payload: {}
    });
  }
};
