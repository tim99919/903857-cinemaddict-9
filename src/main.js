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
const pageController = new PageController(mainElement, copyData);

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

const renderFooterFilmsCounter = () => {
  render(footerStatistics, createElement(`<p>${data.length} movies inside</p>`), Position.AFTEREND);
};

const renderStatictisc = () => {
  const staticstics = new Statistics();
  render(mainElement, staticstics.getElement(), Position.BEFOREEND);
};

renderHeader();
renderMenu();
pageController.init();
renderStatictisc();
renderFooterFilmsCounter();
