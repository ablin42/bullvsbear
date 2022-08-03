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
`;

const Wrapper = styled.div`
  text-align: center;
  margin: 20px 0;
`;

// * TAKES AN AVERAGE OBJECT AND DISPLAYS IT *
export default function Averages({ averages }) {
  const [consumedData, setData] = useState(averages);

  return (
    <Wrapper>
      <RangeSelection setData={setData} />

      <TableWrapper className="row m-0 mb-3">
        <div className="col-xl-4 offset-xl-4">
          <table className="table table-dark shadow">
            <thead>
              <tr>
                <th scope="col">Esperance safe (10$ bet)</th>
                <th scope="col">{consumedData.safeEsperance}$</th>
              </tr>
              <tr>
                <th scope="col">Esperance risky (10$ bet)</th>
                <th scope="col">{consumedData.riskyEsperance}$</th>
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
                <td>{consumedData.avgPool} BNB</td>
              </tr>
              <tr>
                <th scope="row">Pool Med.</th>
                <td>{consumedData.median.pool} BNB</td>
              </tr>
              <tr>
                <th scope="row">UP Rounds</th>
                <td>
                  {consumedData.nbRoundUP} | +{consumedData.avgDiffUP} DIFF
                </td>
              </tr>
              <tr>
                <th scope="row">DOWN Rounds</th>
                <td>
                  {consumedData.nbRoundDOWN} | {consumedData.avgDiffDOWN} DIFF
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </TableWrapper>
    </Wrapper>
  );
}
