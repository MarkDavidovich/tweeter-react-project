import style from "./Tweet.module.css";

const Tweet = ({ user, datePosted, text }) => {
  return (
    <div className={style.container}>
      <div>
        <p>{user}</p>
        <p>{datePosted}</p>
      </div>
      <p>{text}</p>
    </div>
  );
};
export default Tweet;
