function Button({ onBtnClick }) {
  return (
    <>
      <button onClick={() => onBtnClick("clicked")}>This is a button</button>
    </>
  );
}

export default Button;
