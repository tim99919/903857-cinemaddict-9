import {getRandomInt, formatDuration, createElement} from '../utils.js';

export class Film {
  constructor({title, raiting, year, duration, genres, posterUrl, description, comments, isWatchlisted, isWatched, isFavorite}) {
    this._title = title;
    this._raiting = raiting;
    this._year = year;
    this._duration = duration;
    this._genres = genres;
    this._posterUrl = posterUrl;
    this._description = description;
    this._comments = comments;
    this._isWatchlisted = isWatchlisted;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;
    this._element = null;
  }

  getTemplate() {
    return `
      <article class="film-card">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._raiting}</p>
        <p class="film-card__info">
          <span class="film-card__year">${this._year}</span>
          <span class="film-card__duration">${formatDuration(this._duration)}</span>
          <span class="film-card__genre">${Array.from(this._genres)[getRandomInt(0, this._genres.size - 1)]}</span>
        </p>
        <img src="${this._posterUrl}" alt="" class="film-card__poster">
        <p class="film-card__description">${this._description}</p>
        <a class="film-card__comments">${this._comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._isWatchlisted ? `film-card__controls-item--active` : null}">
            Add to watchlist
          </button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._isWatched ? `film-card__controls-item--active` : null}">
            Mark as watched
          </button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${this._isFavorite ? `film-card__controls-item--active` : null}">
            Mark as favorite
          </button>
        </form>
      </article>
    `;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}
