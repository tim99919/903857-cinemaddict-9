import {Search} from './components/search.js';
import {Profile} from './components/profile.js';
import {SiteMenu} from './components/site-menu.js';
import {Sorting} from './components/sorting.js';
import {Board} from './components/board.js';
import {Film} from './components/film.js';
import {ShowMoreButton} from './components/show-more-button.js';
import {FilmPopup} from './components/film-popup.js';
import {Comment} from './components/comment.js';
import {films as data} from './services/data.js';
import {getRandomInt, render, unrender, Position, createElement} from './utils.js';

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStatistics = document.querySelector(`.footer__statistics`);

const renderHeader = () => {
  const search = new Search();
  const profile = new Profile(getRandomInt(0, 30));

  render(headerElement, search.getElement(), Position.BEFOREEND);
  render(headerElement, profile.getElement(), Position.BEFOREEND);
};

const renderMenu = () => {
  const menu = new SiteMenu();

  render(mainElement, menu.getElement(), Position.BEFOREEND);
};

const renderSorting = () => {
  const sorting = new Sorting();

  render(mainElement, sorting.getElement(), Position.BEFOREEND);
};

const renderFilm = (filmData, container, place) => {
  const film = new Film(filmData);
  const filmDetails = new FilmPopup(filmData);
  const filmComments = filmData.comments.map((it) => new Comment(it));

  const onFilmCardClick = (evt) => {
    let target = evt.target;
    if (
      target.className === `film-card__poster` ||
      target.className === `film-card__title` ||
      target.className === `film-card__comments`
    ) {
      render(footerElement, filmDetails.getElement(), Position.AFTEREND);
      filmComments.forEach((it) => render(filmDetails.getElement().querySelector(`.film-details__comments-list`), it.getElement(), Position.BEFOREEND));
      document.addEventListener(`keydown`, onPopupEscKeyDown);
      filmDetails.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, onPopupCloseButtonClick);
    }
  };

  const onPopupCloseButtonClick = () => {
    unrender(filmDetails.getElement());
    document.removeEventListener(`keydown`, onPopupEscKeyDown);
  };

  const onPopupEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      unrender(filmDetails.getElement());
      document.removeEventListener(`keydown`, onPopupEscKeyDown);
    }
  };

  film.getElement().addEventListener(`click`, onFilmCardClick);
  render(container, film.getElement(), place);
};

const renderBoard = (filmsData) => {
  const START_FILMS_COUNT = 5;
  const TOP_RATED_FILMS_COUNT = 2;
  const MOST_COMMENT_FILMS_COUNT = 2;

  const topRatedFilmsData = filmsData.slice().sort((a, b) => b.raiting - a.raiting).slice(0, TOP_RATED_FILMS_COUNT);
  const mostCommentedFilmsData = filmsData.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, MOST_COMMENT_FILMS_COUNT);

  const board = new Board(filmsData.length);
  const filmListContainerElement = board.getElement().querySelector(`.films-list__container`);
  const filmListExtraElements = board.getElement().querySelectorAll(`.films-list--extra`);

  const showMoreButton = new ShowMoreButton();

  const onShowMoreButtonClick = () => {
    filmsData
      .splice(0, START_FILMS_COUNT)
      .forEach((it) => renderFilm(it, filmListContainerElement, Position.BEFOREEND));
    if (!filmsData.length) {
      showMoreButton.getElement().removeEventListener(`click`, onShowMoreButtonClick);
      showMoreButton.hideShowMoreButton();
    }
  };

  filmsData
    .splice(0, START_FILMS_COUNT)
    .forEach((it) => renderFilm(it, filmListContainerElement, Position.BEFOREEND));
  topRatedFilmsData
    .forEach((it) => renderFilm(it, filmListExtraElements[0].querySelector(`.films-list__container`), Position.BEFOREEND));
  mostCommentedFilmsData
    .forEach((it) => renderFilm(it, filmListExtraElements[1].querySelector(`.films-list__container`), Position.BEFOREEND));

  if (filmsData.length > 5) {
    showMoreButton.getElement()
      .addEventListener(`click`, onShowMoreButtonClick);
    render(filmListContainerElement, showMoreButton.getElement(), Position.AFTEREND);
  }

  render(mainElement, board.getElement(), Position.BEFOREEND);
};

const renderFooterFilmsCounter = () => {
  render(footerStatistics, createElement(`<p>${data.length} movies inside</p>`), Position.AFTEREND);
};

renderHeader();
renderMenu();
renderSorting();
renderBoard(data.slice());
renderFooterFilmsCounter();
