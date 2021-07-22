import React, { useState, useEffect } from "react";
import { API_HOST } from "../api_host";

export default function RoundOracle({ oracle }) {
  const [currentOracle, setOracle] = useState(oracle);
  const [isNew, setIsNew] = useState(false);
  const [fetching, setFetching] = useState(false);

  async function handleRefresh() {
    const res = await fetch(`${API_HOST}/api/scrape/current-oracle`);
    const oracle = await res.json();
    if (oracle.length === currentOracle.length) setIsNew(false);
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
    <div style={{ textAlign: "center" }}>
      <button onClick={() => handleRefresh()}>REFRESH</button>
      {!isNew && "No new oracle refresh yet"}
      <h3>
        {openPrice} - {currentOracle[0].roundId}
      </h3>
      <div style={{ display: "flex" }}>
        {currentOracle.map((item, index) => {
          const color = item.oraclePrice > openPrice ? "#28a745" : "#9d1c28";
          return (
            <div
              key={item.timeLeft}
              style={{ margin: "0 30px", textAlign: "left" }}
            >
              <h3>
                <i>oracle price</i> =&gt;{" "}
                <b
                  style={{
                    textDecoration: index === 0 ? "underline" : "initial",
                    color: color,
                  }}
                >
                  {item.oraclePrice}
                </b>
              </h3>
              <h4>
                <i>BNB price</i> =&gt; {item.BNBPrice}
              </h4>
              {/* <h4>
              <i>BTC price</i> =&gt; {item.BTCPrice}
            </h4> */}
              <h4>
                <i>time left</i> =&gt; {item.timeLeft}
              </h4>
              <h4>
                <i>candle opened</i> =&gt; {item.secondsSinceCandleOpen}
              </h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
