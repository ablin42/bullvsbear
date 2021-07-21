import React, { useState } from "react";
import { API_HOST } from "../api_host";

export default function RoundOracle({ oracle }) {
  const [currentOracle, setOracle] = useState(oracle);
  const [isNew, setIsNew] = useState(false);

  async function handleRefresh() {
    const res = await fetch(`${API_HOST}/api/scrape/current-oracle`);
    const oracle = await res.json();
    if (oracle.length === currentOracle.length) setIsNew(false);
    else setIsNew(true);

    setOracle(oracle);
  }

  return (
    <div>
      <button onClick={() => handleRefresh()}>REFRESH</button>
      {!isNew && "No new oracle refresh yet"}
      {currentOracle.map((item) => (
        <div key={item.timeLeft}>
          <h3>
            <i>oracle price</i> =&gt;{" "}
            <b style={{ textDecoration: "underline" }}>{item.oraclePrice}</b>
          </h3>
          <h4>
            <i>BNB price</i> =&gt; {item.BNBPrice}
          </h4>
          <h4>
            <i>BTC price</i> =&gt; {item.BTCPrice}
          </h4>
          <h4>
            <i>time left</i> =&gt; {item.timeLeft}
          </h4>
          <h4>
            <i>seconds since candle opened</i> =&gt;{" "}
            {item.secondsSinceCandleOpen}
          </h4>
          <hr />
        </div>
      ))}
    </div>
  );
}
