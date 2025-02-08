import { Dispatch, useEffect } from "react";
import { QuestionAction } from "../App";

function Timer({
  dispatch,
  secondsRemaining
}: {
  dispatch: Dispatch<QuestionAction>;
  secondsRemaining: number;
}) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const interval = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(interval);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {minutes < 10 && "0"}
      {minutes}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
export default Timer;
