import ReactDOM from "react-dom/client";

import { legacy_createStore as createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const actionHandler = (type) => store.dispatch({ type });

  return (
    <div>
      <button onClick={() => actionHandler("GOOD")}>good</button>
      <button onClick={() => actionHandler("OK")}>ok</button>
      <button onClick={() => actionHandler("BAD")}>bad</button>
      <button onClick={() => actionHandler("ZERO")}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => root.render(<App />);

renderApp();

store.subscribe(renderApp);

export default App;
