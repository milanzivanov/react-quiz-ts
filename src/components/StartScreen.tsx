import { Dispatch } from "react";
import { QuestionAction } from "../App";

type StartScreenProps = {
  numQuestions: number;
  dispatch: Dispatch<QuestionAction>;
};

function StartScreen({ numQuestions, dispatch }: StartScreenProps) {
  return (
    <div className="start">
      <h2>Welcome to React Quiz</h2>
      <h3>{numQuestions} questions to test your React knowledge</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Start
      </button>
    </div>
  );
}
export default StartScreen;
