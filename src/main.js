import {createSearchTemplate} from './components/search.js';
import {createProfileTemplate} from './components/profile.js';
import {createSiteMenuTemplate} from './components/site-menu.js';
import {createSortingTemplate} from './components/sorting.js';
import {createBoardTemplate} from './components/board.js';
import {createFilmTemplate} from './components/film.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const filmsCount = 5;

const renderComponent = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

renderComponent(headerElement, createSearchTemplate(), `beforeend`);
renderComponent(headerElement, createProfileTemplate(), `beforeend`);
renderComponent(mainElement, createSiteMenuTemplate(), `beforeend`);
renderComponent(mainElement, createSortingTemplate(), `beforeend`);
renderComponent(mainElement, createBoardTemplate(), `beforeend`);

const filmsListElement = mainElement.querySelector(`.films-list__container`);

new Array(filmsCount).fill(``).forEach(() => renderComponent(filmsListElement, createFilmTemplate(), `beforeend`));

renderComponent(filmsListElement, createShowMoreButtonTemplate(), `afterend`);
