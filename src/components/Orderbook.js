/* eslint-disable no-console */
/* eslint-disable no-mixed-operators */
import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';
import { formatCurrency, toRound } from '../utils/common';


const Wrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  background: #1b252c;
  max-width: 600px;
  justify-content: center;
  align-items: flex-start;
  border: 4px solid #2c393f;
  min-height: 55px;
`;

const Header  = styled.div`
  padding: 0 8px 0 5px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(100, 100, 100, 0.3);
  height: 32px;
  line-height: 28px;
`;

const Title = styled.span`
  text-transform: uppercase;
  line-height: 20px;
  color: #c4c7c9;
  font-size: 14px;
`;

const MarketName = styled.span`
  text-transform: uppercase;
  line-height: 20px;
  color: #c4c7c9;
  opacity: 0.6;
  padding: 0 4px;
`;

const Box = styled.div`
  display: flex;
  width: 100%
  flex-direction: column;
`;

const Body = styled.div`
  display: flex;
  table{
    width: 100%;
    position: relative;
    .filler{
      position: absolute;
      height: 25px;
    }
    &.sell{
      .filler{
        left: 0;
        background: rgba(225, 86, 86, 0.055);
      }
    }
    &.buy{
      .filler{
        right: 0;
        background: rgba(157, 194, 74, 0.06);
      }
    }
    tbody tr{
      position: relative;
    }
    thead tr th, tbody tr td{
      color: #899094;
      font-weight: normal;
      font-size: 11px;
      text-transform: uppercase;
      text-align: center;
      padding: 3px;
      height: 25px;
      min-width: 20px;
      &.arrow{
        width: 3%;
      }
      &.time{
        width: 32%;
      }
      &.price{
        width: 29%;
      }
      &.amount{
        width: 36%;
      }
      
      i {
        &.buy{
          color: #77903e;
        }
        &.sell{
          color: #aa6064;
        }
      }
    }  
  }
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
  border: ${props => props.borderSize} solid transparent;
  border-radius: 50%;
  border-top: ${props => props.borderSize} solid rgb(251, 252, 254);
  border-bottom: ${props => props.borderSize} solid rgb(251, 252, 254);
  border-right: ${props => props.borderSize} solid rgb(251, 252, 254);
  width: ${props => props.size};
  min-width: ${props => props.size};
  height: ${props => props.size};
  animation: ${spin} 2s linear infinite;
  margin: 0 4px;
}
`;

const LoaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: rgb(251, 252, 254);
  font-size: 11px;
`;

class Orderbook extends Component{
  componentDidMount(){
    this.props.actions.loadOrderbookData(this.props.marketName);
  }
  render(){
    const { isFetching, orderbookBase, orderbookQuote, orderbookData } = this.props;
    return (
      <Wrapper>
        <Box>
          <Header>
            <Title>ORDER BOOK</Title>
            {orderbookBase && <MarketName>{orderbookBase}/{orderbookQuote}</MarketName>}
          </Header>
          <Body>
            <table className="buy">
              <thead>
                <tr>
                  <th className="count">Count</th>
                  <th className="amount">Amount</th>
                  <th className="total">Total</th>
                  <th className="price">Price</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  if(isFetching || !orderbookData || !orderbookData.bids){
                    return (
                      <tr>
                        <td colSpan="4"><LoaderContainer><Loader size="8px" borderSize="1px" />{' '}Loading... </LoaderContainer></td>
                      </tr>
                    )
                  }
                  let total = 0;
                  return Object.values(orderbookData.bids).sort((a, b) => {
                    return +a.price >= +b.price ? -1 : 1;
                  }).map(item => {
                    total = total + item.amount;
                    const referencePercentage = total / orderbookData.bidsTotal * 100;
                    return (
                    <tr key={item.id}>
                      <td>{item.count}</td>
                      <td>{formatCurrency(item.amount)}</td>
                      <td>{formatCurrency(total)}</td>
                      <td>{toRound(item.price, 3)}</td>
                      <div
                        className="filler"
                        style={{
                          width: `${referencePercentage.toString()}%`
                        }}
                      />
                    </tr>
                    ); 
                  })
                })()}
              </tbody>
            </table>
            <table className="sell">
              <thead>
                <tr>
                  <th className="price">Price</th>
                  <th className="total">Total</th>
                  <th className="amount">Amount</th>
                  <th className="count">Count</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  if(isFetching || !orderbookData || !orderbookData.asks){
                    return (
                      <tr>
                        <td colSpan="4"><LoaderContainer><Loader size="8px" borderSize="1px" />{' '}Loading... </LoaderContainer></td>
                      </tr>
                    )
                  }
                  let total = 0;
                  return Object.values(orderbookData.asks).sort((a, b) => {
                    return +a.price <= +b.price ? -1 : 1;
                  }).map(item => {
                    total = total + item.amount;
                    const referencePercentage = total / orderbookData.asksTotal * 100;
                    return (
                    <tr key={item.id}>
                      <td>{toRound(item.price, 3)}</td>
                      <td>{formatCurrency(total)}</td>
                      <td>{formatCurrency(item.amount)}</td>
                      <td>{item.count}</td>
                      <div
                        className="filler"
                        style={{
                          width: `${referencePercentage.toString()}%`
                        }}
                      />
                    </tr>
                    ); 
                  })
                })()}
              </tbody>
            </table>
          </Body>
        </Box>
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.Orderbook.getIn([
      'orderbook',
      'isFetching'
    ]),
    isFetchingError: state.Orderbook.getIn([
      'orderbook',
      'isFetching'
    ]),
    orderbookData: state.Orderbook.getIn(['orderbook', 'data']),
    orderbookBase: state.Orderbook.getIn(['orderbook', 'base']),
    orderbookQuote: state.Orderbook.getIn(['orderbook', 'quote'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Orderbook);

