import { TRADE_TYPE } from "../constants/common";

export const normalizeOrderbookData = (getState, data) => {

  switch(data.event){
    case 'info':
    case 'subscribed':
    case 'error':
      console.log(data);
    break;
    default: {
      const response = data[1];
      if(response !== "hb"){
        const result = getState().Orderbook.getIn(['orderbook','data']) || { bids: {}, asks: {}, bidsTotal: 0, asksTotal: 0 };
        if(Array.isArray(response) && Array.isArray(response[0])){
          const parsedResponse = response.map(item => parsedData(item));
          parsedResponse.map(item => {
            if(item.count !== 0){
              if(item.amount > 0){
                const oldAmount = result.bids[item.price] && result.bids[item.price].amount || 0;
                result.bids[item.price] = item;
                result.bidsTotal = result.bidsTotal - oldAmount + item.amount;
              } else {
                const oldAmount = result.asks[item.price] && result.asks[item.price].amount || 0;
                const absoluteItem = { ...item, amount: Math.abs(item.amount)};
                result.asks[item.price] = absoluteItem;
                result.asksTotal = result.asksTotal - oldAmount + absoluteItem.amount;
              }
            } else {
              if(item.amount > 0){
                const oldAmount = result.bids[item.price] && result.bids[item.price].amount || 0;
                delete result.bids[item.price];
                result.bidsTotal = result.bidsTotal - oldAmount;
              } else {
                const oldAmount = result.asks[item.price] && result.asks[item.price].amount || 0;
                delete result.asks[item.price];
                result.asksTotal = result.asksTotal - oldAmount;
              }
            }
          });
        } else {
          const parsedItem = parsedData(response);
          if(parsedItem.count !== 0){
            if(parsedItem.amount > 0){
              const oldAmount = result.bids[parsedItem.price] && result.bids[parsedItem.price].amount || 0;
              result.bids[parsedItem.price] = parsedItem;
              result.bidsTotal = result.bidsTotal - oldAmount + parsedItem.amount;
            } else {
              const oldAmount = result.asks[parsedItem.price] && result.asks[parsedItem.price].amount || 0;
              const absoluteItem = { ...parsedItem, amount: Math.abs(parsedItem.amount)};
              result.asks[parsedItem.price] = absoluteItem;
              result.asksTotal = result.asksTotal - oldAmount + absoluteItem.amount;
            }
          } else {
            if(parsedItem.amount > 0){
              const oldAmount = result.bids[parsedItem.price] && result.bids[parsedItem.price].amount || 0;
              delete result.bids[parsedItem.price];
              result.bidsTotal = result.bidsTotal - oldAmount;
            } else {
              const oldAmount = result.asks[parsedItem.price] && result.asks[parsedItem.price].amount || 0;
              delete result.asks[parsedItem.price];
              result.asksTotal = result.asksTotal - oldAmount;
            }
          }
        }
        
        return {
          ...result
        };
      }
    }
    break;
  }
  return null;
  
}
const parsedData = (data) => {
  return {
    price: data[0],
    count: data[1],
    amount: data[2]
  }
}


// Algorithm to create and keep a book instance updated

// subscribe to channel
// receive the book snapshot and create your in-memory book structure
// when count > 0 then you have to add or update the price level
// 3.1 if amount > 0 then add/update bids
// 3.2 if amount < 0 then add/update asks
// when count = 0 then you have to delete the price level.
// 4.1 if amount = 1 then remove from bids
// 4.2 if amount = -1 then remove from asks