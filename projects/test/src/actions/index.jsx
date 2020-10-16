/*
 * @Author: Squall Sha
 * @Date: 2019-11-21 11:30:00
 */

import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE
} from '../constants';

export const fetchRequest = (url) => ({
  type: FETCH_REQUEST,
  url
});

export const fetchSuccess = (res) => ({
  type: FETCH_SUCCESS,
  res
});

export const fetchFailure = (message) => ({
  type: FETCH_FAILURE,
  payload: message
});
