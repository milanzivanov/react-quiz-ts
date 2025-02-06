import { useEffect, useReducer } from "react";
import "./App.css";

// import DatePicker from "./components/DatePicker";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";

import "./index.css";
import NextButton from "./components/NextButton";

type QuestionState = {
  questions: QuestionData[];
  status: string;
  index: number;
  answer: number | null;
  points: number;
};

const initialState: QuestionState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0
};

export type QuestionAction = {
  type: "dataReceived" | "dataError" | "start" | "newAnswer" | "nextQuestion";
  payload?: QuestionData[];
};

export type AnswerAction = {
  type: "newAnswer";
  payload: number;
};

export type SetStatusAction = QuestionAction | AnswerAction;

export type QuestionData = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
  id: string;
};

function reducer(state: QuestionState, action: SetStatusAction): QuestionState {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload ?? [],
        status: "ready"
      };
    case "dataError":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      // eslint-disable-next-line no-case-declarations
      const question = state.questions[state.index] as QuestionData;

      return {
        ...state,
        answer: action.payload as number,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null
      };

    default:
      throw new globalThis.Error("Unknown action");
  }
}

// react quiz
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const numQuestions = state.questions.length;
  const question = state.questions[state.index] as QuestionData;

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/questions");
        const data = await response.json();
        dispatch({ type: "dataReceived", payload: data });
        console.log(data);
      } catch (error) {
        console.log(error);
        dispatch({ type: "dataError" });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <Error />}
        {state.status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {state.status === "active" && (
          <>
            <Question
              question={question}
              dispatch={dispatch}
              answer={state.answer}
            />
            <NextButton dispatch={dispatch} answer={state.answer} />
          </>
        )}
      </Main>
    </div>
  );
}

///////////////////
// date picker
// export default function App() {
//   return (
//     <div className="App">
//       <h1>React TS DatePicker</h1>
//       <>
//         <DatePicker />
//       </>
//     </div>
//   );
// }
