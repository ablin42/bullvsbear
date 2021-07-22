import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function OracleTimer({ candleTiming }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [timing, setTiming] = useState(candleTiming);

  useEffect(() => {
    setTiming(candleTiming);
  }, [candleTiming]);

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(timing));
    }, 1000);
  });

  function calculateTimeLeft(timing) {
    const timestamp = +new Date() - +new Date(timing);
    const secondsLeft = timestamp / 1000;
    const roundedResult = (Math.round(secondsLeft * 10) / 10).toFixed(0);

    return roundedResult;
  }

  const variant = timeLeft < 60 ? "success" : "danger";
  // TODO style
  return (
    <div style={{ width: "30%" }}>
      <h3 style={{ textAlign: "center" }}>last oracle update</h3>
      <ProgressBar
        variant={variant}
        now={(timeLeft / 90) * 100}
        label={`${timeLeft}s / 90s`}
      />
    </div>
  );
}
