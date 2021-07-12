import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 700px;
  justify-content: space-evenly;
  cursor: pointer;
`;

const HistoryWrapper = styled.div`
  width: 700px;
`;

const History = styled.div`    display: flex;
    justify-content: space-evenly;
}`;

export default function RangedRounds({ rounds }) {
  const [showHistory, setShowHistory] = useState(null);
  function handleClick(id) {
    if (showHistory === id) return setShowHistory(null);
    setShowHistory(id);
  }

  const sortedRounds = rounds.sort(
    (a, b) => (a.roundId < b.roundId && 1) || -1
  );

  return (
    <div>
      {sortedRounds.map((round) => {
        const {
          roundId: id,
          payoutUP,
          payoutDOWN,
          closePrice,
          openPrice,
          diff,
          poolValue,
          history,
        } = round;
        const parsedDiff = diff.substr(1);
        const winningPayout = parsedDiff > 0 ? payoutUP : payoutDOWN;
        const roundStyle = winningPayout === payoutUP ? "green" : "red";

        return (
          <div key={id}>
            <Wrapper
              style={{ backgroundColor: roundStyle }}
              onClick={() => handleClick(id)}
            >
              <h4>{id}</h4>
              <h5>
                {payoutUP}
                {winningPayout === payoutUP && "▲"}
              </h5>
              <h6>{poolValue}</h6>
              <h5>
                {payoutDOWN}
                {winningPayout === payoutDOWN && "▼"}
              </h5>
              <h5>
                {openPrice} ➔ {closePrice}
              </h5>
            </Wrapper>
            {showHistory === id && (
              <HistoryWrapper id={id}>
                <History>
                  <h6>status</h6>
                  <h6>timeLeft</h6>
                  <h6>payoutUP</h6>
                  <h6>oraclePrice</h6>
                  <h6>payoutDOWN</h6>
                  <h6> /// </h6>
                  <h6>secondsSinceCandleOpen</h6>
                  <h6>BNBPrice</h6>
                  <h6>BTCPrice</h6>
                  <h6>poolValue</h6>
                </History>
                {history.map((iteration) => {
                  return (
                    <History>
                      <h6>{iteration.status}</h6>
                      <h6>{iteration.timeLeft}</h6>
                      <h6>{iteration.payoutUP}</h6>
                      <h6>{iteration.oraclePrice}</h6>
                      <h6>{iteration.payoutDOWN}</h6>
                      <h6> /// </h6>
                      <h6>{iteration.secondsSinceCandleOpen}</h6>
                      <h6>{iteration.BNBPrice}</h6>
                      <h6>{iteration.BTCPrice}</h6>
                      <h6>{iteration.poolValue}</h6>
                    </History>
                  );
                })}
              </HistoryWrapper>
            )}
          </div>
        );
      })}
      ;
    </div>
  );
}
