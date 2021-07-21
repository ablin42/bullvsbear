import React, { useState, useEffect } from "react";
import { API_HOST } from "../api_host";

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

export default function RangeSelection({ setData }) {
  const [range, setRange] = useState("1H");
  const [fetching, setFetching] = useState(false);

  async function handleClick(range) {
    try {
      setFetching(true);
      const res = await fetch(`${API_HOST}/api/scrape/${range}`);

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
    }, 1000 * 60 * 15);
    return () => clearInterval(interval);
  });

  return (
    <div>
      <button
        style={{ marginRight: "30px" }}
        onClick={() => handleClick(range)}
      >
        REFRESH
      </button>
      {RANGE_OPTIONS.map((rangeValue) => {
        return (
          <button
            key={rangeValue}
            style={{ borderStyle: range === rangeValue ? "inset" : "initial" }}
            onClick={() => handleClick(rangeValue)}
          >
            {rangeValue}
          </button>
        );
      })}
      <br />
      <br />
      <h1>{range}</h1>
    </div>
  );
}
