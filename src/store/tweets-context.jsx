import { createContext } from "react";

export const TweetsContext = createContext({
  tweets: [],
  postTweet: () => {},
});
