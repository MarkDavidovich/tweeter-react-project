import style from "./Popup.module.css";

const Popup = ({ message, isError }) => {
  return <div className={`${style.container} ${message ? style.visible : ""} ${isError ? style.error : ""}`}>{message}</div>;
};

export default Popup;
