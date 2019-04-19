/* eslint-disable no-console */
import React, { Component } from 'react';
import queryString from 'query-string';
import styled from 'styled-components';
import Ticker from '../components/Ticker';
import Trades from '../components/Trades';
import Orderbook from '../components/Orderbook';


const Container = styled.div`
  display: flex;
`;
class Index extends Component {
  constructor(props){
    super(props);
    this.state = {};
    //this.initializeMarket.bind(this);
  }
  componentDidMount(){
    //this.initializeMarket();
  }

  initializeMarket = () => {
    const params = queryString.parse(this.props.location.search);
    this.setState({
      params
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const params = queryString.parse(nextProps.location.search);
    if(params && params.market && prevState.marketName !== params.market){
      return ({
        marketName: params.market
      });  
    }
    return null;
  }

  render(){
    const { marketName } = this.state;
    if(marketName){
      return (
        <React.Fragment>
          <Ticker marketName={marketName} />
          <Container>
            <Trades marketName={marketName} />
            <Orderbook marketName={marketName} />
          </Container>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <h3> Please enter a market name in the URL as a query parameter.</h3>
        <h4> For Ex: <a href="/?market=BTC:USD">&lt;base_url&gt;/market=BTC:USD</a></h4>
      </React.Fragment>
    )
  }
}
export default Index;