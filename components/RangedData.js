import React, { useState } from "react";
import RangeSelection from "./RangeSelection";

export default function RangedData({ averages }) {
  const [consumedData, setData] = useState(averages);

  return (
    <div style={{ textAlign: "center" }}>
      <RangeSelection setData={setData} />

      <div>
        <h2>Average payout: {consumedData.avgPayout}</h2>
        <h2>Average pool: {consumedData.avgPool}</h2>
        <h2>Number of rounds: {consumedData.nbEntries}</h2>
        <br />
        <h2>Esperance when betting 10 $: {consumedData.safeEsperance} $</h2>
        <h2>
          Safe average payout: {consumedData.avgSafe} -{" "}
          {consumedData.safePercentWr}%
        </h2>
        <h2>
          Risky average payout: {consumedData.avgRisky} -{" "}
          {consumedData.riskyPercentWr}%
        </h2>
        <br />
        <h2>Number of down round: {consumedData.nbRoundDOWN}</h2>
        <h2>Number of up round: {consumedData.nbRoundUP}</h2>
      </div>
    </div>
  );
}
