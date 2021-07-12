import React, { useState } from "react";
import RangeSelection from "./RangeSelection";

export default function RangedData({ averages }) {
  const [consumedData, setData] = useState(averages);

  return (
    <div style={{ textAlign: "center" }}>
      <RangeSelection setData={setData} />

      <div>
        <h1>Average payout: {consumedData.avgPayout}</h1>
        <h1>Average pool: {consumedData.avgPool}</h1>
        <h1>Average diff: {consumedData.avgDiff}</h1>
        <h1>Number of rounds: {consumedData.nbEntries}</h1>
        <br />
        <h1>Esperance when betting 10 $: {consumedData.safeEsperance} $</h1>
        <h1>
          Safe average payout: {consumedData.avgSafe} -{" "}
          {consumedData.safePercentWr}%
        </h1>
        <h1>
          Risky average payout: {consumedData.avgRisky} -{" "}
          {consumedData.riskyPercentWr}%
        </h1>
        <br />
        <h2>Number of down round: {consumedData.nbRoundDOWN}</h2>
        <h2>Number of up round: {consumedData.nbRoundUP}</h2>
      </div>
    </div>
  );
}
