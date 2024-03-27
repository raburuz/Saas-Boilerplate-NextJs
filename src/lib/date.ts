export const monthNames  = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

export const formatDateFromTimestamp  = ( timestamp: number ) =>{
  const date = new Date(timestamp * 1000);
  return {
    day: date.getDate(),
    month: monthNames [date.getMonth()],
    year: date.getFullYear(),
  }
}

/**
 * Calculate a date and time in the past based on the given number of hours ago.
 *
 * @param {number} hoursAgo number - The number of hours ago for which to calculate the past date and time.
 * @returns {Date} The past date and time.
 */
export const calculatePastDateTime  = ( hoursAgo: number ): Date => {
  // Get the current date and time
  const currentDateTime  = new Date();

  // Calculate the start time for the last x hours
  const pastDateTime  = new Date(currentDateTime);
  pastDateTime.setHours(pastDateTime .getHours() - hoursAgo);

  return pastDateTime;
}