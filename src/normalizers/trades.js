import { TRADE_TYPE } from "../constants/common";

export const normalizeTradesData = (data) => {

  switch(data.event){
    case 'info':
    case 'subscribed':
    case 'error':
      console.log(data);
    break;
    default: {
      const response = data[1];
      if(response !== "hb" && Array.isArray(response)){
        return response.map(item => {
          return {
            id: item[0],
            mts: new Date(item[1]),
            amount: Math.abs(item[2]),
            type: item[2] > 0 ? TRADE_TYPE.BUY: TRADE_TYPE.SELL,
            price: item[3]
          }
        })
      }
    }
    break;
  }
  return null;
  
}