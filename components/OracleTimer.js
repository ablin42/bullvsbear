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
    }, 100);
  });

  function calculateTimeLeft(timing) {
    const timestamp = +new Date() - +new Date(timing);
    const secondsLeft = timestamp / 1000;
    const roundedResult = (Math.round(secondsLeft * 10) / 10).toFixed(1);

    return roundedResult;
  }

  // TODO style
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>
        oracle update: {timeLeft}s ago / avg refresh 90s
      </h3>
      <ProgressBar now={(timeLeft / 90) * 100} label={`${timeLeft} / 90`} />
    </div>
  );
}
