import { QuestionData } from "../App";

function Options({ question }: { question: QuestionData }) {
  console.log(question.options);
  return (
    <div className="options">
      {question.options.map((option: string) => (
        <button className="btn btn-option" key={option}>
          {option}
        </button>
      ))}
    </div>
  );
}
export default Options;
