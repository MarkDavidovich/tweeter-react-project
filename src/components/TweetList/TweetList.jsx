import Tweet from "./../Tweet/Tweet";
import style from "./TweetList.module.css";

const TweetList = ({ tweets }) => {
  //recieves the tweets array
  //renders a list of tweets, automatically sorting them by newest
  return (
    <div className={style.container}>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} user={tweet.user} datePosted={tweet.datePosted} text={tweet.text} />
      ))}
    </div>
  );
};
export default TweetList;
