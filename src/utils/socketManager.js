/* eslint-disable no-console */


const subsribeToChannel = (request, onOpenCallback, onCloseCallback, onMessageCallback) => {
  const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
  
  socket.onmessage = (response) => {
    if(response.data){
      onMessageCallback(JSON.parse(response.data))
    }
  };
  socket.onerror = (error) => {
    console.log('************ERRROR********** ', error);
  }
  socket.onopen = () => {
    socket.send(request);
    onOpenCallback && onOpenCallback();
  }
  socket.onclose = () => {
    onCloseCallback && onCloseCallback();
  }

  return socket;
}

const subscribeToTicker = (market, onOpenCallback, onCloseCallback, onMessageCallback) => {
  const request = JSON.stringify({ 
    event: 'subscribe', 
    channel: 'ticker', 
    symbol: `t${market}` 
  });
  
  const socket = subsribeToChannel(request, onOpenCallback, onCloseCallback, onMessageCallback);

  return socket;
}

const subscribeToTrades = (market, onOpenCallback, onCloseCallback, onMessageCallback) => {
  const request = JSON.stringify({ 
    event: 'subscribe', 
    channel: 'trades', 
    symbol: `t${market}` 
  });
  const socket = subsribeToChannel(request, onOpenCallback, onCloseCallback, onMessageCallback);
  return socket;
}

const subscribeToOrderbook = (market, onOpenCallback, onCloseCallback, onMessageCallback) => {
  const request = JSON.stringify({ 
    event: 'subscribe', 
    channel: 'book', 
    symbol: `t${market}`,
    frequency: 'F1'
  });
  const socket = subsribeToChannel(request, onOpenCallback, onCloseCallback, onMessageCallback);
  return socket;
}

export default {
  subscribeToTicker,
  subscribeToTrades,
  subscribeToOrderbook
};