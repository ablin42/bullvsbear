// @EXTERNALS
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// @MISC
import { API_HOST } from '../../api_host';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  color: #afafaf;
`;

const RightSide = styled.div`
  float: right;
  font-weight: bold;
`;

// * TAKES AN ARRAY OF ORACLE ENTRIES AND RETURNS THE DIFFERENCE IN SECONDS BETWEEN THEM
export default function OracleHistory({ limit = 60 }) {
  const [_limit] = useState(limit);
  const [oracleList, setOracleList] = useState([]);
  const [fetching, setFetching] = useState(false);

  async function handleRefresh() {
    try {
      setFetching(true);

      const res = await fetch(`${API_HOST}/api/oracle/limit/${_limit}`);
      const oracle = await res.json();
      setFetching(false);

      setOracleList(oracle.oraclesData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleRefresh();
    const interval = setInterval(async () => {
      if (fetching === false) await handleRefresh();
    }, 1000 * 10);
    return () => clearInterval(interval);
  }, []);
  const { average, median, diffList } = oracleList;
  return (
    <Wrapper className="row">
      <div className="w-auto p-0">
        {diffList?.map((item, index) => (
          <i key={index}>{item} </i>
        ))}
      </div>
      <RightSide className="w-auto p-0">
        <div style={{ minWidth: 'max-content' }}>
          A. {average} / M. {median}
        </div>
      </RightSide>
    </Wrapper>
  );
}
