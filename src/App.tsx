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
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECONDS_PER_QUESTION = 30;

export type QuestionData = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
  id: string;
};

type QuestionState = {
  questions: QuestionData[];
  status: "loading" | "error" | "ready" | "active" | "finished" | "tick";
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number;
};

export type QuestionAction =
  | { type: "dataReceived"; payload: QuestionData[] }
  | { type: "dataError" }
  | { type: "start" }
  | { type: "newAnswer"; payload: number }
  | { type: "nextQuestion" }
  | { type: "finish" }
  | { type: "restart" }
  | { type: "tick" };

const initialState: QuestionState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 0
};

function reducer(state: QuestionState, action: QuestionAction): QuestionState {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      };
    case "dataError":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION
      };
    case "newAnswer":
      // eslint-disable-next-line no-case-declarations
      const question = state.questions[state.index] as QuestionData;

      return {
        ...state,
        answer: action.payload,
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

    case "finish":
      return {
        ...state,
        status: "finished",
        // highscore:
        //   state.points > state.highscore ? state.points : state.highscore
        highscore: Math.max(state.points, state.highscore)
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready"
      };
    // return {
    //   ...state,
    //   status: "ready",
    //   index: 0,
    //   answer: null,
    //   points: 0,
    //   highscore: 0
    // };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status
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
  const maxPoints = state.questions.reduce((prev, cur) => prev + cur.points, 0);

  // json-server
  // https:localhost:5000/questions

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/milanzivanov/2b6c26d729027f7c213c34ee9b25528a/raw/5f134d819b4aa99a4a474ec3ffd036ee4cdd6f6e/data.json"
        );
        const data = await response.json();
        dispatch({ type: "dataReceived", payload: data });
        console.log(data);
      } catch {
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
            <Progress
              index={state.index}
              numQuestions={numQuestions}
              points={state.points}
              maxPoints={maxPoints}
              answer={state.answer}
            />
            <Question
              question={question}
              dispatch={dispatch}
              answer={state.answer}
            />
            <Footer>
              <Timer
                dispatch={dispatch}
                secondsRemaining={state.secondsRemaining}
              />
              <NextButton
                dispatch={dispatch}
                answer={state.answer}
                index={state.index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}

        {state.status === "finished" && (
          <FinishScreen
            points={state.points}
            maxPoints={maxPoints}
            highscore={state.highscore}
            dispatch={dispatch}
          />
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
