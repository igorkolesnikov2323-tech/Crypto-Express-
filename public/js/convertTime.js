function convertTime(data) {
  try {
    const now = new Date();
    const createDate = new Date(data);
    const diffInMS = now - createDate;
    const yearInMS = 31536000000;
    const monthInMS = 2592000000;
    const dayInMS = 86400000;
    const hourInMS = 3600000;
    const minuteInMs = 60000;
    const secondInMs = 1000;

    if (diffInMS <= 0) return "New";

    if (diffInMS >= yearInMS) {
      const diffInYears = diffInMS / yearInMS;
      return `${Math.floor(diffInYears)}y`;
    }
     else if (diffInMS > monthInMS) {
      const diffInMonth = diffInMS / monthInMS;
      return `${Math.floor(diffInMonth)}mo`;
    } 
    else if (diffInMS >= dayInMS) {
      const diffInDays = diffInMS / dayInMS;
      return `${Math.floor(diffInDays)}d`;
    } 
    else if (diffInMS >= hourInMS) {
      const diffInHours = diffInMS / hourInMS;
      return `${Math.floor(diffInHours)}h`;
    }
     else if (diffInMS >= minuteInMs) {
      const diffInMinutes = diffInMS / minuteInMs;
      return `${Math.floor(diffInMinutes)}min`;
    }
     else if (diffInMS >= secondInMs && diffInMS < minuteInMs) {
      const diffInSeconds = diffInMS / secondInMs;
      return `${Math.floor(diffInSeconds)}sec`;
    }
  } catch (error) {
    console.error(error.message);
  }
}

export { convertTime }