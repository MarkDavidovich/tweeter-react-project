import { useState } from "react";
import TweetList from "../../components/TweetList/TweetList";
import TweetMaker from "../../components/TweetMaker/TweetMaker";
import style from "./Tweets.module.css";
import moment from "moment";

const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [userName, setUserName] = useState("User");

  //add tweet function will live here
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
