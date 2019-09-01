const MINUTES_PER_HOUR = 60;

const monthes = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const formatDuration = (minutes) => `${Math.floor(minutes / MINUTES_PER_HOUR)}h ${minutes % MINUTES_PER_HOUR}m`;

const formatDate = (dateUTC) => {
  const date = new Date(dateUTC);
  const day = date.getDate();
  const month = monthes[date.getMonth()];
  const year = date.getFullYear();
  return `${day > 9 ? `` : `0`}${day} ${month} ${year}`;
};

const msToDays = (ms) => Math.floor(ms / 1000 / 60 / 60 / 24);

export {getRandomInt, monthes, formatDuration, formatDate, msToDays};
