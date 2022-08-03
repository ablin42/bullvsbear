// @EXTERNALS
import React, { useState } from 'react';
import styled from 'styled-components';
// @COMPONENTS
import RangeSelection from './RangeSelection';

//  width: 30%;
//   margin: auto;
const TableWrapper = styled.div`
  text-align: left;
  border-radius: 5px;
  width: initial;
`;

const Wrapper = styled.div`
  text-align: center;
  margin: 20px 0;
  flex-direction: column !important;
  width: fit-content !important;
  margin: auto !important;
`;

// * TAKES AN AVERAGE OBJECT AND DISPLAYS IT *
export default function Averages({ averages }) {
  const [consumedData, setData] = useState(averages);

  return (
    <Wrapper class="row justify-content-center">
      <RangeSelection setData={setData} />

      <TableWrapper className="row m-0 mb-5">
        <div className="p-0">
          <table className="table table-dark table-striped shadow table-fill">
            <thead></thead>
            <tbody>
              <tr>
                <th scope="col">Esperance safe (10$ bet)</th>
                <th scope="col">
                  <b>{consumedData.safeEsperance}$</b>
                </th>
              </tr>
              <tr>
                <th scope="col">Esperance risky (10$ bet)</th>
                <th scope="col">
                  <b>{consumedData.riskyEsperance}$</b>
                </th>
              </tr>
              <tr>
                <th scope="row">Safe Avg.</th>
                <td>
                  <b>
                    x{consumedData.avgSafe} - {consumedData.safePercentWr}%
                  </b>
                </td>
              </tr>
              <tr>
                <th scope="row">Risky Avg.</th>
                <td>
                  <b>
                    x{consumedData.avgRisky} - {consumedData.riskyPercentWr}%
                  </b>
                </td>
              </tr>
              <tr>
                <th scope="row">Payout Avg.</th>
                <td>
                  <b>x{consumedData.avgPayout}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Payout Med.</th>
                <td>
                  <b>x{consumedData.median.payout}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Pool Avg.</th>
                <td>
                  <b>{consumedData.avgPool} BNB</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Pool Med.</th>
                <td>
                  <b>{consumedData.median.pool} BNB</b>
                </td>
              </tr>
              <tr>
                <th scope="row">UP Rounds</th>
                <td>
                  <b>
                    {consumedData.nbRoundUP} | +{consumedData.avgDiffUP} DIFF
                  </b>
                </td>
              </tr>
              <tr>
                <th scope="row">DOWN Rounds</th>
                <td>
                  <b>
                    {consumedData.nbRoundDOWN} | {consumedData.avgDiffDOWN} DIFF
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </TableWrapper>
    </Wrapper>
  );
}
