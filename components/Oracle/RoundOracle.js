// @EXTERNALS
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// @MISC
import { API_HOST } from '../../api_host';

const Wrapper = styled.div`
  text-align: center;
  margin: 0;
`;

const OracleWrapper = styled.div`
  overflow-x: auto;
  flex-wrap: nowrap;
`;

const TableWrapper = styled.div`
  text-align: left;
  border-radius: 4px;
  border: 1px solid transparent;
  height: 100%;
`;

const TableWrapperRef = styled.div`
  text-align: left;
  border: 1px solid transparent;
  border-radius: 4px;
  height: 100%;
`;

// * TAKES AN ORACLE ARRAY, RETURNS ORACLES CHANGES FOR THE CURRENT ROUND *
export default function RoundOracle({ oracle }) {
  const [currentOracle, setOracle] = useState(oracle);
  const [isNew, setIsNew] = useState(true);
  const [fetching, setFetching] = useState(false);

  async function handleRefresh(caller = 'auto') {
    try {
      const res = await fetch(`${API_HOST}/api/oracle/current`);
      const oracle = await res.json();
      if (oracle.length === currentOracle.length && caller === 'manual') setIsNew(false);
      else setIsNew(true);

      setOracle(oracle);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      if (fetching === false) {
        setFetching(true);
        await handleRefresh();
        setFetching(false);
      }
    }, 1000 * 2);
    return () => clearInterval(interval);
  });

  const openPrice = currentOracle[0].openPrice;
  return (
    <Wrapper>
      <OracleWrapper className="row m-0">
        <div className="col-xl-4 p-3 ps-0">
          <TableWrapperRef>
            <table className="table table-dark table-striped shadow">
              <thead>
                <tr>
                  <th scope="col">Open price</th>
                  <th scope="col" style={{ width: '250px' }}>
                    {openPrice}$
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Round ID</th>
                  <td>{currentOracle[0].roundId}</td>
                </tr>
                <tr>
                  <th scope="row">
                    <button type="button" className="btn btn-outline-primary" onClick={() => handleRefresh('manual')}>
                      REFRESH
                    </button>
                  </th>
                  <td>
                    [{currentOracle.length} / 15]
                    {!isNew && (
                      <div className="alert alert-primary" role="alert">
                        No new oracle refresh yet
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </TableWrapperRef>
        </div>

        {currentOracle.map((item, index) => {
          const color = item.oraclePrice > openPrice ? '#26a69a' : '#ef5350';
          const BNBClass = item.BNBPrice > openPrice ? 'bull' : 'bear';

          return (
            <div className="col-xl-2 p-3" key={index}>
              <TableWrapper
                style={{
                  borderColor: color,
                }}
              >
                <table className="table table-dark table-striped shadow">
                  <thead>
                    <tr>
                      <th scope="col">Oracle price</th>
                      <th scope="col" style={{ color: color }}>
                        {item.oraclePrice}$
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">BNB price</th>
                      <td className={BNBClass}>{item.BNBPrice}$</td>
                    </tr>
                    <tr>
                      <th scope="row">Time left</th>
                      <td>{item.timeLeft}</td>
                    </tr>
                    <tr>
                      <th scope="row">New candle in</th>
                      <td>{(300 - item.secondsSinceCandleOpen).toFixed(1)}s</td>
                    </tr>
                  </tbody>
                </table>
              </TableWrapper>
            </div>
          );
        })}
      </OracleWrapper>
    </Wrapper>
  );
}
