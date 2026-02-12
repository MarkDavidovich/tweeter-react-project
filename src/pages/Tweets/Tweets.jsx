import { useEffect, useState } from "react";
import TweetList from "../../components/TweetList/TweetList";
import TweetMaker from "../../components/TweetMaker/TweetMaker";
import TWEETS_API_URL from "../../lib/api";
import { getCurrentISODate } from "../../lib/utils";
import style from "./Tweets.module.css";

const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [userName, setUserName] = useState("fullstack_mark");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTweets = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(TWEETS_API_URL);

        if (!response.ok) {
          setError(`Failed to get Tweets! status: ${response.status}`);
        }

        const tweetsData = await response.json();

        setTweets(tweetsData);
      } catch (err) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, []);

  const postTweet = async (tweetText) => {
    setLoading(true);
    setError(null);

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
        setError(`Failed to post tweet! status: ${response.status}`);
      }

      const createdTweet = await response.json();

      setTweets((prevTweets) => [...prevTweets, createdTweet]);
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  //TODO: need to display the error to the user by a small window that pops out of the corner, need to make a component for that.
  //TODO? need to show a better loader?

  return (
    <div className={style.container}>
      <TweetMaker onAddTweet={postTweet} loading={loading} />
      {loading ? `Loading...` : <TweetList tweets={tweets} />}
    </div>
  );
};

export default Tweets;
