import {Board} from './components/board';
import {Sorting} from './components/sorting';
import {ShowMoreButton} from './components/show-more-button';
import {render, unrender, Position} from './utils';
import {FilmListController} from './film-list-controller';
import { FilmPopupStateController } from './film-popup-state-controller';

const START_FILMS_COUNT = 5;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENT_FILMS_COUNT = 2;

export class PageController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._board = new Board();
    this._sort = new Sorting();
    this._showMoreButton = new ShowMoreButton();
    this._filmPopupStateController = new FilmPopupStateController();

    this._showedFilms = [];
    this._onDataChange = this._onDataChange.bind(this);
    // this._filmDetailState = {opened: false};
  }

  init() {
    if (!this._data) {
      this._getFilmsListElement().textContent = `There are no movies in our database`;
      this._getMostCommentedFilmsListElement().parentElement.classList.add(`visually-hidden`);
      this._getTopRatedFilmsListElement().parentElement.classList.add(`visually-hidden`);
      render(this._container, this._board.getElement(), Position.BEFOREEND);

      return;
    }

    this._showedFilms.push(...this._data.slice(0, START_FILMS_COUNT));

    this._renderBoard();
  }

  hide() {
    this._board.getElement().classList.add(`visually-hidden`);
  }

  show() {
    this._board.getElement().classList.remove(`visually-hidden`);
  }

  _onDataChange(newData, id) {
    // const changedIndex = this._data.findIndex((it) => it === oldData);

    // if (newData === null) {
    //   if (oldData.comments.includes(null)) {
    //     const deletedCommentIndex = oldData.comments.findIndex((it) => it === null);
    //     this._data[changedIndex].comments = [...oldData.comments.slice(0, deletedCommentIndex), ...oldData.comments.slice(deletedCommentIndex + 1)];
    //   }

    //   this._data[changedIndex].comments = oldData.comments;

    //   this._renderBoard(id);
    //   return;
    // }

    // this._data[changedIndex] = newData;
    // if (parseInt(id, 10) < this._showedFilms.length + 1) {
    //   this._showedFilms[changedIndex] = newData;
    // }

    // this._renderBoard(id);

    this._data = newData;
    this._renderBoard(id);
  }

  _getFilmsListElement() {
    return this._board.getElement().querySelector(`.films-list__container`);
  }

  _getTopRatedFilmsListElement() {
    const extraFilmsList = this._board.getElement().querySelectorAll(`.films-list--extra`);
    return extraFilmsList[0].querySelector(`div`);
  }

  _getMostCommentedFilmsListElement() {
    const extraFilmsList = this._board.getElement().querySelectorAll(`.films-list--extra`);
    return extraFilmsList[1].querySelector(`div`);
  }

  _renderBoard(id = null) {
    const topRatedFilmsData = this._data.slice()
                                         .sort((a, b) => b.raiting - a.raiting)
                                         .slice(0, TOP_RATED_FILMS_COUNT);
    const mostCommentedFilmsData = this._data.slice()
                                         .sort((a, b) => b.comments.length - a.comments.length)
                                         .slice(0, MOST_COMMENT_FILMS_COUNT);

    this._unrenderFilmBoard();

    const filmListController = new FilmListController(this._getFilmsListElement(), this._showedFilms, this._onDataChange, id, this._filmPopupStateController);
    const filmListTopRatedController = new FilmListController(this._getTopRatedFilmsListElement(), topRatedFilmsData, this._onDataChange, id, this._filmPopupStateController);
    const filmListMostCommentedController = new FilmListController(this._getMostCommentedFilmsListElement(), mostCommentedFilmsData, this._onDataChange, id, this._filmPopupStateController);

    render(this._board.getElement(), this._sort .getElement(), Position.AFTERBEGIN);

    filmListController.init();
    filmListTopRatedController.init();
    filmListMostCommentedController.init();

    if (this._data.length !== this._showedFilms.length) {
      this._showMoreButton.getElement()
        .addEventListener(`click`, this._onShowMoreButtonClick.bind(this));
      render(this._getFilmsListElement(), this._showMoreButton.getElement(), Position.AFTEREND);
    }

    render(this._container, this._board.getElement(), Position.BEFOREEND);
  }

  _unrenderFilmBoard() {
    unrender(this._board.getElement());
    unrender(this._showMoreButton.getElement());
    this._board.removeElement();
    this._showMoreButton.removeElement();
    this._subscriptions = [];
  }

  _onShowMoreButtonClick() {
    const ADDITION_FILMS_CARDS = 5;
    const data = this._data.slice(this._showedFilms.length);

    this._showedFilms.push(...data
      .splice(0, ADDITION_FILMS_CARDS));
    this._renderBoard();
    if (!data.length) {
      unrender(this._showMoreButton.getElement());
    }
  }
}
