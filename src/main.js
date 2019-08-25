import {createSearchTemplate} from './components/search.js';
import {createProfileTemplate} from './components/profile.js';
import {createSiteMenuTemplate} from './components/site-menu.js';
import {createSortingTemplate} from './components/sorting.js';
import {createBoardTemplate} from './components/board.js';
import {createFilmsListTemplate} from './components/films-list.js';
import {createFilmTemplate} from './components/film.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createFilmPopupTemplate} from './components/film-popup.js';
import {createCommentTemplate} from "./components/comment.js";
import {getFilmCard} from './services/data.js';
import {getRandomInt} from './utils.js';


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const filmsCount = 5;
const topRatedFilmsCount = 2;
const mostCommentedFilmsCount = 2;

const renderComponent = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const films = new Array(filmsCount).fill(``).map(() => getFilmCard());
const topRatedFilms = films.sort((a, b) => b.raiting - a.raiting).slice(0, topRatedFilmsCount);
const mostCommentedFilms = films.sort((a, b) => b.commentsCount - a.commentsCount).slice(0, mostCommentedFilmsCount);
// TODO
// comments section to the bottom of popup

renderComponent(headerElement, createSearchTemplate(), `beforeend`);
renderComponent(headerElement, createProfileTemplate(getRandomInt(0, 30)), `beforeend`);
renderComponent(mainElement, createSiteMenuTemplate(films.length), `beforeend`);
renderComponent(mainElement, createSortingTemplate(), `beforeend`);
renderComponent(mainElement, createBoardTemplate(), `beforeend`);

const boardElement = mainElement.querySelector(`.films`);

renderComponent(
    boardElement,
    createFilmsListTemplate({
      title: `All movies. Upcoming`,
      content: films.map((it) => createFilmTemplate(it)).join(``),
      isHidden: true
    }),
    `beforeend`
);
renderComponent(
    boardElement,
    createFilmsListTemplate({
      title: `Top rated`,
      content: topRatedFilms.map((it) => createFilmTemplate(it)).join(``),
      isExtra: true
    }),
    `beforeend`
);
renderComponent(
    boardElement,
    createFilmsListTemplate({
      title: `Most commented`,
      content: mostCommentedFilms.map((it) => createFilmTemplate(it)).join(``),
      isExtra: true
    }),
    `beforeend`
);

const filmsListElement = mainElement.querySelector(`.films-list`);

renderComponent(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);
renderComponent(footerElement, createFilmPopupTemplate(films[0]), `afterend`);

const commentsListElement = document.querySelector(`.film-details__comments-list`);

window.filma = films[0].comments;

renderComponent(commentsListElement, films[0].comments.map((it) => createCommentTemplate(it)).join(``), `beforeend`);
