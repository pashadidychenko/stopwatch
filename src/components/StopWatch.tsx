import React, { useEffect, useState } from "react";
import { interval, Subject, fromEvent } from "rxjs";
import { takeUntil, filter, throttleTime, buffer } from "rxjs/operators";
import "../assets/scss/App.scss";

function StopWatch() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const unsubscribe = new Subject();
    interval(1000)
      .pipe(takeUntil(unsubscribe))
      .subscribe(() => {
        if (status) {
          setSec((val) => val + 1000);
        }
      });
    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    };
  }, [status]);

  const start = () => setStatus(true);

  const stop = () => {
    setStatus(false);
    setSec(0);
  };

  const reset = () => setSec(0);

  const clicks = fromEvent(document, "click");
  const wait = () => {
    clicks
      .pipe(
        buffer(clicks.pipe(throttleTime(300))),
        filter((clickArray) => clickArray.length === 2),
      )
      .subscribe(() => setStatus(false));
  };

  return (
    <div>
      <span> {new Date(sec).toISOString().slice(11, 19)}</span>
      <div>
        {status ? (
          <button onClick={stop}>Stop</button>
        ) : (
          <button onClick={start}>Start</button>
        )}

        <button onClick={reset}>Reset</button>
        <button id="wait" onClick={wait}>
          Wait
        </button>
      </div>
    </div>
  );
}

export default StopWatch;
