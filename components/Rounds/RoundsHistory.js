// @EXTERNALS
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  margin: 20px auto;
  justify-content: space-evenly;
  cursor: pointer;
`;

const HistoryWrapper = styled.div`
  height: fit-content;
  overflow: auto;
`;

// * TAKES AN ARRAY OF ROUNDS AND DISPLAY THEM WITH HISTORY *
export default function RoundsHistory({ rounds }) {
  const [showHistory, setShowHistory] = useState(rounds[0].roundId);

  useEffect(() => {
    setShowHistory(rounds[0].roundId);
  }, [rounds]);

  const sortedRounds = rounds.sort(
    (a, b) => (a.roundId < b.roundId && 1) || -1
  );
  return (
    <Wrapper className="row">
      <div className="col-xl-4">
        <table className="table table-dark ">
          <thead>
            <tr>
              <th scope="col">Round Nb.</th>
              <th scope="col">Payout UP</th>
              <th scope="col">Payout DOWN</th>
              <th scope="col">Open Price</th>
              <th scope="col">Close Price</th>
            </tr>
          </thead>
          <tbody>
            {sortedRounds.map((round) => {
              const {
                roundId: id,
                payoutUP,
                payoutDOWN,
                closePrice,
                openPrice,
                diff,
              } = round;
              const winningPayout = diff > 0 ? payoutUP : payoutDOWN;

              return (
                <tr key={id}>
                  <th scope="row">{id}</th>
                  <td>x{payoutUP}</td>
                  <td>x{payoutDOWN}</td>
                  <td>{openPrice}$</td>
                  <td
                    style={{
                      color: diff > 0 ? "#26a69a" : "#ef5350",
                    }}
                  >
                    {closePrice}$ {winningPayout === payoutUP ? "▲" : "▼"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <HistoryWrapper className="col-xl-7 p-0">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Status</th>
              <th scope="col">Timeleft</th>
              <th scope="col">Candle</th>
              <th scope="col">UP</th>
              <th scope="col">DOWN</th>
              <th scope="col">Pool size</th>
              <th scope="col">Price</th>
              <th scope="col">BNB</th>
              <th scope="col">BTC</th>
            </tr>
          </thead>
          {
            <tbody>
              {sortedRounds.map((round) => {
                const { roundId: id, history } = round;

                if (showHistory === id) {
                  let previousIteration = { status: null };
                  return history.map((iteration) => {
                    const diff = iteration.BNBPrice - rounds[0].openPrice;
                    const oracleDiff =
                      iteration.oraclePrice - rounds[0].openPrice;
                    const isLast =
                      iteration.status === "LIVE" &&
                      previousIteration.status === "Next";
                    previousIteration = iteration;
                    return (
                      <tr
                        key={iteration.roundId + "-" + iteration.timeLeft}
                        style={{
                          backgroundColor: isLast ? "#747474" : "initial",
                        }}
                      >
                        <th scope="row">{iteration.status}</th>
                        <td>{iteration.timeLeft}</td>
                        <td>{iteration.secondsSinceCandleOpen}s</td>
                        <td>{iteration.payoutUP}</td>
                        <td>{iteration.payoutDOWN}</td>
                        <td>{iteration.poolValue}</td>
                        <td
                          style={{
                            color: oracleDiff > 0 ? "#26a69a" : "#ef5350",
                          }}
                        >
                          {iteration.oraclePrice}
                        </td>
                        <td
                          style={{
                            color: diff > 0 ? "#26a69a" : "#ef5350",
                          }}
                        >
                          {iteration.BNBPrice}$
                        </td>
                        <td>{iteration.BTCPrice}$</td>
                      </tr>
                    );
                  });
                }
              })}
            </tbody>
          }
        </table>
      </HistoryWrapper>
    </Wrapper>
  );
}
