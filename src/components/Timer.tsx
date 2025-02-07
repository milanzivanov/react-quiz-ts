import { Dispatch, useEffect } from "react";
import { SetStatusAction } from "../App";

function Timer({
  dispatch,
  secondsRemaining
}: {
  dispatch: Dispatch<SetStatusAction>;
  secondsRemaining: number;
}) {
  useEffect(
    function () {
      const interval = setInterval(function () {
        // console.log("Tik");
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(interval);
    },
    [dispatch]
  );

  return <div className="timer">{secondsRemaining}</div>;
}
export default Timer;
