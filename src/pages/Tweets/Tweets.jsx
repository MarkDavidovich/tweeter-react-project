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
  const [isFetching, setIsFetching] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [popupContext, setPopupContext] = useState(null); //{ message: "message", isError: false }

  const timeoutRef = useRef(null);

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
        setPopupContext({ message: `Error: ${err.message}`, isError: true });
      } finally {
        setIsFetching(false);
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
      setPopupContext({ message: `Tweet posted!`, isError: false });
    } catch (err) {
      setPopupContext({ message: `Error: ${err.message}`, isError: true });
    } finally {
      setIsPosting(false);
    }
  };

  //TODO? need to show a better loader?

  return (
    <div className={style.container}>
      <TweetMaker onAddTweet={postTweet} loading={isPosting} />
      {isFetching ? `Loading...` : <TweetList tweets={tweets} />}
      <Popup message={popupContext?.message} isError={popupContext?.isError} onClosePopup={() => setPopupContext(null)} />
    </div>
  );
};

export default Tweets;
