import { Dispatch } from "react";
import { SetStatusAction } from "../App";

function NextButton({
  dispatch,
  answer
}: {
  dispatch: Dispatch<SetStatusAction>;
  answer: number | null;
}) {
  if (answer === null) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
}
export default NextButton;
