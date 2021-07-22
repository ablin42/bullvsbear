import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function CandleTimer({ candleTiming }) {
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
    if (secondsLeft > 300) {
      setTiming(+new Date());
    }
    const roundedResult = (Math.round(secondsLeft * 10) / 10).toFixed(0);

    return roundedResult;
  }

  const variant = timeLeft < 240 ? "default" : "danger";
  // TODO style
  return (
    <div style={{ width: "30%" }}>
      <h3 style={{ textAlign: "center" }}>candle lifespan </h3>
      <ProgressBar
        variant={variant}
        now={timeLeft / 3}
        label={`${timeLeft}s / 300s`}
      />
    </div>
  );
}
