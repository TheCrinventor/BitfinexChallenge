import { fromJS } from 'immutable';
import * as types from '../constants/ActionTypes';


const initialState = fromJS({
  orderbook:{
    isFetching: false,
    isFetchingError: false,
    data: null
  }
});


export default function(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_ORDERBOOK_DATA_INIT:
    return state.mergeIn(['orderbook'], {
      isFetching: true,
      isFetchingError: false
    });
    case types.LOAD_ORDERBOOK_DATA_SUCCESS:
    return state.mergeIn(['orderbook'], {
      isFetching: false,
      isFetchingError: false,
      market: action.market,
      data: action.data,
      base: action.base,
      quote: action.quote
    });
    case types.LOAD_ORDERBOOK_DATA_ERROR:
    return state.mergeIn(['orderbook'], {
      isFetching: true,
      isFetchingError: false,
      error: action.error
    });
    default:
    return state;
  }
}
