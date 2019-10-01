import {MovieController} from './movie-controller';
import {ShowMoreButton} from './components/show-more-button';

export class FilmListController {
  constructor(container, data, onDataChange, filmDetailsOpenedId, filmPopupStateController) {
    this._container = container;
    this._data = data;
    this._onDataChangeMain = onDataChange;
    this._filmDetailsOpenedId = filmDetailsOpenedId;

    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._filmPopupStateController = filmPopupStateController;
    // this._isOpenedDetails = false;

    this._showMoreButton = new ShowMoreButton();

    this._subscriptions = [];
    this._START_FILMS_COUNT = 5;
  }

  init() {
    this._renderFilmList();
  }



  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData, id) {
    // Изменения происходят отсюда поэтому должен рендериться один фильм
    // Перенести метод сюда
    this._filmDetailsOpenedId = id;
    const changedIndex = this._data.findIndex((it) => it === oldData);

    if (newData === null) {
      if (oldData.comments.includes(null)) {
        const deletedCommentIndex = oldData.comments.findIndex((it) => it === null);
        this._data[changedIndex].comments = [...oldData.comments.slice(0, deletedCommentIndex), ...oldData.comments.slice(deletedCommentIndex + 1)];
      }

      this._data[changedIndex].comments = oldData.comments;

      // return;
    }

    this._data[changedIndex] = newData;
    // if (parseInt(id, 10) < this._showedFilms.length + 1) {
    //   this._showedFilms[changedIndex] = newData;
    // }

    this._onDataChangeMain(this._data, this._filmDetailsOpenedId);
  }

  _renderFilmList() {
    this._data.forEach((it) => this._renderFilm(it, this._container, this._filmDetailsOpened));
  }

  _renderFilm(filmData, container) {
    const movieController = new MovieController(container, filmData, this._onDataChange, this._onChangeView, this._filmDetailsOpenedId, this._filmPopupStateController);
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }


}
