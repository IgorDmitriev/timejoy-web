import React from 'react';

export const DateTitle = ({ date }) => (
  <div className='date-title'>
    <span>{ date.format() }</span>
  </div>
);

export default DateTitle;
