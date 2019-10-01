import {MovieController} from './movie-controller';
import {ShowMoreButton} from './components/show-more-button';

export class FilmListController {
  constructor(container, data, onDataChange, filmDetailsOpenedId) {
    this._container = container;
    this._data = data;
    this._onDataChange = onDataChange;
    this._filmDetailsOpenedId = filmDetailsOpenedId;
    this._onChangeView = this._onChangeView.bind(this);

    this._showMoreButton = new ShowMoreButton();

    this._subscriptions = [];
    this._START_FILMS_COUNT = 5;
  }

  init() {
    this._data
    .forEach((it) => this._renderFilm(it, this._container, this._filmDetailsOpened));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _renderFilm(filmData, container) {
    const movieController = new MovieController(container, filmData, this._onDataChange, this._onChangeView, this._filmDetailsOpenedId);
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }


}
