// @EXTERNALS
import React, { useState } from "react";
import styled from "styled-components";
// @COMPONENTS
import ChartContainer from "./ChartContainer";
import DateTime from "../Misc/DateTime";
// @MISC
import { API_HOST } from "../../api_host";

const CenteredFlexDiv = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
`;

const ItemWrapper = styled.div`
  text-align: center;
`;

// * RETURNS TWO DATETIME PICKER AND A SEARCH BUTTON, RETURNS RESULT AS A CHART *
export default function RangedChartBasic() {
  const [startDate, setStart] = useState("");
  const [endDate, setEnd] = useState("");
  const [rounds, setRounds] = useState([]);

  async function handleChange(e, field) {
    const date = e.target.value;
    if (field === "startDate") setStart(date);
    else setEnd(date);
  }

  async function search() {
    const startTimestamp = convertDateToTimestamp(startDate);
    const endTimestamp = convertDateToTimestamp(endDate);
    const res = await fetch(
      `${API_HOST}/api/rounds/timestamp/${startTimestamp}/${endTimestamp}`
    );
    const entries = await res.json();
    setRounds(entries);
  }

  function convertDateToTimestamp(date) {
    return new Date(date).getTime();
  }

  function convertTimestampToDate(timestamp) {
    return new Date(timestamp);
  }

  const data = rounds.map((item) => {
    return {
      name: item.date,
      pv: parseFloat(item.payoutDOWN),
      uv: parseFloat(item.payoutUP),
    };
  });

  return (
    <>
      <CenteredFlexDiv className="row">
        <CenteredFlexDiv className="row col-xl-6">
          <ItemWrapper className="col-xl-5 p-2">
            <DateTime
              value={startDate}
              target="startDate"
              handleChange={handleChange}
            />
          </ItemWrapper>
          <ItemWrapper className="col-xl-5 p-2">
            <DateTime
              value={endDate}
              target="endDate"
              handleChange={handleChange}
            />
          </ItemWrapper>
          <ItemWrapper className="col-xl-2 p-2">
            <button
              type="button"
              className="btn btn-outline-primary col-xl-12"
              onClick={() => search()}
            >
              SEARCH
            </button>
          </ItemWrapper>
        </CenteredFlexDiv>
      </CenteredFlexDiv>
      <ChartContainer data={data} />
    </>
  );
}
