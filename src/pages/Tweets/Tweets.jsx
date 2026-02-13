import { useEffect, useState } from "react";
import TweetList from "../../components/TweetList/TweetList";
import TweetMaker from "../../components/TweetMaker/TweetMaker";
import { getCurrentISODate } from "../../lib/utils";
import style from "./Tweets.module.css";
import { TweetsContext } from "../../store/tweets-context";
import { supabase } from "../../lib/supabase";

const Tweets = ({ userName, onAlert }) => {
  const [tweets, setTweets] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    const fetchTweets = async () => {
      setIsFetching(true);

      try {
        const { data, error } = await supabase.from("tweets").select("*");

        if (error) {
          onAlert(`Failed to load Tweets! ${error.message}`, true);
          return;
        }

        setTweets(data);
      } catch (err) {
        onAlert(`Error: ${err.message}`, true);
      } finally {
        setIsFetching(false);
      }
    };

    fetchTweets();
    const intervalId = setInterval(fetchTweets, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const handlePostTweet = async (tweetText) => {
    setIsPosting(true);

    try {
      const { data, error } = await supabase
        .from("tweets")
        .insert([
          {
            user_name: userName,
            content: tweetText,
            date: getCurrentISODate(),
          },
        ])
        .select();

      if (error) {
        onAlert(`Failed to load Tweets! ${error.message}`, true);
        return;
      }

      setTweets((prevTweets) => [data[0], ...prevTweets]);
      onAlert(`Tweet posted!`, false);
    } catch (err) {
      onAlert(`Error: ${err.message}`, true);
    } finally {
      setIsPosting(false);
    }
  };

  const ctxValue = {
    tweets: tweets,
    postTweet: handlePostTweet,
  };

  return (
    <TweetsContext.Provider value={ctxValue}>
      <div className={style.container}>
        <TweetMaker loading={isPosting} />
        {isFetching && tweets.length === 0 ? (
          <div>
            <div className={style.loader}></div>
          </div>
        ) : (
          <TweetList />
        )}
      </div>
    </TweetsContext.Provider>
  );
};

export default Tweets;
