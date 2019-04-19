import * as types from '../constants/ActionTypes';
import socketManager from '../utils/socketManager';
import { normalizeTradesData } from '../normalizers/trades';
import { getBaseAndQuoteFromMarketName } from '../utils/common';

const Handlers = {
  loadTradesData: {
    init() {
      return {
        type: types.LOAD_TRADES_DATA_INIT
      };
    },
    success(market, base, quote, data) {
      return {
        type: types.LOAD_TRADES_DATA_SUCCESS,
        base,
        quote,
        market,
        data
      };
    },
    error(error) {
      return {
        type: types.LOAD_TRADES_DATA_ERROR,
        error
      };
    },
  }
}
const Actions = {
  loadTradesData(marketName) {
    const handler = Handlers.loadTradesData;
    return dispatch => {
      dispatch(handler.init());
      const { base, quote } = getBaseAndQuoteFromMarketName(marketName);
      const market = `${base}${quote}`;
      return socketManager.subscribeToTrades(market, null, null,  
      json => {
        const normalizedResponse = normalizeTradesData(json);
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