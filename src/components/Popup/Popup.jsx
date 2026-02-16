import { useAlerts } from "../../store/alerts-context";
import style from "./Popup.module.css";

const Popup = () => {
  const { alert } = useAlerts();
  if (!alert) {
    return null;
  }

  return <div className={`${style.container} ${alert ? style.visible : ""} ${alert.isError ? style.error : ""}`}>{alert.message}</div>;
};

export default Popup;
