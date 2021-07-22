import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function Timer({ oracle }) {
  const [minutes, seconds] = oracle.timeLeft.split(":").map((item) => +item);
  const secondsLeft = parseInt(
    (minutes * 60 + seconds + (+oracle.date - +new Date()) / 1000).toFixed(0)
  );
  const [timeLeft, setTimeLeft] = useState(secondsLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      const secondsLeft = parseInt(
        (minutes * 60 + seconds + (+oracle.date - +new Date()) / 1000).toFixed(
          0
        )
      );
      setTimeLeft(secondsLeft);
    }, 1000);
    return () => clearInterval(interval);
  });

  const variant = timeLeft > 60 ? "default" : "danger";
  return (
    <div style={{ width: "30%" }}>
      <h3 style={{ textAlign: "center" }}>time left</h3>

      <ProgressBar
        now={(300 - timeLeft) / 3}
        variant={variant}
        label={timeLeft + "s / 300s"}
      />
    </div>
  );
}
