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

export default function ChartContainer({ data }) {
  if (data.length <= 0) return <CenteredFlexDiv>No data</CenteredFlexDiv>;

  return (
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
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="Safe Avg Payout"
          stroke="#0b8e3c"
          strokeWidth={3}
          activeDot={{ r: 5 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="Safe % Wr"
          stroke="#82ca9d"
          strokeWidth={3}
          activeDot={{ r: 5 }}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="Risky Avg Payout"
          stroke="#c70709"
          strokeWidth={3}
          activeDot={{ r: 5 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="Risky % Wr"
          strokeWidth={3}
          stroke="#cc6364"
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
