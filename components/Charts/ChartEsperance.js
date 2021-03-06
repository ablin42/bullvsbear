// @EXTERNALS
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

const CenteredFlexDiv = styled.div`
  justify-content: center;
  display: flex;
`;

export default function ChartEsperance({ data }) {
  if (data.length <= 0) return <CenteredFlexDiv>No data</CenteredFlexDiv>;

  return (
    <>
      <div className="ms-5 ps-4">Esperance (10$ bet)</div>
      <ResponsiveContainer width="95%" height="100%" maxHeight="400px">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid grey', borderRadius: '2px' }} />
          <Legend />
          <Line type="monotone" dataKey="Safe EV" stroke="#0b8e3c" strokeWidth={3} activeDot={{ r: 5 }} />
          <Line type="monotone" dataKey="Risky EV" stroke="#c70709" strokeWidth={3} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
