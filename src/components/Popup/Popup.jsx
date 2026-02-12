import style from "./Popup.module.css";

const Popup = ({ message, isError }) => {
  return <div className={`${style.container} ${message ? style.visible : ""} ${isError ? style.error : ""}`}>I am a snackbar</div>;
};

export default Popup;
