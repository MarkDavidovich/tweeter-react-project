import Tweet from "./../Tweet/Tweet";
import { TweetsContext } from "../../store/tweets-context";
import { useContext } from "react";
import style from "./TweetList.module.css";

const TweetList = () => {
  const tweets = useContext(TweetsContext);

  const sortedTweets = tweets.sort((a, b) => b.id - a.id);

  return (
    <div className={style.container}>
      {sortedTweets?.map((tweet) => (
        <Tweet key={tweet.id} user={tweet.userName} datePosted={tweet.date} text={tweet.content} />
      ))}
    </div>
  );
};
export default TweetList;
