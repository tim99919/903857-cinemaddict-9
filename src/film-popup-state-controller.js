export class FilmPopupStateController {
  constructor(state = false) {
    this._state = state;
  }

  getState() {
    return this._state;
  }

  setClosed() {
    this._state = false;
    console.log(this._state);
  }

  setOpened() {
    this._state = true;
    console.log(this._state);
  }

  toggleFilmPopupState() {
    this._state = !this._state;
  }
}
