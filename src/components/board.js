import {createElement} from "../utils.js";


export class Board {
  constructor(moviesCount) {
    this._moviesCount = moviesCount;
    this._element = null;
  }

  getTemplate() {
    return `
      <section class="films">
        <section class="films-list">
          <h2 class="films-list__title">All movies. Upcoming</h2>
          <div class="films-list__container">
            ${this._moviesCount ? `` : `There are no movies in our database`}
          </div>
        </section>
        <section class="films-list--extra ${this._moviesCount ? `` : `visually-hidden`}">
          <h2 class="films-list__title">Top rated</h2>
          <div class="films-list__container">

          </div>
        </section>
        <section class="films-list--extra ${this._moviesCount ? `` : `visually-hidden`}">
          <h2 class="films-list__title">Most commented</h2>
          <div class="films-list__container">

          </div>
        </section>
      </section>
    `;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}
