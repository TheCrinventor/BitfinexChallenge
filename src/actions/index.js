import ticker from './ticker';
import trades from './trades';
import orderbook from './orderbook';

export default {
  ...ticker,
  ...trades,
  ...orderbook
}