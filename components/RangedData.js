import React, { useState } from "react";
import RangeSelection from "./RangeSelection";

export default function RangedData({ averages }) {
  const [consumedData, setData] = useState(averages);

  return (
    <div style={{ textAlign: "center" }}>
      <RangeSelection setData={setData} />

      <div>
        <h2>Esperance when betting 10$: {consumedData.safeEsperance}$</h2>
        <h2>
          Safe avg: x{consumedData.avgSafe} - {consumedData.safePercentWr}%
        </h2>
        <h2>
          Risky avg: x{consumedData.avgRisky} - {consumedData.riskyPercentWr}%
        </h2>
        <br />
        <div>
          <h2>Average payout: x{consumedData.avgPayout}</h2>
          <h2>Median payout: x{consumedData.median.payout}</h2>
          <h2>Average pool: {consumedData.avgPool} BNB</h2>
          <h2>Median pool: {consumedData.median.pool} BNB</h2>
          <h2>
            UP ROUNDS: {consumedData.nbRoundUP} | DIFF: {consumedData.avgDiffUP}
          </h2>
          <h2>
            DOWN ROUNDS: {consumedData.nbRoundDOWN} | DIFF:{" "}
            {consumedData.avgDiffDOWN}
          </h2>
        </div>
      </div>
    </div>
  );
}
