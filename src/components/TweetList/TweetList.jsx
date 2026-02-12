import Tweet from "./../Tweet/Tweet";
import style from "./TweetList.module.css";

const TweetList = ({ tweets }) => {
  //recieves the tweets array
  //renders a list of tweets, automatically sorting them by newest

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
