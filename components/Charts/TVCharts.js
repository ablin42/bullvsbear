// @EXTERNALS
import React from 'react';
import styled from 'styled-components';
// @COMPONENTS
import { TradingViewWidget } from './TVWidget';

const Wrapper = styled.div`
  min-height: 525px;
`;

// * RETURNS TRADINGVIEW CHARTS FOR BTC/USDT AND BNB/USDT *
export default function TVCharts() {
  const studies = ['BB@tv-basicstudies', 'WilliamsFractal@tv-basicstudies'];

  return (
    <Wrapper className="row m-0 mb-5 shadow">
      <div className="col-lg-12 col-xl-6 p-0">
        <TradingViewWidget
          symbol={'BTCUSDT'}
          interval="5"
          locale="en"
          timezone="Europe/Paris"
          hideSideToolbar={true}
          studies={studies}
          identifier="BTCCHART"
          autosize
        />
      </div>
      <div className="col-lg-12 col-xl-6 p-0">
        <TradingViewWidget
          symbol={'BNBUSDT'}
          interval="5"
          locale="en"
          timezone="Europe/Paris"
          hideSideToolbar={true}
          studies={studies}
          identifier="BNBCHART"
          autosize
        />
      </div>
    </Wrapper>
  );
}
