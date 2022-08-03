// @EXTERNALS
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// @COMPONENTS
import CandleTimer from './CandleTimer';
import OracleTimer from './OracleTimer';
import Timer from './Timer';
// @MISC
import { API_HOST } from '../../api_host';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemWrapper = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

// * TAKES A TIMING OBJECT AND RETURNS CANDLETIMER / ORACLETIMER / TIMELEFT *
// * REFRESHES EVERY 10s *
export default function Timers({ timing }) {
  const [fetching, setFetching] = useState(false);
  const [currentTiming, setTiming] = useState(timing);
  const [isDown, setIsdown] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (fetching === false) {
        setFetching(true);
        const res = await fetch(`${API_HOST}/api/oracle/timing`);

        if (res.status === 200) {
          const data = await res.json();
          setTiming(data);
        }
        setFetching(false);
      }
    }, 1000 * 10);
    return () => clearInterval(interval);
  });

  const { candleTiming, oracle: lastOracle } = currentTiming;
  return (
    <Wrapper className="row">
      {isDown && (
        <>
          <div className="alert alert-warning col-xl-4 offset-xl-4 mb-3" role="alert">
            Pancakeswap Predictions are paused for maintenance
          </div>
        </>
      )}
      <div className="row m-0" style={{ width: '100%' }}>
        <ItemWrapper className="col-4 ps-0">
          <CandleTimer candleTiming={candleTiming} />
        </ItemWrapper>
        <ItemWrapper className="col-4">
          <OracleTimer candleTiming={parseInt(lastOracle.date)} />
        </ItemWrapper>
        <ItemWrapper className="col-4 pe-0">
          <Timer oracle={lastOracle} setIsdown={setIsdown} isDown={isDown} />
        </ItemWrapper>
      </div>
    </Wrapper>
  );
}
