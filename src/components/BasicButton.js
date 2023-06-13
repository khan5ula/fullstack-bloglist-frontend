const BasicButton = ({ event, text }) => {
  return (
    <button onClick={event}>{text}</button>
  );
}

export default BasicButton;