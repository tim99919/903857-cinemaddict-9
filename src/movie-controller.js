import {Film} from './components/film';
import {FilmPopup} from './components/film-popup';
import {Comment} from './components/comment';
import {render, unrender, Position} from './utils';

export class MovieController {
  constructor(container, data, onDataChange, filmDetilsOpenedId = null) {
    this._container = container;
    this._data = data;
    this._onDataChange = onDataChange;
    this._filmDetilsOpenedId = filmDetilsOpenedId;
    this._film = new Film(data);
    this._filmDetails = new FilmPopup(data);
    this._filmComments = data.comments.map((it) => new Comment(it));
    this.init();
  }

  init() {
    const onFilmCardClick = (evt) => {
      let target = evt.target;
      if (
        target.className === `film-card__poster` ||
        target.className === `film-card__title` ||
        target.className === `film-card__comments`
      ) {
        renderFilmDetails();
      }
    };

    const renderFilmDetails = () => {
      unrender(this._filmDetails.getElement());
      this._filmDetails.removeElement();

      render(document.body, this._filmDetails.getElement(), Position.BEFOREEND);
      this._filmComments.forEach((it) => render(this._filmDetails.getElement().querySelector(`.film-details__comments-list`), it.getElement(), Position.BEFOREEND));
      document.addEventListener(`keydown`, onPopupEscKeyDown);
      this._filmDetails.getElement().querySelector(`.film-details__controls`).addEventListener(`click`, onFilmDetailsFormControlsClick);
      this._filmDetails.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, onPopupCloseButtonClick);
    }

    const onPopupCloseButtonClick = () => {
      unrender(this._filmDetails.getElement());
      document.removeEventListener(`keydown`, onPopupEscKeyDown);
    };

    const onPopupEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        unrender(this._filmDetails.getElement());
        document.removeEventListener(`keydown`, onPopupEscKeyDown);
      }
    };

    const onFilmFormControlsClick = (evt) => {
      const oldData = this._data;
      const newData = {...this._data};
      evt.preventDefault();
      if (evt.target.className.includes(`film-card__controls-item--add-to-watchlist`) ||
          evt.target.className.includes(`film-details__control-label--watchlist`)) {
        newData.isWatchlisted = !newData.isWatchlisted;

        console.log(1);
      } else if (evt.target.className.includes(`film-card__controls-item--mark-as-watched`) ||
                 evt.target.className.includes(`film-details__control-label--watched`)) {
        newData.isWatched = !newData.isWatched;
        console.log(2);
      } else {
        newData.isFavorite = !newData.isFavorite;
        console.log(3);
      }
      console.log(newData);

      this._onDataChange(newData, oldData);
    };

    // TODO
    // Добавить чтобы попап рендерился с новыми данными после клика по контролам
    const onFilmDetailsFormControlsClick = (evt) => {
      const oldData = this._data;
      const newData = {...this._data};
      evt.preventDefault();
      unrender(this._filmDetails.getElement());
      this._filmDetails.removeElement();

      if (evt.target.className.includes(`film-details__control-label--watchlist`)) {
        newData.isWatchlisted = !newData.isWatchlisted;
      } else if (evt.target.className.includes(`film-details__control-label--watched`)) {
        newData.isWatched = !newData.isWatched;
      } else {
        newData.isFavorite = !newData.isFavorite;
      }

      console.log(newData.isWatchlisted);
      console.log(newData.isWatched);
      console.log(newData.isFavorite);

      this._onDataChange(newData, oldData);
    };

    this._film.getElement().querySelector(`.film-card__controls`).addEventListener(`click`, onFilmFormControlsClick);
    this._film.getElement().addEventListener(`click`, onFilmCardClick);
    render(this._container, this._film.getElement(), Position.BEFOREEND);

    if (this._filmDetilsOpenedId === this._data.id) {
      renderFilmDetails();
    }
  }
}
