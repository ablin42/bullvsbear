// @EXTERNALS
import React, { useState, useEffect } from "react";
import styled from "styled-components";
// @MISC
import { API_HOST } from "../../api_host";

const Wrapper = styled.div`
  margin: 15px 0;
`;

const RANGE_OPTIONS = [
  "1H",
  "2H",
  "4H",
  "8H",
  "12H",
  "1D",
  "3D",
  "1W",
  "1M",
  "3M",
  "6M",
];

// * TAKES A SETTER FUNCTION, DISPLAY RANGE OPTIONS AS BUTTONS, FETCHES DATA AND SET IT FOR PARENT *
export default function RangeSelection({ setData }) {
  const [range, setRange] = useState("2H");
  const [fetching, setFetching] = useState(false);

  async function handleClick(range) {
    try {
      setFetching(true);
      const res = await fetch(`${API_HOST}/api/rounds/period/${range}`);

      if (res.status === 200) {
        setRange(range);
        const data = await res.json();
        setData(data);
      }
      setFetching(false);
    } catch (err) {
      console.log("An error occured with the API");
    }
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      if (fetching === false) {
        await handleClick(range);
      }
    }, 1000 * 60 * 5);
    return () => clearInterval(interval);
  }, []);

  const btnClass = "btn btn-outline-primary";
  const activeBtnClass = "btn btn-outline-primary active";
  return (
    <Wrapper>
      <div
        className="btn-group flex-wrap"
        role="group"
        aria-label="range options"
      >
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => handleClick(range)}
        >
          REFRESH
        </button>
        {RANGE_OPTIONS.map((rangeValue) => (
          <button
            type="button"
            className={range === rangeValue ? activeBtnClass : btnClass}
            key={rangeValue}
            onClick={() => handleClick(rangeValue)}
          >
            {rangeValue}
          </button>
        ))}
      </div>
    </Wrapper>
  );
}
