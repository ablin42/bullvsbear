import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function Timer({ oracle }) {
  const [minutes, seconds] = oracle.timeLeft.split(":").map((item) => +item);

  const secondsLeft = (
    minutes * 60 +
    seconds +
    (+oracle.date - +new Date()) / 1000
  ).toFixed(0);
  const [timeLeft, setTimeLeft] = useState(secondsLeft);

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(timeLeft));
    }, 1000);
  });

  function calculateTimeLeft(timing) {
    if (timing < 0) return 300;
    return timing - 1;
  }

  //   function formatTimeLeft(timing) {
  //     const minutes = (timing / 60).toFixed(0);
  //     const seconds = (timing % 60).toFixed(0);

  //     return `${minutes}:${seconds}`;
  //   }

  return (
    <div style={{ width: "33%", margin: "auto" }}>
      <h3 style={{ textAlign: "center" }}>time left</h3>
      {timeLeft} seconds
      <ProgressBar now={(300 - timeLeft) / 3} />
    </div>
  );
}
