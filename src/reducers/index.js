import { combineReducers } from 'redux';
import Ticker from './ticker';
import Trades from './trades';
import Orderbook from './orderbook';

export default combineReducers({
  Ticker,
  Trades,
  Orderbook
});