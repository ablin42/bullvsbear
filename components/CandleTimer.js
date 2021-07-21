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
    }, 100);
  });

  function calculateTimeLeft(timing) {
    const timestamp = +new Date() - +new Date(timing);
    const secondsLeft = timestamp / 1000;
    if (secondsLeft > 300) {
      setTiming(+new Date());
    }
    const roundedResult = (Math.round(secondsLeft * 10) / 10).toFixed(1);

    return roundedResult;
  }

  // TODO style
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>candle timing</h3>
      <ProgressBar now={timeLeft / 3} label={`${timeLeft} / 300`} />
    </div>
  );
}
