import * as types from '../constants/ActionTypes';
import socketManager from '../utils/socketManager';
import { normalizeTickerData } from '../normalizers/tickers';
import { getBaseAndQuoteFromMarketName } from '../utils/common';

const Handlers = {
  loadTickerData: {
    init() {
      return {
        type: types.LOAD_TICKER_DATA_INIT
      };
    },
    success(market, base, quote, data) {
      return {
        type: types.LOAD_TICKER_DATA_SUCCESS,
        base,
        quote,
        market,
        data
      };
    },
    error(error) {
      return {
        type: types.LOAD_TICKER_DATA_ERROR,
        error
      };
    },
  }
}
const Actions = {
  loadTickerData(marketName) {
    const handler = Handlers.loadTickerData;
    return dispatch => {
      dispatch(handler.init());
      const { base, quote } = getBaseAndQuoteFromMarketName(marketName);
      const market = `${base}${quote}`;
      return socketManager.subscribeToTicker(market, null, null,  
      json => {
        const normalizedResponse = normalizeTickerData(json);
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