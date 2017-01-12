import React from 'react';

export const DateTitle = ({ date }) => (
  <div className='date-title'>
    <span>{ date.format('D MMM, YYYY') }</span>
  </div>
);

export default DateTitle;
