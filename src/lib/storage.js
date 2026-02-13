const USER_KEY = "userName";

export const saveToLocalStorage = (updatedData) => {
  localStorage.setItem(USER_KEY, JSON.stringify(updatedData));
};

export const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem(USER_KEY);
  return JSON.parse(savedData);
};
