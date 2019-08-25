export const getUserRank = (filmsCount) => {
  if (filmsCount >= 21) {
    return `movie buff`;
  } else if (filmsCount >= 11 && filmsCount <= 20) {
    return `fan`;
  } else if (filmsCount > 0 && filmsCount <= 10) {
    return `novice`;
  }
  return ``;
};
