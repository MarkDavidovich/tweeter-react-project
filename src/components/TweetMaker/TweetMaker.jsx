import { useContext, useState } from "react";
import { TweetsContext } from "../../store/tweets-context";
import style from "./TweetMaker.module.css";

const TweetMaker = ({ loading }) => {
  const [text, setText] = useState("");

  const MAX_TWEET_LENGTH = 140;
  const { postTweet } = useContext(TweetsContext);

  return (
    <form className={style.form}>
      <textarea
        id={style.input}
        placeholder="What do you have in mind?"
        value={text}
        onChange={(ev) => {
          setText(ev.target.value);
        }}
      />
      <div className={style.container}>
        <div>{text.length > MAX_TWEET_LENGTH ? "Tweet can't contain more than 140 chars" : ""}</div>
        <button
          type="button"
          onClick={() => {
            postTweet(text);
            setText("");
          }}
          disabled={text.length > MAX_TWEET_LENGTH || text.length === 0 || loading}
        >
          Tweet
        </button>
      </div>
    </form>
  );
};
export default TweetMaker;
