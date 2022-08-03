// @EXTERNALS
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// @MISC
import { API_HOST } from '../../api_host';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
`;

const RightSide = styled.div`
  float: right;
  font-weight: bold;
`;

// * TAKES AN ARRAY OF ORACLE ENTRIES AND RETURNS THE DIFFERENCE IN SECONDS BETWEEN THEM
export default function OracleHistory({ oracles }) {
  const [oracleList, setOracleList] = useState(oracles);
  const [fetching, setFetching] = useState(false);

  async function handleRefresh() {
    const res = await fetch(`${API_HOST}/api/oracle/limit/60`);
    const oracle = await res.json();

    setOracleList(oracle.oraclesData);
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

  const { average, median, diffList } = oracleList;
  return (
    <Wrapper className="row">
      <div className="col-xl-11 p-0">
        {diffList.map((item, index) => (
          <i key={index}>{item} </i>
        ))}
      </div>
      <RightSide className="col-xl-1 p-0">
        A. {average} / M. {median}
      </RightSide>
    </Wrapper>
  );
}
