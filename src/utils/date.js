// eslint-disable-next-line import/prefer-default-export
export const getMinuteFromMilliseconds = (milliseconds) => {
  if (!milliseconds) return '';
  const date = new Date(milliseconds);
  return `${date.getMinutes()}:${date.getSeconds().toString().padStart(2, '0')}`;
};
