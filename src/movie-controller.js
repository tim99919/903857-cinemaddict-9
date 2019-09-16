import {Film} from './components/film';
import {FilmPopup} from './components/film-popup';
import {Comment} from './components/comment';
import {render, unrender, Position} from './utils';

export class MovieController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
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
        render(document.body, this._filmDetails.getElement(), Position.BEFOREEND);
        this._filmComments.forEach((it) => render(this._filmDetails.getElement().querySelector(`.film-details__comments-list`), it.getElement(), Position.BEFOREEND));
        document.addEventListener(`keydown`, onPopupEscKeyDown);
        this._filmDetails.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, onPopupCloseButtonClick);
      }
    };

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

    this._film.getElement().addEventListener(`click`, onFilmCardClick);
    render(this._container, this._film.getElement(), Position.BEFOREEND);
  }

  onDataChange() {

  }

  onChangeView() {

  }
}
