export const getCurrentISODate = () => {
  const currentDate = new Date();
  return currentDate.toISOString();
};
