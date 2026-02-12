import Tweet from "./../Tweet/Tweet";
import style from "./TweetList.module.css";

const TweetList = ({ tweets }) => {
  //recieves the tweets array
  //renders a list of tweets, automatically sorting them by newest

  const sortedTweets = tweets.sort((a, b) => b.id - a.id);

  console.log(sortedTweets);

  return (
    <div className={style.container}>
      {sortedTweets?.map((tweet) => (
        <Tweet key={tweet.id} user={tweet.user} datePosted={tweet.datePosted} text={tweet.text} />
      ))}
    </div>
  );
};
export default TweetList;
