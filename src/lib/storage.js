const TWEETS_KEY = "savedTweets";

export const saveToLocalStorage = (updatedData) => {
  localStorage.setItem(TWEETS_KEY, JSON.stringify(updatedData));
};

export const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem(TWEETS_KEY);
  return JSON.parse(savedData);
};
