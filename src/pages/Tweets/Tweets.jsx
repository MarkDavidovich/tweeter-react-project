import { useEffect, useRef, useState } from "react";
import TweetList from "../../components/TweetList/TweetList";
import TweetMaker from "../../components/TweetMaker/TweetMaker";
import TWEETS_API_URL from "../../lib/api";
import { getCurrentISODate } from "../../lib/utils";
import style from "./Tweets.module.css";
import Popup from "../../components/Popup/Popup";

const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [userName, setUserName] = useState("fullstack_mark");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [popupContext, setPopupContext] = useState(null); //{ message: "message", isError: false }

  const timeoutRef = useRef(null);

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

  useEffect(() => {
    if (!popupContext) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setPopupContext(null);
    }, 2000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [popupContext]);

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

  //TODO? need to show a better loader?
  //TODO change all errors to popup errors etc
  return (
    <div className={style.container}>
      <button
        onClick={() => {
          setPopupContext({ message: "boop", isError: false });
        }}
      >
        snackbar test
      </button>
      <TweetMaker onAddTweet={postTweet} loading={loading} />
      {loading ? `Loading...` : <TweetList tweets={tweets} />}
      <Popup message={popupContext?.message} isError={popupContext?.isError} onClosePopup={() => setPopupContext(null)} />
    </div>
  );
};

export default Tweets;
