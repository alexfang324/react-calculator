import Button from "./Button";
import { calculatorButtons } from "../data/button-data";

function Keypad({ onBtnClick }) {
  return (
    <>
      <h1>This is a Keypad</h1>
      <Button onBtnClick={onBtnClick} />
    </>
  );
}

export default Keypad;
