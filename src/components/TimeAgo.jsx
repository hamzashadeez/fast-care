import React from 'react';
import moment from 'moment';

const TimeAgo = ({ timestamp }) => {
  const firebaseTimestamp = timestamp.seconds + (timestamp.nanoseconds / 1000000000); 
  const now = moment();
  const then = moment.unix(firebaseTimestamp); 
  const duration = moment.duration(now.diff(then));

  if (duration.asSeconds() < 60) {
    return 'Just now';
  } else if (duration.asMinutes() < 60) {
    return `${Math.floor(duration.asMinutes())} min ago`;
  } else if (duration.asHours() < 24) {
    return `${Math.floor(duration.asHours())} hr ago`;
  } else if (duration.asDays() < 7) {
    return `${Math.floor(duration.asDays())} days ago`;
  } else {
    return then.format('MMM D, YYYY'); // Format date for older times
  }
};

export default TimeAgo;