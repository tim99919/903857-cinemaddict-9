import {Board} from './components/board';
import {Sorting} from './components/sorting';
import {ShowMoreButton} from './components/show-more-button';
import {MovieController} from './movie-controller';
import {render, unrender, Position} from './utils';

export class PageController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._sort = new Sorting();
    this._board = new Board();
    this._showMoreButton = new ShowMoreButton();

    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    if (!this._data) {
      this._getFilmsListElement().textContent = `There are no movies in our database`;
      this._getMostCommentedFilmsListElement().parentElement.classList.add(`visually-hidden`);
      this._getTopRatedFilmsListElement().parentElement.classList.add(`visually-hidden`);
      render(this._container, this._board.getElement(), Position.BEFOREEND);

      return;
    }

    this._renderBoard();
  }

  _onDataChange(newData, oldData) {
    const i = this._data.findIndex((it) => it === oldData);
    this._data[i] = newData;
    this._renderBoard(this._data[i].id);
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

  _getData() {
    const data = this._data.slice();
    return () => {
      return data;
    };
  }

  _renderBoard(id = null) {
    unrender(this._board.getElement());
    this._board.removeElement();

    const START_FILMS_COUNT = 5;
    const TOP_RATED_FILMS_COUNT = 2;
    const MOST_COMMENT_FILMS_COUNT = 2;

    const topRatedFilmsData = this._data.slice().sort((a, b) => b.raiting - a.raiting).slice(0, TOP_RATED_FILMS_COUNT);
    const mostCommentedFilmsData = this._data.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, MOST_COMMENT_FILMS_COUNT);

    this._data
      .slice(0, START_FILMS_COUNT)
      .forEach((it) => this._renderFilm(it, this._getFilmsListElement(), id));
    topRatedFilmsData
      .forEach((it) => this._renderFilm(it, this._getTopRatedFilmsListElement(), id));
    mostCommentedFilmsData
      .forEach((it) => this._renderFilm(it, this._getMostCommentedFilmsListElement(), id));

    if (this._data.length > 5) {
      this._renderSorting();
      this._showMoreButton.getElement()
        .addEventListener(`click`, this._onShowMoreButtonClick());
      render(this._getFilmsListElement(), this._showMoreButton.getElement(), Position.AFTEREND);
    }

    render(this._container, this._board.getElement(), Position.BEFOREEND);
  }

  _renderSorting() {
    render(this._container, this._sort.getElement(), Position.BEFOREEND);
  }

  _renderFilm(filmData, container, id = null) {
    return new MovieController(container, filmData, this._onDataChange, id);
  }

  _onShowMoreButtonClick() {
    const ADDITION_FILMS_CARDS = 5;
    const data = this._data.slice(ADDITION_FILMS_CARDS);
    return () => {
      data
        .splice(0, ADDITION_FILMS_CARDS)
        .forEach((it) => this._renderFilm(it, this._getFilmsListElement()));
      if (!data.length) {
        unrender(this._showMoreButton.getElement());
      }
    };
  }
}
