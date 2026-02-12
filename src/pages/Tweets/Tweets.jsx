import TweetList from "../../components/TweetList/TweetList";
import TweetMaker from "../../components/TweetMaker/TweetMaker";
import style from "./Tweets.module.css";

const Tweets = () => {
  return (
    <div>
      <TweetMaker />
      <TweetList />
    </div>
  );
};
export default Tweets;
