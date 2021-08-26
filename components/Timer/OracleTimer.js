// @EXTERNALS
import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

// * TAKES A TIMESTAMP AND RETURNS THE SECONDS SINCE THAT TIMESTAMP *
export default function OracleTimer({ candleTiming }) {
  const [secondsSince, setSecondsSince] = useState(0);
  const [timing, setTiming] = useState(candleTiming);

  useEffect(() => {
    setTiming(candleTiming);
  }, [candleTiming]);

  useEffect(() => {
    setTimeout(() => {
      setSecondsSince(calculateSecondsSince(timing));
    }, 1000);
  });

  function calculateSecondsSince(timing) {
    const timestamp = +new Date() - +new Date(timing);
    const secondsLeft = timestamp / 1000;
    const roundedResult = (Math.round(secondsLeft * 10) / 10).toFixed(0);

    return roundedResult;
  }

  let variant = "default";
  if (secondsSince > 20) variant = "warning";
  if (secondsSince > 30) variant = "danger";
  return (
    <div>
      <h3>Seconds since oracle update</h3>
      <ProgressBar
        striped
        animated
        variant={variant}
        now={(secondsSince / 40) * 100}
        label={`${secondsSince}s / 40s`}
      />
    </div>
  );
}
