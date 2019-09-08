import {films} from '../services/data.js';
import {createElement} from "../utils.js";

export class SiteMenu {
  constructor() { }

  getTemplate() {
    return `
      <nav class="main-navigation">
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
      </nav>
    `;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}
