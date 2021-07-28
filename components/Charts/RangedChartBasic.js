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
  margin: 0 10px;
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
      <CenteredFlexDiv>
        <ItemWrapper>
          <DateTime
            value={startDate}
            target="startDate"
            handleChange={handleChange}
          />
        </ItemWrapper>
        <ItemWrapper>
          <DateTime
            value={endDate}
            target="endDate"
            handleChange={handleChange}
          />
        </ItemWrapper>
        <ItemWrapper>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => search()}
          >
            SEARCH
          </button>
        </ItemWrapper>
      </CenteredFlexDiv>
      <hr />
      <ChartContainer data={data} />
    </>
  );
}
