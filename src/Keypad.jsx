import { calculatorButtons } from '../data/button-data';
import Button from './Button';

function Keypad({ onBtnClick }) {
  const keypadGrid = (
    <div className="key-grid">
      {calculatorButtons.map((btn) => {
        return (
          <Button key={btn.text} onBtnClick={onBtnClick} btnContent={btn} />
        );
      })}
    </div>
  );

  return <>{keypadGrid}</>;
}

export default Keypad;
