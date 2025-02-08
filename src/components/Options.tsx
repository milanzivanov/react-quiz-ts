import { Dispatch } from "react";
import { QuestionAction, QuestionData } from "../App";

function Options({
  question,
  dispatch,
  answer
}: {
  question: QuestionData;
  dispatch: Dispatch<QuestionAction>;
  answer: number | null;
}) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option: string, index: number) => {
        const isAnswerCorrect = index === question.correctOption;
        const isAnswerSelected = answer === index;
        return (
          <button
            className={`btn btn-option ${isAnswerSelected ? "answer" : ""} ${
              hasAnswered ? (isAnswerCorrect ? "correct" : "wrong") : ""
            }`}
            key={option}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
export default Options;
