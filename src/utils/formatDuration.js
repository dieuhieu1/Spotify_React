const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const timeCalculator = (seconds) => {
  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  const second = Math.floor(seconds % 60);

  // Build the result string conditionally
  let result = "";
  if (hour > 0) result += `${hour} giờ `;
  if (minute > 0 || hour > 0) result += `${minute} phút `;
  if (second > 0 || (hour === 0 && minute === 0)) result += `${second} giây`; // Only show seconds if greater than 0, or if hours and minutes are 0

  return result.trim(); // Trim to remove any trailing spaces
};

export { timeCalculator, formatDuration };
