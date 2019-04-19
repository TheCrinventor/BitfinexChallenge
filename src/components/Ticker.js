/* eslint-disable no-console */
/* eslint-disable no-mixed-operators */
import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';
import { formatCurrency } from '../utils/common';


const Wrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  background: #1b252c;
  max-width: 350px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  border: 4px solid #2c393f;
  min-height: 55px;
`;

const CurrencyLogo = styled.img`
  height: 40px;
  width: 40px;
`;

const TickerColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Header = styled.span`
  font-size: 16px;
  color: rgb(251, 252, 254);
  text-align: center;
`;

const MarketInfo = styled.span`
  color: ${props => props.pos && `#7a9c4a` || props.neg && `#aa6064` || `rgb(196, 199, 201)`};
  font-size: 12px;
  text-align: center;
  
`;

const Highlight = styled.span`
  font-size: 12px;
  text-align: center;
  opacity: 1;
`;

const MarketLabel = styled.span`
  opacity: 0.75;
`;
const spin = keyframes`
  0% { 
    transform: rotate(0deg); 
  }
  100% { 
    transform: rotate(360deg); 
  }
`;

const Loader = styled.div`
  border: 2px solid transparent;
  border-radius: 50%;
  border-top: 2px solid rgb(251, 252, 254);
  border-bottom: 2px solid rgb(251, 252, 254);
  border-right: 2px solid rgb(251, 252, 254);
  width: 24px;
  min-width: 24px;
  height: 24px;
  animation: ${spin} 2s linear infinite;
}
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

class Ticker extends Component {
  componentDidMount(){
    this.props.actions.loadTickerData(this.props.marketName);
  }
  render(){
    const { isFetching, tickerBase, tickerQuote, tickerData } = this.props;
    if(isFetching || !tickerData){
      return (
        <Wrapper>
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        </Wrapper>
      )
    }
    return (
    <Wrapper>
      <CurrencyLogo src="https://www.bitfinex.com/assets/ZRX-alt-380e34eb63bd9d5bc7d1d8a8332f40980573f3f0876f23bf8d945720e44e1d70.svg" />
      <TickerColumn>
        <Header>
          {tickerBase}/{tickerQuote}
        </Header>
        <MarketInfo>
          <MarketLabel>VOL</MarketLabel> <Highlight>{formatCurrency(tickerData.volume)}</Highlight> <MarketLabel>{tickerQuote}</MarketLabel>
        </MarketInfo>
        <MarketInfo>
        <MarketLabel>LOW</MarketLabel>  <Highlight>{tickerData.low}</Highlight>
        </MarketInfo>
      </TickerColumn>
      <TickerColumn>
        <Header>
          {tickerData.lastPrice}
        </Header>
        <MarketInfo pos={tickerData.dailyChange > 0} neg={tickerData.dailyChange < 0}>
          {tickerData.dailyChange} <i className={`fa ${tickerData.dailyChange < 0 ? `fa-caret-down`: `fa-caret-up`}`} /> ({tickerData.dailyChangePercentage}%)
        </MarketInfo>
        <MarketInfo>
          <MarketLabel>HIGH</MarketLabel>  <Highlight>{tickerData.high}</Highlight>
        </MarketInfo>
      </TickerColumn>
    </Wrapper>
    );
  }
}


function mapStateToProps(state) {
  return {
    isFetching: state.Ticker.getIn([
      'market',
      'isFetching'
    ]),
    isFetchingError: state.Ticker.getIn([
      'market',
      'isFetching'
    ]),
    tickerData: state.Ticker.getIn(['market', 'data']),
    tickerBase: state.Ticker.getIn(['market', 'base']),
    tickerQuote: state.Ticker.getIn(['market', 'quote'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Ticker);