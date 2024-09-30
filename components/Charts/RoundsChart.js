// @EXTERNALS
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// @COMPONENTS
import ChartRounds from './ChartRounds';
// @MISC
import { API_HOST } from '../../api_host';

const ChartWrapper = styled.div`
  width: 108%;
  margin-left: -5%;
`;

// * RETURNS TWO DATETIME PICKER AND A SEARCH BUTTON, RETURNS RESULT AS A CHART *
export default function RangedChartBasic() {
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    search();
  }, []);

  async function search() {
    try {
      const res = await fetch(`${API_HOST}/api/rounds/esperance`);
      const entries = await res.json();

      setRounds(entries);
    } catch (error) {
      console.log(error);
    }
  }

  const data = rounds.map((item) => {
    return {
      name: item.id,
      'Safe EV': parseFloat(item.safeEsperance),
      'Risky EV': parseFloat(item.riskyEsperance),
    };
  });

  const RANGE1 = [];
  const RANGE2 = [];
  const RANGE3 = [];
  const RANGE4 = [];
  const RANGE5 = [];
  const RANGE6 = [];
  for (let round of data) {
    const id = parseInt(round.name.substr(1));
    if (id >= 1800 && id <= 2300) RANGE1.push(round);
    if (id >= 2300 && id <= 2800) RANGE2.push(round);
    if (id >= 2800 && id <= 3300) RANGE3.push(round);
    if (id >= 3300 && id <= 3800) RANGE4.push(round);
    if (id >= 3800 && id <= 4300) RANGE5.push(round);
    if (id > 4300) RANGE6.push(round);
  }

  return (
    <ChartWrapper>
      <ChartRounds data={RANGE1} />
      <ChartRounds data={RANGE2} />
      <ChartRounds data={RANGE3} />
      <ChartRounds data={RANGE4} />
      <ChartRounds data={RANGE5} />
      <ChartRounds data={RANGE6} />
    </ChartWrapper>
  );
}
