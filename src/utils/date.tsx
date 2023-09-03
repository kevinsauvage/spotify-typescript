export const getMinuteFromMilliseconds = (milliseconds: number) => {
  if (!milliseconds) return '';
  const date = new Date(milliseconds);
  return `${date.getMinutes()}:${date.getSeconds().toString().padStart(2, '0')}`;
};

export const getMinuteFromSeconds = (seconds: number) => {
  if (!seconds) return '';
  const date = new Date(seconds * 1000);
  return `${date.getMinutes()}:${date.getSeconds().toString().padStart(2, '0')}`;
};
