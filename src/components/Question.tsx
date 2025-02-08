import Options from "./Options";
import { QuestionAction, QuestionData } from "../App";
import { Dispatch } from "react";

function Question({
  question,
  dispatch,
  answer
}: {
  question: QuestionData;
  dispatch: Dispatch<QuestionAction>;
  answer: number | null;
}) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
export default Question;
