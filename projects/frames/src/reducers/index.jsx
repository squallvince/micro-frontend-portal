/*
 * @Author: Squall Sha
 * @Date: 2019-11-20 15:30:00
 */

import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE
} from '../constants';

const initialState = {
  whiskies: [],
  isLoading: false,
  error: null
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        // whenever we want to fetch the whiskies, set isLoading to true to show a spinner
        isLoading: true,
        error: null
      };
    case FETCH_SUCCESS:
      return {
        whiskies: [...action.payload],
        // whenever the fetching finishes, we stop showing the spinner and then show the data
        isLoading: false,
        error: null
      };
    case FETCH_FAILURE:
      return {
        whiskies: [],
        isLoading: false,
        // same as FETCH_WHISKIES_SUCCESS, but instead of data we will show an error message
        error: action.payload
      };
    default:
      return state;
  }
}
