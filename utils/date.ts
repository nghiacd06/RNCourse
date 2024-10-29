const getFormattedDate = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;

const getDateMinusDays = (date: Date, days: number): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDay() - days);
};

export { getFormattedDate, getDateMinusDays };
