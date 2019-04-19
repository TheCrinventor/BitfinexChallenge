/* eslint-disable no-console */
export const normalizeTickerData = (data) => {
    switch(data.event){
      case 'info':
      case 'subscribed':
      case 'error':
        console.log(data);
      break;
      default: {
        const response = data[1];
        if(response !== "hb"){
          return {
            bid: response[0],
            bidSize: response[1],
            ask: response[2],
            askSize: response[3],
            dailyChange: response[4],
            dailyChangePercentage: response[5],
            lastPrice: response[6],
            volume: response[7],
            high: response[8],
            low: response[9],
          };
        }
      }
      break;
    }
    return null;
}