export const NEXT_DAY = 'NEXT_DAY';
export const PREVIOUS_DAY = 'PREVIOUS_DAY';

export const nextDay = () => ({
  type: NEXT_DAY
});

export const previousDay = () => ({
  type: PREVIOUS_DAY
});
