import { useEffect, useState } from "react";
import TweetList from "../../components/TweetList/TweetList";
import TweetMaker from "../../components/TweetMaker/TweetMaker";
import { saveToLocalStorage, loadFromLocalStorage } from "../../lib/storage";
import moment from "moment";
import style from "./Tweets.module.css";

const Tweets = () => {
  const [tweets, setTweets] = useState(loadFromLocalStorage() || []);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    saveToLocalStorage(tweets);
  }, [tweets]);

  const addTweet = (userText) => {
    const newTweet = {
      id: Date.now(),
      user: userName,
      datePosted: moment().format("MMMM Do, h:mm A"),
      text: userText,
    };

    setTweets((prevTweets) => [...prevTweets, newTweet]);
  };

  return (
    <div>
      <TweetMaker onAddTweet={addTweet} user={userName} />
      <TweetList tweets={tweets} />
    </div>
  );
};
export default Tweets;
