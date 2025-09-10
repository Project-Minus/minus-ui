export const convertCloseTime = (autoCloseTime: string) => {
  if (autoCloseTime.endsWith("ms")) {
    return Number(autoCloseTime?.match(/\d+/)?.[0]);
  }
  if (autoCloseTime.endsWith("s")) {
    return Number(autoCloseTime?.match(/\d+/)?.[0]) * 1000;
  }
  return 2000;
};

export const SNCMBAR_DEFAULT_STYLE = {
  show: {},
  info: {
    color: "#16164b",
    backgroundColor: "#DEDCF9",
  },
  success: {
    color: "#2E4E2E",
    backgroundColor: "#DEF9DC",
  },
  warning: {
    color: "#5C5536",
    backgroundColor: "#FDF3AA",
  },
  error: {
    color: "#4E2E2E",
    backgroundColor: "#F9DEDC",
  },
};
