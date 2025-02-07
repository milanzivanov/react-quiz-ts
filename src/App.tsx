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

type QuestionState = {
  questions: QuestionData[];
  status: string;
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number;
};

const initialState: QuestionState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 0
};

export type QuestionAction = {
  type:
    | "dataReceived"
    | "dataError"
    | "start"
    | "newAnswer"
    | "nextQuestion"
    | "finish"
    | "restart"
    | "tick";
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

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore
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
