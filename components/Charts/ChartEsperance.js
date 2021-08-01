// @EXTERNALS
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
// ];

const CenteredFlexDiv = styled.div`
  justify-content: center;
  display: flex;
`;

export default function ChartEsperance({ data }) {
  if (data.length <= 0) return <CenteredFlexDiv>No data</CenteredFlexDiv>;

  return (
    <>
      <div>Esperance (10$ bet)</div>
      <ResponsiveContainer width="100%" height="100%" minHeight="600px">
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
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Safe EV"
            stroke="#0b8e3c"
            strokeWidth={3}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Risky EV"
            stroke="#c70709"
            strokeWidth={3}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
