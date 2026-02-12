import style from "./Tweet.module.css";

const Tweet = () => {
  return (
    <div className={style.container}>
      <div>
        <p>Name</p>
        <p>Date</p>
      </div>
      <p>tweet body</p>
    </div>
  );
};
export default Tweet;
