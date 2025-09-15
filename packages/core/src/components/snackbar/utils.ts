export const convertCloseTime = (autoCloseTime: string) => {
  if (autoCloseTime.endsWith("ms")) {
    return Number(autoCloseTime?.match(/\d+/)?.[0]);
  }
  if (autoCloseTime.endsWith("s")) {
    return Number(autoCloseTime?.match(/\d+/)?.[0]) * 1000;
  }
  return 2000;
};
