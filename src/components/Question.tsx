import Options from "./Options";
import { QuestionData } from "../App";

function Question({ question }: { question: QuestionData }) {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>

      <Options question={question} />
    </div>
  );
}
export default Question;
