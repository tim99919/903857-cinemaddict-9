import {createSearchTemplate} from './components/search.js';
import {createProfileTemplate} from './components/profile.js';
import {createSiteMenuTemplate} from './components/site-menu.js';
import {createSortingTemplate} from './components/sorting.js';
import {createBoardTemplate} from './components/board.js';
import {createFilmTemplate} from './components/film.js';
import {renderShowMoreButton} from './components/show-more-button.js';
import {createFilmPopupTemplate} from './components/film-popup.js';
import {createCommentTemplate} from "./components/comment.js";
import {films} from './services/data.js';
import {getRandomInt} from './utils.js';

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStatistics = document.querySelector(`.footer__statistics`);


const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENT_FILMS_COUNT = 2;
const START_FILMS_COUNT = 5;

const renderComponent = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const getFilmsInStock = () => films.length;

const topRatedFilms = films.sort((a, b) => b.raiting - a.raiting).slice(0, TOP_RATED_FILMS_COUNT);
const mostCommentedFilms = films.sort((a, b) => b.comments.length - a.comments.length).slice(0, MOST_COMMENT_FILMS_COUNT);

renderComponent(headerElement, createSearchTemplate(), `beforeend`);
renderComponent(headerElement, createProfileTemplate(getRandomInt(0, 30)), `beforeend`);
renderComponent(mainElement, createSiteMenuTemplate(films.length), `beforeend`);
renderComponent(mainElement, createSortingTemplate(), `beforeend`);
renderComponent(
    mainElement,
    createBoardTemplate(
        films.
          slice(0, START_FILMS_COUNT).
          map((it) => createFilmTemplate(it)).
          join(``),
        topRatedFilms.
          map((it) => createFilmTemplate(it)).
          join(``),
        mostCommentedFilms.
          map((it) => createFilmTemplate(it)).
          join(``)
    ),
    `beforeend`
);

const filmsListElement = mainElement.querySelector(`.films-list`);
const allMoviesContainer = filmsListElement.querySelector(`.films-list__container`);

renderShowMoreButton(filmsListElement, allMoviesContainer, films, START_FILMS_COUNT, createFilmTemplate);

footerStatistics.insertAdjacentHTML(`beforeend`, `<p>${getFilmsInStock()} movies inside</p>`);

renderComponent(footerElement, createFilmPopupTemplate(films[0]), `afterend`);

const commentsListElement = document.querySelector(`.film-details__comments-list`);

renderComponent(commentsListElement, films[0].comments.map((it) => createCommentTemplate(it)).join(``), `beforeend`);
