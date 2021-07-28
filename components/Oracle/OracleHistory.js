// @EXTERNALS
import React, { useState, useEffect } from "react";
import styled from "styled-components";
// @MISC
import { API_HOST } from "../../api_host";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 8px 0;
`;

const RightSide = styled.div`
  float: right;
  margin-right: 30px;
  font-weight: bold;
`;

// * TAKES AN ARRAY OF ORACLE ENTRIES AND RETURNS THE DIFFERENCE IN SECONDS BETWEEN THEM
export default function OracleHistory({ oracles }) {
  const [oracleList, setOracleList] = useState(oracles);
  const [fetching, setFetching] = useState(false);

  async function handleRefresh() {
    const res = await fetch(`${API_HOST}/api/oracle/limit/70`);
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
    <Wrapper>
      <div>
        {diffList.map((item, index) => (
          <i key={index}>{item} </i>
        ))}
      </div>
      <RightSide>
        Avg. {average} / Med. {median}
      </RightSide>
    </Wrapper>
  );
}
