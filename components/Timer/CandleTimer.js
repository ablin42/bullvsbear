// @EXTERNALS
import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

// * TAKES A TIMESTAMP SINCE CANDLE OPENED AND RETURNS THE SECONDS SINCE THAT TIMESTAMP *
export default function CandleTimer({ candleTiming }) {
  const [timeSpent, setTimeSpent] = useState(0);
  const [timing, setTiming] = useState(candleTiming);

  useEffect(() => {
    setTiming(candleTiming);
  }, [candleTiming]);

  useEffect(() => {
    setTimeout(() => {
      setTimeSpent(calculateTimeSpent(timing));
    }, 1000);
  });

  function calculateTimeSpent(timing) {
    const timestamp = +new Date() - +new Date(timing);
    const secondsSpent = timestamp / 1000;
    if (secondsSpent > 300) {
      setTiming(+new Date());
    }
    const roundedResult = (Math.round(secondsSpent * 10) / 10).toFixed(0);
    return roundedResult;
  }

  //success info warning danger
  let variant = 'default';
  if (timeSpent > 90 && timeSpent < 210) variant = 'success';
  if (timeSpent > 240 || timeSpent < 60) variant = 'info';
  return (
    <div>
      <h3>Candle lifespan</h3>
      <ProgressBar variant={variant} now={timeSpent / 3} label={`${timeSpent}s / 300s`} />
    </div>
  );
}
