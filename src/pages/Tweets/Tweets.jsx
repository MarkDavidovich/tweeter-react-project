import { useEffect, useState } from "react";
import TweetList from "../../components/TweetList/TweetList";
import TweetMaker from "../../components/TweetMaker/TweetMaker";
import TWEETS_API_URL from "../../lib/api";
import { getCurrentISODate } from "../../lib/utils";
import style from "./Tweets.module.css";
import Popup from "../../components/Popup/Popup";

const Tweets = ({ userName, handleTweetPopups }) => {
  const [tweets, setTweets] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    const fetchTweets = async () => {
      setIsFetching(true);

      try {
        const response = await fetch(TWEETS_API_URL);

        if (!response.ok) {
          throw new Error(`Failed to load Tweets! status: ${response.status}`);
        }

        const tweetsData = await response.json();

        setTweets(tweetsData);
      } catch (err) {
        handleTweetPopups(`Error: ${err.message}`, true);
      } finally {
        setIsFetching(false);
      }
    };

    fetchTweets();
  }, []);

  const postTweet = async (tweetText) => {
    setIsPosting(true);

    try {
      const response = await fetch(TWEETS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: tweetText,
          userName: userName,
          date: getCurrentISODate(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to post Tweet! status: ${response.status}`);
      }

      const createdTweet = await response.json();

      setTweets((prevTweets) => [...prevTweets, createdTweet]);
      handleTweetPopups(`Tweet posted!`, false);
    } catch (err) {
      setPopupContext(`Error: ${err.message}`, true);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className={style.container}>
      <TweetMaker onAddTweet={postTweet} loading={isPosting} />
      {isFetching ? (
        <div>
          <div className={style.loader}></div>
        </div>
      ) : (
        <TweetList tweets={tweets} />
      )}
    </div>
  );
};

export default Tweets;
