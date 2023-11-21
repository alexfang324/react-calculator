import { calculatorButtons } from '../data/button-data';

function Keypad({ onBtnClick }) {
  const keypadGrid = (
    <div className="key-grid">
      {calculatorButtons.map((btn) => {
        return (
          <button
            key={btn.text}
            className={btn.className}
            onClick={() => {
              onBtnClick(btn);
            }}
          >
            {btn.text}
          </button>
        );
      })}
    </div>
  );

  return <>{keypadGrid}</>;
}

export default Keypad;
