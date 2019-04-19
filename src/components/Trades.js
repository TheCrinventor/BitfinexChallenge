/* eslint-disable no-console */
/* eslint-disable no-mixed-operators */
import React, { Component } from 'react';
import moment from 'moment';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';
import { formatCurrency, toRound } from '../utils/common';
import { TRADE_TYPE } from '../constants/common';


const Wrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  background: #1b252c;
  max-width: 350px;
  justify-content: center;
  align-items: center;
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
    tbody tr{
      &.sell{
        background: rgba(225, 86, 86, 0.055);
      }
      &.buy{
        background: rgba(157, 194, 74, 0.06);
      }
    }
    thead tr th, tbody tr td{
      color: #899094;
      font-weight: normal;
      font-size: 11px;
      text-transform: uppercase;
      text-align: center;
      padding: 3px;
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

class Trades extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.actions.loadTradesData(this.props.marketName);
  }


  render(){
    const { isFetching, tradesBase, tradesQuote, tradesData } = this.props;
    return (
      <Wrapper>
        <Box>
          <Header>
            <Title>Trades</Title>
            {tradesBase && <MarketName>{tradesBase}/{tradesQuote}</MarketName>}
          </Header>
          <Body>
            <table>
              <thead>
                <tr>
                  <th className="arrow"></th>
                  <th className="time">Time</th>
                  <th className="price">Price</th>
                  <th className="amount">Amount</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  if(isFetching || !tradesData){
                    return (
                      <tr>
                        <td colSpan="4"><LoaderContainer><Loader size="8px" borderSize="1px" />{' '}Loading... </LoaderContainer></td>
                      </tr>
                    )
                  }
                  return tradesData.map(item => {
                    return (
                    <tr key={item.id} className={item.type === TRADE_TYPE.BUY ? 'buy': 'sell'}>
                      <td><i className={item.type === TRADE_TYPE.BUY ? 'fa fa-chevron-up buy': 'fa fa-chevron-down sell'} /></td>
                      <td>{moment(item.mts).format('hh:mm:ss')}</td>
                      <td>{toRound(item.price, 3)}</td>
                      <td>{formatCurrency(item.amount)}</td>
                    </tr>
                    ); 
                  })
                })()}
              </tbody>
            </table>
          </Body>
        </Box>
      </Wrapper>
    )
  }
}



function mapStateToProps(state) {
  return {
    isFetching: state.Trades.getIn([
      'history',
      'isFetching'
    ]),
    isFetchingError: state.Trades.getIn([
      'history',
      'isFetching'
    ]),
    tradesData: state.Trades.getIn(['history', 'data']),
    tradesBase: state.Trades.getIn(['history', 'base']),
    tradesQuote: state.Trades.getIn(['history', 'quote'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Trades);

