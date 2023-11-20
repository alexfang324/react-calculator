import { useState } from "react";
import "../public/styles/App.css";

import Screen from "./Screen";
import Keypad from "./Keypad";

function App() {
  const onBtnClick = (data) => {
    console.log(data);
  };

  return (
    <div className="app">
      <Screen />
      <Keypad onBtnClick={onBtnClick} />
    </div>
  );
}

export default App;
