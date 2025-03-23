import moment from 'moment-timezone';

// Indian timezone
export const TIMEZONE = 'Asia/Kolkata';

// Initialize timezone setting
export const initializeTimezone = () => {
  moment.tz.setDefault(TIMEZONE);
};

// Get current time in Indian timezone
export const getCurrentTime = () => {
  return moment().tz(TIMEZONE);
};

// Get current time as a formatted string in Indian timezone
export const getCurrentTimeString = (format: string = 'YYYY-MM-DD HH:mm:ss') => {
  return getCurrentTime().format(format);
};

// Format a date in Indian timezone
export const formatDate = (date: Date | string | moment.Moment, format: string = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(date).tz(TIMEZONE).format(format);
};

// Get a date object in Indian timezone
export const getDateInIST = (dateString: string) => {
  return moment.tz(dateString, TIMEZONE).toDate();
};

// Calculate duration between dates in Indian timezone
export const calculateDuration = (targetDate: Date | string) => {
  const now = getCurrentTime();
  const target = moment(targetDate).tz(TIMEZONE);
  const duration = moment.duration(target.diff(now));
  
  return {
    days: Math.floor(duration.asDays()),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds()
  };
};

// Check if today is a specific date (ignoring year)
export const isToday = (targetDate: Date | string) => {
  const now = getCurrentTime();
  const target = moment(targetDate).tz(TIMEZONE);
  
  return now.date() === target.date() && now.month() === target.month();
}; 