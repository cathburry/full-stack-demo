import moment from 'moment';

// Validates datetime
const isValid = (datetime) => {
    if (!moment(datetime).isValid()) {
      throw RangeError('Invalid date');
    }
  
    return datetime;
  };
  
// Converts datetime to moment in a fixed-offset timezone
const toParseZone = (datetime) => isValid(moment.parseZone(datetime));

// Returns "1 Jan 2019" - "31 Dec 2019"
export const getDayMonthYear = (datetime) => {
  const dt = toParseZone(datetime);
  return dt.format('D MMM YYYY');
};
