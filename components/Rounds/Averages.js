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

// * TAKES AN AVERAGE OBJECT AND DISPLAYS IT *
export default function Averages({ averages, hide = false }) {
  const [consumedData, setData] = useState(averages);

  return (
    <div className="row averages-wrapper" style={{ margin: 'auto !important' }}>
      <RangeSelection setData={setData} hide={hide} />

      {consumedData && (
        <TableWrapper className="row m-0">
          <div className="p-0">
            <table className="table table-dark table-striped shadow table-fill">
              <thead></thead>
              <tbody>
                <tr>
                  <th scope="col">Esperance safe (10$ bet)</th>
                  <th scope="col">
                    <b style={{ color: consumedData.safeEsperance > 0 ? '#26a69a !important' : '#ef5350 !important' }}>
                      {consumedData.safeEsperance}$
                    </b>
                  </th>
                </tr>
                <tr>
                  <th scope="col">Esperance risky (10$ bet)</th>
                  <th scope="col">
                    <b style={{ color: consumedData.riskyEsperance > 0 ? '#26a69a !important' : '#ef5350 !important' }}>
                      {consumedData.riskyEsperance}$
                    </b>
                  </th>
                </tr>
                <tr>
                  <th scope="row">Safe Avg.</th>
                  <td>
                    <b style={{ color: 'white !important' }}>
                      x{consumedData.avgSafe} - {consumedData.safePercentWr}%
                    </b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Risky Avg.</th>
                  <td>
                    <b style={{ color: 'white !important' }}>
                      x{consumedData.avgRisky} - {consumedData.riskyPercentWr}%
                    </b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Payout Avg.</th>
                  <td>
                    <b style={{ color: 'white !important' }}>x{consumedData.avgPayout}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Payout Med.</th>
                  <td>
                    <b style={{ color: 'white !important' }}>x{consumedData.median.payout}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Pool Avg.</th>
                  <td>
                    <b style={{ color: 'white !important' }}>{consumedData.avgPool} BNB</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Pool Med.</th>
                  <td>
                    <b style={{ color: 'white !important' }}>{consumedData.median.pool} BNB</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">UP Rounds</th>
                  <td>
                    <b style={{ color: 'white !important' }}>
                      {consumedData.nbRoundUP} | +{consumedData.avgDiffUP} DIFF
                    </b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">DOWN Rounds</th>
                  <td>
                    <b style={{ color: 'white !important' }}>
                      {consumedData.nbRoundDOWN} | {consumedData.avgDiffDOWN} DIFF
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TableWrapper>
      )}
    </div>
  );
}
