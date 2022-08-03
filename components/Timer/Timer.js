// @EXTERNALS
import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

// * TAKES TIMELEFT (eg 4:30) AND RETURNS TIMELEFT IN SECONDS *
export default function Timer({ oracle, setIsdown, isDown }) {
  const [minutes, seconds] = oracle.timeLeft.split(':').map((item) => +item);
  const secondsLeft = parseInt((minutes * 60 + seconds + (+oracle.date - +new Date()) / 1000).toFixed(0));
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const secondsLeft = parseInt((minutes * 60 + seconds + (+oracle.date - +new Date()) / 1000).toFixed(0));
      setTimeLeft(secondsLeft);
      if (secondsLeft < -150) setIsdown(true);
      else if (isDown && secondsLeft >= -150) setIsdown(false);
    }, 1000);
    return () => clearInterval(interval);
  });

  let variant = 'default';
  if (timeLeft < 60) variant = 'info';
  if (timeLeft < 40) variant = 'danger';
  return (
    <div>
      <h3>Time left</h3>
      <ProgressBar variant={variant} now={(300 - timeLeft) / 3} label={timeLeft + 's left'} />
    </div>
  );
}
