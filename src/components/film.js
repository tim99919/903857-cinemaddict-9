import {getRandomInt, formatDuration} from "../utils.js";

export const createFilmTemplate = ({title, raiting, year, duration, genres, posterUrl, description, comments}) => {
  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${raiting}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${formatDuration(duration)}</span>
      <span class="film-card__genre">${Array.from(genres)[getRandomInt(0, genres.size - 1)]}</span>
    </p>
    <img src="${posterUrl}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`;
};
