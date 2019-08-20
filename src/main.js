import {createSearchTemplate} from './components/search.js';
import {createProfileTemplate} from './components/profile.js';
import {createSiteMenuTemplate} from './components/site-menu.js';
import {createSortingTemplate} from './components/sorting.js';
import {createBoardTemplate} from './components/board.js';
import {createFilmsListTemplate} from './components/films-list.js';
import {createFilmTemplate} from './components/film.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createFilmPopupTemplate} from './components/film-popup.js';

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const filmsCount = 5;
const topRatedFilmsCount = 2;
const mostCommentedFilmsCount = 2;

const renderComponent = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const films = new Array(filmsCount).fill(``).map(() => createFilmTemplate());
const topRatedFilms = new Array(topRatedFilmsCount).fill(``).map(() => createFilmTemplate());
const mostCommentedFilms = new Array(mostCommentedFilmsCount).fill(``).map(() => createFilmTemplate());

renderComponent(headerElement, createSearchTemplate(), `beforeend`);
renderComponent(headerElement, createProfileTemplate(), `beforeend`);
renderComponent(mainElement, createSiteMenuTemplate(), `beforeend`);
renderComponent(mainElement, createSortingTemplate(), `beforeend`);
renderComponent(mainElement, createBoardTemplate(), `beforeend`);

const boardElement = mainElement.querySelector(`.films`);

renderComponent(boardElement, createFilmsListTemplate(`All movies. Upcoming`, films.join(`\n`), false, true), `beforeend`);
renderComponent(boardElement, createFilmsListTemplate(`Top rated`, topRatedFilms.join(`\n`), true, false), `beforeend`);
renderComponent(boardElement, createFilmsListTemplate(`Most commented`, mostCommentedFilms.join(`\n`), true, false), `beforeend`);

const filmsListElement = mainElement.querySelector(`.films-list`);

renderComponent(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);
renderComponent(footerElement, createFilmPopupTemplate(), `afterend`);
