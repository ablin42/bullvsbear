// @EXTERNALS
import React, { useState, useEffect } from "react";
import styled from "styled-components";
// @COMPONENTS
import ChartContainer from "./ChartContainer";
import ChartEsperance from "./ChartEsperance";
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

const ChartWrapper = styled.div`
  width: 108%;
  margin-left: -5%;
`;

// * RETURNS TWO DATETIME PICKER AND A SEARCH BUTTON, RETURNS RESULT AS A CHART *
export default function RangedChartBasic() {
  const [startDate, setStart] = useState(
    new Date(new Date().getTime() - 1000 * 60 * 60 * 4)
      .toISOString()
      .substr(0, 16)
  );
  const [endDate, setEnd] = useState(new Date().toISOString().substr(0, 16));
  const [rounds, setRounds] = useState([]);
  const [esperanceRounds, setEsperanceRounds] = useState([]);
  const [grouped, setGrouped] = useState(true);

  useEffect(() => {
    search();
  }, []);

  async function handleChange(e, field) {
    const date = e.target.value;
    if (field === "startDate") setStart(date);
    else setEnd(date);
  }

  async function search() {
    const startTimestamp = convertDateToTimestamp(startDate);
    const endTimestamp = convertDateToTimestamp(endDate);

    const res = await fetch(
      `${API_HOST}/api/rounds/period/hourly/${startTimestamp}/${endTimestamp}/${grouped}`
    );
    const entries = await res.json();

    const esperanceRes = await fetch(
      `${API_HOST}/api/rounds/esperance/hourly/${startTimestamp}/${endTimestamp}/${grouped}`
    );
    const esperanceEntries = await esperanceRes.json();

    setEsperanceRounds(esperanceEntries);
    setRounds(entries);
  }

  function convertDateToTimestamp(date) {
    return new Date(date).getTime();
  }

  const data = rounds
    .map((item) => {
      if (!item) return;
      return {
        name: item.hour + "H",
        "Safe Avg Payout": item.avgSafe,
        "Safe % Wr": parseFloat(item.safePercentWr),
        "Risky Avg Payout": parseFloat(item.avgRisky),
        "Risky % Wr": parseFloat(item.riskyPercentWr),
      };
    })
    .filter((item) => item !== undefined && item !== null);

  const esperanceData = esperanceRounds
    .map((item) => {
      if (!item) return;
      return {
        name: item.hour + "H",
        "Risky EV": parseFloat(item.riskyEsperance),
        "Safe EV": parseFloat(item.safeEsperance),
      };
    })
    .filter((item) => item !== undefined && item !== null);

  console.log(data);

  const btnClass = "btn btn-outline-primary ";
  const activeBtnClass = "btn btn-outline-primary active";
  return (
    <>
      <CenteredFlexDiv className="row">
        <CenteredFlexDiv className="row col-xl-6">
          <ItemWrapper className="col-xl-4 p-2">
            <DateTime
              value={startDate}
              target="startDate"
              handleChange={handleChange}
            />
          </ItemWrapper>
          <ItemWrapper className="col-xl-4 p-2">
            <DateTime
              value={endDate}
              target="endDate"
              handleChange={handleChange}
            />
          </ItemWrapper>
          <ItemWrapper className="btn-group col-xl-3 p-2">
            <button
              type="button"
              className="btn btn-outline-primary "
              onClick={() => search()}
            >
              SEARCH
            </button>
            <button
              type="button"
              className={grouped ? activeBtnClass : btnClass}
              onClick={() => setGrouped(!grouped)}
            >
              GROUP
            </button>
          </ItemWrapper>
        </CenteredFlexDiv>
      </CenteredFlexDiv>
      <ChartWrapper>
        <ChartContainer data={data} />
        <ChartEsperance data={esperanceData} />
      </ChartWrapper>
    </>
  );
}
