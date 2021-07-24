import React, { useState, useEffect } from "react";
import { API_HOST } from "../api_host";

export default function OracleHistory({ oracles }) {
  const [oracleList, setOracleList] = useState(oracles);
  const [fetching, setFetching] = useState(false);

  async function handleRefresh() {
    const res = await fetch(`${API_HOST}/api/scrape/oracle/70`);
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
    <div style={{ textAlign: "center" }}>
      {diffList.map((item, index) => (
        <i key={index}>{item} </i>
      ))}
      <b style={{ float: "right", marginRight: "20px" }}>
        avg: {average} - median: {median}
      </b>
    </div>
  );
}
