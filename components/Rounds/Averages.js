// @EXTERNALS
import React, { useState } from "react";
import styled from "styled-components";
// @COMPONENTS
import RangeSelection from "./RangeSelection";

const TableWrapper = styled.div`
  width: 30%;
  margin: auto;
  text-align: left;
  border-radius: 5px;
`;

// * TAKES AN AVERAGE OBJECT AND DISPLAYS IT *
export default function Averages({ averages }) {
  const [consumedData, setData] = useState(averages);

  return (
    <div style={{ textAlign: "center" }}>
      <RangeSelection setData={setData} />

      <TableWrapper>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Esperance (10$ bet)</th>
              <th scope="col">{consumedData.safeEsperance}$</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Safe Avg.</th>
              <td>
                x{consumedData.avgSafe} - {consumedData.safePercentWr}%
              </td>
            </tr>
            <tr>
              <th scope="row">Risky Avg.</th>
              <td>
                x{consumedData.avgRisky} - {consumedData.riskyPercentWr}%
              </td>
            </tr>
            <tr>
              <th scope="row">Payout Avg.</th>
              <td>x{consumedData.avgPayout}</td>
            </tr>
            <tr>
              <th scope="row">Payout Med.</th>
              <td>x{consumedData.median.payout}</td>
            </tr>
            <tr>
              <th scope="row">Pool Avg.</th>
              <td>x{consumedData.avgPool} BNB</td>
            </tr>
            <tr>
              <th scope="row">Pool Med.</th>
              <td>x{consumedData.median.pool} BNB</td>
            </tr>
            <tr>
              <th scope="row">UP Rounds</th>
              <td>
                {consumedData.nbRoundUP} | DIFF: {consumedData.avgDiffUP}
              </td>
            </tr>
            <tr>
              <th scope="row">DOWN Rounds</th>
              <td>
                DOWN ROUNDS: {consumedData.nbRoundDOWN} | DIFF:{" "}
                {consumedData.avgDiffDOWN}
              </td>
            </tr>
          </tbody>
        </table>
      </TableWrapper>
    </div>
  );
}
