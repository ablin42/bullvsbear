// @EXTERNALS
import React, { useState, useEffect } from "react";
import styled from "styled-components";
// @MISC
import { API_HOST } from "../../api_host";

const Wrapper = styled.div`
  text-align: center;
`;

const Tables = styled.div`
  display: flex;
  margin: 0 20px;
`;

const TableWrapper = styled.div`
  width: 15%;
  margin: 0 30px;
  text-align: left;
  border: 1px solid #ef5350;
  border-radius: 5px;
`;

const TableWrapperRef = styled.div`
  width: 20%;
  margin: 0 20px;
  text-align: left;
  border: 1px solid #d8d8d8;
  border-radius: 5px;
`;

// * TAKES AN ORACLE ARRAY, RETURNS ORACLES CHANGES FOR THE CURRENT ROUND *
export default function RoundOracle({ oracle }) {
  const [currentOracle, setOracle] = useState(oracle);
  const [isNew, setIsNew] = useState(true);
  const [fetching, setFetching] = useState(false);

  async function handleRefresh(caller = "auto") {
    const res = await fetch(`${API_HOST}/api/oracle/current`);
    const oracle = await res.json();
    if (oracle.length === currentOracle.length && caller === "manual")
      setIsNew(false);
    else setIsNew(true);

    setOracle(oracle);
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      if (fetching === false) {
        setFetching(true);
        await handleRefresh();
        setFetching(false);
      }
    }, 1000 * 10);
    return () => clearInterval(interval);
  });

  const openPrice = currentOracle[0].openPrice;
  return (
    <Wrapper>
      <Tables>
        <TableWrapperRef>
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">Open price</th>
                <th scope="col" style={{ width: "250px" }}>
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
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => handleRefresh("manual")}
                  >
                    REFRESH
                  </button>
                </th>
                <td>
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

        {currentOracle.map((item, index) => {
          const color = item.oraclePrice > openPrice ? "#26a69a" : "#ef5350";
          const BNBColor =
            item.BNBPrice > openPrice
              ? "#26a69a !important"
              : "#ef5350 !important";

          return (
            <TableWrapper
              key={index}
              style={{
                borderColor: color,
              }}
            >
              <table className="table table-dark">
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
                    <td style={{ color: BNBColor }}>{item.BNBPrice}$</td>
                  </tr>
                  <tr>
                    <th scope="row">Time left</th>
                    <td>{item.timeLeft}</td>
                  </tr>
                  <tr>
                    <th scope="row">New candle in</th>
                    <td>{item.secondsSinceCandleOpen}s</td>
                  </tr>
                </tbody>
              </table>
            </TableWrapper>
          );
        })}
      </Tables>
    </Wrapper>
  );
}