import { Dispatch } from "react";
import { SetStatusAction, QuestionData } from "../App";

function Options({
  question,
  dispatch,
  answer
}: {
  question: QuestionData;
  dispatch: Dispatch<SetStatusAction>;
  answer: number | null;
}) {
  // console.log(question.options);
  console.log(answer);

  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option: string, index: number) => (
        <button
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
export default Options;
