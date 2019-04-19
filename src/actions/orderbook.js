import * as types from '../constants/ActionTypes';
import socketManager from '../utils/socketManager';
import { normalizeOrderbookData } from '../normalizers/orderbook';
import { getBaseAndQuoteFromMarketName } from '../utils/common';

const Handlers = {
  loadOrderbookData: {
    init() {
      return {
        type: types.LOAD_ORDERBOOK_DATA_INIT
      };
    },
    success(market, base, quote, data) {
      return {
        type: types.LOAD_ORDERBOOK_DATA_SUCCESS,
        base,
        quote,
        market,
        data
      };
    },
    error(error) {
      return {
        type: types.LOAD_ORDERBOOK_DATA_ERROR,
        error
      };
    },
  }
}
const Actions = {
  loadOrderbookData(marketName) {
    const handler = Handlers.loadOrderbookData;
    return (dispatch, getState) => {
      dispatch(handler.init());
      const { base, quote } = getBaseAndQuoteFromMarketName(marketName);
      const market = `${base}${quote}`;
      return socketManager.subscribeToOrderbook(market, null, null,  
      json => {
        const normalizedResponse = normalizeOrderbookData(getState, json);
        if(normalizedResponse){
          dispatch(handler.success(market, base, quote, normalizedResponse));
        }
      },
        error => dispatch(handler.error(error))
      );
    };
  },
}

export default Actions;