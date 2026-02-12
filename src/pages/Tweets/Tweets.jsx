import { useEffect, useState } from "react";
import TweetList from "../../components/TweetList/TweetList";
import TweetMaker from "../../components/TweetMaker/TweetMaker";
import TWEETS_API_URL from "../../lib/api";
import moment from "moment";
import style from "./Tweets.module.css";

const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const fetchTweets = async () => {
      const response = await fetch(TWEETS_API_URL);

      if (!response.ok) {
        throw new Error(`Failed to get posts! status: ${response.status}`);
      }

      const tweetsData = await response.json();

      setTweets(tweetsData);
    };

    fetchTweets();
  }, []);

  const getCurrentISODate = () => {
    const currentDate = new Date();
    return currentDate.toISOString();
  };

  const addTweet = (userText) => {
    const newTweet = {
      content: userText,
      userName: userName,
      date: getCurrentISODate(),
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
