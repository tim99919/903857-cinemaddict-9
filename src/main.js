import {Search} from './components/search.js';
import {Profile} from './components/profile.js';
import {SiteMenu} from './components/site-menu.js';
import {films as data} from './services/data.js';
import {getRandomInt, render, Position, createElement} from './utils.js';
import {PageController} from './page-controller.js';
import {Statistics} from './components/statistics.js';

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatistics = document.querySelector(`.footer__statistics`);

const copyData = data.slice();

const search = new Search();
const profile = new Profile(getRandomInt(0, 30));
const menu = new SiteMenu();
const pageController = new PageController(mainElement, copyData);
const staticstics = new Statistics();


const renderHeader = () => {
  render(headerElement, search.getElement(), Position.BEFOREEND);
  render(headerElement, profile.getElement(), Position.BEFOREEND);
};

const renderMenu = () => {
  const resetActiveItem = () => {
    menu.getElement().querySelectorAll(`.main-navigation__item`).forEach((it) => it.classList.remove(`main-navigation__item--active`));
  };

  menu.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    resetActiveItem();

    if (evt.target.hash === `#stats`) {
      pageController.hide();
      staticstics.getElement().classList.remove(`visually-hidden`);
      evt.target.classList.add(`main-navigation__item--active`);

      return;
    }
    evt.target.classList.add(`main-navigation__item--active`);
    pageController.show();
    staticstics.getElement().classList.add(`visually-hidden`);
  });

  render(mainElement, menu.getElement(), Position.BEFOREEND);
};

const renderFooterFilmsCounter = () => {
  render(footerStatistics, createElement(`<p>${data.length} movies inside</p>`), Position.AFTEREND);
};

const renderStatictisc = () => {

  render(mainElement, staticstics.getElement(), Position.BEFOREEND);
};

staticstics.getElement().classList.add(`visually-hidden`);
renderHeader();
renderMenu();
pageController.init();
renderStatictisc();
renderFooterFilmsCounter();
