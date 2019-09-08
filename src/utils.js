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

const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforend`,
  AFTEREND: `afterend`
};

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

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstElementChild;
};

const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
    case Position.AFTEREND:
      container.after(element);
      break;

    default:
      break;
  }
};

const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

export {getRandomInt, monthes, formatDuration, formatDate, msToDays, createElement, render, unrender, Position};
