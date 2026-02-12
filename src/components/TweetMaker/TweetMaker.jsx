import { useState } from "react";
import style from "./TweetMaker.module.css";

const TweetMaker = ({ onAddTweet, user }) => {
  //recieves user name and function to add new tweets
  const [text, setText] = useState("");

  const MAX_TWEET_LENGTH = 140;

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
            onAddTweet(user, text);
          }}
          disabled={text.length > MAX_TWEET_LENGTH || text.length === 0}
        >
          Tweet
        </button>
      </div>
    </form>
  );
};
export default TweetMaker;
