import React, { useState } from "react";

const RANGE_OPTIONS = [
  "1H",
  "2H",
  "3H",
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

export default function RangeSelection({ setData }) {
  const [range, setRange] = useState("1H");

  async function handleClick(range) {
    try {
      // TODO make button appearance change (pushed in)
      // TODO VAR ENV
      // !
      // https://pcs-predictions.herokuapp.com
      const res = await fetch(
        `https://pcs-predictions.herokuapp.com/api/scrape/${range}`
      );

      if (res.status === 200) {
        setRange(range);
        const data = await res.json();
        setData(data);
      }
    } catch (err) {
      console.log("An error occured with the API");
    }
  }

  setInterval(() => {
    handleClick(range);
  }, 1000 * 60 * 5);

  return (
    <div>
      {RANGE_OPTIONS.map((range) => {
        return (
          <button key={range} onClick={() => handleClick(range)}>
            {range}
          </button>
        );
      })}
      <br />
      <br />
      <h1>{range}</h1>
    </div>
  );
}
