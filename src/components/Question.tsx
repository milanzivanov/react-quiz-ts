import Options from "./Options";
import { SetStatusAction, QuestionData } from "../App";
import { Dispatch } from "react";

function Question({
  question,
  dispatch,
  answer
}: {
  question: QuestionData;
  dispatch: Dispatch<SetStatusAction>;
  answer: number | null;
}) {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>

      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
export default Question;
