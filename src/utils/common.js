import Big from 'big.js';
export const getBaseAndQuoteFromMarketName = (marketName) => {
  const marketArray =  marketName && marketName.split(":");
  return marketArray && marketArray.length === 2 && { base: marketArray[0].toUpperCase(), quote: marketArray[1].toUpperCase() };
}


export const formatCurrency = (
  value,
  regexFormatter = new RegExp(/(\d)(?=(\d{3})+(?!\d))/g),
  params = { 
    renderFormat: '%v %s',
    thousandsSeparator: ',',
    decimalSeparator: '.'
  },
  showSymbol = false
) => {
  
  const stringifiedValue = value && toFixed(value, 3).toString();
  let formattedValue = stringifiedValue;
  const separatedValue = stringifiedValue && stringifiedValue.split('.');
  if (separatedValue && separatedValue.length >= 1) {
    const thousandsValue = separatedValue[0]
      ? separatedValue[0].replace(
          regexFormatter,
          `$1${params.thousandsSeparator}`
        )
      : '';
    const decimalValue = separatedValue[1]
      ? `${params.decimalSeparator}${separatedValue[1]}`
      : '';
    formattedValue = `${thousandsValue}${decimalValue}`;
  }

  return params.renderFormat
    .replace('%v', formattedValue)
    .replace('%s', showSymbol && params.symbol ? params.symbol : '')
    .trim();
};

export const toFixed = (number, decimal) => {
  Big.RM = 1;
  const regex = new RegExp(`^-?\\d+(?:\\.\\d{0,${decimal}})?`);
  const roundedNumber = number.toString().match(regex);
  if (number.e === undefined && roundedNumber.length > 0) {
    return new Big(roundedNumber[0]).round(decimal, 1).toString();
  }
  return number.toFixed(decimal);
};
export const toRound = (number, decimal) => {
  Big.RM = 1;
  return new Big(number).round(decimal, 1).toString();
};
