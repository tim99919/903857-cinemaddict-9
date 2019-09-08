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

// const getFilmsInStock = () => data.length;

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

// const renderFilm = (filmData) => {
//   const film = new Film(filmData);
//   const filmDetails = new FilmPopup(filmData);

//   const onFilmCardClick = () => {
//     render(footerElement, filmDetails.getElement(), Position.AFTEREND);
//     document.addEventListener(`keydown`, onPopupEscKeyDown);
//     filmDetails.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, onPopupCloseButtonClick);
//   };

//   const onPopupCloseButtonClick = () => {
//     unrender(filmDetails.getElement());
//   };

//   const onPopupEscKeyDown = (evt) => {
//     if (evt.key === `Escape` || evt.key === `Esc`) {
//       unrender(filmDetails.getElement());
//       document.removeEventListener(`keydown`, onPopupEscKeyDown);
//     }
//   };

//   for (let elemet of [
//     film.getElement().querySelector(`.film-card__title`),
//     film.getElement().querySelector(`.film-card__poster`),
//     film.getElement().querySelector(`.film-card__comments`),
//   ]) {
//     elemet.addEventListener(`click`, onFilmCardClick);
//   }
// };

const renderBoard = () => {
  const START_FILMS_COUNT = 5;
  const TOP_RATED_FILMS_COUNT = 2;
  const MOST_COMMENT_FILMS_COUNT = 2;

  const films = new Array(data.length).fill(``).map((it, i) => new Film(data[i]));
  const filmsElements = films.map((it) => it.getElement());

  const topRatedFilmsElements = films.sort((a, b) => b._raiting - a._raiting)
                                       .slice(0, TOP_RATED_FILMS_COUNT)
                                       .map((it) => it.getElement().cloneNode(true));

  const mostCommentedFilmsElements = films.sort((a, b) => b._raiting - a._raiting)
                                            .slice(0, MOST_COMMENT_FILMS_COUNT)
                                            .map((it) => it.getElement().cloneNode(true));

  const board = new Board(films.length);
  const filmListElement = board.getElement().querySelector(`.films-list`);
  const filmListContainerElement = board.getElement().querySelector(`.films-list__container`);
  const filmListExtraElements = board.getElement().querySelectorAll(`.films-list--extra`);

  const showMoreButton = new ShowMoreButton({
    targetContainer: filmListContainerElement,
    renderElements: filmsElements.slice(START_FILMS_COUNT).map((it) => it),
    cardsCount: START_FILMS_COUNT
  });

  const onShowMoreButtonClick = () => {
    showMoreButton.showMoreFilms();
    if (!showMoreButton._renderElements.length) {
      showMoreButton.getElement().removeEventListener(`click`, onShowMoreButtonClick);
      showMoreButton.hideShowMoreButton();
    }
  };

  filmsElements
    .slice(0, START_FILMS_COUNT)
    .forEach((it) => render(filmListContainerElement, it, Position.BEFOREEND));

  topRatedFilmsElements
    .forEach((it) => render(filmListExtraElements[0].querySelector(`.films-list__container`), it, Position.BEFOREEND));

  mostCommentedFilmsElements
    .forEach((it) => render(filmListExtraElements[1].querySelector(`.films-list__container`), it, Position.BEFOREEND));

  if (films.length > 5) {
    showMoreButton.getElement()
      .addEventListener(`click`, onShowMoreButtonClick);
    render(filmListElement, showMoreButton.getElement(), Position.BEFOREEND);
  }

  render(mainElement, board.getElement(), Position.BEFOREEND);
};

const renderFooterFilmsCounter = () => {
  render(footerStatistics, createElement(`<p>${data.length} movies inside</p>`), Position.AFTEREND);
};

renderHeader();
renderMenu();
renderSorting();
renderBoard();
renderFooterFilmsCounter();

// const filmsListElement = mainElement.querySelector(`.films-list`);
// const allMoviesContainer = filmsListElement.querySelector(`.films-list__container`);

// renderShowMoreButton(filmsListElement, allMoviesContainer, films, START_FILMS_COUNT, createFilmTemplate);

// footerStatistics.insertAdjacentHTML(`beforeend`, `<p>${getFilmsInStock()} movies inside</p>`);

// renderComponent(footerElement, createFilmPopupTemplate(films[0]), `afterend`);

// const commentsListElement = document.querySelector(`.film-details__comments-list`);

// renderComponent(commentsListElement, films[0].comments.map((it) => createCommentTemplate(it)).join(``), `beforeend`);
