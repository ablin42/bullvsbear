// @EXTERNALS
import React, { useState, useEffect } from "react";
import styled from "styled-components";
// @COMPONENTS
import CandleTimer from "./CandleTimer";
import OracleTimer from "./OracleTimer";
import Timer from "./Timer";
// @MISC
import { API_HOST } from "../../api_host";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ItemWrapper = styled.div`
  width: 30%;
`;

// * TAKES A TIMING OBJECT AND RETURNS CANDLETIMER / ORACLETIMER / TIMELEFT *
// * REFRESHES EVERY 10s *
export default function Timers({ timing }) {
  const [fetching, setFetching] = useState(false);
  const [currentTiming, setTiming] = useState(timing);

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
    <Wrapper>
      <ItemWrapper>
        <CandleTimer candleTiming={candleTiming} />
      </ItemWrapper>
      <ItemWrapper>
        <OracleTimer candleTiming={parseInt(lastOracle.date)} />
      </ItemWrapper>
      <ItemWrapper>
        <Timer oracle={lastOracle} />
      </ItemWrapper>
    </Wrapper>
  );
}
