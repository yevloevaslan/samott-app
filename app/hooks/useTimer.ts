import { useRef, useState, useEffect, useCallback, useMemo } from "react";

const useTimer = (
  durationInSec: number = 60,
  startTime: number = durationInSec,
  autoStart?: boolean
): {
  seconds: number;
  formatted: string;
  reset: () => void;
  start: () => void;
  isTicking: boolean;
} => {
  const [seconds, setSeconds] = useState<number>(startTime);
  const [isTicking, setIsTicking] = useState<boolean>(autoStart || false);
  const timer = useRef<any>();

  useEffect(() => {
    if (!timer.current) {
      if (autoStart) {
        start();
      }
    }

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      setIsTicking(false);
    }
  }, [seconds]);

  const reset = useCallback(() => setSeconds(durationInSec), [durationInSec]);

  const start = useCallback(() => {
    setIsTicking(true);
    timer.current = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  }, []);

  const padTime = useCallback(
    (time: number) => (String(time).length === 1 ? `0${time}` : `${time}`),
    []
  );

  const formatted = useMemo(() => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (minutes === 0) {
      return `${padTime(secs)} сек`;
    }
    return `${minutes}:${padTime(secs)} минут`;
  }, [padTime, seconds]);

  return { seconds, formatted, reset, start, isTicking };
};

export default useTimer;
