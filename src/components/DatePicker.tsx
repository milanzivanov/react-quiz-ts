/* eslint-disable react-refresh/only-export-components */
import { useReducer } from "react";

export type CounterState = {
  count: number;
  step: number;
  status: string;
};

export const initialState: CounterState = {
  count: 0,
  step: 1,
  status: "Pending"
};

type UpdateCountAction = {
  type: "increment" | "decrement" | "reset";
};

type SetStepAction = {
  type: "setStep" | "setCount";
  payload: number;
};

type SetStatusAction = {
  type: "setStatus";
  payload: "active" | "inactive";
};

type CounterAction = UpdateCountAction | SetStepAction | SetStatusAction;

function reducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };
    case "decrement":
      return { ...state, count: state.count - state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "setStatus":
      return { ...state, status: action.payload };
    case "reset":
      return initialState;

    default:
      //   throw new Error("Unknown action");
      // eslint-disable-next-line no-case-declarations
      const unhandledActionType: never = action;
      throw new Error(`Unhandled action type: ${unhandledActionType}`);
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  //   whe can destructure like this
  //   const { count, step } = state;

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + state.count);

  const decrement = function () {
    dispatch({ type: "decrement" });
  };

  const increment = function () {
    dispatch({ type: "increment" });
  };

  const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <h2>Count: {state.count}</h2>
      <h2>Status: {state.status}</h2>
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={decrement}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={increment}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>

      <div>
        <button
          onClick={() => dispatch({ type: "setStatus", payload: "active" })}
        >
          Set status active
        </button>
        <button
          onClick={() => dispatch({ type: "setStatus", payload: "inactive" })}
        >
          Set status inactive
        </button>
      </div>
    </div>
  );
}
export default DateCounter;
