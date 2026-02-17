import { useEffect, useState } from "react";
import TweetList from "../../components/TweetList/TweetList";
import TweetMaker from "../../components/TweetMaker/TweetMaker";
import { getCurrentISODate } from "../../lib/utils";
import { TweetsContext } from "../../store/tweets-context";
import { supabase } from "../../lib/supabase";
import { useAlerts } from "../../store/alerts-context";
import { useAuth } from "../../auth/AuthProvider";
import style from "./Tweets.module.css";

const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const { handleAlert } = useAlerts();
  const { loggedOnUser } = useAuth();

  useEffect(() => {
    const fetchTweets = async () => {
      setIsFetching(true);

      try {
        const { data, error } = await supabase.from("tweets").select("*");

        if (error) {
          handleAlert(`Failed to load Tweets! ${error.message}`, true);
          return;
        }

        setTweets(data);
      } catch (err) {
        handleAlert(`Error: ${err.message}`, true);
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
            userName: loggedOnUser.user_metadata.display_name || loggedOnUser.email.split("@")[0],
            content: tweetText,
            date: getCurrentISODate(),
          },
        ])
        .select();

      if (error) {
        handleAlert(`Failed to load Tweets! ${error.message}`, true);
        return;
      }

      setTweets((prevTweets) => [data[0], ...prevTweets]);
      handleAlert(`Tweet posted!`, false);
    } catch (err) {
      handleAlert(`Error: ${err.message}`, true);
    } finally {
      setIsPosting(false);
    }
  };

  const ctxValue = {
    tweets: tweets,
    postTweet: handlePostTweet,
  };

  return (
    <TweetsContext value={ctxValue}>
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
    </TweetsContext>
  );
};

export default Tweets;
