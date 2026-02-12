import Tweet from "./../Tweet/Tweet";
import style from "./TweetList.module.css";

const TweetList = () => {
  //recieves the tweets array
  //renders a list of tweets, automatically sorting them by newest
  return (
    <div className={style.container}>
      <Tweet />
      <Tweet />
    </div>
  );
};
export default TweetList;
