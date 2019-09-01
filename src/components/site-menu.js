import {films} from '../services/data.js';

export const createSiteMenuTemplate = () => {
  return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">
      Watchlist <span class="main-navigation__item-count">${films.reduce((acc, curr) => acc + curr.isWatchlisted, 0)}</span>
    </a>
    <a href="#history" class="main-navigation__item">
      History <span class="main-navigation__item-count">${films.reduce((acc, curr) => acc + curr.isWatched, 0)}</span>
    </a>
    <a href="#favorites" class="main-navigation__item">
      Favorites <span class="main-navigation__item-count">${films.reduce((acc, curr) => acc + curr.isFavorite, 0)}</span>
    </a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
};
