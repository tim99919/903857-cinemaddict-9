import {Board} from './components/board';
import {Sorting} from './components/sorting';
import {ShowMoreButton} from './components/show-more-button';
import {MovieController} from './movie-controller';
import {render, unrender, Position} from './utils';

export class PageController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._board = new Board();
    this._sort = new Sorting();
    this._showMoreButton = new ShowMoreButton();

    this._subscriptions = [];
    this._showedFilms = [];
    this._START_FILMS_COUNT = 5;
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
  }

  init() {
    if (!this._data) {
      this._getFilmsListElement().textContent = `There are no movies in our database`;
      this._getMostCommentedFilmsListElement().parentElement.classList.add(`visually-hidden`);
      this._getTopRatedFilmsListElement().parentElement.classList.add(`visually-hidden`);
      render(this._container, this._board.getElement(), Position.BEFOREEND);

      return;
    }

    this._showedFilms.push(...this._data.slice(0, this._START_FILMS_COUNT));

    this._renderBoard();
  }

  _onDataChange(newData, oldData, id = null) {
    const changedIndex = this._data.findIndex((it) => it === oldData);
    this._data[changedIndex] = newData;
    this._showedFilms[changedIndex] = newData;
    this._renderBoard(id);
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
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
    const TOP_RATED_FILMS_COUNT = 2;
    const MOST_COMMENT_FILMS_COUNT = 2;

    const topRatedFilmsData = this._data.slice().sort((a, b) => b.raiting - a.raiting).slice(0, TOP_RATED_FILMS_COUNT);
    const mostCommentedFilmsData = this._data.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, MOST_COMMENT_FILMS_COUNT);

    unrender(this._board.getElement());
    unrender(this._showMoreButton.getElement());
    this._board.removeElement();
    this._showMoreButton.removeElement();
    this._subscriptions = [];

    this._showedFilms
      .forEach((it) => this._renderFilm(it, this._getFilmsListElement(), id));
    topRatedFilmsData
      .forEach((it) => this._renderFilm(it, this._getTopRatedFilmsListElement(), id));
    mostCommentedFilmsData
      .forEach((it) => this._renderFilm(it, this._getMostCommentedFilmsListElement(), id));

    render(this._container, this._sort .getElement(), Position.BEFOREEND);
    render(this._container, this._board.getElement(), Position.BEFOREEND);

    if (this._data.length !== this._showedFilms.length) {
      this._showMoreButton.getElement()
        .addEventListener(`click`, this._onShowMoreButtonClick.bind(this));
      render(this._getFilmsListElement(), this._showMoreButton.getElement(), Position.AFTEREND);
    }
  }

  _renderFilm(filmData, container, id = null) {
    const movieController = new MovieController(container, filmData, this._onDataChange, this._onChangeView, id);
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
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
